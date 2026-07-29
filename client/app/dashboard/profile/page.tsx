"use client";

import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Save, CheckCircle2, Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('USER');
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          setName(data.user.name || '');
          setEmail(data.user.email || '');
          setRole(data.user.role || 'USER');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <User className="w-6 h-6 text-amber-500" /> User Profile
        </h1>
        <p className="text-xs text-slate-500">Manage your personal details and account credentials.</p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Profile saved!
        </div>
      )}

      <form onSubmit={handleSave} className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-500 dark:text-slate-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Account Role</label>
            <div className="mt-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-400/30 text-xs font-black uppercase">
              <Shield className="w-3.5 h-3.5" /> {role} Account
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-xs shadow-md shadow-amber-400/20 flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" /> Save Profile
        </button>
      </form>
    </div>
  );
}
