import 'dotenv/config';
import mongoose from 'mongoose';
import * as argon2 from 'argon2';
import { User, UserSchema } from '../users/schemas/user.schema.js';
async function main() {
    const [email, password] = process.argv.slice(2);
    if (!email || !password) {
        console.error('Cách dùng: npm run seed:admin -- <email> <password>');
        process.exit(1);
    }
    const uri = process.env.MONGODB_URI;
    if (!uri)
        throw new Error('Thiếu MONGODB_URI trong .env');
    await mongoose.connect(uri);
    const UserModel = mongoose.model(User.name, UserSchema);
    const existing = await UserModel.findOne({ email: email.toLowerCase() });
    if (existing) {
        console.log(`Đã tồn tại user ${email} — cập nhật thành system_admin.`);
        existing.isSystemAdmin = true;
        await existing.save();
    }
    else {
        const passwordHash = await argon2.hash(password);
        await UserModel.create({ email, passwordHash, fullName: 'System Admin', isSystemAdmin: true, emailVerified: true });
        console.log(`Đã tạo system_admin: ${email}`);
    }
    await mongoose.disconnect();
}
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=seed-admin.js.map