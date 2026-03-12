import { Mic, ArrowUp, Globe, Sparkles, Cpu, Zap, ShieldCheck, Layout } from 'lucide-react';
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
        <div className="flex-1 flex flex-col items-center justify-center pt-4 sm:pt-6 md:pt-8 px-4 md:px-6 w-full min-w-0 pb-16 sm:pb-12 overflow-y-auto custom-scrollbar">
            {/* Hero Section */}
            <div className="w-full max-w-4xl flex flex-col items-center mb-8 md:mb-10 animate-in fade-in slide-in-from-top-6 duration-1000">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                    <Sparkles size={11} className="animate-pulse" /> Introducing d-admin v2.0
                </div>
                
                <h2 className="text-2xl md:text-5xl font-bold text-white mb-3 text-center tracking-tight leading-[1.1]">
                    Build and deploy full-stack <br className="hidden md:block" />
                    <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent italic px-1 inline-block">
                        Websites with AI
                    </span>
                </h2>
                
                <p className="text-gray-400 text-center max-w-2xl mb-6 text-[14px] md:text-[16px] leading-relaxed px-4">
                    The world's most powerful AI developer experience. <br className="hidden md:block" />
                    Build, push to GitHub, deploy to Vercel, and export your project—all in a single click.
                </p>
            </div>
            
            <div className="w-full max-w-3xl min-w-0 mb-4 sm:mb-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
                <div className="relative flex items-center bg-[#2f2f2f] rounded-[32px] p-2 pl-3 pr-3 shadow-lg w-full group focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
                    <PlusActionMenu />
                    <input
                        type="text"
                        className="flex-1 min-w-0 bg-transparent border-none outline-none text-gray-200 px-2 sm:px-3 py-3 placeholder-gray-500 text-[16px] sm:text-[15px]"
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
