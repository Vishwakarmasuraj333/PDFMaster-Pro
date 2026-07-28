"use client";

import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { Sparkles, Shield, Cpu, Code, Heart, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0F172A]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 w-full">
        
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 font-extrabold text-xs inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Empowering Document Workflows Globally
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            About PDFMaster Pro
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            PDFMaster Pro is a complete, production-ready Full Stack PDF SaaS platform designed to make document processing effortless, intelligent, and completely secure.
          </p>
        </div>

        {/* Developer Spotlight Section */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-purple-200 dark:border-purple-900/50 bg-gradient-to-r from-purple-900/10 via-purple-500/5 to-transparent space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-600 p-1 flex-shrink-0 shadow-2xl">
              <div className="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center text-white font-black text-3xl">
                SV
              </div>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <span className="text-xs font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
                FOUNDER & CHIEF ARCHITECT
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Suraj Vishwakarma
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                PDFMaster Pro was architected and developed by Suraj Vishwakarma with a mission to deliver enterprise-grade document manipulation tools, sub-second execution speeds, and neural AI PDF intelligence without compromising user privacy.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Privacy First Architecture</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Files are processed client-side in your web browser whenever possible. Server-side jobs run in ephemeral RAM containers and auto-delete immediately after processing.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Neural AI PDF Intelligence</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Beyond simple file conversions, our neural engines allow you to summarize 200+ page contracts, extract table data into Excel, and ask interactive questions directly to your documents.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Developer REST API</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              PDFMaster Pro offers scalable REST API tokens for software developers to programmatically merge, watermark, convert, and sign PDF documents via HTTP endpoints.
            </p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
