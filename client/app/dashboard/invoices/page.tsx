"use client";

import React from 'react';
import { CreditCard, Download, FileText } from 'lucide-react';

export default function InvoicesPage() {
  const invoices = [
    { id: 'INV-2026-001', date: '2026-07-28', amount: '$9.99', status: 'PAID' },
    { id: 'INV-2026-000', date: '2026-06-28', amount: '$9.99', status: 'PAID' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-purple-600" /> Payment Invoices
        </h1>
        <p className="text-xs text-slate-500">Download billing receipts and subscription invoice statements.</p>
      </div>

      <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
              <th className="py-3 px-2">Invoice #</th>
              <th className="py-3 px-2">Date</th>
              <th className="py-3 px-2">Amount</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2 text-right">Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td className="py-3.5 px-2 font-bold text-slate-800 dark:text-slate-200">{inv.id}</td>
                <td className="py-3.5 px-2 text-slate-500">{inv.date}</td>
                <td className="py-3.5 px-2 font-bold text-slate-900 dark:text-white">{inv.amount}</td>
                <td className="py-3.5 px-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                    {inv.status}
                  </span>
                </td>
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
