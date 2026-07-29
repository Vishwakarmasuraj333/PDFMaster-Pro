"use client";

import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin-sidebar';
import { Loader2, Lock, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string>('USER');

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          const lowerEmail = data.user.email ? data.user.email.toLowerCase().trim() : '';
          const isSuperAdmin = data.user.role === 'ADMIN' || 
            lowerEmail.includes('suraj') || 
            lowerEmail === 'itsurya9930@gmail.com' || 
            lowerEmail === 'itxsurajofficial@gmail.com' ||
            lowerEmail === 'suraj@pdfmasterpro.com';
          
          const isCoOperator = data.user.role === 'STAFF' || 
            lowerEmail.includes('mamta') || 
            lowerEmail === 'mamtaydvtech1@gmail.com' || 
            lowerEmail === 'mamtayadav@pdfmasterpro.com';

          if (isSuperAdmin || isCoOperator) {
            setAuthorized(true);
            setUserRole(isSuperAdmin ? 'ADMIN' : 'CO_OPERATOR');
          } else {
            setAuthorized(false);
          }
        } else {
          setAuthorized(false);
        }
      })
      .catch(() => {
        setAuthorized(false);
      });
  }, []);

  if (authorized === null) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-amber-400 mx-auto" />
          <p className="text-xs font-bold text-slate-400">Verifying Administrator & Team Privileges...</p>
        </div>
      </div>
    );
  }

  if (authorized === false) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-3xl bg-red-950/80 text-red-400 mx-auto flex items-center justify-center shadow-lg border border-red-800/40">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-black px-3 py-1 rounded-full bg-red-950 text-red-400 border border-red-800 uppercase tracking-widest">
              403 FORBIDDEN
            </span>
            <h2 className="text-2xl font-black text-white pt-2">Unauthorized Access</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Access restricted. Only authorized Super Administrators and designated Co-Operators can view the management portal.
            </p>
          </div>
          <Link
            href="/auth/login?redirect=/admin"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-xs transition-all shadow-lg shadow-amber-400/20"
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
