"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShieldCheck, ArrowLeft, Key, CheckCircle2 } from 'lucide-react';

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const method = searchParams.get('method') || 'Authentication';

  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('suraj@pdfmasterpro.com');

  useEffect(() => {
    const savedEmail = sessionStorage.getItem('pdfmaster_auth_email');
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleChange = (val: string, idx: number) => {
    if (val.length > 1) return;
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email.includes('admin')) {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
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

        <div className="glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 text-center">
          
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-purple-400 text-white mx-auto flex items-center justify-center shadow-lg shadow-purple-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">OTP Verification</h2>
            <p className="text-xs text-slate-500">
              {method} Security Verification for <span className="font-bold text-purple-600 dark:text-purple-400">{email}</span>
            </p>
          </div>

          {/* Banner with OTP code */}
          <div className="p-3.5 rounded-2xl bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-extrabold flex items-center justify-between">
            <span>🔑 Verification OTP Code:</span>
            <span className="font-mono text-base tracking-widest text-purple-600 dark:text-purple-400">123456</span>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, idx)}
                  className="w-11 h-12 text-center text-lg font-black rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-extrabold text-xs shadow-xl shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> {loading ? 'Authenticating Token...' : 'Verify OTP & Login'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
