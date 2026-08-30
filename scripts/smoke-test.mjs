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

  // --- seed the one admin account directly (this flag never self-registers) ---
  // Uses its own Connection instance — NOT mongoose.connect()/disconnect(),
  // which would tear down the shared default connection the running app relies on.
  const seedDb = await mongoose.createConnection(uri).asPromise();
  const adminHash = await argon2.hash("AdminPass123!");
  await seedDb.collection("users").insertOne({
    email: "admin@lms.vn",
    passwordHash: adminHash,
    fullName: "Admin",
    role: "teacher",
    isAdmin: true,
    status: "active",
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await seedDb.close();

  // --- health ---
  const health = await call("/health");
  ok("GET /health", health.status === 200, health);

  // --- admin logs in, creates a teacher ---
  const adminLogin = await call("/auth/login", { method: "POST", body: JSON.stringify({ email: "admin@lms.vn", password: "AdminPass123!" }) });
  ok("admin login", adminLogin.status === 200 && adminLogin.body.user.isAdmin === true, adminLogin);
  const adminAuth = { Authorization: `Bearer ${adminLogin.body.accessToken}` };

  const createTeacher = await call("/admin/teachers", {
    method: "POST",
    headers: adminAuth,
    body: JSON.stringify({ email: "teacher@truongabc.vn", fullName: "Co Giao B" }),
  });
  ok("admin creates teacher", createTeacher.status === 201 || createTeacher.status === 200, createTeacher);

  // 2, not 1: the admin account is itself role:"teacher" too (isAdmin is an
  // extra flag on top, not a separate role).
  const listTeachers = await call("/admin/teachers", { headers: adminAuth });
  ok("GET /admin/teachers has 2 entries (admin + new teacher)", Array.isArray(listTeachers.body) && listTeachers.body.length === 2, listTeachers);

  // --- reset the temp password for the invited teacher (it got a random one) ---
  const seedDb2 = await mongoose.createConnection(uri).asPromise();
  const teacherHash = await argon2.hash("Teacher123!");
  await seedDb2.collection("users").updateOne({ email: "teacher@truongabc.vn" }, { $set: { passwordHash: teacherHash } });
  await seedDb2.close();

  const teacherLogin = await call("/auth/login", { method: "POST", body: JSON.stringify({ email: "teacher@truongabc.vn", password: "Teacher123!" }) });
  ok("teacher login", teacherLogin.status === 200 && teacherLogin.body.user.role === "teacher" && teacherLogin.body.user.isAdmin === false, teacherLogin);
  const teacherAuth = { Authorization: `Bearer ${teacherLogin.body.accessToken}` };

  // --- teacher creates a class, adds a student directly (single call) ---
  const createClass = await call("/classes", {
    method: "POST",
    headers: teacherAuth,
    body: JSON.stringify({ name: "Toan 5A", subject: "Toan", academicYear: "2026-2027" }),
  });
  ok("teacher creates class", createClass.status === 201 || createClass.status === 200, createClass);
  const classId = createClass.body._id;

  const listMyClasses = await call("/classes", { headers: teacherAuth });
  ok("teacher sees own class in GET /classes", Array.isArray(listMyClasses.body) && listMyClasses.body.length === 1, listMyClasses);

  const addStudent = await call(`/classes/${classId}/members`, {
    method: "POST",
    headers: teacherAuth,
    body: JSON.stringify({ email: "student@truongabc.vn", fullName: "Hoc Sinh C", role: "student" }),
  });
  ok("teacher adds student directly to class", addStudent.status === 201 || addStudent.status === 200, addStudent);

  const seedDb3 = await mongoose.createConnection(uri).asPromise();
  const studentHash = await argon2.hash("Student123!");
  await seedDb3.collection("users").updateOne({ email: "student@truongabc.vn" }, { $set: { passwordHash: studentHash } });
  await seedDb3.close();

  const studentLogin = await call("/auth/login", { method: "POST", body: JSON.stringify({ email: "student@truongabc.vn", password: "Student123!" }) });
  ok("student login", studentLogin.status === 200 && studentLogin.body.user.role === "student", studentLogin);
  const studentAuth = { Authorization: `Bearer ${studentLogin.body.accessToken}` };

  // --- teacher creates an offline assignment, grades the student directly (no prior submission) ---
  const dueDate = new Date(Date.now() + 3600_000).toISOString();
  const createAssignment = await call(`/classes/${classId}/assignments`, {
    method: "POST",
    headers: teacherAuth,
    body: JSON.stringify({ title: "Bai tap 1", type: "offline", dueDate, maxScore: 10 }),
  });
  ok("create assignment", createAssignment.status === 201 || createAssignment.status === 200, createAssignment);
  const assignmentId = createAssignment.body._id;

  const studentId = studentLogin.body.user.id;
  const grade = await call(`/assignments/${assignmentId}/students/${studentId}/grade`, {
    method: "PATCH",
    headers: teacherAuth,
    body: JSON.stringify({ score: 9, feedback: "Tot lam" }),
  });
  ok("grade offline assignment directly (transaction)", grade.status === 200 && grade.body.status === "graded", grade);

  const progress = await call(`/students/${studentId}/progress`, { headers: studentAuth });
  ok(
    "student_progress recomputed",
    progress.status === 200 && progress.body[0]?.completedCount === 1 && progress.body[0]?.avgScore === 9,
    progress,
  );

  // --- admin sees the class in the system-wide list ---
  const allClasses = await call("/admin/classes", { headers: adminAuth });
  ok("GET /admin/classes has 1 entry", Array.isArray(allClasses.body) && allClasses.body.length === 1, allClasses);

  // --- admin manages a class it doesn't own, same as the owning teacher ---
  const adminAddsStudent = await call(`/classes/${classId}/members`, {
    method: "POST",
    headers: adminAuth,
    body: JSON.stringify({ email: "student2@truongabc.vn", fullName: "Hoc Sinh D", role: "student" }),
  });
  ok("admin adds a student to a class it doesn't own", adminAddsStudent.status === 201 || adminAddsStudent.status === 200, adminAddsStudent);
  const student2Id = adminAddsStudent.body.userId;

  const adminGrades = await call(`/assignments/${assignmentId}/students/${student2Id}/grade`, {
    method: "PATCH",
    headers: adminAuth,
    body: JSON.stringify({ score: 7, feedback: "Kha" }),
  });
  ok("admin grades in a class it doesn't own", adminGrades.status === 200 && adminGrades.body.status === "graded", adminGrades);

  // --- notifications: teacher sends to their class, admin sends system-wide, student sees both ---
  const classNotif = await call("/notifications", {
    method: "POST",
    headers: teacherAuth,
    body: JSON.stringify({ scope: "class", classId, title: "Nhac lop", content: "Nop bai dung han" }),
  });
  ok("teacher sends class notification", classNotif.status === 201 || classNotif.status === 200, classNotif);

  const teacherSystemAttempt = await call("/notifications", {
    method: "POST",
    headers: teacherAuth,
    body: JSON.stringify({ scope: "system", title: "x", content: "x" }),
  });
  ok("non-admin teacher cannot send system notification", teacherSystemAttempt.status === 403, teacherSystemAttempt);

  const systemNotif = await call("/notifications", {
    method: "POST",
    headers: adminAuth,
    body: JSON.stringify({ scope: "system", title: "Chao mung", content: "Nam hoc moi bat dau" }),
  });
  ok("admin sends system notification", systemNotif.status === 201 || systemNotif.status === 200, systemNotif);

  const studentNotifs = await call("/notifications", { headers: studentAuth });
  ok("student receives both notifications", studentNotifs.status === 200 && studentNotifs.body.length === 2, studentNotifs);

  console.log(`\n${failures === 0 ? "ALL PASSED" : `${failures} FAILED`}`);
  await replSet.stop();
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
