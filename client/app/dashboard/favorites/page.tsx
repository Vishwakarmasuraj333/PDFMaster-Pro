"use client";

import React from 'react';
import { Star, FileText, Download } from 'lucide-react';

export default function FavoritesPage() {
  const favorites = [
    { id: 1, name: 'Vendor_Agreement_Final.pdf', size: '1.8 MB', date: '2026-07-27' },
    { id: 2, name: 'Q3_Financial_Summary_2026.pdf', size: '3.4 MB', date: '2026-07-28' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Star className="w-6 h-6 text-amber-500 fill-amber-500" /> Favorite Documents
        </h1>
        <p className="text-xs text-slate-500">Quick access star queue for critical contracts and PDF files.</p>
      </div>

      <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
              <th className="py-3 px-2">Document Name</th>
              <th className="py-3 px-2">File Size</th>
              <th className="py-3 px-2">Saved Date</th>
              <th className="py-3 px-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {favorites.map((file) => (
              <tr key={file.id}>
                <td className="py-3.5 px-2 font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>{file.name}</span>
                </td>
                <td className="py-3.5 px-2 text-slate-500">{file.size}</td>
                <td className="py-3.5 px-2 text-slate-400">{file.date}</td>
                <td className="py-3.5 px-2 text-right">
                  <button className="p-1.5 text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900 rounded-lg">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
