"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldAlert, Users, Layers, Terminal, Sliders, 
  ArrowLeft
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const adminNav = [
    { label: 'System Overview', href: '/admin', icon: ShieldAlert },
    { label: 'User Management', href: '/admin/users', icon: Users },
    { label: 'Subscriptions & Revenue', href: '/admin/plans', icon: Layers },
    { label: 'System & Security Logs', href: '/admin/logs', icon: Terminal },
    { label: 'Platform & API Settings', href: '/admin/settings', icon: Sliders },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-[#12161A] text-slate-100 flex flex-col justify-between h-screen sticky top-0 p-5">
      <div className="space-y-6">
        
        {/* Brand with VS Logo */}
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-400 p-0.5 shadow-lg shadow-amber-400/20 overflow-hidden">
            <img src="/vs-brand-logo.png" alt="VS Logo" className="w-full h-full object-cover rounded-[10px]" />
          </div>
          <div>
            <span className="font-black text-base text-white">
              PDFMaster<span className="text-amber-400">Admin</span>
            </span>
            <span className="block text-[9px] font-extrabold text-amber-400 uppercase tracking-widest">Suraj Control Portal</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="space-y-1">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-extrabold transition-all ${
                  isActive
                    ? 'bg-amber-400 text-slate-900 shadow-md shadow-amber-400/20 scale-[1.02]'
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

      </div>

      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
          <p className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">Super Administrator</p>
          <p className="text-xs font-black text-white">Suraj Vishwakarma</p>
        </div>

        <Link
          href="/"
          className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Main App
        </Link>
      </div>
    </aside>
  );
}
