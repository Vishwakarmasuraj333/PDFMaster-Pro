"use client";

import React from 'react';
import { Layers, Edit } from 'lucide-react';

export default function AdminPlansPage() {
  const plans = [
    { id: 1, name: 'Free Explorer', priceMonthly: '$0', storage: '500 MB', limit: '10 tasks/day' },
    { id: 2, name: 'Pro Professional', priceMonthly: '$9.99', storage: '10 GB', limit: 'Unlimited' },
    { id: 3, name: 'Enterprise Team', priceMonthly: '$29.99', storage: '100 GB', limit: 'REST API + Unlimited' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Layers className="w-6 h-6 text-indigo-400" /> Subscription Plans CMS
        </h1>
        <p className="text-xs text-slate-400">Manage tier limits, pricing, and feature flags.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div key={p.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white">{p.name}</h3>
            <p className="text-2xl font-black text-indigo-400">{p.priceMonthly} <span className="text-xs text-slate-400">/mo</span></p>
            <div className="text-xs text-slate-300 space-y-1">
              <p>Storage: {p.storage}</p>
              <p>Task Limit: {p.limit}</p>
            </div>
            <button className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">
              Edit Plan Limits
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
