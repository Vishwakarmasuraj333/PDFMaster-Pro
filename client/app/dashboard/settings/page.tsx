"use client";

import React, { useState } from 'react';
import { Sliders, Bell, Shield, Key, Save, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoScrub, setAutoScrub] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Sliders className="w-6 h-6 text-purple-600" /> Account Settings
        </h1>
        <p className="text-xs text-slate-500">Configure your security, notifications, and document processing preferences.</p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-6">
        
        {/* Document Security Settings */}
        <div className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-purple-600" /> Document Privacy & Retention
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Auto-scrub Transient Processing Memory</p>
              <p className="text-[11px] text-slate-400">Permanently delete processed PDF bytes immediately upon download.</p>
            </div>
            <input
              type="checkbox"
              checked={autoScrub}
              onChange={(e) => setAutoScrub(e.target.checked)}
              className="w-4 h-4 accent-purple-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-purple-600" /> Notification Preferences
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Email Processing Summary</p>
              <p className="text-[11px] text-slate-400">Receive daily PDF batch processing reports via email.</p>
            </div>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="w-4 h-4 accent-purple-600 cursor-pointer"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save Settings
        </button>

      </form>
    </div>
  );
}
