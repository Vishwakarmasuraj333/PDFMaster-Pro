"use client";

import React from 'react';
import Link from 'next/link';
import { Layers, Check, Sparkles, CreditCard } from 'lucide-react';

export default function SubscriptionPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-6 h-6 text-purple-600" /> Subscription & Plan
        </h1>
        <p className="text-xs text-slate-500">Manage your active subscription billing plan and usage limits.</p>
      </div>

      {/* Active Plan Card */}
      <div className="glass-card rounded-3xl p-8 border-2 border-purple-500 bg-gradient-to-r from-purple-900/40 via-purple-600/10 to-transparent space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-purple-600 text-white uppercase tracking-wider">
              CURRENT PLAN
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-2">Pro Professional</h2>
            <p className="text-xs text-slate-400 mt-1">Unlimited PDF tasks, Neural AI Summarizer & 10 GB Storage.</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-slate-900 dark:text-white">$9.99</span>
            <span className="text-xs text-slate-400">/ month</span>
          </div>
        </div>

        <div className="pt-4 border-t border-purple-200 dark:border-purple-900/60 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700 dark:text-slate-300">Renews on August 28, 2026</span>
          <Link href="/pricing" className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold">
            Change Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
