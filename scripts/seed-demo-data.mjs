// Seeds a realistic Vietnamese demo dataset into the REAL database the app
// already uses (whatever MONGODB_URI in .env points to). Talks to a running
// backend over HTTP, exactly like a real client would, so every write goes
// through normal validation/guards/transactions. Only touches the DB
// directly (via its own isolated mongoose.createConnection — never the
// shared connect/disconnect) to patch passwords onto accounts the addMember
// endpoint creates with an unretrievable random temp password.
//
// Run against a locally-running backend (default): node scripts/seed-demo-data.mjs
// Run against the deployed Render backend directly:
//   API_BASE_URL=https://backend-system-q5dn.onrender.com/api/v1 node scripts/seed-demo-data.mjs
// Either way MONGODB_URI in .env must point at the SAME Atlas database the
// target backend uses, since the password-patch step (and cleanup) talks to
// the database directly.
import "dotenv/config";
import dns from "node:dns";
if (process.env.MONGODB_DNS_SERVERS) dns.setServers(process.env.MONGODB_DNS_SERVERS.split(",").map((s) => s.trim()));
import mongoose from "mongoose";
import * as argon2 from "argon2";

const BASE = process.env.API_BASE_URL ?? "http://localhost:3001/api/v1";
const SYS_ADMIN_EMAIL = "admin@lms.vn";
const SYS_ADMIN_PASSWORD = "Admin123!Strong";

const COMMON_PASSWORD = "Demo123!";

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
  if (res.status >= 400) {
    throw new Error(`${opts.method ?? "GET"} ${path} -> ${res.status}: ${JSON.stringify(body)}`);
  }
  return body;
}

function auth(token) {
  return { Authorization: `Bearer ${token}` };
}

function inDays(n) {
  return new Date(Date.now() + n * 86_400_000).toISOString();
}

