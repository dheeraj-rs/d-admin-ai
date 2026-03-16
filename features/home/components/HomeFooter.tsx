import React from 'react';
import { BrainCircuit, CloudLightning, Settings2 } from 'lucide-react';

export default function HomeFooter() {
    return (
        <footer className="shrink-0 border-t border-slate-200/10 dark:border-slate-800/10 pt-4 2xl:pt-12 3xl:pt-16 z-20 w-full relative mt-auto transition-colors duration-300">
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 lg:gap-14 2xl:gap-20 3xl:gap-28 w-full pb-4 2xl:pb-8 3xl:pb-10">
                <div className="flex items-center gap-3 2xl:gap-6 group cursor-default scale-90 lg:scale-100 2xl:scale-125 3xl:scale-150">
                    <div className="w-[38px] h-[38px] flex items-center gap-1 justify-center transition-colors">
                        <div className="w-[10px] h-[20px] bg-indigo-500 dark:bg-indigo-400 border border-indigo-600 dark:border-indigo-300 rounded-[2px] shadow-[0_0_10px_rgba(79,70,229,0.3)]" />
                        <div className="w-[14px] h-[20px] bg-indigo-500 dark:bg-indigo-400 border border-indigo-600 dark:border-indigo-300 rounded-[2px] flex items-center justify-center shadow-[0_0_10px_rgba(79,70,229,0.3)]">
                            <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-[6px] border-l-white dark:border-l-white" />
                        </div>
                        <div className="w-[10px] h-[20px] bg-indigo-500 dark:bg-indigo-400 border border-indigo-600 dark:border-indigo-300 rounded-[2px] shadow-[0_0_10px_rgba(79,70,229,0.3)]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-extrabold text-[13px] 2xl:text-[16px] text-slate-900 dark:text-white tracking-wider">INTERACT</span>
                        <span className="text-[9px] 2xl:text-[12px] text-indigo-600 dark:text-indigo-400 font-bold tracking-[0.2em] uppercase mt-0.5">Templates</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 2xl:gap-6 group cursor-default scale-90 lg:scale-100 2xl:scale-125 3xl:scale-150">
                    <div className="w-[38px] h-[38px] rounded-lg flex items-center justify-center transition-colors">
                        <BrainCircuit className="text-indigo-600 dark:text-indigo-400 w-7 h-7 drop-shadow-[0_0_5px_rgba(79,70,229,0.3)]" strokeWidth={2} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-extrabold text-[13px] 2xl:text-[16px] text-slate-900 dark:text-white tracking-wider">D-ADMIN</span>
                        <span className="text-[9px] 2xl:text-[12px] text-indigo-600 dark:text-indigo-400 font-bold tracking-[0.2em] uppercase mt-0.5">AI Engine</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 2xl:gap-6 group cursor-default scale-90 lg:scale-100 2xl:scale-125 3xl:scale-150">
                    <div className="w-[38px] h-[38px] flex items-center justify-center transition-colors">
                        <CloudLightning className="text-indigo-600 dark:text-indigo-400 w-7 h-7 drop-shadow-[0_0_5px_rgba(79,70,229,0.3)]" strokeWidth={2} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-extrabold text-[13px] 2xl:text-[16px] text-slate-900 dark:text-white tracking-wider">INSTANT</span>
                        <span className="text-[9px] 2xl:text-[12px] text-indigo-600 dark:text-indigo-400 font-bold tracking-[0.2em] uppercase mt-0.5">Deploy</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 2xl:gap-6 group cursor-default scale-90 lg:scale-100 2xl:scale-125 3xl:scale-150">
                    <div className="w-[38px] h-[38px] flex items-center justify-center transition-colors">
                        <Settings2 className="text-indigo-600 dark:text-indigo-400 w-7 h-7 drop-shadow-[0_0_5px_rgba(79,70,229,0.3)]" strokeWidth={2} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-extrabold text-[13px] 2xl:text-[16px] text-slate-900 dark:text-white tracking-wider">FULL</span>
                        <span className="text-[9px] 2xl:text-[12px] text-indigo-600 dark:text-indigo-400 font-bold tracking-[0.2em] uppercase mt-0.5">Customization</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
