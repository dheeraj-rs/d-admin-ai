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
            className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="bg-[#212121] w-full max-w-[420px] rounded-[24px] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-[#3f3f3f]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-end p-4 pb-0">
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors rounded-full p-1.5 hover:bg-[#3f3f3f]"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="px-8 pb-10 flex flex-col items-center">
                    <h2 className="text-2xl font-semibold text-white mb-6">Welcome back</h2>
                    <p className="text-[15px] text-gray-300 mb-8 text-center max-w-[280px]">
                        Choose an account to continue.
                    </p>

                    <div className="w-full flex items-center justify-between p-3.5 rounded-xl border border-[#3f3f3f] bg-transparent hover:bg-[#2d2d2d] transition-colors cursor-pointer mb-6 group">
                        <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-full bg-[#f39c12] flex items-center justify-center text-white font-medium text-[15px]">
                                DS
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[15px] font-medium text-white leading-tight mb-0.5">
                                    DHEERAJ R S
                                </span>
                                <span className="text-[13px] text-gray-400">drjsde@gmail.com</span>
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-white p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                            <X size={16} />
                        </button>
                    </div>

                    <div className="flex items-center w-full gap-4 mb-6">
                        <div className="flex-1 h-[1px] bg-[#3f3f3f]"></div>
                        <span className="text-[11px] text-gray-500 font-medium tracking-wider">OR</span>
                        <div className="flex-1 h-[1px] bg-[#3f3f3f]"></div>
                    </div>

                    <div className="w-full flex flex-col gap-3">
                        <button className="w-full flex items-center justify-center gap-3 bg-white text-black hover:bg-gray-100 py-3 px-4 rounded-xl font-medium transition-colors border border-transparent">
                            <Github size={18} />
                            Continue with GitHub
                        </button>

                        <button className="w-full flex items-center justify-center gap-3 bg-transparent text-white hover:bg-[#3f3f3f] py-3 px-4 rounded-xl font-medium transition-colors border border-[#3f3f3f]">
                            <GoogleLogo className="w-[18px] h-[18px]" />
                            Continue with Google
                        </button>

                        <button className="w-full text-[15px] text-gray-300 hover:text-white hover:bg-[#3f3f3f] py-3 px-4 rounded-xl font-medium transition-colors border border-transparent mt-1">
                            Log in to another account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
