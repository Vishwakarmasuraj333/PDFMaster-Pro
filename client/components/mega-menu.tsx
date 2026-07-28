"use client";

import React from 'react';
import Link from 'next/link';
import { PDF_TOOLS } from '../lib/pdf-tools-data';
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

interface MegaMenuProps {
  onClose?: () => void;
  activeFilter?: 'all' | 'convert';
}

export default function MegaMenu({ onClose, activeFilter = 'all' }: MegaMenuProps) {
  const categories = [
    { key: 'organize', title: 'ORGANIZE PDF' },
    { key: 'optimize', title: 'OPTIMIZE PDF' },
    { key: 'convert_to', title: 'CONVERT TO PDF' },
    { key: 'convert_from', title: 'CONVERT FROM PDF' },
    { key: 'edit', title: 'EDIT PDF' },
    { key: 'security', title: 'PDF SECURITY' },
    { key: 'intelligence', title: 'PDF INTELLIGENCE' },
  ];

  const filteredCategories = activeFilter === 'convert'
    ? categories.filter(c => c.key === 'convert_to' || c.key === 'convert_from')
    : categories;

  return (
    <div 
      className="w-full max-w-7xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 transition-all duration-300"
      onMouseLeave={onClose}
    >
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${activeFilter === 'convert' ? 'lg:grid-cols-2 max-w-3xl mx-auto' : 'lg:grid-cols-7'} gap-6`}>
        {filteredCategories.map((cat) => {
          const tools = PDF_TOOLS.filter((t) => t.category === cat.key);
          return (
            <div key={cat.key} className="space-y-3">
              <h3 className="text-xs font-bold tracking-wider text-purple-600 dark:text-purple-400 uppercase border-b border-purple-100 dark:border-purple-900/40 pb-2">
                {cat.title}
              </h3>
              <ul className="space-y-1.5">
                {tools.map((tool) => {
                  const IconComponent = iconMap[tool.icon] || FileText;
                  return (
                    <li key={tool.id}>
                      <Link
                        href={`/tools/${tool.slug}`}
                        onClick={onClose}
                        className="group flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-all"
                      >
                        <span className="p-1 rounded-md bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 group-hover:scale-110 transition-transform">
                          <IconComponent className="w-3.5 h-3.5" />
                        </span>
                        <span className="truncate">{tool.title}</span>
                        {tool.badge && (
                          <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-purple-600 text-white">
                            AI
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
