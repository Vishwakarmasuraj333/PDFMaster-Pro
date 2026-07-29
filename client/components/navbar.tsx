"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MegaMenu from './mega-menu';
import ThemeToggle from './theme-toggle';
import { Sparkles, ChevronDown, Menu, X, User, LogOut, FileText, Settings } from 'lucide-react';

export default function Navbar() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [convertMenuOpen, setConvertMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check sessionStorage first for fast UI render
    if (typeof window !== 'undefined') {
      const storedEmail = sessionStorage.getItem('pdfmaster_auth_email');
      if (storedEmail) setUserEmail(storedEmail);
    }

    // Query /api/auth/me to verify real session cookies
    fetch('/api/auth/me', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          setUserEmail(data.user.email);
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('pdfmaster_auth_email', data.user.email);
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {}
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('pdfmaster_auth_email');
      setUserEmail(null);
      window.location.href = '/auth/login';
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 sm:py-5 min-h-[84px]">
          
          {/* Logo Branding */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 p-0.5 shadow-lg shadow-amber-400/25 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5.5 h-5.5 text-amber-400 fill-amber-400/20" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                PDFMaster<span className="text-amber-500 font-black">Pro</span>
              </span>
              <span className="block text-[9px] font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase">
                By Suraj Vishwakarma
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 font-semibold text-xs text-slate-700 dark:text-slate-200">
            <Link 
              href="/tools/merge-pdf"
              className="px-4 py-2.5 rounded-2xl hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-all uppercase tracking-wider"
            >
              MERGE PDF
            </Link>
            
            <Link 
              href="/tools/split-pdf"
              className="px-4 py-2.5 rounded-2xl hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-all uppercase tracking-wider"
            >
              SPLIT PDF
            </Link>

            <Link 
              href="/tools/compress-pdf"
              className="px-4 py-2.5 rounded-2xl hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-all uppercase tracking-wider"
            >
              COMPRESS PDF
            </Link>

            {/* Convert PDF Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => { setConvertMenuOpen(true); setMegaMenuOpen(false); }}
            >
              <button
                className="flex items-center gap-1 px-4 py-2.5 rounded-2xl hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-all uppercase tracking-wider cursor-pointer"
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
                className="flex items-center gap-1 px-4 py-2.5 rounded-2xl text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-all uppercase tracking-wider font-bold cursor-pointer"
              >
                ALL PDF TOOLS <ChevronDown className={`w-3.5 h-3.5 transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-3.5">
            <ThemeToggle />

            {!userEmail ? (
              <>
                <Link
                  href="/auth/login"
                  className="px-5 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Log In
                </Link>

                <Link
                  href="/auth/signup"
                  className="px-5 py-2.5 text-xs font-extrabold text-slate-900 rounded-2xl bg-amber-400 hover:bg-amber-500 shadow-md shadow-amber-400/20 hover:shadow-lg transition-all"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard/files"
                  className="px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-100 dark:hover:bg-amber-950/50 transition-all"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-500" /> My Files
                </Link>

                <Link
                  href="/dashboard/profile"
                  className="px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-100 dark:hover:bg-amber-950/50 transition-all"
                >
                  <User className="w-3.5 h-3.5 text-amber-500" /> Profile
                </Link>

                <Link
                  href="/dashboard/settings"
                  className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-all"
                  title="Settings"
                >
                  <Settings className="w-4 h-4" />
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 rounded-2xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-all cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
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
            className="block py-2 text-sm font-bold text-amber-600 dark:text-amber-400"
          >
            🔥 View All PDF Tools
          </Link>
          <Link href="/pricing" className="block py-2 text-sm font-semibold">Pricing</Link>
          <Link href="/about" className="block py-2 text-sm font-semibold">About Us</Link>
          
          {userEmail && (
            <>
              <Link href="/dashboard/files" className="block py-2 text-sm font-bold text-amber-500">My Files</Link>
              <Link href="/dashboard/profile" className="block py-2 text-sm font-semibold">Profile</Link>
              <Link href="/dashboard/settings" className="block py-2 text-sm font-semibold">Settings</Link>
            </>
          )}

          <div className="pt-2 flex flex-col gap-2">
            {!userEmail ? (
              <>
                <Link 
                  href="/auth/login"
                  className="w-full text-center py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-xs"
                >
                  Log in
                </Link>
                <Link 
                  href="/auth/signup"
                  className="w-full text-center py-2.5 rounded-xl bg-amber-400 text-slate-900 font-extrabold text-xs"
                >
                  Create Free Account
                </Link>
              </>
            ) : (
              <button 
                onClick={handleLogout}
                className="w-full text-center py-2.5 rounded-xl bg-red-600 text-white font-extrabold text-xs cursor-pointer"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
