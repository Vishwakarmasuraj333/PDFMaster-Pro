"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowLeft, Mail, KeyRound, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-purple-600 dark:hover:text-purple-400"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>

        <div className="glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-purple-400 text-white mx-auto flex items-center justify-center shadow-lg shadow-purple-500/20">
              <KeyRound className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-2">Forgot Password</h2>
            <p className="text-xs text-slate-500">Enter your registered email to receive an OTP verification code.</p>
          </div>

          {submitted ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold">
                OTP code sent to <span className="font-extrabold text-purple-600">{email}</span>. Please check your inbox.
              </p>
              <Link
                href="/auth/verify-otp"
                className="block w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs text-center shadow-lg shadow-purple-500/25"
              >
                Enter OTP Code →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-lg shadow-purple-500/25 transition-all"
              >
                {loading ? 'Sending Code...' : 'Send OTP Verification Code'}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