async function main() {
  console.log("== 1. Đăng ký CSGD (Nguyễn Thị Lan là giáo viên phụ trách) ==");
  const founder = {
    fullName: "Nguyễn Thị Lan",
    email: "lan.nguyen@ptad.edu.vn",
    password: COMMON_PASSWORD,
    institutionName: "Trường Tiểu học Ánh Dương",
    institutionCode: "th-anh-duong",
  };
  await call("/auth/register-institution", { method: "POST", body: JSON.stringify(founder) });

  console.log("== 2. System admin duyệt CSGD ==");
  const sysLogin = await call("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email: SYS_ADMIN_EMAIL, password: SYS_ADMIN_PASSWORD }),
  });
  const sysAuth = auth(sysLogin.accessToken);

  const pending = await call("/institutions/pending", { headers: sysAuth });
  const inst = pending.find((i) => i.code === founder.institutionCode);
  if (!inst) throw new Error("Không tìm thấy CSGD vừa đăng ký trong danh sách pending");
  const institutionId = inst._id;
  await call(`/institutions/${institutionId}/approve`, { method: "PATCH", headers: sysAuth });

  console.log("== 3. Giáo viên phụ trách đăng nhập, mời thêm giáo viên + học sinh ==");
  const founderLogin = await call("/auth/login", { method: "POST", body: JSON.stringify({ email: founder.email, password: founder.password }) });
  const founderAuth = auth(founderLogin.accessToken);

  const teacherDefs = [
    { email: "minh.tran@ptad.edu.vn", fullName: "Trần Văn Minh" },
    { email: "hoa.le@ptad.edu.vn", fullName: "Lê Thị Hoa" },
  ];
  const studentDefs = [
    { email: "an.pham@ptad.edu.vn", fullName: "Phạm Văn An" },
    { email: "binh.vo@ptad.edu.vn", fullName: "Võ Thị Bình" },
    { email: "chi.nguyen@ptad.edu.vn", fullName: "Nguyễn Ngọc Chi" },
    { email: "dung.hoang@ptad.edu.vn", fullName: "Hoàng Văn Dũng" },
    { email: "giang.do@ptad.edu.vn", fullName: "Đỗ Thị Giang" },
    { email: "huy.bui@ptad.edu.vn", fullName: "Bùi Quang Huy" },
    { email: "khanh.dang@ptad.edu.vn", fullName: "Đặng Thị Khánh" },
    { email: "linh.truong@ptad.edu.vn", fullName: "Trương Thùy Linh" },
  ];

  const teachers = [{ ...founderLogin.user, email: founder.email, accessToken: founderLogin.accessToken }];
  for (const t of teacherDefs) {
    await call(`/institutions/${institutionId}/members`, { method: "POST", headers: founderAuth, body: JSON.stringify({ ...t, role: "teacher" }) });
  }
  const students = [];
  for (const s of studentDefs) {
    await call(`/institutions/${institutionId}/members`, { method: "POST", headers: founderAuth, body: JSON.stringify({ ...s, role: "student" }) });
  }

  console.log("== 4. Đặt lại mật khẩu cho các tài khoản vừa mời (endpoint mời sinh mật khẩu ngẫu nhiên) ==");
  const conn = await mongoose.createConnection(process.env.MONGODB_URI).asPromise();
  const hash = await argon2.hash(COMMON_PASSWORD);
  await conn.collection("users").updateMany(
    { email: { $in: [...teacherDefs, ...studentDefs].map((u) => u.email) } },
    { $set: { passwordHash: hash } },
  );
  await conn.close();

  console.log("== 5. Đăng nhập toàn bộ giáo viên + học sinh ==");
  for (const t of teacherDefs) {
    const login = await call("/auth/login", { method: "POST", body: JSON.stringify({ email: t.email, password: COMMON_PASSWORD }) });
    teachers.push({ ...login.user, email: t.email, accessToken: login.accessToken });
  }
  for (const s of studentDefs) {
    const login = await call("/auth/login", { method: "POST", body: JSON.stringify({ email: s.email, password: COMMON_PASSWORD }) });
    students.push({ ...login.user, email: s.email, accessToken: login.accessToken });
  }

  console.log("== 6. Tạo 3 lớp học ==");
  const classDefs = [
    { name: "Toán 5A", subject: "Toán", gradeLevel: "Lớp 5", academicYear: "2026-2027", teacher: teachers[0] },
    { name: "Tiếng Việt 5A", subject: "Tiếng Việt", gradeLevel: "Lớp 5", academicYear: "2026-2027", teacher: teachers[1] },
    { name: "Tiếng Anh 5A", subject: "Tiếng Anh", gradeLevel: "Lớp 5", academicYear: "2026-2027", teacher: teachers[2] },
  ];
  const classes = [];
  for (const c of classDefs) {
    const created = await call(`/institutions/${institutionId}/classes`, {
      method: "POST",
      headers: founderAuth,
      body: JSON.stringify({ name: c.name, subject: c.subject, gradeLevel: c.gradeLevel, academicYear: c.academicYear }),
    });
    classes.push({ ...created, teacher: c.teacher });
  }

  console.log("== 7. Gán giáo viên chủ nhiệm + toàn bộ học sinh vào từng lớp ==");
  for (const klass of classes) {
    await call(`/classes/${klass._id}/members`, {
      method: "POST",
      headers: founderAuth,
      body: JSON.stringify({ userId: klass.teacher.id, role: "teacher" }),
    });
    for (const s of students) {
      await call(`/classes/${klass._id}/members`, {
        method: "POST",
        headers: founderAuth,
        body: JSON.stringify({ userId: s.id, role: "student" }),
      });
    }
  }

  console.log("== 8. Tạo học liệu (materials) ==");
  const materialDefs = [
    { title: "Bài giảng Phân số - Video minh hoạ", type: "video", subject: "Toán", fileUrl: "https://example.com/materials/phan-so.mp4", teacher: teachers[0] },
    { title: "Tài liệu ôn tập Toán học kỳ 1", type: "document", subject: "Toán", fileUrl: "https://example.com/materials/on-tap-toan-hk1.pdf", teacher: teachers[0] },
    { title: "Sơ đồ tư duy Tập làm văn", type: "image", subject: "Tiếng Việt", fileUrl: "https://example.com/materials/so-do-tap-lam-van.png", teacher: teachers[1] },
    { title: "Audio luyện nghe Unit 5", type: "audio", subject: "Tiếng Anh", fileUrl: "https://example.com/materials/unit5-listening.mp3", teacher: teachers[2] },
  ];
  const materials = [];
  for (const m of materialDefs) {
    const created = await call(`/institutions/${institutionId}/materials`, {
      method: "POST",
      headers: auth(m.teacher.accessToken),
      body: JSON.stringify({ title: m.title, type: m.type, subject: m.subject, fileUrl: m.fileUrl }),
    });
    materials.push(created);
    await call(`/institutions/${institutionId}/materials/${created._id}/share`, {
      method: "PATCH",
      headers: auth(m.teacher.accessToken),
      body: JSON.stringify({ visibility: "institution" }),
    });
  }

  console.log("== 9. Tạo ngân hàng câu hỏi + đề kiểm tra Toán ==");
  const questionDefs = [
    { subject: "Toán", topic: "Phân số", type: "multiple_choice", content: "1/2 + 1/4 bằng bao nhiêu?", options: ["1/6", "2/6", "3/4", "1"], correctAnswer: "3/4", difficulty: "easy" },
    { subject: "Toán", topic: "Phân số", type: "multiple_choice", content: "3/5 rút gọn bằng phân số nào?", options: ["6/10", "3/5", "9/15", "Cả 3 đáp án đều đúng"], correctAnswer: "Cả 3 đáp án đều đúng", difficulty: "medium" },
    { subject: "Toán", topic: "Số thập phân", type: "true_false", content: "0,5 lớn hơn 1/3", correctAnswer: "true", difficulty: "easy" },
    { subject: "Toán", topic: "Hình học", type: "fill_blank", content: "Diện tích hình vuông cạnh 4cm là ___ cm2", correctAnswer: "16", difficulty: "medium" },
    { subject: "Toán", topic: "Giải toán có lời văn", type: "essay", content: "Một cửa hàng có 120kg gạo, đã bán 45kg. Hỏi còn lại bao nhiêu kg gạo? Trình bày cách giải.", difficulty: "hard" },
  ];
  const questions = [];
  for (const q of questionDefs) {
    const created = await call(`/institutions/${institutionId}/questions`, {
      method: "POST",
      headers: auth(teachers[0].accessToken),
      body: JSON.stringify(q),
    });
    questions.push(created);
  }
  const exam = await call(`/institutions/${institutionId}/exams`, {
    method: "POST",
    headers: auth(teachers[0].accessToken),
    body: JSON.stringify({
      title: "Kiểm tra giữa kỳ - Toán 5A",
      type: "exam",
      questionRefs: questions.slice(0, 4).map((q, i) => ({ questionId: q._id, weight: [3, 3, 2, 2][i] })),
      totalScore: 10,
      durationMin: 40,
    }),
  });
  await call(`/institutions/${institutionId}/exams/${exam._id}/publish`, { method: "PATCH", headers: auth(teachers[0].accessToken) });

  console.log("== 10. Giao bài tập cho từng lớp ==");
  const assignmentsByClass = {};
  for (const klass of classes) {
    const created1 = await call(`/classes/${klass._id}/assignments`, {
      method: "POST",
      headers: auth(klass.teacher.accessToken),
      body: JSON.stringify({
        title: `Bài tập tuần 1 - ${klass.subject}`,
        description: "Hoàn thành các bài tập trong sách giáo khoa trang 24-25.",
        type: "offline",
        dueDate: inDays(2),
        maxScore: 10,
      }),
    });
    const isMathClass = klass.subject === "Toán";
    const created2 = await call(`/classes/${klass._id}/assignments`, {
      method: "POST",
      headers: auth(klass.teacher.accessToken),
      body: JSON.stringify({
        title: `Bài kiểm tra - ${klass.subject}`,
        description: isMathClass ? "Làm bài kiểm tra trực tuyến, nộp trước hạn." : "Hoàn thành và nộp bài tập trước hạn.",
        type: isMathClass ? "online" : "offline",
        ...(isMathClass ? { examId: exam._id } : {}),
        dueDate: inDays(6),
        maxScore: 10,
      }),
    });
    assignmentsByClass[klass._id] = [created1, created2];
  }

  console.log("== 11. Học sinh nộp bài + giáo viên chấm điểm bài tập tuần 1 ==");
  for (const klass of classes) {
    const [pastAssignment] = assignmentsByClass[klass._id];
    for (const [i, s] of students.entries()) {
      await call(`/assignments/${pastAssignment._id}/submissions`, {
        method: "POST",
        headers: auth(s.accessToken),
        body: JSON.stringify({ textContent: `Bài làm của ${s.fullName ?? s.email}` }),
      });
      if (i % 3 !== 2) {
        const listed = await call(`/assignments/${pastAssignment._id}/submissions`, { headers: auth(klass.teacher.accessToken) });
        const mine = listed.find((sub) => sub.studentId?._id === s.id || sub.studentId === s.id);
        if (mine) {
          const score = 6 + ((i * 7) % 5);
          await call(`/submissions/${mine._id}/grade`, {
            method: "PATCH",
            headers: auth(klass.teacher.accessToken),
            body: JSON.stringify({ score, feedback: score >= 8 ? "Làm bài rất tốt!" : "Cần cố gắng thêm ở phần vận dụng." }),
          });
        }
      }
    }
  }

  console.log("== 12. Gửi thông báo ==");
  await call("/notifications", {
    method: "POST",
    headers: founderAuth,
    body: JSON.stringify({ scope: "institution", title: "Chào mừng năm học mới", content: "Kính chào quý thầy cô và các em học sinh, năm học 2026-2027 chính thức bắt đầu!", type: "announcement" }),
  });
  for (const klass of classes) {
    await call("/notifications", {
      method: "POST",
      headers: auth(klass.teacher.accessToken),
      body: JSON.stringify({ scope: "class", classId: klass._id, title: `Bài tập mới môn ${klass.subject}`, content: "Các em kiểm tra bài tập mới được giao trong lớp nhé.", type: "assignment" }),
    });
  }

  console.log("\n=== HOÀN TẤT SEED DỮ LIỆU MẪU ===");
  console.log(`CSGD: ${founder.institutionName} (mã: ${founder.institutionCode})`);
  console.log(`Mật khẩu chung cho mọi tài khoản mới: ${COMMON_PASSWORD}`);
  console.log("\nGiáo viên:");
  console.log(`  - ${founder.email} (phụ trách CSGD)`);
  for (const t of teacherDefs) console.log(`  - ${t.email}`);
  console.log("\nHọc sinh:");
  for (const s of studentDefs) console.log(`  - ${s.email}`);
  console.log("\nLớp học: Toán 5A, Tiếng Việt 5A, Tiếng Anh 5A");
  console.log(`System admin (đã có sẵn): ${SYS_ADMIN_EMAIL}`);
}

main().catch((err) => {
  console.error("SEED FAILED:", err.message);
  process.exit(1);
});
