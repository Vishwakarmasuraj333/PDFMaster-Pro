"use client";

import React, { useState } from 'react';
import { Users, Shield, ExternalLink, Lock, CheckCircle2, Search } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Suraj Vishwakarma', email: 'suraj@pdfmasterpro.com', role: 'ADMIN', plan: 'Enterprise Unlimited', status: 'ACTIVE' },
    { id: 2, name: 'Mamta Yadav', email: 'mamtayadav@pdfmasterpro.com', role: 'CO_OPERATOR', plan: 'Enterprise Team', status: 'ACTIVE', github: 'https://github.com/MamtaYdvTech1' },
    { id: 3, name: 'Alex Morgan', email: 'alex@enterprise.com', role: 'USER', plan: 'Pro Monthly', status: 'ACTIVE' },
    { id: 4, name: 'Sophia Chen', email: 'sophia@techcorp.io', role: 'USER', plan: 'Enterprise Unlimited', status: 'ACTIVE' },
    { id: 5, name: 'Marcus Vance', email: 'marcus@startup.co', role: 'USER', plan: 'Free', status: 'SUSPENDED' },
  ]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-slate-100">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-400" /> User Management & Team RBAC
          </h1>
          <p className="text-xs text-slate-400">Control role-based privileges for Super Admin, Co-Operator, and Users.</p>
        </div>
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-[#161B22] border border-amber-400/30 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black px-3 py-1 rounded-full bg-amber-400 text-slate-900 uppercase">
              Super Admin
            </span>
            <span className="text-xs font-bold text-amber-400">Full System Owner</span>
          </div>
          <h3 className="text-xl font-black text-white">Suraj Vishwakarma</h3>
          <p className="text-xs text-slate-400">suraj@pdfmasterpro.com</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#161B22] border border-indigo-400/30 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black px-3 py-1 rounded-full bg-indigo-500 text-white uppercase">
              Co-Operator
            </span>
            <a
              href="https://github.com/MamtaYdvTech1"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-indigo-400 hover:underline flex items-center gap-1"
            >
              MamtaYdvTech1 <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <h3 className="text-xl font-black text-white">Mamta Yadav</h3>
          <p className="text-xs text-slate-400">mamtayadav@pdfmasterpro.com</p>
        </div>
      </div>

      {/* Table */}
      <div className="p-6 rounded-3xl bg-[#161B22] border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-lg font-black text-white">All Platform Accounts</h3>
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
              <th className="py-3 px-3 font-extrabold">User</th>
              <th className="py-3 px-3 font-extrabold">Role</th>
              <th className="py-3 px-3 font-extrabold">Plan</th>
              <th className="py-3 px-3 font-extrabold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-3 font-bold text-white">
                  <div>{u.name}</div>
                  <div className="text-[10px] font-medium text-slate-400">{u.email}</div>
                </td>
                <td className="py-3.5 px-3 font-bold">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${
                    u.role === 'ADMIN' ? 'bg-amber-400/20 text-amber-400' :
                    u.role === 'CO_OPERATOR' ? 'bg-indigo-500/20 text-indigo-400' :
                    'bg-slate-800 text-slate-300'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-slate-300">{u.plan}</td>
                <td className="py-3.5 px-3">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                    u.status === 'ACTIVE' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-800'
                  }`}>
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
