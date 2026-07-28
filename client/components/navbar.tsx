"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import MegaMenu from './mega-menu';
import ThemeToggle from './theme-toggle';
import { Sparkles, ChevronDown, Menu, X, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [convertMenuOpen, setConvertMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 sm:py-5 min-h-[84px]">
          
          {/* Logo Branding */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-purple-500 to-purple-400 p-0.5 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5.5 h-5.5 text-purple-600 dark:text-purple-400 fill-purple-100 dark:fill-purple-900" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                PDFMaster<span className="text-slate-900 dark:text-white font-black">Pro</span>
              </span>
              <span className="block text-[9px] font-semibold text-purple-600 dark:text-purple-400 tracking-wider uppercase">
                By Suraj Vishwakarma
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 font-semibold text-xs text-slate-700 dark:text-slate-200">
            <Link 
              href="/tools/merge-pdf"
              className="px-4 py-2.5 rounded-2xl hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-all uppercase tracking-wider"
            >
              MERGE PDF
            </Link>
            
            <Link 
              href="/tools/split-pdf"
              className="px-4 py-2.5 rounded-2xl hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-all uppercase tracking-wider"
            >
              SPLIT PDF
            </Link>

            <Link 
              href="/tools/compress-pdf"
              className="px-4 py-2.5 rounded-2xl hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-all uppercase tracking-wider"
            >
              COMPRESS PDF
            </Link>

            {/* Convert PDF Mega Dropdown Trigger */}
            <div 
              className="relative"
              onMouseEnter={() => { setConvertMenuOpen(true); setMegaMenuOpen(false); }}
            >
              <button
                className="flex items-center gap-1 px-4 py-2.5 rounded-2xl hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-all uppercase tracking-wider"
              >
                CONVERT PDF <ChevronDown className={`w-3.5 h-3.5 transition-transform ${convertMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* All PDF Tools Mega Menu Trigger */}
            <div 
              className="relative"
              onMouseEnter={() => { setMegaMenuOpen(true); setConvertMenuOpen(false); }}
            >
              <button
                className="flex items-center gap-1 px-4 py-2.5 rounded-2xl text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-all uppercase tracking-wider font-bold"
              >
                ALL PDF TOOLS <ChevronDown className={`w-3.5 h-3.5 transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-3.5">
            <ThemeToggle />
            
            <Link
              href="/auth/login"
              className="px-5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Login
            </Link>

            <Link
              href="/auth/signup"
              className="px-5 py-2.5 text-xs font-bold text-white rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 shadow-md shadow-purple-500/20 hover:shadow-lg transition-all"
            >
              Sign up
            </Link>

            <Link
              href="/dashboard"
              className="p-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900 border border-purple-200 dark:border-purple-800 transition-all"
              title="Dashboard"
            >
              <ShieldCheck className="w-4.5 h-4.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Floating Mega Menu Popups */}
      {megaMenuOpen && (
        <div className="absolute top-full left-0 right-0 p-4 z-50">
          <MegaMenu onClose={() => setMegaMenuOpen(false)} activeFilter="all" />
        </div>
      )}

      {convertMenuOpen && (
        <div className="absolute top-full left-0 right-0 p-4 z-50">
          <MegaMenu onClose={() => setConvertMenuOpen(false)} activeFilter="convert" />
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-4 pb-6 space-y-3">
          <Link 
            href="/tools"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-purple-600 dark:text-purple-400"
          >
            🔥 View All 30+ PDF Tools
          </Link>
          <Link href="/pricing" className="block py-2 text-sm font-semibold">Pricing</Link>
          <Link href="/about" className="block py-2 text-sm font-semibold">About Us</Link>
          <Link href="/dashboard" className="block py-2 text-sm font-semibold text-purple-600">User Dashboard</Link>
          <Link href="/admin" className="block py-2 text-sm font-semibold text-indigo-600">Admin Panel</Link>
          <div className="pt-2 flex flex-col gap-2">
            <Link 
              href="/auth/login"
              className="w-full text-center py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-xs"
            >
              Log in
            </Link>
            <Link 
              href="/auth/signup"
              className="w-full text-center py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
