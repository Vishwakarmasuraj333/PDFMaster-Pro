import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/jwt-service';

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('accessToken')?.value;
    const sessionEmail = cookieStore.get('pdfmaster_session')?.value;

    let emailToFind = sessionEmail;

    if (token) {
      const decoded = verifyAccessToken(token);
      if (decoded && decoded.email) {
        emailToFind = decoded.email;
      }
    }

    if (!emailToFind) {
      return NextResponse.json(
        { success: false, message: 'Unauthenticated: No active session token found.' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: emailToFind.toLowerCase().trim() },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        isVerified: true,
        storageUsedBytes: true,
        storageLimitBytes: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User record not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        ...user,
        storageUsedBytes: user.storageUsedBytes.toString(),
        storageLimitBytes: user.storageLimitBytes.toString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Server error.' },
      { status: 500 }
    );
  }
}
