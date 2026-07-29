"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { KeyRound, Lock, CheckCircle2, Loader2, AlertCircle, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = sessionStorage.getItem('pdfmaster_auth_email');
      const savedOtp = sessionStorage.getItem('pdfmaster_verified_otp');
      if (savedEmail) setEmail(savedEmail);
      if (savedOtp) setOtp(savedOtp);
    }
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (!password || !confirmPassword) {
      setErrorMessage('Please fill in both password fields.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setConfirmPassword('');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      setPassword('');
      setConfirmPassword('');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword: password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to reset password.');
      }

      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('pdfmaster_verified_otp');
      }

      setPassword('');
      setConfirmPassword('');
      router.push('/auth/login?reset=success');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to reset password.');
      setPassword('');
      setConfirmPassword('');
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
            <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-2">Set New Password</h2>
            <p className="text-xs text-slate-500">Create a secure new password for account {email || ''}</p>
          </div>

          {errorMessage && (
            <div className="p-4 rounded-2xl bg-red-100 dark:bg-red-950/80 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleReset} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">New Password</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full pl-9 pr-10 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1.5 text-slate-400 hover:text-amber-500 absolute right-2.5 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Confirm New Password</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  className="w-full pl-9 pr-10 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="p-1.5 text-slate-400 hover:text-amber-500 absolute right-2.5 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-slate-900 font-extrabold text-xs shadow-lg shadow-amber-400/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Hashing & Updating Password...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Reset Password & Login
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
