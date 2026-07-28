"use client";

import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import PDFToolCard from '../../components/pdf-tool-card';
import { PDF_TOOLS } from '../../lib/pdf-tools-data';

export default function ToolsCatalogPage() {
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const filtered = selectedCat === 'all' 
    ? PDF_TOOLS 
    : PDF_TOOLS.filter((t) => t.category === selectedCat);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0F172A]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 w-full">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            All PDF & AI Tools
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Explore 30+ enterprise-grade PDF tools. Merge, split, compress, edit, convert, encrypt, sign, and AI analyze your documents.
          </p>
        </div>

        {/* Categories Navbar Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { key: 'all', label: 'All Tools' },
            { key: 'organize', label: 'Organize PDF' },
            { key: 'optimize', label: 'Optimize PDF' },
            { key: 'convert_to', label: 'Convert To PDF' },
            { key: 'convert_from', label: 'Convert From PDF' },
            { key: 'edit', label: 'Edit PDF' },
            { key: 'security', label: 'PDF Security' },
            { key: 'intelligence', label: 'AI & Intelligence' },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCat(cat.key)}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
                selectedCat === cat.key
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-purple-50 dark:hover:bg-purple-950/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
          {filtered.map((tool) => (
            <PDFToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
