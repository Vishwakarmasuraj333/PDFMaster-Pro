"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, FolderKanban, History, Database, 
  CreditCard, Key, Settings, Sparkles, LogOut, ArrowLeft
} from 'lucide-react';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Files', href: '/dashboard/files', icon: FolderKanban },
    { label: 'PDF History', href: '/dashboard/history', icon: History },
    { label: 'Subscription', href: '/dashboard/subscription', icon: CreditCard },
    { label: 'API Keys', href: '/dashboard/api-keys', icon: Key },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('pdfmaster_auth_email');
    sessionStorage.removeItem('pdfmaster_otp_demo');
    router.push('/auth/login');
  };

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between h-screen sticky top-0 p-5">
      <div className="space-y-6">
        
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-base text-slate-900 dark:text-white">
              PDFMaster<span className="text-purple-600">Pro</span>
            </span>
            <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">User Dashboard</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

      </div>

      {/* Storage Widget & Logout */}
      <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        
        {/* Storage Usage Progress */}
        <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300">
            <span>Storage Used</span>
            <span className="text-purple-600 dark:text-purple-400">1.25 GB / 10 GB</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-purple-200 dark:bg-purple-900 overflow-hidden">
            <div className="h-full bg-purple-600 w-[12.5%]" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-purple-600 dark:hover:text-purple-400"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return Home
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 px-2.5 py-1.5 rounded-xl transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
