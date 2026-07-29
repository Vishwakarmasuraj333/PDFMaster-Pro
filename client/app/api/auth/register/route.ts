import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { createAndSendOTP } from '@/lib/auth-store';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Full name, email address, and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    const lowerEmail = email.toLowerCase().trim();

    // Check if account exists
    const existing = await prisma.user.findUnique({
      where: { email: lowerEmail },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: 'An account with this email address already exists.' },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const isOwner = lowerEmail.includes('suraj') || lowerEmail.includes('admin') || lowerEmail === 'itsurya9930@gmail.com' || lowerEmail === 'itxsurajofficial@gmail.com';

    const user = await prisma.user.create({
      data: {
        email: lowerEmail,
        name: name.trim(),
        passwordHash,
        role: isOwner ? 'ADMIN' : 'USER',
        isVerified: false,
        provider: 'credentials',
      },
    });

    // Send OTP via Gmail SMTP
    try {
      await createAndSendOTP(lowerEmail);
    } catch (smtpError: any) {
      return NextResponse.json(
        { success: false, message: `Account created, but failed to send OTP email: ${smtpError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully. 6-digit OTP code sent to your email address.',
        email: user.email,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Registration error.' },
      { status: 500 }
    );
  }
}
