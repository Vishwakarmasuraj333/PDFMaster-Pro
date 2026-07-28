"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '../../components/admin-sidebar';
import { Loader2, ShieldAlert, LogIn, Lock } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const authEmail = sessionStorage.getItem('pdfmaster_auth_email');
    if (!authEmail || (!authEmail.includes('admin') && !authEmail.includes('suraj'))) {
      setAuthorized(false);
    } else {
      setAuthorized(true);
    }
  }, []);

  if (authorized === null) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mx-auto" />
          <p className="text-xs font-bold text-slate-400">Verifying Admin Role Credentials...</p>
        </div>
      </div>
    );
  }

  if (authorized === false) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-3xl bg-red-950/80 text-red-400 mx-auto flex items-center justify-center shadow-lg">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-black px-3 py-1 rounded-full bg-red-950 text-red-400 border border-red-800 uppercase tracking-widest">
              403 FORBIDDEN
            </span>
            <h2 className="text-2xl font-black text-white pt-2">403 Unauthorized Access</h2>
            <p className="text-xs text-slate-400">
              Access restricted. Only authenticated administrator accounts (`suraj@pdfmasterpro.com` / `admin`) can view system metrics and user roles.
            </p>
          </div>
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs transition-all shadow-lg shadow-indigo-500/20"
          >
            <LogIn className="w-4 h-4" /> Admin Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      <AdminSidebar />
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
