import React from 'react';
import AdminSidebar from '../../components/admin-sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      <AdminSidebar />
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
