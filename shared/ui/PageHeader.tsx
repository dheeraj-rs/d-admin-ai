import React from 'react';
import { Search, LucideIcon } from 'lucide-react';

interface PageHeaderProps {
    title: string;
    highlight?: string;
    description: string;
    icon?: LucideIcon;
    searchValue: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;
}

export default function PageHeader({
    title,
    highlight,
    description,
    icon: Icon,
    searchValue,
    onSearchChange,
    searchPlaceholder = "Search...",
}: PageHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 w-full animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    {Icon && (
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                            <Icon size={24} />
                        </div>
                    )}
                    <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                        {title} {highlight && <span className="text-blue-400 underline decoration-blue-500/30 underline-offset-8">{highlight}</span>}
                    </h1>
                </div>
                <p className="text-gray-400 text-lg max-w-2xl">
                    {description}
                </p>
            </div>

            <div className="relative group min-w-[280px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                    type="text" 
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="bg-[#2a2a2a] border border-[#3e3e3e] rounded-xl pl-10 pr-4 py-3 w-full text-sm focus:outline-none focus:border-blue-500/50 transition-all text-gray-200 placeholder:text-gray-500"
                />
            </div>
        </div>
    );
}
