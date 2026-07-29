import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function decodeJwtPayload(token: string): any {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const accessToken = request.cookies.get('accessToken')?.value;
  const sessionEmail = request.cookies.get('pdfmaster_session')?.value;

  const isAuthenticated = !!(accessToken || sessionEmail);

  let userRole = 'USER';
  let userEmail = sessionEmail || '';

  if (accessToken) {
    const payload = decodeJwtPayload(accessToken);
    if (payload) {
      if (payload.role) userRole = String(payload.role);
      if (payload.email) userEmail = String(payload.email);
    }
  }

  if (userEmail && (userEmail.includes('admin') || userEmail.includes('suraj') || userEmail === 'itsurya9930@gmail.com' || userEmail === 'itxsurajofficial@gmail.com')) {
    userRole = 'ADMIN';
  }

  // 1. Protect /admin routes (ADMIN role required, HTTP 403 for non-admins)
  if (path.startsWith('/admin')) {
    if (!isAuthenticated) {
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('redirect', path);
      return NextResponse.redirect(url);
    }

    if (userRole !== 'ADMIN') {
      return new NextResponse(
        `<!DOCTYPE html>
        <html>
        <head><title>403 Forbidden - PDFMaster Pro</title></head>
        <body style="background:#090d16;color:#f8fafc;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
          <div style="text-align:center;padding:40px;background:#131b2e;border:1px solid #1e293b;border-radius:24px;max-width:450px;">
            <h1 style="color:#ef4444;font-size:48px;margin:0 0 10px 0;">403</h1>
            <h2 style="font-size:20px;margin:0 0 10px 0;">Forbidden: Admin Access Restricted</h2>
            <p style="color:#94a3b8;font-size:13px;line-height:1.5;">You do not have administrative privileges to view this page. Access is strictly reserved for PDFMaster Pro administrators.</p>
            <a href="/" style="display:inline-block;margin-top:20px;padding:12px 24px;background:#6366f1;color:#fff;text-decoration:none;border-radius:12px;font-weight:bold;font-size:13px;">Return to Homepage</a>
          </div>
        </body>
        </html>`,
        {
          status: 403,
          headers: { 'Content-Type': 'text/html' },
        }
      );
    }
  }

  // 2. Protect /tools routes (Authentication required)
  if (path.startsWith('/tools')) {
    if (!isAuthenticated) {
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('redirect', path);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/tools/:path*'],
};
