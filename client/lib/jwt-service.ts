import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_pdfmaster_2026';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'super_secret_refresh_key_pdfmaster_2026';

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
  name?: string;
}

export function signAccessToken(user: { id: string; email: string; role: string; name?: string }): string {
  console.log(`[AUTH LOG] JWT Created for: ${user.email}`);
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: '1d' }
  );
}

export function signRefreshToken(user: { id: string; email: string; role: string; name?: string }): string {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyAccessToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (err) {
    return null;
  }
}

export function setAuthCookies(
  response: NextResponse,
  accessToken: string,
  refreshToken: string,
  email: string
) {
  const isProd = process.env.NODE_ENV === 'production';

  // Set-Cookie with SameSite=Lax for reliable browser session persistence across redirects
  response.cookies.set('pdfmaster_session', email, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });

  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60, // 1 day
    path: '/',
  });

  response.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });

  console.log(`[AUTH LOG] Cookie Set for: ${email}`);

  return response;
}

export function clearAuthCookies(response: NextResponse) {
  console.log(`[AUTH LOG] Session Destroyed & Cookies Cleared`);
  response.cookies.set('pdfmaster_session', '', { path: '/', maxAge: 0 });
  response.cookies.set('accessToken', '', { path: '/', maxAge: 0 });
  response.cookies.set('refreshToken', '', { path: '/', maxAge: 0 });
  return response;
}
