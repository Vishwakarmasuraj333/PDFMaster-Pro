"use client";

import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-purple-400 p-0.5">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold text-white">
                PDFMaster<span className="text-purple-400">Pro</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Every tool you need to merge, split, compress, edit, convert, encrypt and AI summarize PDFs in one platform. 100% Secure, fast, and enterprise ready.
            </p>
            <div className="pt-2 text-xs font-medium text-purple-400">
              Developed by <span className="font-bold text-white">Suraj Vishwakarma</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">PDF Tools</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/tools/merge-pdf" className="hover:text-purple-400 transition-colors">Merge PDF</Link></li>
              <li><Link href="/tools/split-pdf" className="hover:text-purple-400 transition-colors">Split PDF</Link></li>
              <li><Link href="/tools/compress-pdf" className="hover:text-purple-400 transition-colors">Compress PDF</Link></li>
              <li><Link href="/tools/pdf-to-word" className="hover:text-purple-400 transition-colors">PDF to Word</Link></li>
              <li><Link href="/tools/ai-summarizer" className="hover:text-purple-400 transition-colors">AI PDF Summary</Link></li>
              <li><Link href="/tools" className="hover:text-purple-400 transition-colors font-semibold text-purple-400">All 30+ Tools →</Link></li>
            </ul>
          </div>

          {/* Solutions & Company */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/about" className="hover:text-purple-400 transition-colors">About Us</Link></li>
              <li><Link href="/pricing" className="hover:text-purple-400 transition-colors">Pricing Plans</Link></li>
              <li><Link href="/blog" className="hover:text-purple-400 transition-colors">Blog & Guides</Link></li>
              <li><Link href="/careers" className="hover:text-purple-400 transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-purple-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Legal & Security</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-purple-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund" className="hover:text-purple-400 transition-colors">Refund Policy</Link></li>
              <li><Link href="/admin" className="hover:text-purple-400 transition-colors text-indigo-400">Admin Portal</Link></li>
            </ul>
          </div>

        </div>

        {/* Footer Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 PDFMaster Pro. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400 font-medium">
            Developed with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline mx-0.5" /> by <span className="text-white font-bold">Suraj Vishwakarma</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
