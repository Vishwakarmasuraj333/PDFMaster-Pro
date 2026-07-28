"use client";

import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0F172A]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 w-full">
        <div className="space-y-3 border-b border-slate-200 dark:border-slate-800 pb-6">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Terms of Service</h1>
          <p className="text-xs text-slate-500">Effective Date: July 28, 2026 • PDFMaster Pro</p>
        </div>

        <div className="space-y-6 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Platform License & Acceptance</h2>
            <p>
              By accessing PDFMaster Pro, developed by Suraj Vishwakarma, you agree to comply with all platform operational guidelines, rate limits, and terms of service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Acceptable Use Policy</h2>
            <p>
              Users may not upload malware, illegal, or copyrighted material without authorization. System monitoring automatically blocks malicious payload uploads.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
