'use client';

import { ExternalLink, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface ProviderHeaderProps {
    title: string;
    url: string;
    expanded: boolean;
    videoUrl?: string;
    onToggle: () => void;
    onHelp: (url: string) => void;
}

export const ProviderHeader = ({
    title,
    url,
    expanded,
    videoUrl,
    onToggle,
    onHelp,
}: ProviderHeaderProps) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={onToggle}>
                <label className="text-[15px] font-bold text-slate-800 dark:text-slate-200 cursor-pointer group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase tracking-tight italic">
                    {title}
                </label>
                <div
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        videoUrl && onHelp(videoUrl);
                    }}
                >
                    <HelpCircle
                        size={14}
                        className="text-slate-400 group-hover:text-indigo-500 transition-colors"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] font-black text-indigo-600 dark:text-indigo-400 hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors uppercase tracking-wider"
                >
                    Get Key <ExternalLink size={12} />
                </a>
                <button
                    onClick={onToggle}
                    className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                    {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
            </div>
        </div>
    );
};
