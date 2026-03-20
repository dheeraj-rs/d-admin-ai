'use client';

import React from 'react';
import { Plus, Filter, ChevronDown, Folder } from 'lucide-react';
import { CATEGORIES } from '@/features/workspace/templates';
import { useRouter } from 'next/navigation';

interface TemplatesFilterProps {
    selectedCategory: string;
    setSelectedCategory: (c: string) => void;
    isFilterOpen: boolean;
    setIsFilterOpen: (o: boolean) => void;
    onBack?: () => void;
}

export default function TemplatesFilter({
    selectedCategory,
    setSelectedCategory,
    isFilterOpen,
    setIsFilterOpen,
    onBack
}: TemplatesFilterProps) {
    const router = useRouter();

    return (
        <div className="flex items-center justify-between mb-8 2xl:mb-12 gap-2 sm:gap-4 pb-2 border-b border-gray-200 dark:border-white/5 px-1 relative">
            {/* Desktop Categories */}
            <div className="hidden sm:flex items-center gap-2 2xl:gap-4 overflow-x-auto no-scrollbar scroll-smooth">
                {CATEGORIES.map((cat) => (
                    <button 
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-1.5 2xl:px-8 2xl:py-3 rounded-full text-sm 2xl:text-xl font-bold transition-all whitespace-nowrap border ${
                            cat === selectedCategory 
                            ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-[0_4px_15px_rgba(37,99,235,0.3)] border-transparent' 
                            : 'bg-blue-500/5 dark:bg-blue-400/5 backdrop-blur-xl text-blue-600 dark:text-blue-400 border-blue-500/30 dark:border-blue-400/20 hover:bg-blue-500/10 dark:hover:bg-blue-400/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-none'
                        }`}
                    >
                        {cat === 'SAVED PROJECTS' ? (
                            <span className="flex items-center gap-2 uppercase text-[12px] 2xl:text-base tracking-widest font-black"><Folder size={16} className="2xl:w-5 2xl:h-5" /> SAVED PROJECTS</span>
                        ) : cat}
                    </button>
                ))}
            </div>

            {/* Mobile Filter Dropdown */}
            <div className="sm:hidden relative">
                <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 dark:bg-white/5 backdrop-blur-xl text-gray-700 dark:text-gray-200 rounded-xl border border-white/60 dark:border-white/10 font-bold text-[13px] sm:text-sm shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]"
                >
                    <Filter size={16} />
                    <span>{selectedCategory}</span>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isFilterOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white/40 dark:bg-[#1a1a1a]/80 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setIsFilterOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors ${
                                        cat === selectedCategory ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-400 hover:bg-white/20 dark:hover:bg-[#222]'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <button 
                onClick={() => router.push('/builder')}
                className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-3 2xl:px-10 2xl:py-6 bg-blue-500/5 dark:bg-blue-400/5 backdrop-blur-xl text-blue-600 dark:text-blue-400 border border-blue-500/30 dark:border-blue-400/20 rounded-xl 2xl:rounded-2xl font-black text-[13px] sm:text-sm 2xl:text-2xl hover:bg-blue-500/10 dark:hover:bg-blue-400/10 hover:scale-[1.02] transition-all active:scale-[0.98] whitespace-nowrap group shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-none"
            >
                <Plus size={18} className="2xl:w-8 2xl:h-8 group-hover:rotate-90 transition-transform duration-300" />
                <span>Start from scratch</span>
            </button>
        </div>
    );
}
