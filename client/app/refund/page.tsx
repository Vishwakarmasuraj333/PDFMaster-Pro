"use client";

import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

export default function RefundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0F172A]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 w-full">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Refund Policy</h1>

        <div className="glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            We offer a 14-day money-back guarantee for all paid subscriptions (Pro & Enterprise). If you are dissatisfied for any reason, contact our support team for a full refund.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
