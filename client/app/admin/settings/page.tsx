"use client";

import React, { useState } from 'react';
import { 
  Sliders, Key, ShieldCheck, Mail, Database, Save, 
  CheckCircle2, RefreshCw, Cpu, Server, Lock
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [appName, setAppName] = useState('PDFMaster Pro');
  const [smtpUser, setSmtpUser] = useState('suraj@pdfmasterpro.com');
  const [smtpHost, setSmtpHost] = useState('smtp.gmail.com');
  const [maxUploadMB, setMaxUploadMB] = useState('100');
  const [rateLimitRequests, setRateLimitRequests] = useState('1000');
  const [apiKey, setApiKey] = useState('pdfm_live_key_99847192837492837');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const regenerateApiKey = () => {
    const randomHex = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setApiKey(`pdfm_live_key_${randomHex}`);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto text-slate-100">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <span className="text-[10px] font-black px-3 py-1 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/30 uppercase tracking-widest">
          ADMINISTRATOR SETTINGS
        </span>
        <h1 className="text-3xl font-black text-white mt-2">Platform & API Configuration</h1>
        <p className="text-xs text-slate-400">Configure global parameters, SMTP credentials, and master API keys for PDFMaster Pro</p>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-extrabold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* General SaaS Config */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#161B22] border border-slate-800 space-y-6 shadow-xl">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" /> Application & Storage Limits
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">App Name</label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Max Upload File Size (MB)</label>
              <input
                type="number"
                value={maxUploadMB}
                onChange={(e) => setMaxUploadMB(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Master API Key Management */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#161B22] border border-slate-800 space-y-6 shadow-xl">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-400" /> Master Enterprise API Key
          </h3>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-300">Live Production API Secret Key</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                readOnly
                value={apiKey}
                className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-amber-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={regenerateApiKey}
                className="px-4 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md shadow-amber-400/20 whitespace-nowrap"
              >
                <RefreshCw className="w-4 h-4" /> Roll Key
              </button>
            </div>
          </div>
        </div>

        {/* Email & SMTP Credentials */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#161B22] border border-slate-800 space-y-6 shadow-xl">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-amber-400" /> SMTP Email Server (Gmail Integration)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">SMTP Host</label>
              <input
                type="text"
                value={smtpHost}
                onChange={(e) => setSmtpHost(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">SMTP User / Gmail Sender</label>
              <input
                type="email"
                value={smtpUser}
                onChange={(e) => setSmtpUser(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-xs shadow-xl shadow-amber-400/20 transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save System Settings
        </button>

      </form>
    </div>
  );
}
