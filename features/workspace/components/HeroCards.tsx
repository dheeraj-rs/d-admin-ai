'use client';

import { useRouter } from 'next/navigation';
import { Sparkles, LayoutGrid, ArrowRight } from 'lucide-react';
import type { ViewState } from '../types/index';

interface HeroCardsProps {
    onStartWithAI: () => void;
    setViewState: (s: ViewState) => void;
}

export default function HeroCards({ onStartWithAI }: HeroCardsProps) {
    const router = useRouter();

    return (
        <section className="flex flex-col sm:flex-row gap-4 lg:gap-5 pt-2 pb-1">
            {/* ── Creator Studio ── */}
            <div className="group flex-1 relative min-h-[240px] sm:min-h-[280px] lg:min-h-[320px] rounded-[28px] overflow-hidden border border-white/[0.08] transition-all duration-500 hover:border-purple-500/40 hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)]">
                {/* Background Image Layer */}
                <div className="absolute inset-0 z-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
                        alt="AI Deep Builder" 
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-1000" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Content Layer */}
                <div className="relative z-10 flex flex-col h-full p-5 lg:p-6 justify-between">
                    <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] text-purple-400 uppercase">
                            <Sparkles size={10} className="animate-pulse" />
                            Creator Studio
                        </span>
                        <span className="text-[9px] font-bold text-purple-300 bg-purple-500/20 px-2.5 py-1 rounded-full border border-purple-500/20 backdrop-blur-md">
                            AI Powered
                        </span>
                    </div>

                    <div className="mt-auto">
                        <h2 className="text-xl lg:text-2xl font-black text-white mb-2 tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                            AI Deep Builder
                        </h2>
                        <p className="text-gray-400 text-[12px] lg:text-[13px] leading-snug mb-5 max-w-[260px] font-medium opacity-85 group-hover:opacity-100 group-hover:text-gray-200 transition-all">
                            Harness neural engines to generate production-ready sites from simple prompts in seconds.
                        </p>
                        <button 
                            id="hero-start-with-ai" 
                            onClick={onStartWithAI}
                            className="group/btn relative w-full sm:w-fit px-6 py-3 rounded-2xl text-[12px] font-bold overflow-hidden transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] shadow-lg shadow-purple-500/20"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9]" />
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                            <span className="relative flex items-center justify-center gap-2 text-white">
                                Start with AI <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Template Hub ── */}
            <div className="group flex-1 relative min-h-[240px] sm:min-h-[280px] lg:min-h-[320px] rounded-[28px] overflow-hidden border border-white/[0.08] transition-all duration-500 hover:border-blue-500/40 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]">
                {/* Background Image Layer */}
                <div className="absolute inset-0 z-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src="https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop"
                        alt="Explorer Collection" 
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-1000" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Content Layer */}
                <div className="relative z-10 flex flex-col h-full p-5 lg:p-6 justify-between">
                    <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] text-blue-400 uppercase">
                            <LayoutGrid size={10} />
                            Template Hub
                        </span>
                        <span className="text-[9px] font-bold text-blue-300 bg-blue-500/20 px-2.5 py-1 rounded-full border border-blue-500/20 backdrop-blur-md">
                            1000+ designs
                        </span>
                    </div>

                    <div className="mt-auto">
                        <h2 className="text-xl lg:text-2xl font-black text-white mb-2 tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                            Explorer Collection
                        </h2>
                        <p className="text-gray-400 text-[12px] lg:text-[13px] leading-snug mb-5 max-w-[260px] font-medium opacity-85 group-hover:opacity-100 group-hover:text-gray-200 transition-all">
                            Choose from over 1,000+ premium designs crafted for conversion and ultimate aesthetic appeal.
                        </p>
                        <button 
                            id="hero-browse-templates" 
                            onClick={() => router.push('/templates')}
                            className="group/btn relative w-full sm:w-fit px-6 py-3 rounded-2xl text-[12px] font-bold overflow-hidden transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] shadow-lg shadow-blue-500/20"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]" />
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                            <span className="relative flex items-center justify-center gap-2 text-white">
                                Browse Templates <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
