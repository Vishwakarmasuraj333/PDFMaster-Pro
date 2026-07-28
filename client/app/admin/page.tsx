"use client";

import React, { useState } from 'react';
import { 
  Users, DollarSign, Cpu, HardDrive, Terminal, 
  TrendingUp, ShieldAlert, CheckCircle, Search, Filter,
  ShieldCheck, RefreshCw, Activity, Lock, Database, UserCheck, Key
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'ADMIN' | 'USER'>('ALL');

  const metrics = [
    { title: 'Total Registered Users', value: '14,820', change: '+18% this mo.', icon: Users },
    { title: 'Monthly Revenue (MRR)', value: '$34,090', change: '+24% YoY', icon: DollarSign },
    { title: 'PDF Files Processed', value: '1,290,450', change: '+45k today', icon: TrendingUp },
    { title: 'Database & Node Health', value: '99.98%', change: 'Optimal Status', icon: Activity },
  ];

  const initialUsers = [
    { id: 1, name: 'Suraj Vishwakarma', email: 'suraj@pdfmasterpro.com', role: 'ADMIN', plan: 'Enterprise Unlimited', status: 'ACTIVE', pdfsCount: 1420, registered: '2026-01-10' },
    { id: 2, name: 'Alex Morgan', email: 'alex@enterprise.com', role: 'USER', plan: 'Pro Monthly', status: 'ACTIVE', pdfsCount: 230, registered: '2026-03-14' },
    { id: 3, name: 'Sophia Chen', email: 'sophia@techcorp.io', role: 'USER', plan: 'Enterprise Unlimited', status: 'ACTIVE', pdfsCount: 512, registered: '2026-04-02' },
    { id: 4, name: 'Marcus Vance', email: 'marcus@startup.co', role: 'USER', plan: 'Free', status: 'SUSPENDED', pdfsCount: 18, registered: '2026-05-19' },
    { id: 5, name: 'Elena Rostova', email: 'elena@designhub.com', role: 'USER', plan: 'Pro Monthly', status: 'ACTIVE', pdfsCount: 88, registered: '2026-06-01' },
    { id: 6, name: 'David Miller', email: 'david@fintech.net', role: 'USER', plan: 'Free', status: 'ACTIVE', pdfsCount: 42, registered: '2026-07-11' },
  ];

  const [usersList, setUsersList] = useState(initialUsers);

  const toggleUserStatus = (id: number) => {
    setUsersList((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' } : u
      )
    );
  };

  const filteredUsers = usersList.filter((u) => {
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-black px-3 py-1 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/30 uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> SUPER ADMINISTRATOR DASHBOARD
          </div>
          <h1 className="text-3xl font-black text-white mt-2">Platform Control Center</h1>
          <p className="text-xs text-slate-400">Full system metrics and user management for Suraj Vishwakarma</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-4 py-2.5 rounded-2xl">
            <CheckCircle className="w-4 h-4" /> Aiven MySQL & API Online
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="p-6 rounded-3xl bg-[#161B22] border border-slate-800 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-400">{m.title}</span>
                <div className="w-9 h-9 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-white">{m.value}</p>
              <p className="text-[11px] font-extrabold text-amber-400 flex items-center gap-1">
                ⚡ {m.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* User Management Section */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#161B22] border border-slate-800 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-white">Manage All Registered Users</h3>
            <p className="text-xs text-slate-400">Total {usersList.length} Accounts Monitored</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search user or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-2xl bg-slate-900 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-amber-400 w-48 sm:w-64"
              />
            </div>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e: any) => setRoleFilter(e.target.value)}
              className="py-2 px-3 rounded-2xl bg-slate-900 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-amber-400"
            >
              <option value="ALL">All Roles</option>
              <option value="ADMIN">ADMIN Only</option>
              <option value="USER">USER Only</option>
            </select>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-3 font-extrabold">User Details</th>
                <th className="py-3.5 px-3 font-extrabold">System Role</th>
                <th className="py-3.5 px-3 font-extrabold">Plan</th>
                <th className="py-3.5 px-3 font-extrabold">PDFs Processed</th>
                <th className="py-3.5 px-3 font-extrabold">Account Status</th>
                <th className="py-3.5 px-3 font-extrabold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-3 font-bold text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center font-black">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-extrabold text-white text-xs">{u.name}</div>
                        <div className="text-[10px] font-medium text-slate-400">{u.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-3">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      u.role === 'ADMIN'
                        ? 'bg-amber-400/20 text-amber-400 border border-amber-400/40'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {u.role}
                    </span>
                  </td>

                  <td className="py-4 px-3 text-slate-300 font-bold">{u.plan}</td>

                  <td className="py-4 px-3 text-amber-400 font-mono font-black">{u.pdfsCount.toLocaleString()} PDFs</td>

                  <td className="py-4 px-3">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${
                      u.status === 'ACTIVE'
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                        : 'bg-red-950/80 text-red-400 border border-red-800'
                    }`}>
                      {u.status}
                    </span>
                  </td>

                  <td className="py-4 px-3 text-right space-x-2">
                    <button
                      onClick={() => toggleUserStatus(u.id)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all ${
                        u.status === 'ACTIVE'
                          ? 'bg-red-950/60 hover:bg-red-900 text-red-400 border border-red-800'
                          : 'bg-emerald-950/60 hover:bg-emerald-900 text-emerald-400 border border-emerald-800'
                      }`}
                    >
                      {u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
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
