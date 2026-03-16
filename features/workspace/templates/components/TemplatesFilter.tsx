'use client';

import React from 'react';
import { Plus, Filter, ChevronDown } from 'lucide-react';
import { CATEGORIES } from '@/features/workspace/templates';

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
    return (
        <div className="flex items-center justify-between mb-8 2xl:mb-12 gap-2 sm:gap-4 pb-2 border-b border-gray-200 dark:border-white/5 px-1 relative">
            {/* Desktop Categories */}
            <div className="hidden sm:flex items-center gap-2 2xl:gap-4 overflow-x-auto no-scrollbar scroll-smooth">
                {CATEGORIES.map((cat) => (
                    <button 
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-1.5 2xl:px-8 2xl:py-3 rounded-full text-sm 2xl:text-xl font-medium transition-all whitespace-nowrap ${
                            cat === selectedCategory ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-gray-100 dark:bg-[#2a2a2a] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#333333] hover:text-gray-900 dark:hover:text-gray-200 border border-gray-200 dark:border-[#3e3e3e]'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Mobile Filter Dropdown */}
            <div className="sm:hidden relative">
                <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-200 rounded-xl border border-gray-200 dark:border-white/10 font-bold text-[13px] sm:text-sm"
                >
                    <Filter size={16} />
                    <span>{selectedCategory}</span>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isFilterOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setIsFilterOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                                        cat === selectedCategory ? 'bg-blue-500/10 text-blue-500' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#222]'
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
                onClick={() => onBack?.()}
                className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 2xl:px-10 2xl:py-5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white rounded-xl 2xl:rounded-2xl font-bold text-[13px] sm:text-sm 2xl:text-2xl hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(37,99,235,0.4)] transition-all active:scale-[0.98] whitespace-nowrap group shrink-0"
            >
                <Plus size={18} className="2xl:w-8 2xl:h-8 group-hover:rotate-90 transition-transform duration-300" />
                <span>Start from scratch</span>
            </button>
        </div>
    );
}
