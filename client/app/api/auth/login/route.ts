import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { signAccessToken, signRefreshToken, setAuthCookies } from '@/lib/jwt-service';

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

    // Auto-seed default admin accounts if logging in with valid initial credentials
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
      console.log(`[AUTH LOG] User Not Found: ${lowerEmail}`);
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    console.log(`[AUTH LOG] User Found: ${lowerEmail}`);

    // 2. STRICT BCRYPT PASSWORD VERIFICATION
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      console.log(`[AUTH LOG] Password Verification Failed for: ${lowerEmail}`);
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    console.log(`[AUTH LOG] Password Verified: ${lowerEmail}`);

    // 3. Password Verified -> Create JWT & Set HttpOnly Secure Cookies Immediately
    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful. Welcome to PDFMaster Pro!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    });

    setAuthCookies(response, accessToken, refreshToken, user.email);

    return response;
  } catch (err: any) {
    console.error('[AUTH ERROR] Login Route Error:', err.message);
    return NextResponse.json(
      { success: false, message: err.message || 'Authentication error.' },
      { status: 500 }
    );
  }
}
