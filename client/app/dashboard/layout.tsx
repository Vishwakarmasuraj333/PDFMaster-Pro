"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '../../components/dashboard-sidebar';
import { Loader2, ShieldAlert, LogIn, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const authEmail = sessionStorage.getItem('pdfmaster_auth_email');
    const isOwner = authEmail && (
      authEmail.includes('suraj') || 
      authEmail.includes('itxsuraj') || 
      authEmail.includes('admin')
    );

    if (!authEmail || !isOwner) {
      setAuthorized(false);
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (authorized === null) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto" />
          <p className="text-xs font-bold text-slate-500">Verifying Private Owner Workspace Access...</p>
        </div>
      </div>
    );
  }

  if (authorized === false) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-3xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 mx-auto flex items-center justify-center shadow-lg">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-black px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 uppercase tracking-widest">
              PRIVATE OWNER WORKSPACE
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-2">Access Restricted</h2>
            <p className="text-xs text-slate-500">
              This dashboard workspace is private to account owner (<strong className="text-purple-600">Suraj Vishwakarma</strong>). Public guests use PDF Tools directly.
            </p>
          </div>
          <div className="space-y-3 pt-2">
            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-lg shadow-purple-500/25 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Go to PDF Tools
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors"
            >
              <LogIn className="w-4 h-4" /> Owner Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#0F172A]">
      <DashboardSidebar />
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
