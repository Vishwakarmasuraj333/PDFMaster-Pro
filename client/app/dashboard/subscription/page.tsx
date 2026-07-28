"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Layers, Check, Sparkles, CreditCard, Download, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function SubscriptionPage() {
  const [activePlan, setActivePlan] = useState<'Free' | 'Pro' | 'Enterprise'>('Pro');
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSimulateCheckout = (planName: 'Pro' | 'Enterprise') => {
    setIsUpgrading(true);
    setTimeout(() => {
      setIsUpgrading(false);
      setActivePlan(planName);
      setPaymentSuccess(true);
      setTimeout(() => setPaymentSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto text-slate-900 dark:text-slate-100">
      
      {/* Header */}
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-6">
        <span className="text-[10px] font-black px-3 py-1 rounded-full bg-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-400/30 uppercase tracking-widest">
          BILLING & SUBSCRIPTION
        </span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-7 h-7 text-amber-500" /> Active Membership & Invoices
        </h1>
        <p className="text-xs text-slate-500">Manage your active SaaS plan, payment gateways, and download verified receipts.</p>
      </div>

      {paymentSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold flex items-center gap-2 animate-bounce shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Payment verified! Your account has been upgraded to {activePlan} Plan.
        </div>
      )}

      {/* Active Plan Card */}
      <div className="glass-card rounded-3xl p-8 border-2 border-amber-400 bg-gradient-to-r from-amber-400/10 via-amber-400/5 to-transparent space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black px-3 py-1 rounded-full bg-amber-400 text-slate-900 uppercase tracking-wider shadow-sm">
              CURRENT ACTIVE PLAN
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-2 flex items-center gap-2">
              {activePlan} Plan {activePlan !== 'Free' && <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400/20" />}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {activePlan === 'Pro' ? 'Unlimited task execution, Neural AI Summary & Chat, 10 GB Storage.' : activePlan === 'Enterprise' ? '100 GB Cloud Storage, Developer REST API Keys & SLA.' : '10 daily tasks, 500 MB cloud storage.'}
            </p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              {activePlan === 'Pro' ? '$9.99' : activePlan === 'Enterprise' ? '$29.99' : '$0'}
            </span>
            <span className="text-xs text-slate-400">/ month</span>
          </div>
        </div>

        <div className="pt-4 border-t border-amber-400/30 flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
          <span className="font-bold text-slate-600 dark:text-slate-300">
            Next renewal date: <strong className="text-amber-500 font-extrabold">August 28, 2026</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSimulateCheckout(activePlan === 'Pro' ? 'Enterprise' : 'Pro')}
              disabled={isUpgrading}
              className="px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-xs shadow-md shadow-amber-400/20 transition-all flex items-center gap-1.5"
            >
              <CreditCard className="w-4 h-4" /> {isUpgrading ? 'Processing Checkout...' : `Switch to ${activePlan === 'Pro' ? 'Enterprise ($29.99)' : 'Pro ($9.99)'}`}
            </button>
          </div>
        </div>
      </div>

      {/* Payment Gateway Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Stripe / Razorpay Integration
            </h4>
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">VERIFIED</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            All payments are processed securely via SSL-encrypted webhooks. Cancel or downgrade anytime without extra fees.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-amber-500" /> Tax & PDF Invoices
            </h4>
            <Link href="/dashboard/invoices" className="text-xs font-bold text-amber-500 hover:underline flex items-center gap-1">
              View History <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Automated PDF receipts and tax breakdown receipts sent directly to your registered account email after payment.
          </p>
        </div>
      </div>

    </div>
  );
}
