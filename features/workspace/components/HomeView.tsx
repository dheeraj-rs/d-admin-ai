'use client';
import React, { useState, useEffect } from 'react';
import { 
  Send, 
  BrainCircuit, 
  CloudLightning, 
  Settings2, 
  Hexagon
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const HomeView = () => {
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
    <div className="flex-1 w-full min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] font-sans overflow-x-hidden overflow-y-auto relative z-0 flex flex-col transition-colors duration-300">
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

      <div className="relative z-10 flex flex-col w-full min-h-screen max-w-[1800px] xl:max-w-[1700px] 2xl:max-w-[2200px] 3xl:max-w-[2800px] mx-auto pt-16 md:pt-20 2xl:pt-32 px-4 md:px-8 lg:px-12 pb-10 2xl:pb-20">
        <header className="w-full relative z-30 pointer-events-none max-w-2xl shrink-0 mb-4 lg:mb-6 flex flex-col items-center md:items-start text-center md:text-left">
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

        <main className="flex-1 flex flex-col items-center md:flex-row md:items-center justify-center md:justify-between relative z-20 w-full gap-8 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-24 3xl:gap-40 my-1 2xl:my-8">
          <div className="w-full max-w-[380px] md:max-w-[420px] lg:max-w-[460px] 2xl:max-w-[650px] 3xl:max-w-[850px] md:flex-1 relative z-20 flex flex-col justify-center gap-4 2xl:gap-8 shrink-0"> 
          <div className="absolute left-[-170px] top-1/2 -translate-y-1/2 w-48 h-[300px] opacity-40 dark:opacity-80 pointer-events-none hidden 3xl:block z-0" style={{ perspective: '1200px' }}>
                <div className="relative w-full h-full transition-transform duration-1000" style={{ transformStyle: 'preserve-3d', transform: 'rotateY(35deg) rotateX(5deg)' }}>
                  <div className="absolute top-0 left-0 w-44 h-[200px] bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-indigo-500/10 dark:border-indigo-500/30 rounded-xl p-3 flex flex-col gap-2 shadow-sm" style={{ transform: 'translateZ(-30px)' }}>
                     <div className="text-[7.5px] text-indigo-600 dark:text-indigo-400 font-mono tracking-widest uppercase">NEURAL TEMPLATE 7</div>
                     <div className="w-full flex-grow bg-gradient-to-br from-indigo-50 to-indigo-100/30 dark:from-indigo-950/40 dark:to-indigo-900/40 rounded flex items-center justify-center border border-indigo-500/10"><Hexagon className="text-indigo-600 dark:text-indigo-400 w-6 h-6 opacity-40" /></div>
                     <div className="h-1 w-3/4 bg-indigo-100 dark:bg-indigo-900 rounded" />
                     <div className="h-1 w-1/2 bg-indigo-100 dark:bg-indigo-900 rounded" />
                  </div>
                  <div className="absolute top-24 left-10 w-44 h-[200px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-purple-500/10 dark:border-purple-500/30 rounded-xl p-3 flex flex-col gap-2 shadow-sm" style={{ transform: 'translateZ(40px) rotateY(-8deg)' }}>
                     <div className="text-[7.5px] text-purple-600 dark:text-purple-400 font-mono tracking-widest uppercase">BIOMETRIC PORTFOLIO</div>
                     <div className="w-full flex-grow bg-gradient-to-r from-purple-50 to-purple-100/30 dark:from-purple-950/40 dark:to-purple-900/40 rounded border border-purple-500/10"></div>
                     <div className="flex gap-1.5 h-14">
                       <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200/50 dark:border-white/5"></div>
                       <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200/50 dark:border-white/5"></div>
                     </div>
                  </div>
                </div>
             </div>

             <div className="absolute left-[-150px] top-[30%] lg:top-[35%] w-[150px] h-[120px] hidden 3xl:flex flex-col justify-center gap-[4px] opacity-40 pointer-events-none z-10" style={{ perspective: '800px', transform: 'rotateY(10deg)' }}>
                {Array.from({ length: 15 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="w-full h-[1px] bg-cyan-400 shadow-[0_0_8px_#22d3ee] origin-right"
                    style={{ transform: `rotate(${(i - 7) * 2.5}deg)`, opacity: 1 - Math.abs(i - 7) * 0.1 }}
                  />
                ))}
             </div>

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
                onClick={() => router.push('/ai-chat-builder')}
                className="w-full py-4 2xl:py-6 3xl:py-8 rounded-[12px] 2xl:rounded-[16px] bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-extrabold text-[13px] 2xl:text-[16px] 3xl:text-[20px] tracking-widest shadow-[0_8px_20px_rgba(79,70,229,0.25)] hover:shadow-[0_12px_25px_rgba(79,70,229,0.4)] transition-all flex items-center justify-center transform hover:scale-[1.01] z-30"
             >
                START WITH AI CONVERSATION
             </button>
          </div>

          <div className="w-full max-w-[380px] md:max-w-[420px] lg:max-w-[480px] 2xl:max-w-[650px] 3xl:max-w-[850px] md:flex-1 relative z-20 flex flex-col justify-center gap-4 2xl:gap-8 shrink-0">
            {/* Right Symmetric 3D Decorative Cards */}
            <div className="absolute right-[-170px] top-1/2 -translate-y-1/2 w-48 h-[300px] opacity-40 dark:opacity-80 pointer-events-none hidden 3xl:block z-0" style={{ perspective: '1200px' }}>
                <div className="relative w-full h-full transition-transform duration-1000" style={{ transformStyle: 'preserve-3d', transform: 'rotateY(-35deg) rotateX(5deg)' }}>
                  <div className="absolute top-0 right-0 w-44 h-[200px] bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-cyan-500/10 dark:border-cyan-500/30 rounded-xl p-3 flex flex-col gap-2 shadow-sm" style={{ transform: 'translateZ(-30px)' }}>
                     <div className="text-[7.5px] text-cyan-600 dark:text-cyan-400 font-mono tracking-widest uppercase">QUANTUM CORE</div>
                     <div className="w-full flex-grow bg-gradient-to-br from-cyan-50 to-cyan-100/30 dark:from-cyan-950/40 dark:to-cyan-900/40 rounded flex items-center justify-center border border-cyan-500/10"><CloudLightning className="text-cyan-600 dark:text-cyan-400 w-6 h-6 opacity-40" /></div>
                     <div className="h-1 w-3/4 bg-cyan-100 dark:bg-slate-800 rounded" />
                     <div className="h-1 w-1/2 bg-cyan-100 dark:bg-slate-800 rounded" />
                  </div>
                  <div className="absolute top-24 right-10 w-44 h-[200px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-indigo-500/10 dark:border-indigo-500/30 rounded-xl p-3 flex flex-col gap-2 shadow-sm" style={{ transform: 'translateZ(40px) rotateY(8deg)' }}>
                     <div className="text-[7.5px] text-indigo-600 dark:text-indigo-400 font-mono tracking-widest uppercase">NEURAL INTERFACE</div>
                     <div className="w-full flex-grow bg-gradient-to-r from-indigo-50 to-indigo-100/30 dark:from-indigo-950/40 dark:to-indigo-900/40 rounded border border-indigo-500/10"></div>
                     <div className="flex gap-1.5 h-14">
                       <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200/50 dark:border-white/5"></div>
                       <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200/50 dark:border-white/5"></div>
                     </div>
                  </div>
                </div>
             </div>
            <div className="w-full relative z-30 mb-2">
                <div className="absolute -top-[8px] -left-[8px] w-8 h-8 border-t-[1.5px] border-l-[1.5px] border-cyan-500/30 dark:border-cyan-400/50 rounded-tl-2xl pointer-events-none opacity-90 shadow-[-4px_-4px_10px_rgba(34,211,238,0.1)] dark:shadow-[-4px_-4px_10px_rgba(34,211,238,0.2)] z-10"></div>
                <div className="absolute -bottom-[8px] -right-[8px] w-8 h-8 border-b-[1.5px] border-r-[1.5px] border-purple-500/30 dark:border-purple-400/50 rounded-br-2xl pointer-events-none opacity-90 shadow-[4px_4px_10px_rgba(168,85,247,0.1)] dark:shadow-[4px_4px_10px_rgba(168,85,247,0.2)] z-10"></div>
                <div className="w-full bg-sky-50/60 dark:bg-[#06101E]/40 backdrop-blur-xl border-[1.5px] border-sky-200/60 dark:border-cyan-400/50 rounded-xl p-5 shadow-[0_8px_32px_rgba(56,189,248,0.08),inset_0_0_15px_rgba(186,230,255,0.3)] dark:shadow-[0_0_30px_rgba(34,211,238,0.2),inset_0_0_15px_rgba(34,211,238,0.1)] flex flex-col relative z-20 transition-colors duration-300">
                <div className="flex justify-between items-center mb-4 px-1 mt-1 2xl:mb-10">
                  <h3 className="text-gray-800 dark:text-gray-200 text-[12px] 2xl:text-[22px] 3xl:text-[28px] font-medium tracking-wide">Select from our curated gallery</h3>
                  <span onClick={() => router.push('/templates')} className="text-[10px] 2xl:text-[18px] 3xl:text-[24px] text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 cursor-pointer font-bold tracking-widest uppercase transition-colors">VIEW_ALL</span>
               </div>

               <div className="grid grid-cols-2 gap-3 2xl:gap-6 mb-5 2xl:mb-10">
                  <div onClick={() => router.push('/templates')} className="group relative rounded-xl 2xl:rounded-2xl overflow-hidden cursor-pointer border-2 border-cyan-400/40 dark:border-cyan-500/50 bg-gray-100 dark:bg-[#0A1225] h-[90px] 2xl:h-[150px] 3xl:h-[200px] shadow-[0_2px_10px_rgba(34,211,238,0.1)] dark:shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:border-cyan-500 dark:hover:border-cyan-300 transition-colors">
                    <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop" alt="AetherFlow" className="absolute inset-0 w-full h-full object-cover opacity-80 dark:opacity-60 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-[#0A1225] via-black/40 dark:via-[#0A1225]/20 to-transparent" />
                    <div className="absolute inset-x-0 top-0 p-2 2xl:p-4 flex justify-start">
                      <span className="text-[7px] 2xl:text-[10px] 3xl:text-[12px] font-bold tracking-[0.15em] bg-white/90 dark:bg-cyan-950/90 text-cyan-700 dark:text-cyan-300 px-1.5 py-0.5 2xl:px-3 2xl:py-1 rounded-[3px] 2xl:rounded-[5px] border border-cyan-200 dark:border-cyan-500/40 backdrop-blur-md shadow-sm">AETHERFLOW</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-2.5 2xl:p-5">
                      <h4 className="font-medium text-[10px] 2xl:text-[14px] 3xl:text-[18px] text-white tracking-wide drop-shadow-md">AetherFlow E-com</h4>
                    </div>
                  </div>
                  
                  <div onClick={() => router.push('/templates')} className="group relative rounded-xl 2xl:rounded-2xl overflow-hidden cursor-pointer border border-gray-300 dark:border-white/20 bg-gray-100 dark:bg-[#0A1225] h-[90px] 2xl:h-[150px] 3xl:h-[200px] hover:border-purple-400 dark:hover:border-purple-400/50 transition-colors">
                    <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop" alt="Chronos" className="absolute inset-0 w-full h-full object-cover opacity-80 dark:opacity-60 mix-blend-normal dark:mix-blend-luminosity group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-[#0A1225] via-black/40 dark:via-[#0A1225]/20 to-transparent" />
                    <div className="absolute inset-x-0 top-0 p-2 2xl:p-4 flex justify-start">
                       <span className="text-[7px] 2xl:text-[10px] 3xl:text-[12px] font-bold tracking-[0.15em] bg-white/90 dark:bg-[#4a1d96]/90 text-purple-700 dark:text-purple-200 px-1.5 py-0.5 2xl:px-3 2xl:py-1 rounded-[3px] 2xl:rounded-[5px] border border-purple-200 dark:border-purple-500/40 backdrop-blur-md shadow-sm">CHRONOS</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-2.5 2xl:p-5">
                       <h4 className="font-medium text-[10px] 2xl:text-[14px] 3xl:text-[18px] text-white tracking-wide drop-shadow-md">Chronos Portfolio</h4>
                    </div>
                  </div>
                  
                  <div onClick={() => router.push('/templates')} className="group relative rounded-xl 2xl:rounded-2xl overflow-hidden cursor-pointer border border-gray-300 dark:border-white/20 bg-gray-100 dark:bg-[#0A1225] h-[90px] 2xl:h-[150px] 3xl:h-[200px] hover:border-blue-400 dark:hover:border-blue-400/50 transition-colors">
                    <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop" alt="Quantum" className="absolute inset-0 w-full h-full object-cover opacity-80 dark:opacity-50 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-[#0A1225] via-black/40 dark:via-[#0A1225]/20 to-transparent" />
                    <div className="absolute inset-x-0 top-0 p-2 2xl:p-4 flex justify-start">
                      <span className="text-[7px] 2xl:text-[10px] 3xl:text-[12px] font-bold tracking-[0.15em] bg-white/90 dark:bg-[#1e3a8a]/90 text-blue-700 dark:text-blue-200 px-1.5 py-0.5 2xl:px-3 2xl:py-1 rounded-[3px] 2xl:rounded-[5px] border border-blue-200 dark:border-blue-500/40 backdrop-blur-md shadow-sm">QUANTUM</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-2.5 2xl:p-5">
                      <h4 className="font-medium text-[10px] 2xl:text-[14px] 3xl:text-[18px] text-white tracking-wide drop-shadow-md">Quantum Commerce</h4>
                    </div>
                  </div>
                  
                  <div onClick={() => router.push('/templates')} className="group relative rounded-xl 2xl:rounded-2xl overflow-hidden cursor-pointer border border-gray-300 dark:border-white/20 bg-gray-100 dark:bg-[#0A1225] h-[90px] 2xl:h-[150px] 3xl:h-[200px] hover:border-pink-400 dark:hover:border-pink-400/50 transition-colors">
                    <img src="https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=600&auto=format&fit=crop" alt="HoloStream" className="absolute inset-0 w-full h-full object-cover opacity-80 dark:opacity-50 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-[#0A1225] via-black/40 dark:via-[#0A1225]/20 to-transparent" />
                    <div className="absolute inset-x-0 top-0 p-2 2xl:p-4 flex justify-start z-10">
                      <span className="text-[7px] 2xl:text-[10px] 3xl:text-[12px] font-bold tracking-[0.15em] bg-white/90 dark:bg-[#831843]/90 text-pink-700 dark:text-pink-200 px-1.5 py-0.5 2xl:px-3 2xl:py-1 rounded-[3px] 2xl:rounded-[5px] border border-pink-200 dark:border-pink-500/40 backdrop-blur-md shadow-sm">HOLOSTREAM</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-2.5 2xl:p-5 z-10">
                      <h4 className="font-medium text-[10px] 2xl:text-[14px] 3xl:text-[18px] text-white tracking-wide drop-shadow-md">HoloStream Media</h4>
                    </div>
                  </div>
               </div>
             </div>
             </div>
             
             <button 
                onClick={() => router.push('/templates')}
                className="w-full py-4 2xl:py-6 3xl:py-8 rounded-[12px] 2xl:rounded-[16px] bg-gradient-to-r from-cyan-300 via-purple-400 to-[#b28cff] text-white font-extrabold text-[13px] 2xl:text-[16px] 3xl:text-[20px] tracking-widest shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all transform hover:scale-[1.02] z-30"
             >
                START WITH TEMPLATE GALLERY
             </button>

             <div className="flex items-center gap-3 2xl:gap-8 px-3 py-2 mt-2 2xl:mt-12 transition-all">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" alt="User" className="w-8 h-8 2xl:w-20 2xl:h-20 rounded-full object-cover shadow-sm" />
                <p className="text-[10px] 2xl:text-[20px] 3xl:text-[26px] text-slate-900 dark:text-slate-200 font-medium italic leading-relaxed tracking-wide flex-1">
                  "Trusted by innovators like Janeanthe, who used this to build future platforms..."
                </p>
             </div>
          </div>
        </main>

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

      </div>
    </div>
  );
};

export default HomeView;