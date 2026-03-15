'use client';

import { Sparkles } from 'lucide-react';
import AIBuildPanel from './AIBuildPanel';
import type { ViewState } from '../types/index';

interface ChatInitialViewProps {
    inputValue: string;
    setInputValue: (v: string) => void;
    handleSubmit: () => void;
    setViewState: (s: ViewState) => void;
}

export default function ChatInitialView({
    inputValue,
    setInputValue,
    handleSubmit,
    setViewState,
}: ChatInitialViewProps) {
    return (
        /* Full-height scroll container */
        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar relative h-full z-10 font-sans">
            {/* ── Scrollable page content ── */}
            <main className="flex-1 relative z-10 w-full flex flex-col justify-center min-h-[80vh]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-20">
                    {/* Hero Section */}
                    <section className="text-center pb-6 lg:pb-8 animate-in fade-in slide-in-from-top-4 duration-700 relative flex flex-col items-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6 transition-all duration-300 hover:bg-blue-500/20">
                            <Sparkles size={10} className="animate-pulse" /> Introducing d-admin v2.0
                        </div>
                        <h1 className="font-extrabold tracking-tight mb-4 leading-[1.08]">
                            <span className="block text-gray-900 dark:text-white text-[32px] sm:text-[44px] xl:text-[48px]">
                                What do you want to build?
                            </span>
                        </h1>
                        <p className="text-gray-500 dark:text-[#9CA3AF] text-[13px] sm:text-[15px] font-medium max-w-lg mx-auto leading-relaxed">
                            Tell what website you want to build and the features you need.
                            This AI helps create websites, not general chatting.
                        </p>
                    </section>

                    {/* Main panel */}
                    <div className="flex flex-col gap-4 lg:gap-5 animate-in fade-in duration-500">
                        <AIBuildPanel
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                            handleSubmit={handleSubmit}
                            setViewState={setViewState}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
