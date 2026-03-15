'use client';

import React from 'react';

export default function HomeBackground() {
    return (
        <div className="fixed inset-0 w-[100dvw] h-[100dvh] z-0 pointer-events-none overflow-hidden bg-[var(--bg-main)] transition-colors duration-300">
            <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-100"
                style={{ backgroundImage: 'url("/home_hero_bg.png")' }}
            />
            
            <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-slate-200/50 via-transparent dark:from-slate-950/80 dark:via-transparent to-transparent transition-colors duration-300 pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-slate-200/40 via-transparent dark:from-slate-950/60 dark:via-transparent to-transparent transition-colors duration-300 pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-[45%] md:w-[35%] bg-gradient-to-r from-slate-100/60 via-transparent dark:from-slate-950/80 dark:via-transparent to-transparent transition-colors duration-300 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-[35%] md:w-[25%] bg-gradient-to-l from-slate-100/40 via-transparent dark:from-slate-950/80 dark:via-transparent to-transparent transition-colors duration-300 pointer-events-none" />
        </div>
    );
}
