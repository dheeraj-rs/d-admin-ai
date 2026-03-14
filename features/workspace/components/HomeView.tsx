'use client';
import React, { useState, useEffect } from 'react';
import { 
  Send, 
  BrainCircuit, 
  CloudLightning, 
  Settings2, 
  MonitorSmartphone,
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
    <div className="flex-1 w-full h-full bg-[#02060D] text-white font-sans overflow-y-auto overflow-x-hidden relative z-0 flex flex-col custom-scrollbar">
      
      {/* Background Section */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* The generated server room background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen scale-105"
          style={{ backgroundImage: 'url("/home_bg.png")' }}
        />
        {/* Gradients to darken edges and make text pop */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#02060D] via-[#02060D]/50 to-[#02060D]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#02060D]/90 via-transparent to-[#02060D]/80" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col w-full h-full min-h-[850px] max-w-[1500px] mx-auto pt-4 px-8 lg:px-12 pb-6">
        
        {/* HEADER TEXT - Aligned precisely as in the image */}
        <header className="mb-4 w-full relative z-30 pointer-events-none max-w-2xl mt-8">
          <h1 className="text-4xl lg:text-[52px] font-extrabold leading-[1.05] mb-3 tracking-tight drop-shadow-2xl text-white">
            BUILD YOUR VISION<br/>
            INSTANTLY. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">THE AI WAY.</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed drop-shadow-md max-w-xl">
            Select your preferred creation experience. The AI builds it.<br />
            Your stunning, futuristic website in seconds. Ready for 2050.
          </p>
        </header>

        {/* 3-COLUMN LAYOUT (Chat, Girl, Gallery) */}
        <main className="flex-grow flex flex-row items-center justify-between relative z-20 w-full mb-10 h-[450px]">
          
          {/* THE GIRL IN THE CENTER BACK */}
          {/* Using mixBlendMode: 'screen' absolutely removes the black background generated earlier! */}
          <div className="absolute bottom-[5%] left-[53%] -translate-x-1/2 w-[650px] h-[650px] 2xl:w-[750px] 2xl:h-[750px] z-0 pointer-events-none flex justify-center items-end opacity-95">
             <img 
              src="/home_girl_interacting.png" 
              alt="AI Assistant" 
              className="w-full h-full object-contain object-bottom"
              style={{ 
                mixBlendMode: 'screen', // MAGIC TRICK: Makes black background invisible!
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)',
                maskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)',
                filter: 'contrast(1.2) brightness(1.2) hue-rotate(185deg) saturate(0.6)'
              }}
            />
            {/* The little floating UI panel the girl is interacting with */}
            <div className="absolute top-[40%] right-[15%] w-[140px] h-[80px] border border-cyan-400/30 bg-cyan-900/10 rounded-lg backdrop-blur-[2px] transform perspective-[1000px] -rotate-y-[25deg] rotate-x-[5deg] flex flex-col p-2.5 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
               <div className="w-full h-1.5 bg-cyan-400/50 rounded mb-2" />
               <div className="w-2/3 h-1 bg-cyan-400/30 rounded mb-1" />
               <div className="w-3/4 h-1 bg-cyan-400/30 rounded" />
            </div>
          </div>

          {/* LEFT COLUMN: Chat Interface */}
          <div className="w-[420px] relative z-20 flex items-center h-full"> 
             
             {/* The 3D Hovering website projections (Far Left) */}
             <div className="absolute left-[-180px] top-1/2 -translate-y-1/2 w-48 h-[340px] opacity-80 pointer-events-none hidden 2xl:block" style={{ perspective: '1200px' }}>
                <div className="relative w-full h-full transition-transform duration-1000" style={{ transformStyle: 'preserve-3d', transform: 'rotateY(35deg) rotateX(5deg)' }}>
                  {/* Screen 1 (Back left) */}
                  <div className="absolute top-0 left-0 w-48 h-[220px] bg-[#061022]/80 backdrop-blur-md border border-cyan-500/40 rounded-xl p-3 flex flex-col gap-2 shadow-[0_0_20px_rgba(34,211,238,0.2)]" style={{ transform: 'translateZ(-30px)' }}>
                     <div className="text-[8px] text-cyan-400 font-mono tracking-widest uppercase">NEURAL TEMPLATE 7</div>
                     <div className="w-full flex-grow bg-gradient-to-br from-cyan-900/60 to-blue-900/60 rounded flex items-center justify-center border border-cyan-400/20"><Hexagon className="text-cyan-400 w-8 h-8 opacity-40" /></div>
                     <div className="h-1.5 w-3/4 bg-cyan-900 rounded" />
                     <div className="h-1.5 w-1/2 bg-cyan-900 rounded" />
                  </div>
                  {/* Screen 2 (Front right) */}
                  <div className="absolute top-28 left-12 w-48 h-[220px] bg-[#0A1225]/80 backdrop-blur-md border border-purple-500/40 rounded-xl p-3 flex flex-col gap-2 shadow-[0_0_20px_rgba(168,85,247,0.2)]" style={{ transform: 'translateZ(40px) rotateY(-8deg)' }}>
                     <div className="text-[8px] text-purple-400 font-mono tracking-widest uppercase">BIOMETRIC PORTFOLIO</div>
                     <div className="w-full flex-grow bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded border border-purple-400/20"></div>
                     <div className="flex gap-1.5 h-16">
                       <div className="flex-1 bg-gray-800/60 rounded border border-white/5"></div>
                       <div className="flex-1 bg-gray-800/60 rounded border border-white/5"></div>
                     </div>
                  </div>
                </div>
             </div>

             {/* MAIN CHAT BOX - Sized and styled like the reference */}
             <div className="w-full bg-[#06101E]/80 backdrop-blur-3xl border border-cyan-500/30 rounded-[28px] p-6 shadow-[0_0_40px_rgba(6,182,212,0.15)] flex flex-col relative z-30">
                {/* Glowing border accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 rounded-tl-[28px] opacity-80 shadow-[0_0_10px_#22d3ee]" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 rounded-br-[28px] opacity-80 shadow-[0_0_10px_#22d3ee]" />

                {/* Header item inside chat */}
                <div className="flex items-center gap-3 mb-5 mt-1">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_8px_rgba(34,211,238,0.2)]">
                    <span className="text-cyan-400 font-bold text-[11px] font-mono tracking-wide">AI</span>
                  </div>
                  <span className="text-sm font-medium text-cyan-50 tracking-wide">Describe your website...</span>
                </div>
                
                {/* The text area */}
                <div className="bg-[#030711]/70 rounded-2xl p-5 min-h-[140px] border border-cyan-900/50 relative mb-6 shadow-inner flex flex-col justify-between">
                  <p className="text-gray-300 font-light text-[15px] leading-[1.6]">
                    {typedText}
                    <span className="inline-block w-[3px] h-4 ml-1 bg-cyan-400 animate-pulse align-middle" />
                  </p>
                  <div 
                    className="self-end mt-4 text-cyan-500 bg-cyan-900/20 p-2.5 rounded-xl cursor-pointer hover:bg-cyan-900/50 hover:text-cyan-300 transition-colors border border-transparent hover:border-cyan-500/30"
                    onClick={() => router.push('/ai-chat-builder')}
                  >
                    <Send size={16} className="ml-[-2px] mt-[1px]" />
                  </div>
                </div>

                <div className="text-center w-full px-2 mb-1">
                  <button 
                    onClick={() => router.push('/ai-chat-builder')}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-[#b28cff] text-gray-900 font-extrabold text-[13px] tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all flex items-center justify-center transform hover:scale-[1.02]"
                  >
                    START WITH AI CONVERSATION
                  </button>
                </div>
             </div>
          </div>

          {/* RIGHT COLUMN: Template Gallery Options */}
          <div className="w-[440px] relative z-20 flex items-center h-full">
            <div className="w-full bg-[#06101E]/80 backdrop-blur-3xl border border-white/10 rounded-[28px] p-6 shadow-[0_0_40px_rgba(0,0,0,0.4)] flex flex-col relative z-20">
               
               {/* Gallery corner accents */}
               <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-[28px]" />
               <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-[28px]" />

               <div className="flex justify-between items-center mb-5 px-1 mt-1">
                  <h3 className="text-gray-200 text-[13px] font-medium tracking-wide">Select from our curated gallery</h3>
                  <span onClick={() => router.push('/templates')} className="text-[11px] text-cyan-400 hover:text-cyan-300 cursor-pointer font-bold tracking-widest uppercase transition-colors">VIEW_ALL</span>
               </div>

               {/* Templates Grid - 2x2 Layout matches exact style */}
               <div className="grid grid-cols-2 gap-3.5 mb-6">
                  {/* Template 1 */}
                  <div onClick={() => router.push('/templates')} className="group relative rounded-[14px] overflow-hidden cursor-pointer border-2 border-cyan-500/50 bg-[#0A1225] h-[105px] shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:border-cyan-300 transition-colors">
                    <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop" alt="AetherFlow" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1225] via-[#0A1225]/20 to-transparent" />
                    <div className="absolute inset-x-0 top-0 p-2.5 flex justify-start">
                      <span className="text-[8px] font-bold tracking-[0.15em] bg-cyan-950/90 text-cyan-300 px-2 py-1 rounded-[4px] border border-cyan-500/40 backdrop-blur-md shadow-sm">AETHERFLOW</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <h4 className="font-medium text-[11px] text-white tracking-wide">AetherFlow E-com</h4>
                    </div>
                  </div>
                  
                  {/* Template 2 */}
                  <div onClick={() => router.push('/templates')} className="group relative rounded-[14px] overflow-hidden cursor-pointer border border-white/20 bg-[#0A1225] h-[105px] hover:border-purple-400/50 transition-colors">
                    <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop" alt="Chronos" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1225] via-[#0A1225]/20 to-transparent" />
                    <div className="absolute inset-x-0 top-0 p-2.5 flex justify-start">
                       <span className="text-[8px] font-bold tracking-[0.15em] bg-[#4a1d96]/90 text-purple-200 px-2 py-1 rounded-[4px] border border-purple-500/40 backdrop-blur-md shadow-sm">CHRONOS</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-3">
                       <h4 className="font-medium text-[11px] text-white tracking-wide">Chronos Portfolio</h4>
                    </div>
                  </div>
                  
                  {/* Template 3 */}
                  <div onClick={() => router.push('/templates')} className="group relative rounded-[14px] overflow-hidden cursor-pointer border border-white/20 bg-[#0A1225] h-[105px] hover:border-blue-400/50 transition-colors">
                    <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop" alt="Quantum" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1225] via-[#0A1225]/20 to-transparent" />
                    <div className="absolute inset-x-0 top-0 p-2.5 flex justify-start">
                      <span className="text-[8px] font-bold tracking-[0.15em] bg-[#1e3a8a]/90 text-blue-200 px-2 py-1 rounded-[4px] border border-blue-500/40 backdrop-blur-md shadow-sm">QUANTUM</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <h4 className="font-medium text-[11px] text-white tracking-wide">Quantum Commerce</h4>
                    </div>
                  </div>
                  
                  {/* Template 4 */}
                  <div onClick={() => router.push('/templates')} className="group relative rounded-[14px] overflow-hidden cursor-pointer border border-white/20 bg-[#0A1225] h-[105px] hover:border-pink-400/50 transition-colors">
                    <img src="https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=600&auto=format&fit=crop" alt="HoloStream" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1225] via-[#0A1225]/20 to-transparent" />
                    <div className="absolute inset-x-0 top-0 p-2.5 flex justify-start z-10">
                      <span className="text-[8px] font-bold tracking-[0.15em] bg-[#831843]/90 text-pink-200 px-2 py-1 rounded-[4px] border border-pink-500/40 backdrop-blur-md shadow-sm">HOLOSTREAM</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-3 z-10">
                      <h4 className="font-medium text-[11px] text-white tracking-wide">HoloStream Media</h4>
                    </div>
                  </div>
               </div>

               {/* Action button */}
               <div className="w-full px-2 mb-1">
                 <button 
                   onClick={() => router.push('/templates')}
                   className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-300 via-purple-400 to-[#b28cff] text-white font-extrabold text-[13px] tracking-widest shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all transform hover:scale-[1.02]"
                 >
                    START WITH TEMPLATE GALLERY
                 </button>
               </div>

               {/* Trust snippet underneath */}
               <div className="mt-5 flex items-center gap-3 bg-white/[0.04] border border-white/10 p-2.5 rounded-xl backdrop-blur-md px-4">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" alt="User" className="w-7 h-7 rounded-full border border-gray-600 object-cover grayscale opacity-70" />
                  <p className="text-[9.5px] text-gray-400 font-light italic leading-relaxed tracking-wide">
                    "Trusted by innovators like Janeanthe, who used this to build future platforms..."
                  </p>
                  <div className="ml-auto w-1 h-1 bg-gray-500 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-500 rounded-full -ml-1.5"></div>
               </div>
            </div>
          </div>
        </main>

        {/* BOTTOM ICONS ROW - Matches the text layout exactly */}
        <footer className="mt-auto border-t border-white-[0.08] pt-8 z-20 w-full relative mb-4">
          <div className="flex justify-center items-center gap-10 md:gap-16 lg:gap-24 w-full">
            
            <div className="flex items-center gap-4 group cursor-default">
              <div className="w-[42px] h-[42px] border border-white/10 flex items-center gap-1 justify-center transition-colors">
                 {/* Custom CSS icon drawing for the "SEC_GEN TEMPLATES" blocky icon in design */}
                 <div className="w-[10px] h-[18px] bg-cyan-700/50 border border-cyan-400/40 rounded-[2px]"></div>
                 <div className="w-[12px] h-[18px] bg-cyan-700/50 border border-cyan-400/40 rounded-[2px] flex items-center justify-center">
                    <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-[6px] border-l-cyan-400/80"></div>
                 </div>
                 <div className="w-[10px] h-[18px] bg-cyan-700/50 border border-cyan-400/40 rounded-[2px]"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-[14px] text-gray-200 tracking-wider">SEC_GEN</span>
                <span className="text-[10px] text-gray-500 tracking-[0.2em] uppercase mt-0.5">Templates</span>
              </div>
            </div>

            <div className="flex items-center gap-4 group cursor-default">
              <div className="w-[42px] h-[42px] rounded-lg flex items-center justify-center transition-colors">
                <BrainCircuit className="text-cyan-400 w-8 h-8 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" strokeWidth={1.5} />
              </div>
               <div className="flex flex-col">
                <span className="font-extrabold text-[14px] text-gray-200 tracking-wider">NEURAL</span>
                <span className="text-[10px] text-gray-500 tracking-[0.2em] uppercase mt-0.5">AI Engine</span>
              </div>
            </div>

            <div className="flex items-center gap-4 group cursor-default">
              <div className="w-[42px] h-[42px] flex items-center justify-center transition-colors">
                <CloudLightning className="text-cyan-400 w-8 h-8 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" strokeWidth={1.5} />
              </div>
               <div className="flex flex-col">
                <span className="font-extrabold text-[14px] text-gray-200 tracking-wider">INSTANT</span>
                <span className="text-[10px] text-gray-500 tracking-[0.2em] uppercase mt-0.5">Deploy</span>
              </div>
            </div>

            <div className="flex items-center gap-4 group cursor-default">
              <div className="w-[42px] h-[42px] flex items-center justify-center transition-colors">
                <Settings2 className="text-cyan-400 w-8 h-8 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-[14px] text-gray-200 tracking-wider">FULL</span>
                <span className="text-[10px] text-gray-500 tracking-[0.2em] uppercase mt-0.5">Customization</span>
              </div>
            </div>

          </div>
        </footer>

      </div>
    </div>
  );
};

export default HomeView;