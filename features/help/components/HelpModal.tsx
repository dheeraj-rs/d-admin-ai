import { X, Play } from 'lucide-react';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-slate-950/60 z-[110] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => onClose()}
        >
            <div
                className="bg-slate-900/90 dark:bg-[#0B0B0D]/90 w-full max-w-4xl max-h-[90dvh] rounded-[28px] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10 dark:border-indigo-500/20 backdrop-blur-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-6 pb-2 shrink-0">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3 tracking-tight">
                        <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 pointer-events-none">
                            <Play size={18} className="text-indigo-400 fill-indigo-400 ml-0.5" />
                        </div>
                        How d-admin works
                    </h2>
                    <button
                        onClick={() => onClose()}
                        className="text-slate-400 hover:text-white transition-all rounded-lg p-2 hover:bg-white/5 border border-transparent hover:border-white/10 active:scale-95"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="px-6 pb-6">
                        <div className="relative aspect-video bg-black w-full flex items-center justify-center rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                            <video
                                className="w-full h-full object-cover outline-none bg-black"
                                controls
                                autoPlay
                                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
                                poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg"
                            />
                        </div>
                    </div>

                    <div className="px-8 pb-10 pt-2 flex flex-col gap-4 text-center items-center">
                        <h3 className="text-[24px] font-extrabold text-white tracking-tightest leading-tight">
                            Create websites in seconds using AI
                        </h3>
                        <p className="text-slate-400 text-[15px] leading-relaxed max-w-2xl font-medium">
                            Welcome to <span className="text-white font-bold">d-admin</span>! Just enter what you want to build
                            in the prompt, and our AI will automatically write the code, configure the environment, and
                            provide a live preview setup for all screen sizes. 
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                            {['Code', 'Preview', 'Chat'].map((tab) => (
                                <span key={tab} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[12px] font-bold text-indigo-400 tracking-wide">
                                    {tab}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
