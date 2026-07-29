import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyDatabaseOTP } from '@/lib/auth-store';
import { signAccessToken, signRefreshToken, setAuthCookies } from '@/lib/jwt-service';

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: 'Email address and 6-digit OTP code are required.' },
        { status: 400 }
      );
    }

    const lowerEmail = email.toLowerCase().trim();

    // Verify OTP against MySQL database record
    const result = await verifyDatabaseOTP(lowerEmail, otp.trim());
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    // OTP Verified -> Get or update user record in database
    let user = await prisma.user.findUnique({
      where: { email: lowerEmail },
    });

    if (!user) {
      const isOwner = lowerEmail.includes('suraj') || lowerEmail.includes('admin') || lowerEmail === 'itsurya9930@gmail.com' || lowerEmail === 'itxsurajofficial@gmail.com';
      user = await prisma.user.create({
        data: {
          email: lowerEmail,
          name: lowerEmail.split('@')[0],
          role: isOwner ? 'ADMIN' : 'USER',
          isVerified: true,
          provider: 'credentials',
        },
      });
    } else if (!user.isVerified) {
      user = await prisma.user.update({
        where: { email: lowerEmail },
        data: { isVerified: true },
      });
    }

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    const response = NextResponse.json({
      success: true,
      message: 'OTP verification successful. Welcome to PDFMaster Pro!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    // Set HttpOnly Secure Cookies
    setAuthCookies(response, accessToken, refreshToken, user.email);

    return response;
  } catch (err: any) {
    console.error('[VERIFY OTP ROUTE ERROR]', err.message);
    return NextResponse.json(
      { success: false, message: err.message || 'OTP verification error.' },
      { status: 500 }
    );
  }
}
