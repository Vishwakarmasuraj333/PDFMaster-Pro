import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { userStore, otpStore, generate6DigitOTP, sendOTPEmail } from '@/lib/auth-store';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Full name, email, and password are required.' },
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

    if (userStore.has(lowerEmail)) {
      return NextResponse.json(
        { success: false, message: 'An account with this email address already exists.' },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
      id: Date.now().toString(),
      name: name.trim(),
      email: lowerEmail,
      passwordHash,
      role: (lowerEmail.includes('suraj') || lowerEmail.includes('admin') ? 'ADMIN' : 'USER') as 'ADMIN' | 'USER',
      isVerified: false,
      createdAt: new Date(),
    };

    userStore.set(lowerEmail, user);

    // Generate real 6-digit OTP code upon registration
    const otpCode = generate6DigitOTP();
    const otpHash = await bcrypt.hash(otpCode, 10);

    otpStore.set(lowerEmail, {
      otpHash,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
      attempts: 0,
    });

    await sendOTPEmail(lowerEmail, otpCode);

    return NextResponse.json(
      {
        success: true,
        message: 'Account created. 6-digit OTP code sent to your email.',
        email: lowerEmail,
        otpCode,
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
