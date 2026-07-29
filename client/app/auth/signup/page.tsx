"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Lock, User, UserPlus, Loader2, AlertCircle, Eye, EyeOff, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Dynamic Password Strength Meter
  const getPasswordStrength = () => {
    if (!password) return { label: '', score: 0, color: '' };
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 10) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) return { label: 'Weak', score: 33, color: 'bg-red-500' };
    if (score <= 4) return { label: 'Fair', score: 66, color: 'bg-amber-400' };
    return { label: 'Strong', score: 100, color: 'bg-emerald-400' };
  };

  const strength = getPasswordStrength();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    if (!termsAccepted) {
      setErrorMessage('Please accept the Terms of Service to create an account.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your password.');
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
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Registration failed.');
      }

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('pdfmaster_auth_email', email.trim());
      }

      // Clear fields
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      window.location.href = '/auth/verify-otp?method=registration';
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to create account.');
      setPassword('');
      setConfirmPassword('');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'Google' | 'GitHub') => {
    setLoading(true);
    setErrorMessage(null);
    if (provider === 'Google') {
      window.location.href = '/api/auth/google';
    } else {
      window.location.href = '/api/auth/github';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F14] via-[#12161A] to-[#161B22] text-slate-100 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-amber-400/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Branding Panel (Desktop) */}
        <div className="hidden lg:flex lg:col-span-6 flex-col justify-between space-y-8 pr-6">
          <div className="space-y-6">
            
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 p-0.5 shadow-xl shadow-amber-400/25 group-hover:scale-105 transition-transform overflow-hidden">
                <img src="/vs-brand-logo.png" alt="VS Brand Logo" className="w-full h-full object-cover rounded-[14px]" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white">
                  PDFMaster<span className="text-amber-400">Pro</span>
                </span>
                <span className="block text-[10px] font-extrabold text-amber-400 uppercase tracking-widest">
                  Enterprise PDF Workspace
                </span>
              </div>
            </Link>

            <div className="space-y-3">
              <h1 className="text-3xl font-black text-white leading-tight">
                Create Your Free Enterprise PDF Account
              </h1>
              <p className="text-xs text-slate-400 leading-relaxed max-w-md">
                Get instant access to 30+ PDF tools, AI document intelligence, 256-bit AES protection, and encrypted cloud storage.
              </p>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-800">
              {[
                { title: 'Free Workspace Access', desc: 'Merge, split, compress, and edit PDFs with zero limits' },
                { title: 'AI PDF Summarizer & Chat', desc: 'Neural AI contract briefing and factual extraction' },
                { title: 'AES-256 PDF Encryption', desc: 'Protect sensitive files with high-resolution security' },
                { title: '100% Private & Secure', desc: 'Encrypted storage with automatic file clean-up' },
              ].map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-xl bg-amber-400/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/25 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-white">{feat.title}</h4>
                    <p className="text-[11px] font-medium text-slate-400">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs font-semibold text-slate-400 flex items-center justify-between">
            <span>Enterprise SaaS Identity</span>
            <span className="text-amber-400 font-extrabold">By Suraj Vishwakarma</span>
          </div>
        </div>

        {/* Right Glassmorphism Card */}
        <div className="lg:col-span-6 w-full max-w-md mx-auto">
          
          <div className="mb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Home
            </Link>
          </div>

          <div className="glass-card rounded-3xl p-8 border border-amber-400/25 shadow-2xl shadow-amber-400/10 space-y-6 bg-[#161B22]/85 backdrop-blur-xl relative">
            
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-amber-400 p-0.5 mx-auto shadow-xl shadow-amber-400/25 overflow-hidden">
                <img src="/vs-brand-logo.png" alt="VS Brand Logo" className="w-full h-full object-cover rounded-[14px]" />
              </div>
              <h2 className="text-2xl font-black text-white pt-1 tracking-tight">Create Account</h2>
              <p className="text-xs font-medium text-slate-400">Join PDFMaster Pro for free</p>
            </div>

            {errorMessage && (
              <div className="p-4 rounded-2xl bg-red-950/80 border border-red-800 text-red-300 text-xs font-bold flex items-center gap-2.5 shadow-lg">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold text-slate-300">Full Name</label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-white focus:outline-none focus:border-amber-400 transition-colors disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold text-slate-300">Email Address</label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-white focus:outline-none focus:border-amber-400 transition-colors disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold text-slate-300">Password</label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Minimum 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-11 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-white focus:outline-none focus:border-amber-400 transition-colors disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-2 text-slate-400 hover:text-amber-400 absolute right-2 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Meter */}
                {password && (
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="text-slate-400">Strength:</span>
                      <span className={strength.label === 'Strong' ? 'text-emerald-400' : strength.label === 'Fair' ? 'text-amber-400' : 'text-red-400'}>
                        {strength.label}
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className={`h-full ${strength.color} transition-all duration-300`} style={{ width: `${strength.score}%` }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold text-slate-300">Confirm Password</label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="Re-type your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-11 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-white focus:outline-none focus:border-amber-400 transition-colors disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="p-2 text-slate-400 hover:text-amber-400 absolute right-2 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    disabled={loading}
                    className="w-4 h-4 rounded text-amber-400 focus:ring-amber-400 border-slate-700 bg-slate-900"
                  />
                  <span className="text-[11px] text-slate-400 font-semibold">
                    I accept the{' '}
                    <Link href="/terms" className="text-amber-400 hover:underline">Terms of Service</Link>{' '}
                    & <Link href="/privacy" className="text-amber-400 hover:underline">Privacy Policy</Link>
                  </span>
                </label>
              </div>

              {/* Primary Yellow Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-xs shadow-lg shadow-amber-400/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" /> Create Free Account
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-800 w-full" />
              <span className="bg-[#161B22] px-3 text-[10px] font-black uppercase text-slate-400 absolute tracking-wider">
                Or continue with
              </span>
            </div>

            {/* Social OAuth Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                disabled={loading}
                className="py-3 px-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-xs font-bold text-white transition-all flex items-center justify-center gap-2 shadow-sm hover:border-amber-400/40 disabled:opacity-50 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Continue with Google
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('GitHub')}
                disabled={loading}
                className="py-3 px-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-xs font-bold text-white transition-all flex items-center justify-center gap-2 shadow-sm hover:border-amber-400/40 disabled:opacity-50 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Continue with GitHub
              </button>
            </div>

            <p className="text-center text-xs text-slate-400">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-amber-400 font-extrabold hover:underline">
                Log in
              </Link>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}
