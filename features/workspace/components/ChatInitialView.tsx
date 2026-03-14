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
        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar relative h-full">

            {/* Ambient background glows */}
            <div className="pointer-events-none fixed top-0 left-0 w-[60vw] h-[40vh] bg-purple-600/15 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/4 z-0" />
            <div className="pointer-events-none fixed top-1/4 right-0 w-[40vw] h-[30vh] bg-blue-600/10 rounded-full blur-[100px] translate-x-1/3 z-0" />

            {/* ── Scrollable page content ── */}
            <main className="flex-1 relative z-10 w-full flex flex-col justify-center min-h-[80vh]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-20">
                    
                    {/* Hero Section */}
                    <section className="text-center pb-6 lg:pb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-8">
                            <Sparkles size={10} className="animate-pulse" /> Introducing d-admin v2.0
                        </div>
                        <h1 className="font-extrabold tracking-tight mb-3 leading-[1.08]">
                            <span className="block text-white text-[32px] sm:text-[44px] xl:text-[48px]">
                                What do you want to build?
                            </span>
                        </h1>
                        <p className="text-[#9CA3AF] text-[13px] sm:text-[15px] font-medium max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
                            Describe your idea, and we'll scaffold it in seconds.
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
