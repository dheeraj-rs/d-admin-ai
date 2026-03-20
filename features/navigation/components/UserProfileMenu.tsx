import { useState, useRef, useEffect } from 'react';
import { Settings, LifeBuoy, LogOut, ChevronRight, User, Github } from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react';

interface UserProfileMenuProps {
    isOpen: boolean;
    onOpenSettings?: () => void;
    onSignIn?: () => void;
}

export default function UserProfileMenu({ isOpen, onOpenSettings, onSignIn }: UserProfileMenuProps) {
    const { data: session, status } = useSession();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (status === 'unauthenticated') {
        return (
            <div className="relative flex-shrink-0 w-full h-[64px] px-3 flex items-center">
                <button
                    onClick={() => onSignIn ? onSignIn() : signIn()}
                    className={`flex items-center gap-3 w-full h-11 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[13px] transition-all shadow-lg shadow-indigo-500/20 active:scale-95 group overflow-hidden whitespace-nowrap`}
                >
                    <div className="shrink-0">
                        <User size={20} strokeWidth={2.5} />
                    </div>
                    <span className={`transition-all duration-300 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                        Sign In
                    </span>
                </button>
            </div>
        );
    }

    const userEmail = session?.user?.email || '';
    const userName = session?.user?.name || 'User';
    const userInitials = userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    return (
        <div className="relative flex-shrink-0 w-full h-[64px]" ref={profileRef}>
            <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`absolute inset-0 flex items-center transition-all duration-300 outline-none overflow-hidden whitespace-nowrap cursor-pointer`}
            >
                <div className="absolute left-0 w-16 h-full flex items-center justify-center shrink-0 z-10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center font-black text-[14px] shrink-0 shadow-xl shadow-indigo-500/40 hover:scale-105 active:scale-90 transition-transform cursor-pointer overflow-hidden uppercase">
                        {session?.user?.image ? <img src={session.user.image} alt={userName} className="w-full h-full object-cover" /> : userInitials}
                    </div>
                </div>
                <div
                    className={`absolute left-16 flex flex-col items-start overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                >
                    <span className="font-bold text-[13.5px] truncate w-full text-left text-slate-900 dark:text-slate-100 italic tracking-tight uppercase">{userName}</span>
                </div>
            </button>

            {/* Expanded Profile Menu */}
            {isProfileOpen && (
                <div className="absolute mb-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-3xl p-1.5 shadow-2xl dark:shadow-slate-950/50 border border-slate-200/50 dark:border-slate-800/50 font-sans z-50 w-[240px] bottom-[64px] left-[12px] animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-300">
                    <div className="flex items-center gap-3 px-3 py-3 border-b border-slate-100 dark:border-slate-800/50 mb-1.5">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center font-black text-[12px] shrink-0 tracking-wide shadow-lg shadow-indigo-500/20 uppercase overflow-hidden">
                             {session?.user?.image ? <img src={session.user.image} alt={userName} className="w-full h-full object-cover" /> : userInitials}
                        </div>
                        <div className="flex flex-col items-start flex-1 overflow-hidden">
                            <span className="font-black text-[14px] truncate w-full text-left text-slate-900 dark:text-white tracking-tight italic uppercase">
                                {userName}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider truncate w-full">{userEmail}</span>
                            {session?.provider && (
                                <div className="mt-1 flex items-center gap-1.5 text-[10px] font-bold text-indigo-500/80 dark:text-indigo-400/80 uppercase tracking-widest">
                                    {session.provider === 'github' ? <Github size={10} strokeWidth={3} /> : <div className="w-2.5 h-2.5 rounded-full bg-indigo-500/20 flex items-center justify-center"><div className="w-1 h-1 rounded-full bg-current" /></div>}
                                    <span>{session.provider}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-0.5">
                        <button
                            className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-[13.5px] font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer outline-none w-full text-left transition-all group"
                            onClick={() => {
                                onOpenSettings?.();
                                setIsProfileOpen(false);
                            }}
                        >
                            <Settings size={17} className="text-indigo-500/70 dark:text-indigo-400/70 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" strokeWidth={2.5} />
                            <span>Settings</span>
                        </button>

                        <div className="h-[1px] bg-slate-100 dark:bg-slate-800/50 my-1.5 mx-2" />

                        <button className="flex items-center justify-between px-3 py-2.5 rounded-2xl text-[13.5px] font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-not-allowed outline-none w-full text-left transition-all group" disabled>
                            <div className="flex items-center gap-3">
                                <LifeBuoy size={17} className="text-indigo-500/70 dark:text-indigo-400/70 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" strokeWidth={2.5} />
                                <span>Help</span>
                            </div>
                            <ChevronRight size={14} className="text-slate-300 dark:text-slate-600 group-hover:translate-x-0.5 transition-all" />
                        </button>
                        <button 
                            onClick={() => signOut()}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-[13.5px] font-bold text-slate-500 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 cursor-pointer outline-none w-full text-left transition-all group mt-1"
                        >
                            <LogOut size={17} className="opacity-70 group-hover:opacity-100 transition-opacity" strokeWidth={2.5} />
                            <span>Log out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
