"use client";

import React from 'react';
import { Clock, FileText, Download } from 'lucide-react';

export default function HistoryPage() {
  const historyList = [
    { id: 1, name: 'Q3_Financial_Summary_2026.pdf', tool: 'Merge PDF', size: '3.4 MB', date: '2026-07-28 10:15' },
    { id: 2, name: 'Vendor_Agreement_Final.pdf', tool: 'AI Summary', size: '1.8 MB', date: '2026-07-27 16:40' },
    { id: 3, name: 'Product_Roadmap_Presentation.pdf', tool: 'Compress PDF', size: '14.2 MB', date: '2026-07-26 11:20' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Clock className="w-6 h-6 text-purple-600" /> PDF Processing History
        </h1>
        <p className="text-xs text-slate-500">Log of all PDF file transformations executed on your account.</p>
      </div>

      <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-3 px-2">Document</th>
                <th className="py-3 px-2">Tool Applied</th>
                <th className="py-3 px-2">File Size</th>
                <th className="py-3 px-2">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {historyList.map((item) => (
                <tr key={item.id}>
                  <td className="py-3.5 px-2 font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>{item.name}</span>
                  </td>
                  <td className="py-3.5 px-2 font-bold text-purple-600 dark:text-purple-400">{item.tool}</td>
                  <td className="py-3.5 px-2 text-slate-500">{item.size}</td>
                  <td className="py-3.5 px-2 text-slate-400">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
