import React from 'react';
import DashboardSidebar from '../../components/dashboard-sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#0F172A]">
      <DashboardSidebar />
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
