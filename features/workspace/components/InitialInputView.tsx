'use client';

import { useState } from 'react';
import { Zap, CheckSquare, Upload, Sparkles } from 'lucide-react';
import HeroCards from './HeroCards';
import TemplatePreviews from './TemplatePreviews';
import AIBuildPanel from './AIBuildPanel';
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
    const [showAIPanel, setShowAIPanel] = useState(false);

    const handleStartWithAI = () => {
        setShowAIPanel(true);
        setTimeout(() => document.getElementById('ai-build-input')?.focus(), 100);
    };

    return (
        /* Full-height scroll container */
        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar relative">

            {/* Ambient background glows */}
            <div className="pointer-events-none fixed top-0 left-0 w-[60vw] h-[40vh] bg-purple-600/15 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/4 z-0" />
            <div className="pointer-events-none fixed top-1/4 right-0 w-[40vw] h-[30vh] bg-blue-600/10 rounded-full blur-[100px] translate-x-1/3 z-0" />

            {/* ── Scrollable page content ── */}
            <main className="flex-1 relative z-10 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-8">
                    

                    {/* Hero Section */}
                    <section className="text-center pt-6 sm:pt-10 pb-6 lg:pb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                            <Sparkles size={10} className="animate-pulse" /> Introducing d-admin v2.0
                        </div>
                        <h1 className="font-extrabold tracking-tight mb-3 leading-[1.08]">
                            <span className="block text-white text-[32px] sm:text-[44px] lg:text-[56px] xl:text-[64px]">
                                BUILD &amp; DEPLOY
                            </span>
                            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#F472B6] via-[#D8B4FE] to-[#818CF8] text-[32px] sm:text-[44px] lg:text-[56px] xl:text-[64px] italic">
                                Websites with AI
                            </span> 
                        </h1>
                        <p className="text-[#9CA3AF] text-[13px] sm:text-[15px] lg:text-[16px] font-medium max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
                            From conception to live in under 60 seconds - always free.
                        </p>
                    </section>

                    {/* Main panel */}
                    {showAIPanel ? (
                        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-3 duration-400">
                            <button
                                onClick={() => setShowAIPanel(false)}
                                className="self-start flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-gray-300 transition-colors"
                            >
                                ← Back
                            </button>
                            <AIBuildPanel
                                inputValue={inputValue}
                                setInputValue={setInputValue}
                                handleSubmit={handleSubmit}
                                setViewState={setViewState}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 lg:gap-5 animate-in fade-in duration-500">
                            <HeroCards onStartWithAI={handleStartWithAI} setViewState={setViewState} />
                            <TemplatePreviews />

                            {/* Platform Performance Dashboard */}
                            <section className="bg-[#13131E] border border-white/5 rounded-[24px] p-6 shadow-2xl relative group mb-2 overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 bg-blue-500/5 blur-3xl rounded-full" />
                                
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-[11px] font-black text-blue-400/80 tracking-[0.2em] uppercase">
                                        Platform Performance
                                    </h3>
                                    <div className="flex gap-1">
                                        <div className="w-1 h-1 rounded-full bg-blue-500/50" />
                                        <div className="w-1 h-1 rounded-full bg-blue-500/30" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
                                    <div className="flex flex-col gap-1 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.04] transition-colors">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Avg. Deploy</span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl font-black text-white">58</span>
                                            <span className="text-xs font-bold text-blue-500">sec</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.04] transition-colors">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Sites</span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl font-black text-white">3.2</span>
                                            <span className="text-xs font-bold text-[#F472B6]">million</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.04] transition-colors">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Core Engine</span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-lg font-black text-white truncate">D-Admin AI</span>
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
