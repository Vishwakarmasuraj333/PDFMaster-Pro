"use client";

import React, { useState } from 'react';
import { User, Mail, Shield, Save, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const [name, setName] = useState('Suraj Vishwakarma');
  const [email, setEmail] = useState('suraj@pdfmasterpro.com');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <User className="w-6 h-6 text-purple-600" /> User Profile
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
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save Profile
        </button>
      </form>
    </div>
  );
}
