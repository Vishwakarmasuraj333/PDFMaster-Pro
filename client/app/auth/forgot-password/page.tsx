"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { KeyRound, ArrowLeft, Mail, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (!email) {
      setErrorMessage('Please enter your email address.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to send password reset code.');
      }

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('pdfmaster_auth_email', email.trim());
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to send password reset code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#12161A] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-amber-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Login
        </Link>

        <div className="glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 bg-white dark:bg-slate-900">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-900 mx-auto flex items-center justify-center shadow-lg shadow-amber-400/20">
              <KeyRound className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-2">Forgot Password</h2>
            <p className="text-xs text-slate-500">Enter your registered email address to receive a security OTP code.</p>
          </div>

          {errorMessage && (
            <div className="p-4 rounded-2xl bg-red-100 dark:bg-red-950/80 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {submitted ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold">
                6-digit OTP code sent to <span className="font-extrabold text-amber-500">{email}</span>. Please check your inbox.
              </p>
              <Link
                href="/auth/verify-otp?method=reset"
                className="block w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-xs text-center shadow-lg shadow-amber-400/20 transition-all"
              >
                Enter OTP Verification Code →
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
                    disabled={loading}
                    className="w-full pl-9 pr-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 disabled:opacity-50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-slate-900 font-extrabold text-xs shadow-lg shadow-amber-400/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending Security Code...
                  </>
                ) : (
                  'Send OTP Reset Code'
                )}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
