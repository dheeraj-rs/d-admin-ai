'use client';

import { Mic, ArrowUp, Globe } from 'lucide-react';
import PlusActionMenu from '@/shared/ui/PlusActionMenu';
import { Suggestions } from '@/features/workspace/ai-chat-panel';
import type { ViewState } from '@/features/workspace';

interface AIChatInputPanelProps {
    inputValue: string;
    setInputValue: (v: string) => void;
    handleSubmit: () => void;
    setViewState: (s: ViewState) => void;
}

export default function AIChatInputPanel({ inputValue, setInputValue, handleSubmit, setViewState }: AIChatInputPanelProps) {
    return (
        <div className="w-full flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-3 duration-400">
            {/* Input box */}
            <div className="relative flex items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-[28px] 2xl:rounded-[40px] p-2 2xl:p-4 pl-3 pr-3 2xl:pl-5 2xl:pr-5 shadow-sm dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-full group focus-within:ring-2 focus-within:ring-indigo-500/30 transition-all border border-slate-200 dark:border-slate-800">
                <PlusActionMenu />
                <input
                    id="ai-build-input"
                    type="text"
                    className="flex-1 min-w-0 bg-transparent border-none outline-none text-[var(--text-main)] px-2.5 py-3 2xl:py-6 3xl:py-8 placeholder-slate-400 text-[16px] 2xl:text-[24px] 3xl:text-[28px]"
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
                <div className="flex items-center gap-1.5 2xl:gap-3 pr-0.5">
                    <button
                        id="ai-build-mic-btn"
                        className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 w-[36px] h-[36px] 2xl:w-[60px] 2xl:h-[60px] flex items-center justify-center rounded-full transition-colors"
                    >
                        <Mic size={20} className="2xl:w-8 2xl:h-8" strokeWidth={2} />
                    </button>
                    {inputValue.trim() ? (
                        <button
                            id="ai-build-submit-btn"
                            onClick={() => handleSubmit()}
                            className="bg-gray-900 dark:bg-white text-white dark:text-black w-[34px] h-[34px] 2xl:w-[56px] 2xl:h-[56px] rounded-full outline-none focus:outline-none flex items-center justify-center shrink-0 hover:bg-gray-800 dark:hover:bg-gray-200 transition-transform hover:scale-105 active:scale-95 shadow-sm"
                        >
                            <ArrowUp size={18} className="2xl:w-7 2xl:h-7" strokeWidth={2.5} />
                        </button>
                    ) : (
                        <button
                            id="ai-build-globe-btn"
                            className="bg-gray-900 dark:bg-white text-white dark:text-black w-[34px] h-[34px] 2xl:w-[56px] 2xl:h-[56px] rounded-full outline-none focus:outline-none flex items-center justify-center shrink-0 hover:bg-gray-800 dark:hover:bg-gray-200 transition-transform hover:scale-105 active:scale-95 shadow-sm"
                        >
                            <Globe size={18} className="2xl:w-7 2xl:h-7" strokeWidth={2.5} />
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
