"use client";

import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { Briefcase, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CareersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0F172A]">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 w-full">
        
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-wider border border-amber-400/30">
            <Briefcase className="w-3.5 h-3.5" /> Join Our Team
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
            Careers at PDFMaster Pro
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Help us build high-performance document tools and AI intelligence engines for millions of developers and enterprise teams worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Senior Full Stack Engineer (Next.js + Node)',
              type: 'Full-Time • Remote',
              desc: 'Lead the development of next-generation PDF rendering pipelines, WASM modules, and cloud API endpoints.',
            },
            {
              title: 'AI & Machine Learning Engineer',
              type: 'Full-Time • Remote',
              desc: 'Integrate LLM document summarization, vector database indexing, and OCR intelligence into core PDFMaster Pro features.',
            },
            {
              title: 'Product Designer (UI/UX)',
              type: 'Full-Time • Remote',
              desc: 'Design beautiful, accessible, and intuitive document workflows across web and desktop interfaces.',
            },
            {
              title: 'DevOps & Security Specialist',
              type: 'Full-Time • Remote',
              desc: 'Manage high-throughput server infrastructure, zero-trust auth middleware, and automated deployment CI/CD pipelines.',
            },
          ].map((job, idx) => (
            <div key={idx} className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 hover:border-amber-400/50 transition-all bg-white dark:bg-slate-900">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">{job.type}</span>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{job.title}</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{job.desc}</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 hover:underline pt-2"
              >
                Apply Now <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
