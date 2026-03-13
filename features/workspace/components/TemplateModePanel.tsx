'use client';

import { useRouter } from 'next/navigation';
import { ArrowUp, Search, Briefcase, Rocket, BookOpen, ShoppingBag, Globe, Layout } from 'lucide-react';
import { useState } from 'react';

const TEMPLATE_SUGGESTIONS = [
    { id: 'ts1', label: 'Portfolio website', icon: Globe },
    { id: 'ts2', label: 'SaaS landing page', icon: Rocket },
    { id: 'ts3', label: 'Business website', icon: Briefcase },
    { id: 'ts4', label: 'Blog', icon: BookOpen },
    { id: 'ts5', label: 'Agency website', icon: Layout },
    { id: 'ts6', label: 'E-commerce store', icon: ShoppingBag },
];

export default function TemplateModePanel() {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');

    const goToTemplates = (query: string) => {
        const trimmed = query.trim();
        if (trimmed) {
            router.push(`/templates?search=${encodeURIComponent(trimmed)}`);
        } else {
            router.push('/templates');
        }
    };

    return (
        <div className="w-full flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-3 duration-400">
            {/* Search input — identical style to AI Build */}
            <div className="relative flex items-center bg-[#2a2a2a] rounded-[28px] p-2 pl-3 pr-3 shadow-xl w-full group focus-within:ring-2 focus-within:ring-purple-500/40 transition-all border border-white/[0.05]">
                <div className="w-8 h-8 flex items-center justify-center text-gray-500 shrink-0">
                    <Search size={18} strokeWidth={2} />
                </div>
                <input
                    id="template-search-input"
                    type="text"
                    className="flex-1 min-w-0 bg-transparent border-none outline-none text-gray-200 px-2.5 py-3 placeholder-gray-500 text-[16px]"
                    placeholder="Search templates..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            goToTemplates(searchValue);
                        }
                    }}
                />
                <div className="flex items-center gap-1.5 pr-0.5">
                    {searchValue.trim() ? (
                        <button
                            id="template-search-submit"
                            onClick={() => goToTemplates(searchValue)}
                            className="bg-purple-600 hover:bg-purple-500 text-white w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-purple-900/40"
                        >
                            <ArrowUp size={18} strokeWidth={2.5} />
                        </button>
                    ) : (
                        <button
                            id="template-browse-btn"
                            onClick={() => goToTemplates('')}
                            className="bg-white text-black w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0 hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 shadow-sm"
                        >
                            <ArrowUp size={18} strokeWidth={2.5} />
                        </button>
                    )}
                </div>
            </div>

            {/* Suggestion chips — EXACT same style as AI Build Suggestions component */}
            <div className="mt-2 flex flex-wrap justify-center gap-2.5 w-full max-w-3xl mx-auto px-2">
                {TEMPLATE_SUGGESTIONS.map((s) => (
                    <button
                        key={s.id}
                        id={`template-suggestion-${s.id}`}
                        onClick={() => goToTemplates(s.label)}
                        className="flex items-center gap-2 px-3.5 py-2 bg-transparent border border-[#3e3e3e] hover:bg-[#2a2a2a] hover:border-[#4a4a4a] rounded-full transition-all duration-200 cursor-pointer group shadow-sm text-left max-w-full"
                    >
                        <s.icon
                            size={15}
                            strokeWidth={2}
                            className="text-gray-400 shrink-0 group-hover:text-gray-300 transition-colors"
                        />
                        <span className="text-[13px] text-gray-300 font-medium group-hover:text-gray-100 transition-colors tracking-wide truncate">
                            {s.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
