import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomeTemplateGallery() {
    return (
        <div className="w-full max-w-[380px] md:max-w-[420px] lg:max-w-[480px] 2xl:max-w-[650px] 3xl:max-w-[850px] md:flex-1 relative z-20 flex flex-col justify-center gap-4 2xl:gap-8 shrink-0">
            <div className="w-full relative z-30 mb-2 overflow-visible">
                <div className="w-full glass-card-premium rounded-2xl p-5 flex flex-col relative">
                    {/* Corner Arcs - Detached Premium Glow (Increased Gap) */}
                    <div className="absolute -top-[12px] -left-[12px] w-14 h-14 border-t-[3px] border-l-[3px] border-cyan-500 dark:border-cyan-400 rounded-tl-2xl pointer-events-none z-50 shadow-[0_0_20px_rgba(34,211,238,0.5)]"></div>
                    <div className="absolute -bottom-[12px] -right-[12px] w-14 h-14 border-b-[3px] border-r-[3px] border-purple-500 dark:border-purple-400 rounded-br-2xl pointer-events-none z-50 shadow-[0_0_20px_rgba(168,85,247,0.5)]"></div>

                    <div className="flex justify-between items-center mb-4 px-1 mt-1 2xl:mb-10">
                        <h3 className="text-[var(--text-main)] text-[12px] 2xl:text-[22px] 3xl:text-[28px] font-medium tracking-wide">Select from our curated gallery</h3>
                        <Link href="/templates" className="text-[10px] 2xl:text-[18px] 3xl:text-[24px] text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-bold tracking-widest uppercase transition-colors">VIEW_ALL</Link>
                    </div>

                    <div className="grid grid-cols-2 gap-3 2xl:gap-6 mb-5 2xl:mb-10">
                        {/* AetherFlow */}
                        <Link href="/templates" className="group relative rounded-xl 2xl:rounded-2xl overflow-hidden cursor-pointer border-2 border-cyan-400/70 dark:border-cyan-500/80 bg-gray-100 dark:bg-[#0A1225] h-[90px] 2xl:h-[150px] 3xl:h-[200px] shadow-[0_4px_20px_rgba(34,211,238,0.2)] dark:shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:border-cyan-500 dark:hover:border-cyan-300 transition-all transform hover:scale-[1.02]">
                            <Image 
                                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop" 
                                alt="AetherFlow" 
                                fill
                                className="object-cover opacity-80 dark:opacity-60 group-hover:scale-105 transition-transform duration-500" 
                                sizes="200px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-[#0A1225] via-black/40 dark:via-[#0A1225]/20 to-transparent" />
                            <div className="absolute inset-x-0 top-0 p-2 2xl:p-4 flex justify-start">
                                <span className="text-[7px] 2xl:text-[10px] 3xl:text-[12px] font-bold tracking-[0.15em] bg-white/90 dark:bg-cyan-950/90 text-cyan-700 dark:text-cyan-300 px-1.5 py-0.5 2xl:px-3 2xl:py-1 rounded-[3px] 2xl:rounded-[5px] border border-cyan-200 dark:border-cyan-500/40 backdrop-blur-md shadow-sm">AETHERFLOW</span>
                            </div>
                             <div className="absolute inset-x-0 bottom-0 p-2.5 2xl:p-5">
                                <h4 className="font-bold text-[10px] 2xl:text-[14px] 3xl:text-[18px] text-white dark:text-white drop-shadow-md tracking-wide">AetherFlow E-com</h4>
                            </div>
                        </Link>
                        
                        {/* Chronos */}
                        <Link href="/templates" className="group relative rounded-xl 2xl:rounded-2xl overflow-hidden cursor-pointer border-2 border-slate-200 dark:border-white/30 bg-gray-100 dark:bg-[#0A1225] h-[90px] 2xl:h-[150px] 3xl:h-[200px] hover:border-purple-400 dark:hover:border-purple-400/80 transition-colors shadow-sm">
                            <Image 
                                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop" 
                                alt="Chronos" 
                                fill
                                className="object-cover opacity-80 dark:opacity-60 mix-blend-normal dark:mix-blend-luminosity group-hover:scale-105 transition-transform duration-500" 
                                sizes="200px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-[#0A1225] via-black/40 dark:via-[#0A1225]/20 to-transparent" />
                            <div className="absolute inset-x-0 top-0 p-2 2xl:p-4 flex justify-start">
                                <span className="text-[7px] 2xl:text-[10px] 3xl:text-[12px] font-bold tracking-[0.15em] bg-white/90 dark:bg-[#4a1d96]/90 text-purple-700 dark:text-purple-200 px-1.5 py-0.5 2xl:px-3 2xl:py-1 rounded-[3px] 2xl:rounded-[5px] border border-purple-200 dark:border-purple-500/40 backdrop-blur-md shadow-sm">CHRONOS</span>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 p-2.5 2xl:p-5">
                                <h4 className="font-bold text-[10px] 2xl:text-[14px] 3xl:text-[18px] text-white dark:text-white drop-shadow-md tracking-wide">Chronos Portfolio</h4>
                            </div>
                        </Link>
                        
                        {/* Quantum */}
                        <Link href="/templates" className="group relative rounded-xl 2xl:rounded-2xl overflow-hidden cursor-pointer border-2 border-slate-200 dark:border-white/30 bg-gray-100 dark:bg-[#0A1225] h-[90px] 2xl:h-[150px] 3xl:h-[200px] hover:border-blue-400 dark:hover:border-blue-400/80 transition-colors shadow-sm">
                            <Image 
                                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop" 
                                alt="Quantum" 
                                fill
                                className="object-cover opacity-80 dark:opacity-50 group-hover:scale-105 transition-transform duration-500" 
                                sizes="200px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-[#0A1225] via-black/40 dark:via-[#0A1225]/20 to-transparent" />
                            <div className="absolute inset-x-0 top-0 p-2 2xl:p-4 flex justify-start">
                                <span className="text-[7px] 2xl:text-[10px] 3xl:text-[12px] font-bold tracking-[0.15em] bg-white/90 dark:bg-[#1e3a8a]/90 text-blue-700 dark:text-blue-200 px-1.5 py-0.5 2xl:px-3 2xl:py-1 rounded-[3px] 2xl:rounded-[5px] border border-blue-200 dark:border-blue-500/40 backdrop-blur-md shadow-sm">QUANTUM</span>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 p-2.5 2xl:p-5">
                                <h4 className="font-bold text-[10px] 2xl:text-[14px] 3xl:text-[18px] text-white dark:text-white drop-shadow-md tracking-wide">Quantum Commerce</h4>
                            </div>
                        </Link>
                        
                        {/* HoloStream */}
                        <Link href="/templates" className="group relative rounded-xl 2xl:rounded-2xl overflow-hidden cursor-pointer border-2 border-slate-200 dark:border-white/30 bg-gray-100 dark:bg-[#0A1225] h-[90px] 2xl:h-[150px] 3xl:h-[200px] hover:border-pink-400 dark:hover:border-pink-400/80 transition-colors shadow-sm">
                            <Image 
                                src="https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=600&auto=format&fit=crop" 
                                alt="HoloStream" 
                                fill
                                className="object-cover opacity-80 dark:opacity-50 group-hover:scale-105 transition-transform duration-500" 
                                sizes="200px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-[#0A1225] via-black/40 dark:via-[#0A1225]/20 to-transparent" />
                            <div className="absolute inset-x-0 top-0 p-2 2xl:p-4 flex justify-start z-10">
                                <span className="text-[7px] 2xl:text-[10px] 3xl:text-[12px] font-bold tracking-[0.15em] bg-white/90 dark:bg-[#831843]/90 text-pink-700 dark:text-pink-200 px-1.5 py-0.5 2xl:px-3 2xl:py-1 rounded-[3px] 2xl:rounded-[5px] border border-pink-200 dark:border-pink-500/40 backdrop-blur-md shadow-sm">HOLOSTREAM</span>
                            </div>
                             <div className="absolute inset-x-0 bottom-0 p-2.5 2xl:p-5 z-10">
                                <h4 className="font-bold text-[10px] 2xl:text-[14px] 3xl:text-[18px] text-white dark:text-white drop-shadow-md tracking-wide">HoloStream Media</h4>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            
            <Link 
                href="/templates"
                className="w-full py-3.5 md:py-4 2xl:py-5 3xl:py-6 rounded-[12px] 2xl:rounded-[16px] bg-gradient-to-r from-cyan-300 via-purple-400 to-[#b28cff] text-white font-extrabold text-[13px] 2xl:text-[15px] 3xl:text-[18px] tracking-widest shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all transform hover:scale-[1.02] z-30 flex items-center justify-center cursor-pointer"
            >
                START WITH TEMPLATE GALLERY
            </Link>

            <div className="flex items-center gap-3 2xl:gap-8 px-3 py-2 mt-2 2xl:mt-12 transition-all">
              <div className="relative w-8 h-8 2xl:w-20 2xl:h-20 flex-shrink-0">
                  <Image 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" 
                    alt="User" 
                    fill
                    className="rounded-full object-cover shadow-sm" 
                  />
              </div>
              <p className="text-[10px] 2xl:text-[20px] 3xl:text-[26px] text-slate-900 dark:text-slate-200 font-medium italic leading-relaxed tracking-wide flex-1">
                "Trusted by innovators like Janeanthe, who used this to build future platforms..."
              </p>
            </div>
        </div>
    );
}
