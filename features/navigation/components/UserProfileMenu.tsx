import { useState, useRef, useEffect } from 'react';
import { Settings, LifeBuoy, LogOut, User, Sparkles, ChevronRight } from 'lucide-react';

interface UserProfileMenuProps {
    isOpen: boolean;
    onOpenSettings?: () => void;
}

export default function UserProfileMenu({ isOpen, onOpenSettings }: UserProfileMenuProps) {
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

    return (
        <div className="p-3 relative flex-shrink-0 w-full" ref={profileRef}>
            <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center rounded-xl transition-colors duration-200 outline-none overflow-hidden whitespace-nowrap h-11 w-full px-1.5 gap-3 hover:bg-black/5 dark:hover:bg-[#202020] ${!isOpen && isProfileOpen ? 'bg-black/5 dark:bg-[#2a2a2a]' : ''}`}
            >
                <div className="w-8 h-8 rounded-full bg-[#d04b1e] text-white flex items-center justify-center font-semibold text-[13px] shrink-0 shadow-sm">
                    D
                </div>
                <div
                    className={`flex flex-col items-start overflow-hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 delay-100' : 'opacity-0'}`}
                >
                    <span className="font-semibold text-sm truncate w-full text-left text-gray-900 dark:text-gray-200">DHEERAJ R S</span>
                </div>
            </button>

            {/* Expanded Profile Menu */}
            {isProfileOpen && (
                <div className="absolute mb-2 bg-white dark:bg-[#2d2d2d] rounded-[16px] p-1.5 shadow-xl dark:shadow-2xl border border-gray-200 dark:border-[#3e3e3e] font-sans z-50 w-[220px] bottom-[58px] left-[10px] animate-in fade-in zoom-in-95">
                    <div className="flex items-center gap-2.5 px-2.5 py-1.5">
                        <div className="w-7 h-7 rounded-full bg-[#f29f05] text-white flex items-center justify-center font-semibold text-[11px] shrink-0 tracking-wide shadow-sm">
                            DS
                        </div>
                        <div className="flex flex-col items-start flex-1 overflow-hidden">
                            <span className="font-semibold text-[14px] truncate w-full text-left text-gray-900 dark:text-gray-100">
                                DHEERAJ R S
                            </span>
                            <span className="text-[12px] text-gray-500 dark:text-gray-400">@drjsde</span>
                        </div>
                    </div>

                    <div className="h-[1px] bg-gray-100 dark:bg-[#3e3e3e] my-1 mx-1.5" />

                    <button className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-[13.5px] text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#3f3f3f] cursor-pointer outline-none w-full text-left transition-colors">
                        <Sparkles size={16} className="text-gray-400 dark:text-gray-300 shrink-0" strokeWidth={2} />
                        <span>Upgrade plan</span>
                    </button>
                    <button className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-[13.5px] text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#3f3f3f] cursor-pointer outline-none w-full text-left transition-colors">
                        <User size={16} className="text-gray-400 dark:text-gray-300 shrink-0" strokeWidth={2} />
                        <span>Personalization</span>
                    </button>
                    <button
                        className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-[13.5px] text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#3f3f3f] cursor-pointer outline-none w-full text-left transition-colors"
                        onClick={() => {
                            onOpenSettings?.();
                            setIsProfileOpen(false);
                        }}
                    >
                        <Settings size={16} className="text-gray-400 dark:text-gray-300 shrink-0" strokeWidth={2} />
                        <span>Settings</span>
                    </button>

                    <div className="h-[1px] bg-gray-100 dark:bg-[#3e3e3e] my-1 mx-1.5" />

                    <button className="flex items-center justify-between px-2.5 py-2.5 rounded-xl text-[13.5px] text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#3f3f3f] cursor-pointer outline-none w-full text-left transition-colors group">
                        <div className="flex items-center gap-2.5">
                            <LifeBuoy size={16} className="text-gray-400 dark:text-gray-300 shrink-0" strokeWidth={2} />
                            <span>Help</span>
                        </div>
                        <ChevronRight size={14} className="text-gray-300 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-200 transition-colors" />
                    </button>
                    <button className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-[13.5px] text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#3f3f3f] cursor-pointer outline-none w-full text-left transition-colors">
                        <LogOut size={16} className="text-gray-400 dark:text-gray-300 shrink-0" strokeWidth={2} />
                        <span>Log out</span>
                    </button>
                </div>
            )}
        </div>
    );
}
