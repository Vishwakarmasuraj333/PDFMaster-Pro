"use client";

import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0F172A]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 w-full">
        <div className="space-y-3 border-b border-slate-200 dark:border-slate-800 pb-6">
          <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 font-extrabold text-[10px]">
            LEGAL COMPLIANCE
          </span>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Privacy Policy</h1>
          <p className="text-xs text-slate-500">Last updated: July 28, 2026 • PDFMaster Pro by Suraj Vishwakarma</p>
        </div>

        <div className="space-y-6 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Document Privacy & Transient Processing</h2>
            <p>
              PDFMaster Pro is engineered around strict transient privacy standards. Documents uploaded to our web application or client tools are held strictly in memory during processing and are permanently scrubbed from system memory immediately following download completion or after 60 minutes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Client-Side WebAssembly Processing</h2>
            <p>
              Where possible, operations like page rotation, PDF merging, watermarking, and reordering execute 100% locally within your web browser using WebAssembly. In these modes, no document bytes leave your device.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Data Encryption</h2>
            <p>
              All transit channels enforce strict HTTPS TLS 1.3 and 256-bit AES data encryption standards.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
