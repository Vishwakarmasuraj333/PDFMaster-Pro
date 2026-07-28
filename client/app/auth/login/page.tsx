"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowLeft, Mail, Lock, LogIn, KeyRound } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Route through OTP verification for 2FA security
      sessionStorage.setItem('pdfmaster_auth_email', email);
      sessionStorage.setItem('pdfmaster_otp_demo', '123456');
      router.push('/auth/verify-otp?method=credentials');
    }, 600);
  };

  const handleSocialLogin = (provider: 'Google' | 'GitHub') => {
    setLoading(true);
    setAuthMethod(provider);
    setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('pdfmaster_auth_email', `${provider.toLowerCase()}user@pdfmasterpro.com`);
      sessionStorage.setItem('pdfmaster_otp_demo', '123456');
      router.push(`/auth/verify-otp?method=${provider}`);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-purple-600 dark:hover:text-purple-400"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Home
        </Link>

        <div className="glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-purple-400 text-white mx-auto flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-2">Welcome Back</h2>
            <p className="text-xs text-slate-500">Sign in with Google, GitHub, or Email OTP</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
                <Link href="/auth/forgot-password" className="text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" /> {loading ? 'Signing in...' : 'Sign In with OTP Verification'}
            </button>
          </form>

          {/* Social Logins */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-wider">Or continue with</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('GitHub')}
                className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                <span>GitHub</span>
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-slate-500">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="font-bold text-purple-600 dark:text-purple-400 hover:underline">
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
