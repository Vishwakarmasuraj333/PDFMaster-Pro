"use client";

import React, { useState } from 'react';
import { Users, Shield, UserCheck, Search, Edit } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Suraj Vishwakarma', email: 'suraj@pdfmasterpro.com', role: 'ADMIN', plan: 'Enterprise', status: 'ACTIVE' },
    { id: 2, name: 'Alex Morgan', email: 'alex@enterprise.com', role: 'USER', plan: 'Pro', status: 'ACTIVE' },
    { id: 3, name: 'Sophia Chen', email: 'sophia@techcorp.io', role: 'STAFF', plan: 'Enterprise', status: 'ACTIVE' },
    { id: 4, name: 'Marcus Vance', email: 'marcus@startup.co', role: 'USER', plan: 'Free', status: 'SUSPENDED' },
  ]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-400" /> User Management & RBAC Roles
          </h1>
          <p className="text-xs text-slate-400">Control access levels for ADMIN, STAFF, and USER roles.</p>
        </div>
        <button className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs">
          + Add New User
        </button>
      </div>

      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
              <th className="py-3 px-2">User</th>
              <th className="py-3 px-2">Role</th>
              <th className="py-3 px-2">Plan</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="py-3.5 px-2 font-bold text-white">
                  <div>{u.name}</div>
                  <div className="text-[10px] text-slate-400">{u.email}</div>
                </td>
                <td className="py-3.5 px-2 font-bold text-indigo-400">{u.role}</td>
                <td className="py-3.5 px-2 text-slate-300">{u.plan}</td>
                <td className="py-3.5 px-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${u.status === 'ACTIVE' ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'}`}>
                    {u.status}
                  </span>
                </td>
                <td className="py-3.5 px-2 text-right">
                  <button className="text-xs font-bold text-indigo-400 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
