import prisma from './prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendOTPEmail } from './mail-service';

/**
 * Generate cryptographically secure 6-digit random OTP
 */
export function generate6DigitOTP(): string {
  return crypto.randomInt(100000, 1000000).toString();
}

/**
 * Database-backed User lookup
 */
export async function findUserByEmail(email: string) {
  const lowerEmail = email.toLowerCase().trim();
  return await prisma.user.findUnique({
    where: { email: lowerEmail },
  });
}

/**
 * Database-backed User creation / update
 */
export async function upsertUser(data: {
  email: string;
  name: string;
  passwordHash?: string;
  role?: 'USER' | 'ADMIN' | 'STAFF';
  provider?: string;
  providerId?: string;
  avatar?: string;
  isVerified?: boolean;
}) {
  const lowerEmail = data.email.toLowerCase().trim();
  const isDefaultAdmin = lowerEmail.includes('suraj') || lowerEmail.includes('admin') || lowerEmail === 'itsurya9930@gmail.com' || lowerEmail === 'itxsurajofficial@gmail.com';
  const role = data.role || (isDefaultAdmin ? 'ADMIN' : 'USER');

  return await prisma.user.upsert({
    where: { email: lowerEmail },
    update: {
      name: data.name,
      avatar: data.avatar || undefined,
      provider: data.provider || undefined,
      providerId: data.providerId || undefined,
      isVerified: data.isVerified !== undefined ? data.isVerified : undefined,
    },
    create: {
      email: lowerEmail,
      name: data.name,
      passwordHash: data.passwordHash || null,
      role: role,
      provider: data.provider || 'credentials',
      providerId: data.providerId || null,
      avatar: data.avatar || null,
      isVerified: data.isVerified || false,
    },
  });
}

/**
 * Database-backed OTP generation and SMTP email dispatch
 * Resends invalidate previous OTP records.
 */
export async function createAndSendOTP(email: string): Promise<string> {
  const lowerEmail = email.toLowerCase().trim();
  const otpCode = generate6DigitOTP();
  const otpHash = await bcrypt.hash(otpCode, 10);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Exactly 5 minutes

  // Store in MySQL database using Prisma (upsert or delete previous & create)
  await prisma.loginOTP.upsert({
    where: { email: lowerEmail },
    update: {
      otpHash,
      expiresAt,
      attempts: 0,
      consumedAt: null,
      createdAt: new Date(),
    },
    create: {
      email: lowerEmail,
      otpHash,
      expiresAt,
      attempts: 0,
      consumedAt: null,
    },
  });

  // Dispatch via Gmail SMTP (throws real error if SMTP fails)
  await sendOTPEmail(lowerEmail, otpCode);

  return otpCode;
}

/**
 * Database-backed OTP verification
 */
export async function verifyDatabaseOTP(email: string, otpInput: string): Promise<{ success: boolean; message: string }> {
  const lowerEmail = email.toLowerCase().trim();

  const record = await prisma.loginOTP.findUnique({
    where: { email: lowerEmail },
  });

  if (!record || record.consumedAt) {
    return { success: false, message: 'OTP expired or not found. Please request a new code.' };
  }

  // Check 5-minute expiry
  if (new Date() > record.expiresAt) {
    await prisma.loginOTP.delete({ where: { email: lowerEmail } }).catch(() => {});
    return { success: false, message: 'OTP code expired (5 minute limit).' };
  }

  // Check maximum 5 attempts limit
  if (record.attempts >= 5) {
    await prisma.loginOTP.delete({ where: { email: lowerEmail } }).catch(() => {});
    return { success: false, message: 'Maximum 5 invalid attempts reached. Please request a new OTP.' };
  }

  // Verify bcrypt hashed OTP
  const isValid = await bcrypt.compare(otpInput, record.otpHash);
  if (!isValid) {
    const updatedAttempts = record.attempts + 1;
    await prisma.loginOTP.update({
      where: { email: lowerEmail },
      data: { attempts: updatedAttempts },
    });
    return { success: false, message: `Invalid OTP code. Attempts remaining: ${5 - updatedAttempts}` };
  }

  // Delete consumed OTP from database immediately to prevent reuse
  await prisma.loginOTP.delete({
    where: { email: lowerEmail },
  }).catch(() => {});

  return { success: true, message: 'OTP verified successfully.' };
}
