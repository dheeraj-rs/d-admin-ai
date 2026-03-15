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
    <div className="flex-1 w-full min-h-[100dvh] bg-white dark:bg-[#02060D] text-gray-900 dark:text-white font-sans overflow-y-auto overflow-x-hidden relative z-0 flex flex-col custom-scrollbar transition-colors duration-300">
        <div className="fixed inset-0 w-[100dvw] h-[100dvh] z-0 pointer-events-none overflow-hidden bg-white dark:bg-[#02060D] transition-colors duration-300">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 dark:opacity-100 transition-opacity duration-300 mix-blend-multiply dark:mix-blend-normal"
          style={{ backgroundImage: 'url("/home_hero_bg.png")' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-white dark:from-[#02060D] to-transparent transition-colors duration-300" />
        <div className="absolute inset-x-0 top-0 h-[25%] bg-gradient-to-b from-white/60 dark:from-[#02060D]/60 to-transparent transition-colors duration-300" />
        <div className="absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-white dark:from-[#02060D] to-transparent transition-colors duration-300" />
        <div className="absolute inset-y-0 right-0 w-[40%] bg-gradient-to-l from-white/80 dark:from-[#02060D]/80 to-transparent transition-colors duration-300" />
      </div>

      <div className="relative z-10 flex flex-col w-full min-h-[100dvh] max-w-[1500px] mx-auto pt-[70px] px-6 lg:px-10 pb-4">
        <header className="w-full relative z-30 pointer-events-none max-w-2xl mt-4 lg:mt-6 shrink-0">
          <h1 className="text-3xl lg:text-[44px] font-extrabold leading-[1.05] mb-2 tracking-tight drop-shadow-sm dark:drop-shadow-2xl text-gray-900 dark:text-white">
            BUILD YOUR VISION<br/>
            INSTANTLY. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-cyan-400 dark:from-cyan-400 dark:to-cyan-200">THE AI WAY.</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-[13px] md:text-sm font-medium dark:font-light leading-relaxed drop-shadow-sm dark:drop-shadow-md max-w-lg">
            Select your preferred creation experience. The AI builds it.<br />
            Your stunning, futuristic website in seconds.
          </p>
        </header>

        <main className="my-auto flex flex-col items-center md:flex-row md:items-stretch justify-center md:justify-between relative z-20 w-full py-8 gap-8 md:gap-6 lg:gap-0">
          <div className="w-full max-w-[380px] md:max-w-none md:flex-1 lg:flex-none lg:w-[410px] relative z-20 flex flex-col justify-center gap-4 shrink-0"> 
            <div className="absolute left-[-170px] top-1/2 -translate-y-1/2 w-48 h-[300px] opacity-40 dark:opacity-80 pointer-events-none hidden 2xl:block z-0" style={{ perspective: '1200px' }}>
                <div className="relative w-full h-full transition-transform duration-1000" style={{ transformStyle: 'preserve-3d', transform: 'rotateY(35deg) rotateX(5deg)' }}>
                  <div className="absolute top-0 left-0 w-44 h-[200px] bg-white/80 dark:bg-[#061022]/80 backdrop-blur-md border border-cyan-500/20 dark:border-cyan-500/40 rounded-xl p-3 flex flex-col gap-2 shadow-[0_0_20px_rgba(34,211,238,0.1)] dark:shadow-[0_0_20px_rgba(34,211,238,0.2)]" style={{ transform: 'translateZ(-30px)' }}>
                     <div className="text-[7.5px] text-cyan-600 dark:text-cyan-400 font-mono tracking-widest uppercase">NEURAL TEMPLATE 7</div>
                     <div className="w-full flex-grow bg-gradient-to-br from-cyan-100/60 to-blue-100/60 dark:from-cyan-900/60 dark:to-blue-900/60 rounded flex items-center justify-center border border-cyan-400/20"><Hexagon className="text-cyan-600 dark:text-cyan-400 w-6 h-6 opacity-40" /></div>
                     <div className="h-1 w-3/4 bg-cyan-200 dark:bg-cyan-900 rounded" />
                     <div className="h-1 w-1/2 bg-cyan-200 dark:bg-cyan-900 rounded" />
                  </div>
                  <div className="absolute top-24 left-10 w-44 h-[200px] bg-white/80 dark:bg-[#0A1225]/80 backdrop-blur-md border border-purple-500/20 dark:border-purple-500/40 rounded-xl p-3 flex flex-col gap-2 shadow-[0_0_20px_rgba(168,85,247,0.1)] dark:shadow-[0_0_20px_rgba(168,85,247,0.2)]" style={{ transform: 'translateZ(40px) rotateY(-8deg)' }}>
                     <div className="text-[7.5px] text-purple-600 dark:text-purple-400 font-mono tracking-widest uppercase">BIOMETRIC PORTFOLIO</div>
                     <div className="w-full flex-grow bg-gradient-to-r from-purple-100/40 to-indigo-100/40 dark:from-purple-900/40 dark:to-indigo-900/40 rounded border border-purple-400/20"></div>
                     <div className="flex gap-1.5 h-14">
                       <div className="flex-1 bg-gray-100/60 dark:bg-gray-800/60 rounded border border-black/5 dark:border-white/5"></div>
                       <div className="flex-1 bg-gray-100/60 dark:bg-gray-800/60 rounded border border-black/5 dark:border-white/5"></div>
                     </div>
                  </div>
                </div>
             </div>

             <div className="absolute left-[-150px] top-[30%] lg:top-[35%] w-[150px] h-[120px] hidden 2xl:flex flex-col justify-center gap-[4px] opacity-40 pointer-events-none z-10" style={{ perspective: '800px', transform: 'rotateY(10deg)' }}>
                {Array.from({ length: 15 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="w-full h-[1px] bg-cyan-400 shadow-[0_0_8px_#22d3ee] origin-right"
                    style={{ transform: `rotate(${(i - 7) * 2.5}deg)`, opacity: 1 - Math.abs(i - 7) * 0.1 }}
                  />
                ))}
             </div>

             <div className="w-full relative z-30 mb-2">
                <div className="absolute -top-[8px] -left-[8px] w-8 h-8 border-t-[1.5px] border-l-[1.5px] border-cyan-500/30 dark:border-cyan-400/50 rounded-tl-2xl pointer-events-none opacity-90 shadow-[-4px_-4px_10px_rgba(34,211,238,0.1)] dark:shadow-[-4px_-4px_10px_rgba(34,211,238,0.2)] z-10"></div>
                <div className="absolute -bottom-[8px] -right-[8px] w-8 h-8 border-b-[1.5px] border-r-[1.5px] border-cyan-500/30 dark:border-cyan-400/50 rounded-br-2xl pointer-events-none opacity-90 shadow-[4px_4px_10px_rgba(34,211,238,0.1)] dark:shadow-[4px_4px_10px_rgba(34,211,238,0.2)] z-10"></div>
                <div className="w-full bg-white/70 dark:bg-[#06101E]/40 backdrop-blur-md border-[1.5px] border-cyan-500/30 dark:border-cyan-400/50 rounded-xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05),inset_0_0_15px_rgba(34,211,238,0.05)] dark:shadow-[0_0_30px_rgba(34,211,238,0.2),inset_0_0_15px_rgba(34,211,238,0.1)] flex flex-col relative z-20 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-4 pl-1">
                    <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-[#0b1b36] border border-cyan-500/30 dark:border-cyan-400/60 flex items-center justify-center shadow-[0_0_8px_rgba(34,211,238,0.15)] dark:shadow-[0_0_12px_rgba(34,211,238,0.3)]">
                      <span className="text-cyan-600 dark:text-cyan-400 font-bold text-[12px] font-mono tracking-widest">AI</span>
                    </div>
                    <span className="text-[14px] font-medium text-gray-800 dark:text-gray-200 tracking-wide">Describe your website...</span>
                  </div>
                  <div className="bg-gray-50/90 dark:bg-[#030711]/90 rounded-xl p-4 min-h-[110px] lg:min-h-[130px] border border-gray-200 dark:border-cyan-700/60 relative shadow-[inset_0_2px_8px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] flex flex-col justify-between group transition-colors duration-300">
                    <p className="text-gray-700 dark:text-gray-300 font-medium dark:font-light text-[14px] leading-[1.6]">
                      {typedText}
                      <span className="inline-block w-[2px] h-3.5 ml-1 bg-cyan-500 dark:bg-cyan-400 animate-pulse align-middle" />
                    </p>
                    <div className="self-end mt-2 text-gray-400 dark:text-gray-500 cursor-pointer hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      <Send size={15} className="dark:drop-shadow-[0_0_5px_rgba(255,255,255,0.1)]" />
                    </div>
                  </div>
                </div>
             </div>
             <button 
                onClick={() => router.push('/ai-chat-builder')}
                className="w-full py-4 rounded-[12px] bg-gradient-to-r from-cyan-400 via-cyan-300 to-[#b28cff] text-gray-900 font-extrabold text-[13px] tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all flex items-center justify-center transform hover:scale-[1.02] z-30"
             >
                START WITH AI CONVERSATION
             </button>
          </div>

          <div className="w-full max-w-[400px] md:max-w-none md:flex-1 lg:flex-none lg:w-[420px] relative z-20 flex flex-col justify-center gap-3 shrink-0">
            <div className="w-full relative z-30 mb-2">
                <div className="absolute -top-[8px] -left-[8px] w-8 h-8 border-t-[1.5px] border-l-[1.5px] border-cyan-500/30 dark:border-cyan-400/50 rounded-tl-2xl pointer-events-none opacity-90 shadow-[-4px_-4px_10px_rgba(34,211,238,0.1)] dark:shadow-[-4px_-4px_10px_rgba(34,211,238,0.2)] z-10"></div>
                <div className="absolute -bottom-[8px] -right-[8px] w-8 h-8 border-b-[1.5px] border-r-[1.5px] border-purple-500/30 dark:border-purple-400/50 rounded-br-2xl pointer-events-none opacity-90 shadow-[4px_4px_10px_rgba(168,85,247,0.1)] dark:shadow-[4px_4px_10px_rgba(168,85,247,0.2)] z-10"></div>
                <div className="w-full bg-white/70 dark:bg-[#06101E]/40 backdrop-blur-md border-[1.5px] border-cyan-500/30 dark:border-cyan-400/50 rounded-xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05),inset_0_0_15px_rgba(34,211,238,0.05)] dark:shadow-[0_0_30px_rgba(34,211,238,0.2),inset_0_0_15px_rgba(34,211,238,0.1)] flex flex-col relative z-20 transition-colors duration-300">
               <div className="flex justify-between items-center mb-4 px-1 mt-1">
                  <h3 className="text-gray-800 dark:text-gray-200 text-[12px] font-medium tracking-wide">Select from our curated gallery</h3>
                  <span onClick={() => router.push('/templates')} className="text-[10px] text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 cursor-pointer font-bold tracking-widest uppercase transition-colors">VIEW_ALL</span>
               </div>

               <div className="grid grid-cols-2 gap-3 mb-5">
                  <div onClick={() => router.push('/templates')} className="group relative rounded-xl overflow-hidden cursor-pointer border-2 border-cyan-400/40 dark:border-cyan-500/50 bg-gray-100 dark:bg-[#0A1225] h-[90px] shadow-[0_2px_10px_rgba(34,211,238,0.1)] dark:shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:border-cyan-500 dark:hover:border-cyan-300 transition-colors">
                    <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop" alt="AetherFlow" className="absolute inset-0 w-full h-full object-cover opacity-80 dark:opacity-60 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-[#0A1225] via-black/40 dark:via-[#0A1225]/20 to-transparent" />
                    <div className="absolute inset-x-0 top-0 p-2 flex justify-start">
                      <span className="text-[7px] font-bold tracking-[0.15em] bg-white/90 dark:bg-cyan-950/90 text-cyan-700 dark:text-cyan-300 px-1.5 py-0.5 rounded-[3px] border border-cyan-200 dark:border-cyan-500/40 backdrop-blur-md shadow-sm">AETHERFLOW</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-2.5">
                      <h4 className="font-medium text-[10px] text-white tracking-wide drop-shadow-md">AetherFlow E-com</h4>
                    </div>
                  </div>
                  
                  <div onClick={() => router.push('/templates')} className="group relative rounded-xl overflow-hidden cursor-pointer border border-gray-300 dark:border-white/20 bg-gray-100 dark:bg-[#0A1225] h-[90px] hover:border-purple-400 dark:hover:border-purple-400/50 transition-colors">
                    <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop" alt="Chronos" className="absolute inset-0 w-full h-full object-cover opacity-80 dark:opacity-60 mix-blend-normal dark:mix-blend-luminosity group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-[#0A1225] via-black/40 dark:via-[#0A1225]/20 to-transparent" />
                    <div className="absolute inset-x-0 top-0 p-2 flex justify-start">
                       <span className="text-[7px] font-bold tracking-[0.15em] bg-white/90 dark:bg-[#4a1d96]/90 text-purple-700 dark:text-purple-200 px-1.5 py-0.5 rounded-[3px] border border-purple-200 dark:border-purple-500/40 backdrop-blur-md shadow-sm">CHRONOS</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-2.5">
                       <h4 className="font-medium text-[10px] text-white tracking-wide drop-shadow-md">Chronos Portfolio</h4>
                    </div>
                  </div>
                  
                  <div onClick={() => router.push('/templates')} className="group relative rounded-xl overflow-hidden cursor-pointer border border-gray-300 dark:border-white/20 bg-gray-100 dark:bg-[#0A1225] h-[90px] hover:border-blue-400 dark:hover:border-blue-400/50 transition-colors">
                    <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop" alt="Quantum" className="absolute inset-0 w-full h-full object-cover opacity-80 dark:opacity-50 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-[#0A1225] via-black/40 dark:via-[#0A1225]/20 to-transparent" />
                    <div className="absolute inset-x-0 top-0 p-2 flex justify-start">
                      <span className="text-[7px] font-bold tracking-[0.15em] bg-white/90 dark:bg-[#1e3a8a]/90 text-blue-700 dark:text-blue-200 px-1.5 py-0.5 rounded-[3px] border border-blue-200 dark:border-blue-500/40 backdrop-blur-md shadow-sm">QUANTUM</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-2.5">
                      <h4 className="font-medium text-[10px] text-white tracking-wide drop-shadow-md">Quantum Commerce</h4>
                    </div>
                  </div>
                  
                  <div onClick={() => router.push('/templates')} className="group relative rounded-xl overflow-hidden cursor-pointer border border-gray-300 dark:border-white/20 bg-gray-100 dark:bg-[#0A1225] h-[90px] hover:border-pink-400 dark:hover:border-pink-400/50 transition-colors">
                    <img src="https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=600&auto=format&fit=crop" alt="HoloStream" className="absolute inset-0 w-full h-full object-cover opacity-80 dark:opacity-50 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-[#0A1225] via-black/40 dark:via-[#0A1225]/20 to-transparent" />
                    <div className="absolute inset-x-0 top-0 p-2 flex justify-start z-10">
                      <span className="text-[7px] font-bold tracking-[0.15em] bg-white/90 dark:bg-[#831843]/90 text-pink-700 dark:text-pink-200 px-1.5 py-0.5 rounded-[3px] border border-pink-200 dark:border-pink-500/40 backdrop-blur-md shadow-sm">HOLOSTREAM</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-2.5 z-10">
                      <h4 className="font-medium text-[10px] text-white tracking-wide drop-shadow-md">HoloStream Media</h4>
                    </div>
                  </div>
               </div>
             </div>
             </div>
             
             <button 
                onClick={() => router.push('/templates')}
                className="w-full py-4 rounded-[12px] bg-gradient-to-r from-cyan-300 via-purple-400 to-[#b28cff] text-white font-extrabold text-[13px] tracking-widest shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all transform hover:scale-[1.02] z-30"
             >
                START WITH TEMPLATE GALLERY
             </button>

             <div className="flex items-center gap-3 px-2 opacity-70 mt-1">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" alt="User" className="w-6 h-6 rounded-full border border-gray-600 object-cover grayscale" />
                <p className="text-[9px] text-gray-400 font-light italic leading-relaxed tracking-wide flex-1">
                  "Trusted by innovators like Janeanthe, who used this to build future platforms..."
                </p>
             </div>
          </div>
        </main>

        <footer className="shrink-0 border-t border-gray-200 dark:border-white/10 pt-4 lg:pt-6 z-20 w-full relative mt-4 transition-colors duration-300">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-12 lg:gap-20 w-full mb-2">
            <div className="flex items-center gap-3 group cursor-default scale-90 lg:scale-100">
              <div className="w-[38px] h-[38px] flex items-center gap-1 justify-center transition-colors">
                 <div className="w-[10px] h-[20px] bg-cyan-200 dark:bg-cyan-700/50 border border-cyan-400/40 rounded-[2px]" />
                 <div className="w-[14px] h-[20px] bg-cyan-200 dark:bg-cyan-700/50 border border-cyan-400/40 rounded-[2px] flex items-center justify-center">
                    <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-[6px] border-l-cyan-600 dark:border-l-cyan-400/80" />
                 </div>
                 <div className="w-[10px] h-[20px] bg-cyan-200 dark:bg-cyan-700/50 border border-cyan-400/40 rounded-[2px]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-[13px] text-gray-800 dark:text-gray-200 tracking-wider">INTERACT</span>
                <span className="text-[9px] text-gray-500 tracking-[0.2em] uppercase mt-0.5">Templates</span>
              </div>
            </div>

            <div className="flex items-center gap-3 group cursor-default scale-90 lg:scale-100">
              <div className="w-[38px] h-[38px] rounded-lg flex items-center justify-center transition-colors">
                <BrainCircuit className="text-cyan-500 dark:text-cyan-400 w-7 h-7 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)] dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" strokeWidth={1.5} />
              </div>
               <div className="flex flex-col">
                <span className="font-extrabold text-[13px] text-gray-800 dark:text-gray-200 tracking-wider">D-ADMIN</span>
                <span className="text-[9px] text-gray-500 tracking-[0.2em] uppercase mt-0.5">AI Engine</span>
              </div>
            </div>

            <div className="flex items-center gap-3 group cursor-default scale-90 lg:scale-100">
              <div className="w-[38px] h-[38px] flex items-center justify-center transition-colors">
                <CloudLightning className="text-cyan-500 dark:text-cyan-400 w-7 h-7 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)] dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" strokeWidth={1.5} />
              </div>
               <div className="flex flex-col">
                <span className="font-extrabold text-[13px] text-gray-800 dark:text-gray-200 tracking-wider">INSTANT</span>
                <span className="text-[9px] text-gray-500 tracking-[0.2em] uppercase mt-0.5">Deploy</span>
              </div>
            </div>

            <div className="flex items-center gap-3 group cursor-default scale-90 lg:scale-100">
              <div className="w-[38px] h-[38px] flex items-center justify-center transition-colors">
                <Settings2 className="text-cyan-500 dark:text-cyan-400 w-7 h-7 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)] dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-[13px] text-gray-800 dark:text-gray-200 tracking-wider">FULL</span>
                <span className="text-[9px] text-gray-500 tracking-[0.2em] uppercase mt-0.5">Customization</span>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default HomeView;