"use client";

import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import PDFToolCard from '../components/pdf-tool-card';
import { PDF_TOOLS } from '../lib/pdf-tools-data';
import { 
  Sparkles, Search, Lock, Cpu, Zap, ChevronDown, Check, 
  Smartphone, Monitor, Globe, Shield, Star, ArrowRight, Download
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [activeChip, setActiveChip] = useState<'All' | 'Workflows' | 'Edit PDF' | 'PDF Security' | 'PDF Intelligence'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const chips: ('All' | 'Workflows' | 'Edit PDF' | 'PDF Security' | 'PDF Intelligence')[] = [
    'All', 'Workflows', 'Edit PDF', 'PDF Security', 'PDF Intelligence'
  ];

  const filteredTools = PDF_TOOLS.filter((tool) => {
    const matchesChip = activeChip === 'All' || tool.categoryChip === activeChip;
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChip && matchesSearch;
  });

  const faqs = [
    { q: 'Is PDFMaster Pro free to use?', a: 'Yes! PDFMaster Pro provides essential PDF tools completely free with generous daily limits. For power users and teams, Pro and Enterprise plans offer unlimited access, API keys, and AI features.' },
    { q: 'Are my files kept safe and private?', a: 'Absolute privacy is guaranteed. All operations process locally in your browser when possible or run through encrypted 256-bit transient memory pipelines that permanently delete files immediately after download.' },
    { q: 'Can I process multiple PDF files in batch mode?', a: 'Yes, PDFMaster Pro supports multi-file drag and drop queues for merging, batch compressing, and bulk conversion.' },
    { q: 'Does PDFMaster Pro include developer API integration?', a: 'Yes! Generated API tokens in your User Dashboard allow seamless integration with Node.js, Python, or curl endpoints.' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0F172A]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-24 overflow-hidden">
        {/* Glowing background mesh */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-amber-400/20 via-yellow-500/20 to-amber-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-600 dark:text-amber-400 font-extrabold text-xs shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> Premium Yellow SaaS PDF & AI Suite
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Every tool you need to work with <br />
            <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              PDFs in one place
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Every tool you need to use PDFs, at your fingertips. Merge, split, compress, convert, rotate, unlock, watermark and AI summarize PDFs with just a few clicks.
          </p>

          {/* Search Input Bar */}
          <div className="max-w-xl mx-auto pt-4">
            <div className="relative glass-card rounded-2xl p-2 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center">
              <Search className="w-5 h-5 text-purple-600 dark:text-purple-400 ml-3 mr-2" />
              <input
                type="text"
                placeholder="Search PDF tools (e.g. Merge, Compress, AI Summary)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none py-2"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-3 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Chips Filtering */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {chips.map((chip) => (
              <button
                key={chip}
                onClick={() => setActiveChip(chip)}
                className={`px-5 py-2 rounded-2xl text-xs font-extrabold transition-all duration-200 ${
                  activeChip === chip
                    ? 'bg-slate-900 text-white dark:bg-purple-600 dark:text-white shadow-lg shadow-purple-500/20 scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* PDF Tools Grid Section */}
      <section className="py-12 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              {activeChip === 'All' ? 'All PDF Tools' : activeChip}
            </h2>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/80 px-3 py-1 rounded-xl">
              Showing {filteredTools.length} Tools
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <PDFToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Work Your Way Section (Directly from user's image reference) */}
      <section className="py-20 bg-white dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              Work your way
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Access PDFMaster Pro on web, desktop, and mobile devices anytime, anywhere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Work on Web / Desktop Card */}
            <div className="p-8 rounded-3xl bg-amber-50/60 dark:bg-[#161B22] border border-amber-200/80 dark:border-slate-800 space-y-6 flex flex-col justify-between group hover:shadow-xl transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-400/30">
                  <Monitor className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">PDFMaster Desktop App</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Process heavy PDF files completely offline with maximal speed and confidentiality on Windows & Mac.
                </p>
              </div>
              <Link href="/tools" className="inline-flex items-center gap-2 text-xs font-extrabold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
                Download Desktop App <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile App Card */}
            <div className="p-8 rounded-3xl bg-amber-50/60 dark:bg-[#161B22] border border-amber-200/80 dark:border-slate-800 space-y-6 flex flex-col justify-between group hover:shadow-xl transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-400/30">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">PDFMaster Mobile Scanner</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Turn your phone camera into a mobile scanner and sign contracts directly on the go.
                </p>
              </div>
              <Link href="/tools/scan-pdf" className="inline-flex items-center gap-2 text-xs font-extrabold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
                Try Mobile Scan <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Web & Rest API */}
            <div className="p-8 rounded-3xl bg-amber-400/10 dark:bg-[#161B22] border-2 border-amber-400/60 dark:border-amber-400/40 space-y-6 flex flex-col justify-between group hover:shadow-xl transition-all shadow-amber-400/10">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center shadow-md shadow-amber-400/20">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">Developer REST API</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Integrate automated PDF conversion microservices into your app via API keys generated in your dashboard.
                </p>
              </div>
              <Link href="/dashboard/api-keys" className="inline-flex items-center gap-2 text-xs font-black text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
                Get API Keys <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Get More with Premium Banner (Directly matching user image reference!) */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-amber-100 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-4 max-w-2xl text-center md:text-left">
              <h2 className="text-2xl sm:text-4xl font-black text-amber-950 dark:text-amber-200">
                Get more with Premium
              </h2>
              <div className="space-y-2 text-xs sm:text-sm text-amber-900/80 dark:text-amber-300">
                <p className="flex items-center gap-2 justify-center md:justify-start">
                  <Check className="w-4 h-4 text-amber-600 font-bold" /> Complete access to all 30+ PDF tools without limitations
                </p>
                <p className="flex items-center gap-2 justify-center md:justify-start">
                  <Check className="w-4 h-4 text-amber-600 font-bold" /> Multi-file batch processing and unrestricted file size limit
                </p>
                <p className="flex items-center gap-2 justify-center md:justify-start">
                  <Check className="w-4 h-4 text-amber-600 font-bold" /> Neural AI PDF Summarizer & OCR document reader
                </p>
              </div>
            </div>

            <div>
              <Link
                href="/pricing"
                className="px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/30 transition-all inline-block whitespace-nowrap"
              >
                ⚡ Get Premium Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges & Metrics (Directly matching user image reference!) */}
      <section className="py-16 bg-white dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              The PDF app trusted by millions of users
            </h2>
            <p className="text-xs text-slate-500">
              PDFMaster Pro is your default software to edit, convert, compress and AI summarize documents.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-3xl font-black text-amber-500">10M+</span>
              <p className="text-xs font-semibold text-slate-500 mt-1">Files Processed</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-3xl font-black text-amber-500">99.9%</span>
              <p className="text-xs font-semibold text-slate-500 mt-1">Uptime SLA</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-3xl font-black text-amber-500">256-Bit</span>
              <p className="text-xs font-semibold text-slate-500 mt-1">AES Security</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-3xl font-black text-amber-500">4.9/5</span>
              <p className="text-xs font-semibold text-slate-500 mt-1">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-[#12161A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/30 uppercase tracking-widest">
              PRICING PLANS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black">Simple, Transparent Pricing</h2>
            <p className="text-xs sm:text-sm text-slate-400">Choose the perfect plan for personal tasks or team operations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Free */}
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white">Free Explorer</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black">$0</span>
                <span className="text-xs text-slate-400">/ forever</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Access to 30+ PDF tools</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> 10 daily tasks</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> 500 MB cloud storage</li>
              </ul>
              <Link href="/auth/signup" className="block text-center w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 font-bold text-xs">
                Get Started Free
              </Link>
            </div>

            {/* Pro */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-amber-400/20 to-slate-900 border-2 border-amber-400 space-y-6 relative shadow-2xl shadow-amber-400/10">
              <span className="absolute -top-3 right-6 text-[10px] font-black px-3 py-1 rounded-full bg-amber-400 text-slate-900 uppercase">MOST POPULAR</span>
              <h3 className="text-xl font-bold text-white">Pro Professional</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black">$9.99</span>
                <span className="text-xs text-amber-400">/ month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-200 font-semibold">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Unlimited task execution</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> 10 GB cloud storage</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Neural AI PDF Summary & Chat</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Priority Processing Queue</li>
              </ul>
              <Link href="/pricing" className="block text-center w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 font-bold text-xs shadow-lg">
                Upgrade to Pro
              </Link>
            </div>

            {/* Enterprise */}
            <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700 space-y-6">
              <h3 className="text-xl font-bold text-white">Enterprise Team</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black">$29.99</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> All Pro features included</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> 100 GB Cloud Storage</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Developer REST API Key Access</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Custom branding & SLA support</li>
              </ul>
              <Link href="/contact" className="block text-center w-full py-3 rounded-2xl bg-slate-700 hover:bg-slate-600 font-bold text-xs">
                Contact Sales
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-500">Everything you need to know about PDFMaster Pro.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left p-5 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 dark:text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-purple-600 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
