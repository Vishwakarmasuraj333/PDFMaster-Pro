import { NextResponse } from 'next/server';
import { clearAuthCookies } from '@/lib/jwt-service';

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully. Auth cookies cleared.',
    });

    clearAuthCookies(response);

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Logout error.' },
      { status: 500 }
    );
  }
}
