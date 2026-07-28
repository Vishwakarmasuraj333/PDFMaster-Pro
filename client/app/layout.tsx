import React from 'react';
import './globals.css';
import { ThemeProvider } from '../context/theme-context';
import CookieBanner from '../components/cookie-banner';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDFMaster Pro - Enterprise Full-Stack PDF SaaS Platform',
  description: 'Merge, split, compress, convert, edit, protect and AI summarize PDFs online. Created by Suraj Vishwakarma.',
  keywords: ['PDF Tools', 'Merge PDF', 'Split PDF', 'Compress PDF', 'AI PDF Summarizer', 'PDF SaaS', 'PDFMaster Pro'],
  authors: [{ name: 'Suraj Vishwakarma' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
