// One-off smoke test: boots the built API against an isolated in-memory Mongo
// replica set (never touches any real local MongoDB) and exercises the core
// flow end to end over real HTTP. Run: npm run build && node scripts/smoke-test.mjs
import { MongoMemoryReplSet } from "mongodb-memory-server";
import mongoose from "mongoose";
import * as argon2 from "argon2";

const BASE = "http://127.0.0.1:3999/api/v1";
let failures = 0;

function ok(label, cond, extra) {
  if (cond) {
    console.log(`OK   ${label}`);
  } else {
    failures++;
    console.error(`FAIL ${label}`, extra ?? "");
  }
}

async function call(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: { "Content-Type": "application/json", ...opts.headers },
  });
  const text = await res.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }
  return { status: res.status, body };
}

async function main() {
  const replSet = await MongoMemoryReplSet.create({ replSet: { count: 1 } });
  const uri = replSet.getUri("lms-smoke");

  process.env.MONGODB_URI = uri;
  process.env.JWT_ACCESS_SECRET = "smoke-access-secret";
  process.env.JWT_REFRESH_SECRET = "smoke-refresh-secret";
  process.env.PORT = "3999";
  process.env.FRONTEND_URL = "http://localhost:3000";

  await import("../dist/main.js");
  await new Promise((r) => setTimeout(r, 800)); // let Nest finish listening

  // --- seed a system_admin directly (this role never self-registers) ---
  // Uses its own Connection instance — NOT mongoose.connect()/disconnect(),
  // which would tear down the shared default connection the running app relies on.
  const seedDb = await mongoose.createConnection(uri).asPromise();
  const passwordHash = await argon2.hash("SysAdmin123!");
  await seedDb.collection("users").insertOne({
    email: "admin@lms.vn",
    passwordHash,
    fullName: "System Admin",
    status: "active",
    isSystemAdmin: true,
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await seedDb.close();

  // --- health ---
  const health = await call("/health");
  ok("GET /health", health.status === 200, health);

  // --- CSGD self-registration (transaction: user + institution + membership) ---
  const reg = await call("/auth/register-institution", {
    method: "POST",
    body: JSON.stringify({
      fullName: "Nguyen Van A",
      email: "admin@truongabc.vn",
      password: "MatKhau123!",
      institutionName: "Truong ABC",
      institutionCode: "truong-abc",
    }),
  });
  ok("POST /auth/register-institution", reg.status === 201 || reg.status === 200, reg);

  // --- system_admin logs in and approves the institution ---
  const sysLogin = await call("/auth/login", { method: "POST", body: JSON.stringify({ email: "admin@lms.vn", password: "SysAdmin123!" }) });
  ok("system_admin login", sysLogin.status === 200 && sysLogin.body.user.role === "system_admin", sysLogin);
  const sysToken = sysLogin.body.accessToken;

  const pending = await call("/institutions/pending", { headers: { Authorization: `Bearer ${sysToken}` } });
  ok("GET /institutions/pending has 1 entry", Array.isArray(pending.body) && pending.body.length === 1, pending);
  const institutionId = pending.body[0]._id;

  const approve = await call(`/institutions/${institutionId}/approve`, { method: "PATCH", headers: { Authorization: `Bearer ${sysToken}` } });
  ok("PATCH /institutions/:id/approve", approve.status === 200 && approve.body.status === "active", approve);

  // --- institution_admin logs in, adds a teacher + student, creates a class ---
  const adminLogin = await call("/auth/login", { method: "POST", body: JSON.stringify({ email: "admin@truongabc.vn", password: "MatKhau123!" }) });
  ok("institution_admin login", adminLogin.status === 200, adminLogin);
  const adminToken = adminLogin.body.accessToken;
  const auth = { Authorization: `Bearer ${adminToken}` };

  const addTeacher = await call(`/institutions/${institutionId}/members`, {
    method: "POST",
    headers: auth,
    body: JSON.stringify({ email: "teacher@truongabc.vn", fullName: "Co Giao B", role: "teacher" }),
  });
  ok("addMember teacher", addTeacher.status === 201 || addTeacher.status === 200, addTeacher);

  const addStudent = await call(`/institutions/${institutionId}/members`, {
    method: "POST",
    headers: auth,
    body: JSON.stringify({ email: "student@truongabc.vn", fullName: "Hoc Sinh C", role: "student" }),
  });
  ok("addMember student", addStudent.status === 201 || addStudent.status === 200, addStudent);

  const createClass = await call(`/institutions/${institutionId}/classes`, {
    method: "POST",
    headers: auth,
    body: JSON.stringify({ name: "Toan 5A", subject: "Toan", academicYear: "2026-2027" }),
  });
  ok("create class", createClass.status === 201 || createClass.status === 200, createClass);
  const classId = createClass.body._id;

  // --- reset passwords for the invited teacher/student (they got random temp ones) ---
  const seedDb2 = await mongoose.createConnection(uri).asPromise();
  const teacherHash = await argon2.hash("Teacher123!");
  const studentHash = await argon2.hash("Student123!");
  await seedDb2.collection("users").updateOne({ email: "teacher@truongabc.vn" }, { $set: { passwordHash: teacherHash } });
  await seedDb2.collection("users").updateOne({ email: "student@truongabc.vn" }, { $set: { passwordHash: studentHash } });
  await seedDb2.close();

  const teacherLogin = await call("/auth/login", { method: "POST", body: JSON.stringify({ email: "teacher@truongabc.vn", password: "Teacher123!" }) });
  ok("teacher login", teacherLogin.status === 200, teacherLogin);
  const teacherAuth = { Authorization: `Bearer ${teacherLogin.body.accessToken}` };

  const studentLogin = await call("/auth/login", { method: "POST", body: JSON.stringify({ email: "student@truongabc.vn", password: "Student123!" }) });
  ok("student login", studentLogin.status === 200, studentLogin);
  const studentAuth = { Authorization: `Bearer ${studentLogin.body.accessToken}` };

  const addClassMemberT = await call(`/classes/${classId}/members`, {
    method: "POST",
    headers: auth,
    body: JSON.stringify({ userId: teacherLogin.body.user.id, role: "teacher" }),
  });
  ok("add teacher to class", addClassMemberT.status === 201 || addClassMemberT.status === 200, addClassMemberT);

  const addClassMemberS = await call(`/classes/${classId}/members`, {
    method: "POST",
    headers: auth,
    body: JSON.stringify({ userId: studentLogin.body.user.id, role: "student" }),
  });
  ok("add student to class", addClassMemberS.status === 201 || addClassMemberS.status === 200, addClassMemberS);

  // --- teacher creates an offline assignment, student submits, teacher grades (transaction) ---
  const dueDate = new Date(Date.now() + 3600_000).toISOString();
  const createAssignment = await call(`/classes/${classId}/assignments`, {
    method: "POST",
    headers: teacherAuth,
    body: JSON.stringify({ title: "Bai tap 1", type: "offline", dueDate, maxScore: 10 }),
  });
  ok("create assignment", createAssignment.status === 201 || createAssignment.status === 200, createAssignment);
  const assignmentId = createAssignment.body._id;

  const submit = await call(`/assignments/${assignmentId}/submissions`, {
    method: "POST",
    headers: studentAuth,
    body: JSON.stringify({ textContent: "Bai lam cua em" }),
  });
  ok("student submit", submit.status === 201 || submit.status === 200, submit);
  const submissionId = submit.body._id;

  const grade = await call(`/submissions/${submissionId}/grade`, {
    method: "PATCH",
    headers: teacherAuth,
    body: JSON.stringify({ score: 9, feedback: "Tot lam" }),
  });
  ok("grade submission (transaction)", grade.status === 200 && grade.body.status === "graded", grade);

  const progress = await call(`/students/${studentLogin.body.user.id}/progress`, { headers: studentAuth });
  ok(
    "student_progress recomputed",
    progress.status === 200 && progress.body[0]?.completedCount === 1 && progress.body[0]?.avgScore === 9,
    progress,
  );

  const notif = await call("/notifications", {
    method: "POST",
    headers: auth,
    body: JSON.stringify({ scope: "institution", title: "Chao mung", content: "Nam hoc moi bat dau" }),
  });
  ok("send institution notification", notif.status === 201 || notif.status === 200, notif);

  const studentNotifs = await call("/notifications", { headers: studentAuth });
  ok("student receives institution notification", studentNotifs.status === 200 && studentNotifs.body.length === 1, studentNotifs);

  console.log(`\n${failures === 0 ? "ALL PASSED" : `${failures} FAILED`}`);
  await replSet.stop();
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
