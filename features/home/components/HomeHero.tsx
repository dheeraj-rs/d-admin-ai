import React from 'react';

export default function HomeHero() {
    return (
        <header className="w-full relative z-30 pointer-events-none max-w-2xl shrink-0 mb-2 lg:mb-4 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-2xl md:text-4xl lg:text-[44px] 2xl:text-[72px] 3xl:text-[100px] font-extrabold leading-[1.05] mb-3 2xl:mb-10 tracking-tighter drop-shadow-sm text-[var(--text-main)] mx-auto md:mx-0">
                BUILD YOUR VISION<br/>
                INSTANTLY. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-indigo-600 to-cyan-600 dark:from-indigo-400 dark:via-cyan-400 dark:to-cyan-200">THE AI WAY.</span>
            </h1>
            <div className="bg-white/40 dark:bg-slate-950/20 backdrop-blur-[2px] rounded-xl p-3 2xl:p-4 md:-ml-2 w-fit">
                <p className="text-slate-800 dark:text-slate-100 text-[12px] md:text-[13.5px] 2xl:text-[22px] 3xl:text-[32px] font-semibold dark:font-medium leading-relaxed drop-shadow-sm max-w-lg 2xl:max-w-2xl 3xl:max-w-5xl">
                    Select your preferred creation experience. The AI builds it.<br />
                    Your stunning, futuristic website in seconds.
                </p>
            </div>
        </header>
    );
}
