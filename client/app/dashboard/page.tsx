"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  FileText, HardDrive, Sparkles, Clock, Star, 
  Plus, Combine, Split, Minimize2, Download, Trash2 
} from 'lucide-react';
import { getSavedFiles, calculateStorageUsedGB, StoredFile } from '../../lib/dashboard-store';
import { downloadBlobFile } from '../../lib/pdf-engine';

export default function DashboardOverviewPage() {
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [storageUsedGB, setStorageUsedGB] = useState('1.25');

  const [userEmail, setUserEmail] = useState('itxsurajofficial@gmail.com');

  useEffect(() => {
    const list = getSavedFiles();
    setFiles(list.filter(f => !f.isTrash));
    setStorageUsedGB(calculateStorageUsedGB(list));
    const saved = sessionStorage.getItem('pdfmaster_auth_email');
    if (saved) setUserEmail(saved);
  }, []);

  const stats = [
    { title: 'Files Processed', value: `${files.length + 144}`, subtitle: '+12 this week', icon: FileText, color: 'text-purple-600' },
    { title: 'Storage Used', value: `${storageUsedGB} GB`, subtitle: 'Out of 10 GB (Pro)', icon: HardDrive, color: 'text-indigo-600' },
    { title: 'AI Insights Generated', value: '34', subtitle: '98% accuracy score', icon: Sparkles, color: 'text-purple-500' },
    { title: 'Favorite Documents', value: `${files.filter(f => f.isFav).length}`, subtitle: 'Quick access', icon: Star, color: 'text-amber-500' },
  ];

  const handleDownload = (file: StoredFile) => {
    downloadBlobFile(
      `Sample content payload for ${file.name}\nProcessed by PDFMaster Pro Engine by Suraj Vishwakarma.`,
      file.name,
      'application/pdf'
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 text-white shadow-xl shadow-purple-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white uppercase tracking-wider">
            User Workspace
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-2">Welcome Back, Suraj! 👋</h1>
          <p className="text-xs text-purple-100 mt-1 max-w-md">
            Your Pro subscription is active. Select a tool or upload files to launch instant workflows.
          </p>
        </div>
        <Link
          href="/tools"
          className="px-6 py-3 rounded-2xl bg-white text-purple-600 font-extrabold text-xs shadow-lg hover:bg-purple-50 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Launch PDF Tool
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{stat.title}</span>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</p>
              <p className="text-[11px] text-slate-400 font-medium">{stat.subtitle}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Launch Tool Shortcuts */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 dark:text-white">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link href="/tools/merge-pdf" className="p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 hover:border-purple-500 flex items-center gap-3 transition-all">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600"><Combine className="w-5 h-5" /></div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Merge PDF</p>
              <p className="text-[10px] text-slate-400">Combine files</p>
            </div>
          </Link>

          <Link href="/tools/split-pdf" className="p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 hover:border-purple-500 flex items-center gap-3 transition-all">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600"><Split className="w-5 h-5" /></div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Split PDF</p>
              <p className="text-[10px] text-slate-400">Separate pages</p>
            </div>
          </Link>

          <Link href="/tools/compress-pdf" className="p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 hover:border-purple-500 flex items-center gap-3 transition-all">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600"><Minimize2 className="w-5 h-5" /></div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Compress</p>
              <p className="text-[10px] text-slate-400">Reduce file size</p>
            </div>
          </Link>

          <Link href="/tools/ai-summarizer" className="p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 hover:border-purple-500 flex items-center gap-3 transition-all">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600"><Sparkles className="w-5 h-5" /></div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">AI Summary</p>
              <p className="text-[10px] text-slate-400">Neural insights</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Files Table */}
      <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-600" /> Recent Documents
          </h3>
          <Link href="/dashboard/files" className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline">
            View All Files →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-2 font-bold">Document Name</th>
                <th className="py-3 px-2 font-bold">File Size</th>
                <th className="py-3 px-2 font-bold">Tool Applied</th>
                <th className="py-3 px-2 font-bold">Processed Date</th>
                <th className="py-3 px-2 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {files.map((file) => (
                <tr key={file.id} className="hover:bg-purple-50/50 dark:hover:bg-purple-950/20 transition-colors">
                  <td className="py-3.5 px-2 font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-600 shrink-0" />
                    <span className="truncate max-w-xs">{file.name}</span>
                  </td>
                  <td className="py-3.5 px-2 text-slate-500">{file.sizeFormatted}</td>
                  <td className="py-3.5 px-2 font-semibold text-purple-600 dark:text-purple-400">{file.tool}</td>
                  <td className="py-3.5 px-2 text-slate-400">{file.date}</td>
                  <td className="py-3.5 px-2 text-right">
                    <button
                      onClick={() => handleDownload(file)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
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
