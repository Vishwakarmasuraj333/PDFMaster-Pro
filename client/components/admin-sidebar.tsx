"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldAlert, Users, Layers, Terminal, BookOpen, 
  Sliders, ArrowLeft, Sparkles 
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const adminNav = [
    { label: 'System Overview', href: '/admin', icon: ShieldAlert },
    { label: 'Manage Users', href: '/admin/users', icon: Users },
    { label: 'Plans & Pricing', href: '/admin/plans', icon: Layers },
    { label: 'Logs & Audits', href: '/admin/logs', icon: Terminal },
    { label: 'Platform Settings', href: '/admin/settings', icon: Sliders },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 flex flex-col justify-between h-screen sticky top-0 p-5">
      <div className="space-y-6">
        
        {/* Brand */}
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-base text-white">
              PDFMaster<span className="text-indigo-400">Admin</span>
            </span>
            <span className="block text-[9px] font-bold text-indigo-300 uppercase tracking-wider">Super Control Center</span>
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
                className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
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
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-indigo-400"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Application
        </Link>
      </div>
    </aside>
  );
}
