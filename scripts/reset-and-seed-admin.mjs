// One-time migration script for the "remove CSGD" change: wipes every
// collection that referenced the old institution/membership model (all of it
// is this session's QA test data, not real user data) and seeds exactly one
// admin account. NOT part of the normal seed workflow — run once by hand.
//
// Chạy: node scripts/reset-and-seed-admin.mjs <email> <password>
import 'dotenv/config';
import dns from 'node:dns';
import mongoose from 'mongoose';
import * as argon2 from 'argon2';

if (process.env.MONGODB_DNS_SERVERS) {
  dns.setServers(process.env.MONGODB_DNS_SERVERS.split(',').map((s) => s.trim()));
}

const COLLECTIONS_TO_DROP = [
  'users',
  'institutions',
  'memberships',
  'permissionsets',
  'classes',
  'classmembers',
  'assignments',
  'submissions',
  'learningmaterials',
  'questions',
  'exams',
  'notifications',
  'auditlogs',
  'studentprogresses',
];

async function main() {
  const [email, password] = process.argv.slice(2);
  if (!email || !password) {
    console.error('Cách dùng: node scripts/reset-and-seed-admin.mjs <email> <password>');
    process.exit(1);
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Thiếu MONGODB_URI trong .env');

  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const existingNames = new Set((await db.listCollections().toArray()).map((c) => c.name));

  for (const name of COLLECTIONS_TO_DROP) {
    if (existingNames.has(name)) {
      await db.collection(name).drop();
      console.log(`Dropped ${name}`);
    }
  }

  const passwordHash = await argon2.hash(password);
  await db.collection('users').insertOne({
    email: email.toLowerCase().trim(),
    passwordHash,
    fullName: 'Admin',
    role: 'teacher',
    isAdmin: true,
    status: 'active',
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log(`Seeded admin: ${email}`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
