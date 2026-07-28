"use client";

import React, { useState } from 'react';
import { Key, Copy, Plus, Check, ShieldAlert } from 'lucide-react';

export default function ApiKeysPage() {
  const [tokens, setTokens] = useState([
    { id: 1, name: 'Production Node.js Backend', token: 'pdf_live_9f8a3e7b2c1d4e5f6a7b8c9d0e', created: '2026-07-20', status: 'ACTIVE' },
    { id: 2, name: 'Staging Server', token: 'pdf_test_1a2b3c4d5e6f7a8b9c0d1e2f3a', created: '2026-07-10', status: 'ACTIVE' }
  ]);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [keyName, setKeyName] = useState('');

  const handleCreate = () => {
    if (!keyName) return;
    const newToken = {
      id: Date.now(),
      name: keyName,
      token: `pdf_live_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`,
      created: new Date().toISOString().split('T')[0],
      status: 'ACTIVE'
    };
    setTokens([...tokens, newToken]);
    setKeyName('');
  };

  const copyToClipboard = (token: string, id: number) => {
    navigator.clipboard.writeText(token);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Key className="w-6 h-6 text-purple-600" /> Developer API Tokens
        </h1>
        <p className="text-xs text-slate-500">
          Use secret API keys to authenticate programmatic REST API requests for document merging, OCR, and AI summarizer microservices.
        </p>
      </div>

      {/* Generate New Key Box */}
      <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Generate New REST API Key</h3>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Key Name (e.g. My App Server)"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
          />
          <button
            onClick={handleCreate}
            className="px-6 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Create Key
          </button>
        </div>
      </div>

      {/* Existing Keys Table */}
      <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Active Secret Keys</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-3 px-2">Key Label</th>
                <th className="py-3 px-2">API Token</th>
                <th className="py-3 px-2">Created</th>
                <th className="py-3 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {tokens.map((tk) => (
                <tr key={tk.id}>
                  <td className="py-3.5 px-2 font-bold text-slate-800 dark:text-slate-200">{tk.name}</td>
                  <td className="py-3.5 px-2 font-mono text-[11px] text-purple-600 dark:text-purple-400">{tk.token}</td>
                  <td className="py-3.5 px-2 text-slate-400">{tk.created}</td>
                  <td className="py-3.5 px-2 text-right">
                    <button
                      onClick={() => copyToClipboard(tk.token, tk.id)}
                      className="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-300 hover:bg-purple-100 font-bold text-[11px] inline-flex items-center gap-1"
                    >
                      {copiedId === tk.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedId === tk.id ? 'Copied' : 'Copy Key'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
