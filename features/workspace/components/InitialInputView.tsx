'use client';

import { Mic, ArrowUp, Globe } from 'lucide-react';
import PlusActionMenu from '@/shared/ui/PlusActionMenu';
import { Suggestions } from '@/features/chat';
import type { ViewState } from '../types/index';

interface InitialInputViewProps {
    inputValue: string;
    setInputValue: (v: string) => void;
    handleSubmit: () => void;
    setViewState: (s: ViewState) => void;
}

export default function InitialInputView({
    inputValue,
    setInputValue,
    handleSubmit,
    setViewState,
}: InitialInputViewProps) {
    return (
        <div className="flex-1 flex flex-col items-center justify-end sm:justify-center px-4 md:px-6 w-full min-w-0 pb-16 sm:pb-0">
            <h1 className="text-2xl md:text-[32px] font-semibold text-gray-200 mb-6 md:mb-8 tracking-tight text-center w-full">
                Where should we begin?
            </h1>
            <div className="w-full max-w-3xl min-w-0 mb-4 sm:mb-0">
                <div className="relative flex items-center bg-[#2f2f2f] rounded-[32px] p-2 pl-3 pr-3 shadow-lg w-full">
                    <PlusActionMenu />
                    <input
                        type="text"
                        className="flex-1 min-w-0 bg-transparent border-none outline-none text-gray-200 px-2 sm:px-3 py-3 placeholder-gray-500 text-[16px] sm:text-[15px]"
                        placeholder="Ask anything"
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
                        <button className="text-gray-400 hover:text-gray-200 w-[34px] h-[34px] flex items-center justify-center focus:outline-none transition-colors rounded-full">
                            <Mic size={20} strokeWidth={2} />
                        </button>
                        {inputValue.trim() ? (
                            <button
                                onClick={handleSubmit}
                                className="bg-white text-black w-[34px] h-[34px] rounded-full outline-none focus:outline-none flex items-center justify-center shrink-0 hover:bg-gray-200 transition-transform hover:scale-105 active:scale-95 shadow-sm"
                            >
                                <ArrowUp size={18} strokeWidth={2.5} />
                            </button>
                        ) : (
                            <button className="bg-white text-black w-[34px] h-[34px] rounded-full outline-none focus:outline-none flex items-center justify-center shrink-0 hover:bg-gray-200 transition-transform hover:scale-105 active:scale-95 shadow-sm">
                                <Globe size={18} strokeWidth={2.5} />
                            </button>
                        )}
                    </div>
                </div>
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
        </div>
    );
}
