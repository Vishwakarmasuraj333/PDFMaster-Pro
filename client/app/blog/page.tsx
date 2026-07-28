"use client";

import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { BookOpen, Sparkles, Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: 'How Neural AI is Revolutionizing Contract PDF Summarization in 2026',
      category: 'AI & Productivity',
      date: 'July 28, 2026',
      author: 'Suraj Vishwakarma',
      summary: 'Learn how large language model context windows enable sub-second analysis of 200+ page PDF legal contracts.'
    },
    {
      id: 2,
      title: 'Browser Client-Side WebAssembly PDF Manipulation: Security & Speed',
      category: 'Engineering',
      date: 'July 20, 2026',
      author: 'Suraj Vishwakarma',
      summary: 'Discover how pdf-lib and WebAssembly process sensitive PDF documents directly in the DOM without backend data transit.'
    },
    {
      id: 3,
      title: 'Ultimate Guide to Batch PDF Conversion: JPG, Word, and Excel',
      category: 'Guides',
      date: 'July 15, 2026',
      author: 'PDFMaster Team',
      summary: 'Streamline corporate paperwork queues with multi-file drag and drop workflows and automated compression.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0F172A]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 w-full">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 font-extrabold text-xs inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /> Insights & Tutorials
          </span>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">PDFMaster Pro Blog</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Latest articles, engineering breakdown, and document workflow optimizations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col justify-between hover:shadow-xl transition-all">
              <div className="space-y-3">
                <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300">
                  {post.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>{post.author}</span>
                <span>{post.date}</span>
              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
