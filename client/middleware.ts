import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function decodeJwtPayload(token: string): any {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    let base64Url = parts[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const parsed = JSON.parse(jsonPayload);
    if (parsed && parsed.exp && parsed.exp * 1000 < Date.now()) {
      return null; // Expired token
    }
    return parsed;
  } catch (err) {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const accessToken = request.cookies.get('accessToken')?.value;
  const sessionEmail = request.cookies.get('pdfmaster_session')?.value;

  let isValidToken = false;
  let userRole = 'USER';
  let userEmail = sessionEmail || '';

  if (accessToken) {
    const payload = decodeJwtPayload(accessToken);
    if (payload) {
      isValidToken = true;
      if (payload.role) userRole = String(payload.role);
      if (payload.email) userEmail = String(payload.email);
    }
  } else if (sessionEmail) {
    isValidToken = true;
  }

  const lowerEmail = userEmail.toLowerCase().trim();
  const isDefaultAdmin = lowerEmail && (
    lowerEmail.includes('admin') || 
    lowerEmail.includes('suraj') || 
    lowerEmail === 'itsurya9930@gmail.com' || 
    lowerEmail === 'itxsurajofficial@gmail.com' ||
    lowerEmail === 'suraj@pdfmasterpro.com'
  );

  if (isDefaultAdmin) {
    userRole = 'ADMIN';
  }

  // 1. Protect /admin routes (ADMIN role required, HTTP 403 for non-admins)
  if (path.startsWith('/admin')) {
    if (!isValidToken) {
      console.log(`[AUTH LOG] Unauthenticated access to /admin -> Redirecting to /auth/login`);
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('redirect', path);
      return NextResponse.redirect(url);
    }

    if (userRole !== 'ADMIN' && userRole !== 'CO_OPERATOR' && !lowerEmail.includes('mamta')) {
      console.log(`[AUTH LOG] Non-admin access to /admin -> Returning HTTP 403 Forbidden for: ${userEmail}`);
      return new NextResponse(
        `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>403 Forbidden - PDFMaster Pro</title>
          <style>
            body { background:#090d16; color:#f8fafc; font-family:system-ui, -apple-system, sans-serif; display:flex; align-items:center; justify-content:center; height:100vh; margin:0; }
            .card { text-align:center; padding:40px; background:#131b2e; border:1px solid #1e293b; border-radius:24px; max-width:450px; box-shadow:0 20px 40px rgba(0,0,0,0.5); }
            h1 { color:#ef4444; font-size:48px; margin:0 0 10px 0; font-weight:900; }
            h2 { font-size:20px; margin:0 0 12px 0; color:#ffffff; font-weight:800; }
            p { color:#94a3b8; font-size:13px; line-height:1.6; margin-bottom:24px; }
            a { display:inline-block; padding:12px 24px; background:#f4c430; color:#0f172a; text-decoration:none; border-radius:14px; font-weight:800; font-size:13px; }
            a:hover { background:#fbbf24; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>403</h1>
            <h2>Forbidden: Unauthorized Access</h2>
            <p>You do not have administrative privileges to view this portal. Access is strictly reserved for PDFMaster Pro administrators and designated team members.</p>
            <a href="/">Return to Homepage</a>
          </div>
        </body>
        </html>`,
        {
          status: 403,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        }
      );
    }
    console.log(`[AUTH LOG] Middleware Authorized Admin Access for: ${userEmail}`);
  }

  // 2. Protect ALL PDF tool routes (/tools, /tools/*, /workspace, /ai-summary, /ai-chat)
  const isProtectedTool = path === '/tools' || 
                          path.startsWith('/tools/') || 
                          path.startsWith('/workspace') || 
                          path.startsWith('/ai-summary') || 
                          path.startsWith('/ai-chat');

  if (isProtectedTool) {
    if (!isValidToken) {
      console.log(`[AUTH LOG] Unauthenticated access to ${path} -> Redirecting to /auth/login?redirect=${encodeURIComponent(path)}`);
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('redirect', path);
      return NextResponse.redirect(url);
    }
    console.log(`[AUTH LOG] Middleware Authorized Tool Access for: ${userEmail} -> Path: ${path}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*', 
    '/tools', 
    '/tools/:path*', 
    '/workspace/:path*', 
    '/ai-summary/:path*',
    '/ai-chat/:path*'
  ],
};
