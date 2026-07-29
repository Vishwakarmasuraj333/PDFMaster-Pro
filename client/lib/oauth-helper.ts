export function getBaseUrl(request: Request): string {
  try {
    // 1. Extract host from headers (handles Vercel deployment domains, preview domains, custom domains)
    const forwardedHost = request.headers.get('x-forwarded-host');
    const hostHeader = request.headers.get('host');
    const rawHost = forwardedHost || hostHeader;

    if (rawHost) {
      const host = rawHost.split(',')[0].trim();
      const proto = request.headers.get('x-forwarded-proto') || (host.includes('localhost') || host.includes('127.0.0.1') ? 'http' : 'https');
      const cleanHost = host.replace(/\/+$/, '');
      return `${proto}://${cleanHost}`;
    }

    // 2. Fall back to Environment Variables (NEXT_PUBLIC_APP_URL / NEXTAUTH_URL / VERCEL_URL)
    const envUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || process.env.VERCEL_URL;
    if (envUrl) {
      let formatted = envUrl.trim().replace(/\/+$/, '');
      if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
        formatted = `https://${formatted}`;
      }
      return formatted;
    }

    // 3. Fall back to official production Vercel domain
    return 'https://pdf-master-pro-chi.vercel.app';
  } catch (err) {
    return 'https://pdf-master-pro-chi.vercel.app';
  }
}
