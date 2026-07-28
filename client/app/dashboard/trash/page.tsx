"use client";

import React from 'react';
import { Trash2, RefreshCw } from 'lucide-react';

export default function TrashPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Trash2 className="w-6 h-6 text-purple-600" /> Trash & Deleted Files
        </h1>
        <p className="text-xs text-slate-500">Deleted PDF files are kept for 30 days before permanent purging.</p>
      </div>

      <div className="glass-card rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
          <Trash2 className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Trash is Empty</h3>
        <p className="text-xs text-slate-500">You have no files currently in your trash bin.</p>
      </div>
    </div>
  );
}
