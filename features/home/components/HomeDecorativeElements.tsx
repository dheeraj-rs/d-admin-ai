import React from 'react';
import { CloudLightning, Hexagon } from 'lucide-react';

export default function HomeDecorativeElements() {
    return (
        <>
            {/* Left Symmetric 3D Decorative Cards */}
            <div className="absolute left-[-170px] top-1/2 -translate-y-1/2 w-48 h-[300px] opacity-40 dark:opacity-80 pointer-events-none hidden 3xl:block z-0" style={{ perspective: '1200px' }}>
                <div className="relative w-full h-full transition-transform duration-1000" style={{ transformStyle: 'preserve-3d', transform: 'rotateY(35deg) rotateX(5deg)' }}>
                    <div className="absolute top-0 left-0 w-44 h-[200px] bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-indigo-500/10 dark:border-indigo-500/30 rounded-xl p-3 flex flex-col gap-2 shadow-sm" style={{ transform: 'translateZ(-30px)' }}>
                        <div className="text-[7.5px] text-indigo-600 dark:text-indigo-400 font-mono tracking-widest uppercase">NEURAL TEMPLATE 7</div>
                        <div className="w-full flex-grow bg-gradient-to-br from-indigo-50 to-indigo-100/30 dark:from-indigo-950/40 dark:to-indigo-900/40 rounded flex items-center justify-center border border-indigo-500/10"><Hexagon className="text-indigo-600 dark:text-indigo-400 w-6 h-6 opacity-40" /></div>
                        <div className="h-1 w-3/4 bg-indigo-100 dark:bg-indigo-900 rounded" />
                        <div className="h-1 w-1/2 bg-indigo-100 dark:bg-indigo-900 rounded" />
                    </div>
                </div>
            </div>

            {/* Cyan Lines */}
            <div className="absolute left-[-150px] top-[30%] lg:top-[35%] w-[150px] h-[120px] hidden 3xl:flex flex-col justify-center gap-[4px] opacity-40 pointer-events-none z-10" style={{ perspective: '800px', transform: 'rotateY(10deg)' }}>
                {Array.from({ length: 15 }).map((_, i) => (
                    <div 
                        key={i} 
                        className="w-full h-[1px] bg-cyan-400 shadow-[0_0_8px_#22d3ee] origin-right"
                        style={{ transform: `rotate(${(i - 7) * 2.5}deg)`, opacity: 1 - Math.abs(i - 7) * 0.1 }}
                    />
                ))}
            </div>

            {/* Right Symmetric 3D Decorative Cards */}
            <div className="absolute right-[-170px] top-1/2 -translate-y-1/2 w-48 h-[300px] opacity-40 dark:opacity-80 pointer-events-none hidden 3xl:block z-0" style={{ perspective: '1200px' }}>
                <div className="relative w-full h-full transition-transform duration-1000" style={{ transformStyle: 'preserve-3d', transform: 'rotateY(-35deg) rotateX(5deg)' }}>
                    <div className="absolute top-0 right-0 w-44 h-[200px] bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-cyan-500/10 dark:border-cyan-500/30 rounded-xl p-3 flex flex-col gap-2 shadow-sm" style={{ transform: 'translateZ(-30px)' }}>
                        <div className="text-[7.5px] text-cyan-600 dark:text-cyan-400 font-mono tracking-widest uppercase">QUANTUM CORE</div>
                        <div className="w-full flex-grow bg-gradient-to-br from-cyan-50 to-cyan-100/30 dark:from-cyan-950/40 dark:to-cyan-900/40 rounded flex items-center justify-center border border-cyan-500/10"><CloudLightning className="text-cyan-600 dark:text-cyan-400 w-6 h-6 opacity-40" /></div>
                        <div className="h-1 w-3/4 bg-cyan-100 dark:bg-slate-800 rounded" />
                        <div className="h-1 w-1/2 bg-cyan-100 dark:bg-slate-800 rounded" />
                    </div>
                </div>
            </div>
        </>
    );
}
