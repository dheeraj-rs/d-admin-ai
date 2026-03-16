'use client';

import { Sparkles } from 'lucide-react';
import AIChatInputPanel from './AIChatInputPanel';
import type { ViewState } from '@/features/workspace';

interface AIChatLandingPageProps {
    inputValue: string;
    setInputValue: (v: string) => void;
    handleSubmit: () => void;
    setViewState: (s: ViewState) => void;
}

export default function AIChatLandingPage({
    inputValue,
    setInputValue,
    handleSubmit,
    setViewState,
}: AIChatLandingPageProps) {
    return (
        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar relative h-full z-10 font-sans">
            <main className="flex-1 relative z-10 w-full flex flex-col justify-center min-h-[80dvh] 2xl:min-h-[90dvh]">
                <div className="max-w-3xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <section className="text-center pb-6 lg:pb-8 animate-in fade-in slide-in-from-top-4 duration-700 relative flex flex-col items-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 2xl:px-6 2xl:py-3 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-[10px] 2xl:text-[18px] font-bold uppercase tracking-widest mb-6 2xl:mb-12 transition-all duration-300 hover:bg-blue-500/20">
                            <Sparkles size={10} className="animate-pulse 2xl:w-5 2xl:h-5" /> Introducing d-admin v2.0
                        </div>
                        <h1 className="font-extrabold tracking-tight mb-4 2xl:mb-8 leading-[1.08]">
                            <span className="block text-gray-900 dark:text-white text-[32px] sm:text-[44px] xl:text-[48px] 2xl:text-[84px] 3xl:text-[110px]">
                                What do you want to build?
                            </span>
                        </h1>
                        <p className="text-gray-500 dark:text-[#9CA3AF] text-[13px] sm:text-[15px] 2xl:text-[24px] 3xl:text-[30px] font-medium max-w-lg 2xl:max-w-3xl mx-auto leading-relaxed">
                            Tell what website you want to build and the features you need.
                            This AI helps create websites, not general chatting.
                        </p>
                    </section>
                    <div className="flex flex-col gap-4 lg:gap-5 animate-in fade-in duration-500">
                        <AIChatInputPanel
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
