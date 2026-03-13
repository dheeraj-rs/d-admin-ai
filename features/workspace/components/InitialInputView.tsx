'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import ModeToggle from './ModeToggle';
import AIBuildPanel from './AIBuildPanel';
import TemplateModePanel from './TemplateModePanel';
import type { ViewState } from '../types/index';

type Mode = 'ai' | 'template';

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
    const [mode, setMode] = useState<Mode>('template');

    return (
        <div className="flex-1 flex flex-col items-center justify-start pt-5 sm:pt-8 px-4 md:px-6 w-full min-w-0 pb-16 overflow-y-auto custom-scrollbar">
            {/* ── Hero section ── */}
            <div className="w-full max-w-lg flex flex-col items-center animate-in fade-in slide-in-from-top-6 duration-700 mb-5">
                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                    <Sparkles size={10} className="animate-pulse" /> Introducing d-admin v2.0
                </div>

                {/* Headline */}
                <h1 className="w-full font-extrabold text-white mb-3 text-center tracking-tight leading-[1.12] text-[22px] xs:text-[26px] sm:text-4xl md:text-5xl whitespace-nowrap pr-2">
                    Build &amp; deploy{' '}
                    <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent italic">
                        Websites with AI
                    </span>
                </h1>

                {/* Value subtitle — confidence inspiring, specific */}
                <p className="text-gray-400 text-center text-[13px] sm:text-[14px] leading-[1.7] px-1 mb-5 max-w-[340px]">
                    Go from an idea to a{' '}
                    <span className="text-white font-semibold">live website in under&nbsp;60&nbsp;seconds</span>
                    {' '}— completely free.
                    <br />
                    <span className="text-gray-500 text-[12px]">
                        No code needed · Export to GitHub · One‑click publish
                    </span>
                </p>

                {/* Mode Switch */}
                <ModeToggle activeMode={mode} onModeChange={setMode} />
            </div>

            {/* ── Mode panel ── */}
            <div className="w-full max-w-lg">
                {mode === 'ai' ? (
                    <AIBuildPanel
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        handleSubmit={handleSubmit}
                        setViewState={setViewState}
                    />
                ) : (
                    <TemplateModePanel />
                )}
            </div>

            {/* ── Fixed bottom stat bar — always visible at device bottom ── */}
            <div className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-center gap-3 py-3 text-[11px] font-medium"
                style={{ background: 'linear-gradient(to top, #212121 60%, transparent)' }}
            >
                <span className="flex items-center gap-1 text-gray-400"><span className="text-yellow-400">⚡</span> Live in 60s</span>
                <span className="text-gray-700">·</span>
                <span className="flex items-center gap-1 text-gray-400"><span className="text-green-400">✓</span> Free forever</span>
                <span className="text-gray-700">·</span>
                <span className="flex items-center gap-1 text-gray-400"><span className="text-purple-400">↑</span> Push to GitHub</span>
            </div>
        </div>
    );
}
