import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { verifyDatabaseOTP } from '@/lib/auth-store';

export async function POST(request: Request) {
  try {
    const { email, otp, newPassword } = await request.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { success: false, message: 'Email address, OTP code, and new password are required.' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: 'New password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    const lowerEmail = email.toLowerCase().trim();

    // Verify OTP
    const verifyRes = await verifyDatabaseOTP(lowerEmail, otp.trim());
    if (!verifyRes.success) {
      return NextResponse.json(
        { success: false, message: verifyRes.message },
        { status: 400 }
      );
    }

    // Hash new password with bcrypt only
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Update user password in database
    await prisma.user.update({
      where: { email: lowerEmail },
      data: {
        passwordHash,
        isVerified: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Password reset successfully. You can now login with your new password.',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Reset password failed.' },
      { status: 500 }
    );
  }
}
