import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pdf-master-pro-chi.vercel.app';

  const publicRoutes = [
    '',
    '/tools',
    '/tools/merge-pdf',
    '/tools/split-pdf',
    '/tools/compress-pdf',
    '/tools/protect-pdf',
    '/tools/unlock-pdf',
    '/tools/add-watermark',
    '/tools/pdf-to-word',
    '/tools/pdf-to-excel',
    '/tools/pdf-to-jpg',
    '/tools/jpg-to-pdf',
    '/tools/ai-summarizer',
    '/tools/ai-chat',
    '/about',
    '/pricing',
    '/blog',
    '/careers',
    '/contact',
    '/privacy',
    '/terms',
    '/refund',
  ];

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
