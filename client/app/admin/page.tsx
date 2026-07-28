"use client";

import React from 'react';
import { 
  Users, DollarSign, Cpu, HardDrive, Terminal, 
  TrendingUp, ShieldAlert, CheckCircle 
} from 'lucide-react';

export default function AdminDashboardPage() {
  const metrics = [
    { title: 'Total Registered Users', value: '14,820', change: '+18% this mo.', icon: Users },
    { title: 'Monthly Revenue (MRR)', value: '$34,090', change: '+24% YoY', icon: DollarSign },
    { title: 'Files Processed', value: '1,290,450', change: '+45k today', icon: TrendingUp },
    { title: 'System CPU Load', value: '14%', change: 'Optimal Health', icon: Cpu },
  ];

  const users = [
    { id: 1, name: 'Suraj Vishwakarma', email: 'suraj@pdfmasterpro.com', role: 'ADMIN', plan: 'Enterprise', status: 'ACTIVE' },
    { id: 2, name: 'Alex Morgan', email: 'alex@enterprise.com', role: 'USER', plan: 'Pro', status: 'ACTIVE' },
    { id: 3, name: 'Sophia Chen', email: 'sophia@techcorp.io', role: 'STAFF', plan: 'Enterprise', status: 'ACTIVE' },
    { id: 4, name: 'Marcus Vance', email: 'marcus@startup.co', role: 'USER', plan: 'Free', status: 'SUSPENDED' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 uppercase tracking-widest">
            ADMINISTRATOR PORTAL
          </span>
          <h1 className="text-3xl font-black text-white mt-2">System Metrics & Control</h1>
          <p className="text-xs text-slate-400">Platform overview managed by Suraj Vishwakarma</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-4 py-2 rounded-2xl">
          <CheckCircle className="w-4 h-4" /> All Servers Operational
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">{m.title}</span>
                <Icon className="w-5 h-5 text-indigo-400" />
              </div>
              <p className="text-3xl font-black text-white">{m.value}</p>
              <p className="text-[11px] font-semibold text-emerald-400">{m.change}</p>
            </div>
          );
        })}
      </div>

      {/* User Management Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-white">Recent Users & Roles</h3>
          <span className="text-xs font-bold text-indigo-400">Total 14,820 Users</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-2 font-bold">User</th>
                <th className="py-3 px-2 font-bold">Role</th>
                <th className="py-3 px-2 font-bold">Plan</th>
                <th className="py-3 px-2 font-bold">Status</th>
                <th className="py-3 px-2 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/50">
                  <td className="py-3.5 px-2 font-bold text-white">
                    <div>{u.name}</div>
                    <div className="text-[10px] font-normal text-slate-400">{u.email}</div>
                  </td>
                  <td className="py-3.5 px-2 font-bold text-indigo-400">{u.role}</td>
                  <td className="py-3.5 px-2 text-slate-300">{u.plan}</td>
                  <td className="py-3.5 px-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${u.status === 'ACTIVE' ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-2 text-right">
                    <button className="text-xs font-bold text-indigo-400 hover:underline">Edit User</button>
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
