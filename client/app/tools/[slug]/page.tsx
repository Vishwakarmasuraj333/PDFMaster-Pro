"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/navbar';
import Footer from '../../../components/footer';
import PDFEditorSandbox from '../../../components/pdf-editor-sandbox';
import { PDF_TOOLS } from '../../../lib/pdf-tools-data';
import { Sparkles, ShieldCheck, Zap, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SingleToolPage() {
  const params = useParams();
  const slug = params.slug as string;

  const tool = PDF_TOOLS.find((t) => t.slug === slug) || {
    id: slug || 'tool',
    slug: slug || 'tool',
    title: slug ? slug.replace(/-/g, ' ').toUpperCase() : 'PDF Tool',
    description: 'Execute instant PDF operations securely with PDFMaster Pro.',
    category: 'organize',
    categoryChip: 'Workflows',
    icon: 'Combine',
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0F172A]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 w-full">
        
        {/* Back link */}
        <div>
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All PDF Tools
          </Link>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          {tool.badge && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 font-extrabold text-[10px]">
              <Sparkles className="w-3 h-3" /> {tool.badge}
            </span>
          )}
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            {tool.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Sandbox Upload & Processing Interface */}
        <PDFEditorSandbox toolSlug={tool.slug} toolTitle={tool.title} />

        {/* How it works info */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 mx-auto flex items-center justify-center font-black">
              1
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Select PDF Files</h4>
            <p className="text-[11px] text-slate-500">Drag and drop your PDF documents into the upload container.</p>
          </div>

          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 mx-auto flex items-center justify-center font-black">
              2
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Configure Options</h4>
            <p className="text-[11px] text-slate-500">Set options such as watermark text, rotation angle, or password.</p>
          </div>

          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 mx-auto flex items-center justify-center font-black">
              3
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Download Output</h4>
            <p className="text-[11px] text-slate-500">Instantly save the resulting high-quality PDF document to your device.</p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
