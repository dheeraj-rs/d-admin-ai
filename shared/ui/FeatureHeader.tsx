'use client';

import React from 'react';
import { Search, LucideIcon } from 'lucide-react';

interface FeatureHeaderProps {
    title: string;
    highlight?: string;
    description: string;
    searchValue: string;
    setSearchValue: (v: string) => void;
    searchPlaceholder?: string;
    gradientFrom?: string;
    gradientTo?: string;
    darkGradientFrom?: string;
    darkGradientTo?: string;
    accentColor?: 'blue' | 'green' | 'indigo' | 'cyan';
}

export default function FeatureHeader({ 
    title, 
    highlight, 
    description, 
    searchValue, 
    setSearchValue,
    searchPlaceholder = "Search...",
    gradientFrom = "from-blue-600",
    gradientTo = "to-indigo-600",
    darkGradientFrom = "dark:from-blue-400",
    darkGradientTo = "dark:to-indigo-400",
    accentColor = 'blue'
}: FeatureHeaderProps) {
    const focusBorder = {
        blue: 'focus:border-blue-500/50 dark:focus:border-blue-400/50',
        green: 'focus:border-green-500/50 dark:focus:border-green-400/50',
        indigo: 'focus:border-indigo-500/50 dark:focus:border-indigo-400/50',
        cyan: 'focus:border-cyan-500/50 dark:focus:border-cyan-400/50',
    }[accentColor];

    const focusBg = {
        blue: 'focus:bg-blue-500/10 dark:focus:bg-white/[0.08]',
        green: 'focus:bg-green-500/10 dark:focus:bg-white/[0.08]',
        indigo: 'focus:bg-indigo-500/10 dark:focus:bg-white/[0.08]',
        cyan: 'focus:bg-cyan-500/10 dark:focus:bg-white/[0.08]',
    }[accentColor];

    const iconColor = {
        blue: 'group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400',
        green: 'group-focus-within:text-green-500 dark:group-focus-within:text-green-400',
        indigo: 'group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400',
        cyan: 'group-focus-within:text-cyan-500 dark:group-focus-within:text-cyan-400',
    }[accentColor];

    const glowColor = {
        blue: 'bg-blue-500/15',
        green: 'bg-green-500/15',
        indigo: 'bg-indigo-500/15',
        cyan: 'bg-cyan-500/15',
    }[accentColor];

    return (
        <div className="mb-4 2xl:mb-8 animate-in fade-in slide-in-from-top-4 duration-700 w-full">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 w-full">
                <div className="min-w-0 flex-1">
                    <h1 className="text-3xl lg:text-4xl 2xl:text-6xl 3xl:text-8xl font-black text-[var(--text-main)] mb-2 2xl:mb-4">
                        {title} {highlight && (
                            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${gradientFrom} ${gradientTo} ${darkGradientFrom} ${darkGradientTo} italic font-serif`}>
                                {highlight}
                            </span>
                        )}
                    </h1>
                    <p className="text-[var(--text-muted)] text-sm lg:text-base 2xl:text-2xl 3xl:text-3xl font-medium max-w-xl 2xl:max-w-3xl">
                        {description}
                    </p>
                </div>

                <div className="w-full md:w-[280px] lg:w-[380px] 2xl:w-[500px] 3xl:w-[650px] shrink-0 group relative md:mt-2 2xl:mt-4">
                    <div className={`absolute inset-0 ${glowColor} blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity`} />
                    <div className="relative flex items-center">
                        <Search className={`absolute left-4 2xl:left-6 text-gray-400 dark:text-gray-500 ${iconColor} transition-colors 2xl:w-6 2xl:h-6`} size={18} />
                        <input 
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className={`w-full h-11 2xl:h-16 3xl:h-20 bg-blue-500/5 dark:bg-white/[0.05] backdrop-blur-xl border border-[var(--border-main)] rounded-2xl 2xl:rounded-3xl pl-12 2xl:pl-16 pr-4 text-[var(--text-main)] placeholder:text-[var(--text-muted)] text-sm 2xl:text-lg 3xl:text-xl focus:outline-none ${focusBorder} ${focusBg} transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
