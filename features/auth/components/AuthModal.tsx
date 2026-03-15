import { Github, X } from 'lucide-react';

const GoogleLogo = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
        />
        <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
        />
        <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
        />
        <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
        />
    </svg>
);

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-slate-950/60 z-[100] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="bg-slate-900/90 dark:bg-[#0B0B0D]/90 w-full max-w-[420px] max-h-[90dvh] rounded-[28px] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col animate-in zoom-in-95 duration-200 border border-white/10 dark:border-indigo-500/20 backdrop-blur-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-end p-4 pb-0 shrink-0">
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-all rounded-lg p-2 hover:bg-white/5 border border-transparent hover:border-white/10 active:scale-95"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="px-8 pb-10 flex flex-col items-center overflow-y-auto custom-scrollbar flex-1">
                    <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tightest">Welcome back</h2>
                    <p className="text-[14px] text-slate-400 mb-8 text-center font-medium">
                        Choose an account to continue.
                    </p>

                    <div className="w-full flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-pointer mb-6 group active:scale-[0.98]">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-white font-black text-[16px] shadow-lg">
                                DS
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[15px] font-bold text-white leading-tight">
                                    DHEERAJ R S
                                </span>
                                <span className="text-[12px] text-slate-400 font-medium">drjsde@gmail.com</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center w-full gap-4 mb-6">
                        <div className="flex-1 h-[1px] bg-white/10"></div>
                        <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-0.5">OR</span>
                        <div className="flex-1 h-[1px] bg-white/10"></div>
                    </div>

                    <div className="w-full flex flex-col gap-3">
                        <button className="w-full h-12 min-h-[48px] flex items-center justify-center gap-3 bg-white text-black hover:bg-gray-100 rounded-xl font-bold transition-all transform active:scale-95 shadow-lg">
                            <Github size={18} strokeWidth={2.5} />
                            Continue with GitHub
                        </button>

                        <button className="w-full h-12 min-h-[48px] flex items-center justify-center gap-3 bg-white/5 text-white hover:bg-white/10 rounded-xl font-bold transition-all border border-white/10 active:scale-95">
                            <GoogleLogo className="w-[18px] h-[18px]" />
                            Continue with Google
                        </button>

                        <button className="w-full h-11 text-[13px] text-slate-400 hover:text-white font-bold tracking-wide transition-colors mt-2">
                            Log in to another account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
