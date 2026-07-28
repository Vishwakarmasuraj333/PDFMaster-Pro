"use client";

import React from 'react';
import Link from 'next/link';
import { PDFTool } from '../lib/pdf-tools-data';
import { 
  Combine, Split, Trash2, FileOutput, LayoutGrid, Scan,
  Minimize2, Wrench, Eye, Image, FileText, Presentation,
  Sheet, Code, FileImage, FileCode, Tv, Table, RotateCw,
  Binary, Stamp, Crop, Lock, Unlock, PenTool, Eraser, Columns,
  Sparkles, Languages, Bot, FileCode2
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Combine, Split, Trash2, FileOutput, LayoutGrid, Scan,
  Minimize2, Wrench, Eye, Image, FileText, Presentation,
  Sheet, Code, FileImage, FileCode, Tv, Table, RotateCw,
  Binary, Stamp, Crop, Lock, Unlock, PenTool, Eraser, Columns,
  Sparkles, Languages, Bot, FileCode2
};

interface PDFToolCardProps {
  tool: PDFTool;
  key?: React.Key;
}

export default function PDFToolCard({ tool }: PDFToolCardProps) {
  const IconComponent = iconMap[tool.icon] || FileText;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative p-6 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 hover:border-purple-500/50 dark:hover:border-purple-500/50 shadow-md hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      <div className="space-y-4">
        {/* Header Icon + Badge */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-purple-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform">
            <IconComponent className="w-6 h-6" />
          </div>
          {tool.badge && (
            <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm">
              {tool.badge}
            </span>
          )}
          {tool.popular && !tool.badge && (
            <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              POPULAR
            </span>
          )}
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {tool.title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
            {tool.description}
          </p>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
        <span>Use Tool</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </Link>
  );
}
