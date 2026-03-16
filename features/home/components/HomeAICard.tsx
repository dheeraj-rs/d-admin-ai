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
            <div className="w-full relative z-30 mb-2">
                <div className="absolute -top-[8px] -left-[8px] w-8 h-8 border-t-[1.5px] border-l-[1.5px] border-indigo-500/30 dark:border-indigo-400/50 rounded-tl-2xl pointer-events-none opacity-90 shadow-[-4px_-4px-10px_rgba(79,70,229,0.1)] dark:shadow-[-4px_-4px-10px_rgba(79,70,229,0.2)] z-10"></div>
                <div className="absolute -bottom-[8px] -right-[8px] w-8 h-8 border-b-[1.5px] border-r-[1.5px] border-indigo-500/30 dark:border-indigo-400/50 rounded-br-2xl pointer-events-none opacity-90 shadow-[4px_4px_10px_rgba(79,70,229,0.1)] dark:shadow-[4px_4px-10px_rgba(79,70,229,0.2)] z-10"></div>
                <div className="w-full bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border-[1.5px] border-indigo-200/60 dark:border-indigo-500/30 rounded-xl p-5 shadow-[0_8px_32px_rgba(74,70,229,0.06),inset_0_0_15px_rgba(255,255,255,0.3)] dark:shadow-[0_0_30px_rgba(79,70,229,0.1),inset_0_0_15px_rgba(79,70,229,0.05)] flex flex-col relative z-20 transition-colors duration-300">
                    <div className="flex items-center gap-3 2xl:gap-5 mb-4 2xl:mb-6 pl-1">
                        <div className="w-8 h-8 2xl:w-12 2xl:h-12 rounded-lg bg-indigo-50 dark:bg-slate-800 border border-indigo-500/20 dark:border-indigo-400/40 flex items-center justify-center shadow-sm">
                            <span className="text-indigo-600 dark:text-indigo-400 font-bold text-[12px] 2xl:text-[16px] font-mono tracking-widest">AI</span>
                        </div>
                        <span className="text-[14px] 2xl:text-[22px] 3xl:text-[28px] font-medium text-[var(--text-main)] tracking-wide">Describe your website...</span>
                    </div>
                    <div className="bg-white/80 dark:bg-slate-950/80 rounded-xl p-4 2xl:p-6 min-h-[110px] lg:min-h-[130px] 2xl:min-h-[180px] 3xl:min-h-[240px] border border-slate-200 dark:border-slate-800 relative shadow-[inset_0_2px_8px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] flex flex-col justify-between group transition-colors duration-300">
                        <p className="text-[var(--text-main)] font-medium dark:font-light text-[14px] 2xl:text-[22px] 3xl:text-[28px] leading-[1.6]">
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
