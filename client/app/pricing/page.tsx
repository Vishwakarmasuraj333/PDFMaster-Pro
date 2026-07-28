"use client";

import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { Check, Sparkles, Zap, Shield, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0F172A]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 font-extrabold text-xs inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Simple & Transparent Pricing
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            Unlock Full PDF Power
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Choose the plan that fits your personal workflow or enterprise team size. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-bold ${billingCycle === 'monthly' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-500'}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="w-14 h-8 rounded-full bg-purple-600 p-1 flex items-center transition-colors relative"
            >
              <div
                className={`w-6 h-6 rounded-full bg-white transition-transform ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'}`}
              />
            </button>
            <span className={`text-xs font-bold flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-500'}`}>
              Yearly Billing <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-extrabold">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          
          {/* Free Explorer */}
          <div className="glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Free Explorer</h3>
              <p className="text-xs text-slate-500">Perfect for occasional file conversions and quick edits.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900 dark:text-white">$0</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <ul className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> Access to 30+ PDF tools</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> Up to 10 daily tasks</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> 15 MB file size limit</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> Standard web queue</li>
              </ul>
            </div>
            <Link
              href="/auth/signup"
              className="block text-center w-full py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs transition-colors"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro Professional */}
          <div className="glass-card rounded-3xl p-8 border-2 border-purple-500 bg-gradient-to-b from-purple-50/80 to-white dark:from-purple-950/40 dark:to-slate-900 space-y-6 flex flex-col justify-between relative shadow-2xl shadow-purple-500/20">
            <span className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-purple-600 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-md">
              POPULAR CHOICE
            </span>
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Pro Professional</h3>
              <p className="text-xs text-slate-500">For power users, freelancers, and document powerhouses.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900 dark:text-white">
                  {billingCycle === 'monthly' ? '$9.99' : '$7.99'}
                </span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <ul className="space-y-3 pt-4 border-t border-purple-200 dark:border-purple-900 text-xs text-slate-800 dark:text-slate-200">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> Unlimited daily task executions</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> Multi-file batch processing queue</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> Neural AI PDF Summarizer & OCR</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> 10 GB Secure Cloud Storage</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> Priority fast-track server queue</li>
              </ul>
            </div>
            <Link
              href="/dashboard/subscription"
              className="block text-center w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs shadow-xl shadow-purple-500/30 transition-all"
            >
              Upgrade to Pro
            </Link>
          </div>

          {/* Enterprise Team */}
          <div className="glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Enterprise Team</h3>
              <p className="text-xs text-slate-500">For agencies, law firms, and high-volume REST API apps.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900 dark:text-white">
                  {billingCycle === 'monthly' ? '$29.99' : '$23.99'}
                </span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <ul className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> All Pro features included</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> Developer REST API Key Access</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> 100 GB Dedicated Cloud Storage</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> Custom branding & SLA guarantee</li>
              </ul>
            </div>
            <Link
              href="/contact"
              className="block text-center w-full py-3.5 rounded-2xl bg-slate-900 dark:bg-purple-950 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
            >
              Contact Sales Team
            </Link>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
