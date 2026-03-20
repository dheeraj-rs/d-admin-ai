'use client';

import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomeAICard() {
    const router = useRouter();
    const [typedText, setTypedText] = useState('');
    const fullText = "A sleek, sustainable energy e-commerce site with green accents and modular navigation....";

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                setTypedText(prev => prev + fullText.charAt(i));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 40);
        return () => clearInterval(typingInterval);
    }, []);

    return (
        <div className="w-full max-w-[380px] md:max-w-[420px] lg:max-w-[460px] 2xl:max-w-[650px] 3xl:max-w-[850px] md:flex-1 relative z-20 flex flex-col justify-center gap-4 2xl:gap-8 shrink-0"> 
            <div className="w-full relative z-30 mb-2 overflow-visible">
                <div className="w-full glass-card-premium rounded-2xl p-5 flex flex-col relative">
                    {/* Corner Arcs - Detached Premium Glow (Increased Gap) */}
                    <div className="absolute -top-[12px] -left-[12px] w-14 h-14 border-t-[3px] border-l-[3px] border-indigo-500 dark:border-indigo-400 rounded-tl-2xl pointer-events-none z-50 shadow-[0_0_20px_rgba(99,102,241,0.5)]"></div>
                    <div className="absolute -bottom-[12px] -right-[12px] w-14 h-14 border-b-[3px] border-r-[3px] border-indigo-500 dark:border-indigo-400 rounded-br-2xl pointer-events-none z-50 shadow-[0_0_20px_rgba(99,102,241,0.5)]"></div>

                    <div className="flex items-center gap-3 2xl:gap-5 mb-4 2xl:mb-6 pl-1 decoration-clone">
                        <div className="w-8 h-8 2xl:w-12 2xl:h-12 rounded-lg bg-indigo-50/50 dark:bg-slate-800 border border-indigo-500/10 dark:border-indigo-400/40 flex items-center justify-center shadow-sm">
                            <span className="text-indigo-600 dark:text-indigo-400 font-bold text-[12px] 2xl:text-[16px] font-mono tracking-widest">AI</span>
                        </div>
                        <span className="text-[14px] 2xl:text-[22px] 3xl:text-[28px] font-bold text-[var(--text-main)] tracking-wide">Describe your website...</span>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-950/80 rounded-xl p-4 2xl:p-6 min-h-[110px] lg:min-h-[130px] 2xl:min-h-[180px] 3xl:min-h-[240px] border border-slate-100 dark:border-slate-800 relative shadow-[inset_0_2px_8px_rgba(0,0,0,0.01)] dark:shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] flex flex-col justify-between group transition-all duration-300">
                        <p className="text-[12px] md:text-[13px] 2xl:text-[20px] 3xl:text-[26px] !text-slate-100 leading-relaxed font-normal">
                            {typedText}
                            <span className="inline-block w-[2px] h-3.5 2xl:h-8 ml-1 bg-indigo-500 dark:bg-indigo-400 animate-pulse align-middle" />
                        </p>
                        <div className="self-end mt-2 text-slate-400 dark:text-slate-500 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            <Send size={15} className="dark:drop-shadow-[0_0_5px_rgba(255,255,255,0.1)]" />
                        </div>
                    </div>
                </div>
            </div>
            <button 
                onClick={() => router.push('/ai-chat-panel')}
                className="w-full py-3.5 md:py-4 2xl:py-5 3xl:py-6 rounded-[12px] 2xl:rounded-[16px] bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-extrabold text-[13px] 2xl:text-[15px] 3xl:text-[18px] tracking-widest shadow-[0_8px_20px_rgba(79,70,229,0.25)] hover:shadow-[0_12px_25px_rgba(79,70,229,0.4)] transition-all flex items-center justify-center transform hover:scale-[1.01] z-30 cursor-pointer"
            >
                START WITH AI CONVERSATION
            </button>
        </div>
    );
}
