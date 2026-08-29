# LMS Backend (NestJS + MongoDB Atlas)

API cho nền tảng quản lý học tập — ba vai trò CSGD / Giáo viên / Học sinh, cộng
Quản trị hệ thống ở tầng nền tảng. Xem tài liệu thiết kế đầy đủ tại
`lms-design.html` ở thư mục gốc repo.

## Cài đặt

```bash
npm install
cp .env.example .env   # rồi điền MONGODB_URI (Atlas) + JWT secrets
```

`MONGODB_URI` lấy từ MongoDB Atlas → Connect → Drivers. Cụm cần bật replica
set (mặc định trên Atlas) vì các thao tác chấm bài/đăng ký CSGD dùng
multi-document transaction.

## Chạy dev

```bash
npm run start:dev
```

- API: `http://localhost:3001/api/v1`
- Swagger: `http://localhost:3001/api/docs`
- Health check: `GET /api/v1/health`

## Tạo tài khoản Quản trị hệ thống

Vai trò `system_admin` không tự đăng ký qua API (chỉ CSGD tự đăng ký được).
Tạo thủ công:

```bash
npm run seed:admin -- admin@lms.vn "MatKhauManh123!"
```

## Luồng nghiệp vụ chính

1. `POST /auth/register-institution` — CSGD tự đăng ký (tạo user + institution + membership institution_admin trong 1 transaction), trạng thái `pending`.
2. `PATCH /institutions/:id/approve` — system_admin duyệt → CSGD chuyển `active`.
3. `POST /institutions/:institutionId/members` — CSGD thêm giáo viên/học sinh.
4. `POST /institutions/:institutionId/classes` → `POST /classes/:classId/members` — tạo lớp, thêm thành viên lớp.
5. Giáo viên: `POST /institutions/:institutionId/questions` → `POST /institutions/:institutionId/exams` → `POST /classes/:classId/assignments` (giao bài online/offline).
6. Học sinh: `POST /assignments/:assignmentId/submissions` để nộp bài.
7. Giáo viên: `PATCH /submissions/:submissionId/grade` — chấm bài trong transaction, tự động cập nhật `student_progress`.
8. `GET /students/:studentId/progress`, `GET /classes/:classId/progress` — báo cáo tiến độ.

## Kiểm thử

```bash
npm run test        # unit test (vitest)
npm run test:e2e     # cần MONGODB_URI trỏ tới một database test
```
