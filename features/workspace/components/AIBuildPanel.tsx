'use client';

import { Mic, ArrowUp, Globe } from 'lucide-react';
import PlusActionMenu from '@/shared/ui/PlusActionMenu';
import { Suggestions } from '@/features/chat';
import type { ViewState } from '../types/index';

interface AIBuildPanelProps {
    inputValue: string;
    setInputValue: (v: string) => void;
    handleSubmit: () => void;
    setViewState: (s: ViewState) => void;
}

export default function AIBuildPanel({ inputValue, setInputValue, handleSubmit, setViewState }: AIBuildPanelProps) {
    return (
        <div className="w-full flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-3 duration-400">
            {/* Input box */}
            <div className="relative flex items-center bg-white dark:bg-[#2a2a2a] rounded-[28px] p-2 pl-3 pr-3 shadow-sm dark:shadow-xl w-full group focus-within:ring-2 focus-within:ring-blue-500/40 transition-all border border-gray-200 dark:border-white/[0.05]">
                <PlusActionMenu />
                <input
                    id="ai-build-input"
                    type="text"
                    className="flex-1 min-w-0 bg-transparent border-none outline-none text-gray-900 dark:text-gray-200 px-2.5 py-3 placeholder-gray-500 text-[16px]"
                    placeholder="Describe what you want to build..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}
                />
                <div className="flex items-center gap-1.5 pr-0.5">
                    <button
                        id="ai-build-mic-btn"
                        className="text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-transparent w-[36px] h-[36px] flex items-center justify-center rounded-full transition-colors"
                    >
                        <Mic size={20} strokeWidth={2} />
                    </button>
                    {inputValue.trim() ? (
                        <button
                            id="ai-build-submit-btn"
                            onClick={handleSubmit}
                            className="bg-blue-600 hover:bg-blue-500 text-white w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/40"
                        >
                            <ArrowUp size={18} strokeWidth={2.5} />
                        </button>
                    ) : (
                        <button
                            id="ai-build-globe-btn"
                            className="bg-gray-900 dark:bg-white text-white dark:text-black w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 shadow-sm"
                        >
                            <Globe size={18} strokeWidth={2.5} />
                        </button>
                    )}
                </div>
            </div>

            {/* Suggestion chips */}
            <Suggestions
                onSelect={(text) => {
                    setInputValue(text);
                    const lower = text.toLowerCase();
                    if (lower.includes('html') || lower.includes('code') || lower.includes('website')) {
                        setViewState('chat-with-code');
                    } else {
                        setViewState('chat');
                    }
                }}
            />
        </div>
    );
}
