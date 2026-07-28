"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShieldCheck, ArrowLeft, CheckCircle2, RotateCw, Sparkles } from 'lucide-react';

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const method = searchParams.get('method') || 'Authentication';

  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('itxsurajofficial@gmail.com');
  const [countdown, setCountdown] = useState(60);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const savedEmail = sessionStorage.getItem('pdfmaster_auth_email');
    if (savedEmail) setEmail(savedEmail);

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (val: string, idx: number) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[idx] = val.slice(-1);
    setOtp(newOtp);

    if (val && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted) {
      const newOtp = pasted.split('');
      while (newOtp.length < 6) newOtp.push('');
      setOtp(newOtp);
      inputRefs.current[Math.min(pasted.length, 5)]?.focus();
    }
  };

  const handleResend = () => {
    if (countdown > 0) return;
    setCountdown(60);
    sessionStorage.setItem('pdfmaster_otp_demo', '123456');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerifiedSuccess(true);
      setTimeout(() => {
        if (email.includes('admin')) {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      }, 800);
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
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Email OTP Verification</h2>
            <p className="text-xs text-slate-500">
              {method} Security Verification code sent to <br />
              <span className="font-extrabold text-purple-600 dark:text-purple-400">{email}</span>
            </p>
          </div>

          {verifiedSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold flex items-center justify-center gap-2 animate-bounce">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> OTP Verified! Redirecting to Workspace...
            </div>
          )}

          {/* OTP Code Display Banner */}
          <div className="p-3.5 rounded-2xl bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-extrabold flex items-center justify-between">
            <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-purple-600" /> Verification Code:</span>
            <span className="font-mono text-base tracking-widest text-purple-600 dark:text-purple-400">123456</span>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    if (el) inputRefs.current[idx] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onPaste={handlePaste}
                  className="w-11 h-12 text-center text-lg font-black rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 shadow-inner"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || verifiedSuccess}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-extrabold text-xs shadow-xl shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> {loading ? 'Authenticating Credentials...' : 'Verify OTP & Log In'}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
            {countdown > 0 ? (
              <span className="text-slate-400 font-medium">Resend OTP Code in <strong className="text-purple-600">{countdown}s</strong></span>
            ) : (
              <button
                onClick={handleResend}
                className="font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center justify-center gap-1.5 mx-auto"
              >
                <RotateCw className="w-3.5 h-3.5" /> Resend OTP Code
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
