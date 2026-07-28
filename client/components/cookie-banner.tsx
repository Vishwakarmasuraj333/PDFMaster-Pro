"use client";

import React, { useState, useEffect } from 'react';
import { Cookie, Shield, Check, X } from 'lucide-react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('pdfmaster_cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('pdfmaster_cookie_consent', JSON.stringify({ analytics: true, essential: true, marketing: true }));
    setShowBanner(false);
  };

  const handleRejectNonEssential = () => {
    localStorage.setItem('pdfmaster_cookie_consent', JSON.stringify({ analytics: false, essential: true, marketing: false }));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-md w-[calc(100%-2rem)] z-50 glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 shrink-0">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            Cookie Consent & Privacy
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            We use essential HttpOnly security cookies to manage your PDF session and keep your files secure.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={handleAcceptAll}
          className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md shadow-purple-500/20 transition-all"
        >
          Accept All
        </button>
        <button
          onClick={handleRejectNonEssential}
          className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors"
        >
          Reject Non-Essential
        </button>
      </div>
    </div>
  );
}
