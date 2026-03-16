'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface TemplatesHeaderProps {
    searchValue: string;
    setSearchValue: (v: string) => void;
}

export default function TemplatesHeader({ searchValue, setSearchValue }: TemplatesHeaderProps) {
    return (
        <div className="mb-8 2xl:mb-16 text-center animate-in fade-in slide-in-from-top-4 duration-700">
            <h1 className="text-3xl lg:text-4xl 2xl:text-6xl 3xl:text-8xl font-black text-gray-900 dark:text-white mb-3 2xl:mb-6">
                Start with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 italic font-serif">Templates</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm lg:text-base 2xl:text-2xl 3xl:text-3xl font-medium max-w-xl 2xl:max-w-3xl mx-auto mb-8 2xl:mb-12">
                Choose a starting point and build exactly what you imagine with drag-and-drop.
            </p>

            <div className="relative max-w-2xl 2xl:max-w-4xl mx-auto group">
                <div className="absolute inset-0 bg-blue-500/10 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <div className="relative flex items-center">
                    <Search className="absolute left-4 2xl:left-6 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors 2xl:w-6 2xl:h-6" size={20} />
                    <input 
                        type="text"
                        placeholder="Search premium templates..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-full h-12 2xl:h-16 3xl:h-20 bg-cyan-50 dark:bg-white/[0.03] border border-cyan-200 dark:border-white/[0.08] rounded-2xl 2xl:rounded-3xl pl-12 2xl:pl-16 pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm 2xl:text-lg 3xl:text-xl focus:outline-none focus:border-blue-500/50 focus:bg-cyan-100 dark:focus:bg-white/[0.05] transition-all shadow-sm dark:shadow-none"
                    />
                </div>
            </div>
        </div>
    );
}
