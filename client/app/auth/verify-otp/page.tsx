"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShieldCheck, ArrowLeft, CheckCircle2, RotateCw, Sparkles, Loader2 } from 'lucide-react';

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const method = searchParams.get('method') || 'Authentication';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [countdown, setCountdown] = useState(300); // 5 minutes expiry
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = sessionStorage.getItem('pdfmaster_auth_email');
      if (savedEmail) setEmail(savedEmail);
    }

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
    if (pasted.length === 6) {
      setOtp(pasted.split(''));
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      setErrorMessage('Please enter a valid 6-digit OTP code.');
      setLoading(false);
      return;
    }

    try {
      // Call native Vercel serverless Route Handler
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: enteredOtp }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid or expired OTP code.');
      }

      // Successful verification
      setVerifiedSuccess(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('pdfmaster_auth_email', email);
      }

      setTimeout(() => {
        const redirectTarget = searchParams.get('redirect');
        if (redirectTarget) {
          router.push(redirectTarget);
        } else {
          router.push('/tools'); // Return directly to PDF tools per spec
        }
      }, 600);
    } catch (err: any) {
      setErrorMessage(err.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setCountdown(300);
    setErrorMessage(null);
    setOtp(['', '', '', '', '', '']);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch (e) {
      // Ignore background resend network log
    }
  };

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#12161A] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-amber-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>

        <div className="glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-500 mx-auto flex items-center justify-center shadow-lg border border-amber-400/30">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">6-Digit Email Verification</h2>
            <p className="text-xs text-slate-500">
              Enter the 6-digit security code sent to
              <br />
              <strong className="text-amber-500 font-bold">{email || 'your email address'}</strong>
            </p>
          </div>

          {verifiedSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold flex items-center justify-center gap-2 animate-bounce">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> OTP Verified! Loading PDF Tools...
            </div>
          )}

          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-red-100 dark:bg-red-950/80 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-bold text-center">
              ⚠️ {errorMessage}
            </div>
          )}

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
                  className="w-11 h-12 text-center text-lg font-black rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 shadow-inner"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || otp.join('').length < 6}
              className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-slate-900 font-extrabold text-xs shadow-xl shadow-amber-400/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" /> Verifying OTP Code...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Verify OTP & Start Using Tools
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            {countdown > 0 ? (
              <p className="text-xs text-slate-400 font-medium">
                OTP Code Expires In <span className="text-amber-500 font-bold">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
              </p>
            ) : (
              <button
                onClick={handleResendOtp}
                className="text-xs font-extrabold text-amber-500 hover:underline flex items-center gap-1 mx-auto"
              >
                <RotateCw className="w-3.5 h-3.5" /> Resend New OTP Code
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#12161A] flex items-center justify-center p-4">
        <Loader2 className="w-8 h-8 animate-spin text-amber-400 mx-auto" />
      </div>
    }>
      <VerifyOtpContent />
    </Suspense>
  );
}
