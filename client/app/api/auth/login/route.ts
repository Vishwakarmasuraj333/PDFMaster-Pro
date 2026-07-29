import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { createAndSendOTP } from '@/lib/auth-store';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email address and password are required.' },
        { status: 401 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const lowerEmail = email.toLowerCase().trim();

    // 1. Check if user exists in MySQL Database
    let user = await prisma.user.findUnique({
      where: { email: lowerEmail },
    });

    // Seed default admin accounts if first time login with correct credentials
    if (!user) {
      if (lowerEmail === 'itsurya9930@gmail.com') {
        const hash = await bcrypt.hash('bittu8097944', 10);
        user = await prisma.user.create({
          data: {
            email: lowerEmail,
            name: 'Surya Vishwakarma',
            passwordHash: hash,
            role: 'ADMIN',
            isVerified: true,
          },
        });
      } else if (lowerEmail === 'suraj@pdfmasterpro.com' || lowerEmail === 'itxsurajofficial@gmail.com') {
        const hash = await bcrypt.hash('Password123!', 10);
        user = await prisma.user.create({
          data: {
            email: lowerEmail,
            name: lowerEmail.split('@')[0],
            passwordHash: hash,
            role: 'ADMIN',
            isVerified: true,
          },
        });
      }
    }

    if (!user || !user.passwordHash) {
      console.log(`[AUTH FAILED] User not found or no password hash for email: ${lowerEmail}`);
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 2. STRICT BCRYPT PASSWORD VERIFICATION
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      console.log(`[AUTH FAILED] Password mismatch for email: ${lowerEmail}`);
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 3. Password Verified -> Generate and store OTP in DB & Send real Gmail SMTP email
    try {
      await createAndSendOTP(lowerEmail);
    } catch (smtpError: any) {
      console.error(`[SMTP FAILED] Could not send OTP email to ${lowerEmail}:`, smtpError.message);
      return NextResponse.json(
        { success: false, message: `Failed to deliver OTP email via Gmail SMTP: ${smtpError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      requiresOtp: true,
      message: 'Password verified successfully. 6-digit verification code sent to your registered Gmail address.',
      email: lowerEmail,
    });
  } catch (err: any) {
    console.error('[LOGIN ROUTE ERROR]', err.message);
    return NextResponse.json(
      { success: false, message: err.message || 'Authentication error.' },
      { status: 500 }
    );
  }
}
