'use client';

import { Sparkles, LayoutTemplate } from 'lucide-react';

type Mode = 'ai' | 'template';

interface ModeToggleProps {
    activeMode: Mode;
    onModeChange: (mode: Mode) => void;
}

export default function ModeToggle({ activeMode, onModeChange }: ModeToggleProps) {
    return (
        <div className="relative flex items-center bg-[#1a1a1a] rounded-2xl p-1 border border-white/[0.06] shadow-inner w-full max-w-xs mx-auto">
            {/* Sliding pill — Templates is LEFT (default), AI Build is RIGHT */}
            <div
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl bg-gradient-to-r transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                    activeMode === 'template'
                        ? 'left-1 from-purple-600 to-violet-600 shadow-lg shadow-purple-900/40'
                        : 'left-[calc(50%)] from-blue-600 to-indigo-600 shadow-lg shadow-blue-900/40'
                }`}
            />
            {/* Templates — first / left */}
            <button
                id="mode-toggle-template"
                onClick={() => onModeChange('template')}
                className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all duration-200 text-[14px] font-semibold ${
                    activeMode === 'template' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
            >
                <LayoutTemplate size={15} className={activeMode === 'template' ? '' : ''} />
                Templates
            </button>
            {/* AI Build — second / right */}
            <button
                id="mode-toggle-ai"
                onClick={() => onModeChange('ai')}
                className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all duration-200 text-[14px] font-semibold ${
                    activeMode === 'ai' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
            >
                <Sparkles size={15} className={activeMode === 'ai' ? 'animate-pulse' : ''} />
                AI Build
            </button>
        </div>
    );
}
