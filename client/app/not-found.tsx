"use client";

import React from 'react';
import Link from 'next/link';
import { FileQuestion, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] flex items-center justify-center p-4">
      <div className="max-w-md w-full glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-3xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 mx-auto flex items-center justify-center shadow-lg">
          <FileQuestion className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-black text-purple-600 dark:text-purple-400">404</span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Page Not Found</h2>
          <p className="text-xs text-slate-500">
            The page or PDF tool you are looking for does not exist or has been moved.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-lg shadow-purple-500/25 transition-all"
        >
          <Home className="w-4 h-4" /> Back to PDF Tools Home
        </Link>
      </div>
    </div>
  );
}
