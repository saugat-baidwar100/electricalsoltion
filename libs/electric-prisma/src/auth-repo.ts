import { OtpType, Role } from '@prisma/client';
import { db } from './client';

export const authRepo = {
  findUserByEmail,
  createOtp,
  findOtpByEmailAndType,
  deleteOtpByEmailAndType,
  createUser,
  verifyUser,
  resetPassword,
  findUserById,
};

// ✅ Find User by Email
async function findUserByEmail(email: string) {
  return db.user.findUnique({ where: { email } });
}

// ✅ Create OTP
async function createOtp(
  email: string,
  otp: string,
  type: OtpType,
  expiresAt: Date
) {
  return db.otp.create({
    data: { email, otp, type, expiresAt },
  });
}

// ✅ Find OTP by Email & Type
async function findOtpByEmailAndType(email: string, type: OtpType) {
  return db.otp.findFirst({
    where: { email, type },
    orderBy: { createdAt: 'desc' },
  });
}

// ✅ Delete OTP by Email & Type
async function deleteOtpByEmailAndType(email: string, type: OtpType) {
  return db.otp.deleteMany({ where: { email, type } });
}

// ✅ Create Verified User
async function createUser(email: string, hashedPassword: string, role: Role) {
  return db.user.create({
    data: { email, password: hashedPassword, role, verified: true },
  });
}

// ✅ Mark User as Verified (if user already exists)
async function verifyUser(email: string) {
  return db.user.update({
    where: { email },
    data: { verified: true },
  });
}

// ✅ Reset Password
async function resetPassword(email: string, hashedPassword: string) {
  return db.user.update({
    where: { email },
    data: { password: hashedPassword },
  });
}

// ✅ Find User by ID
async function findUserById(id: string) {
  return db.user.findUnique({ where: { id } });
}
