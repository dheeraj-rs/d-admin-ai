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
                className={`flex items-center rounded-xl transition-colors duration-200 outline-none overflow-hidden whitespace-nowrap h-11 w-full px-1.5 gap-3 hover:bg-[#202020] ${!isOpen && isProfileOpen ? 'bg-[#2a2a2a]' : ''}`}
            >
                <div className="w-8 h-8 rounded-full bg-[#d04b1e] text-white flex items-center justify-center font-semibold text-[13px] shrink-0">
                    D
                </div>
                <div
                    className={`flex flex-col items-start overflow-hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 delay-100' : 'opacity-0'}`}
                >
                    <span className="font-semibold text-sm truncate w-full text-left text-gray-200">DHEERAJ R S</span>
                </div>
            </button>

            {/* Expanded Profile Menu */}
            {isProfileOpen && (
                <div className="absolute mb-2 bg-[#2d2d2d] rounded-[16px] p-2 shadow-2xl border border-[#3e3e3e] font-sans z-50 w-[240px] bottom-[58px] left-[10px] animate-in fade-in zoom-in-95">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-8 h-8 rounded-full bg-[#f29f05] text-white flex items-center justify-center font-semibold text-xs shrink-0 tracking-wide">
                            DS
                        </div>
                        <div className="flex flex-col items-start flex-1 overflow-hidden">
                            <span className="font-semibold text-[15px] truncate w-full text-left text-gray-100">
                                DHEERAJ R S
                            </span>
                            <span className="text-[13px] text-gray-400">@drjsde</span>
                        </div>
                    </div>

                    <div className="h-[1px] bg-[#3e3e3e] my-1 mx-2" />

                    <button className="flex items-center gap-3 px-3 py-3 rounded-xl text-[14.5px] text-gray-200 hover:bg-[#3f3f3f] cursor-pointer outline-none w-full text-left transition-colors">
                        <Sparkles size={18} className="text-gray-300 shrink-0" strokeWidth={2} />
                        <span>Upgrade plan</span>
                    </button>
                    <button className="flex items-center gap-3 px-3 py-3 rounded-xl text-[14.5px] text-gray-200 hover:bg-[#3f3f3f] cursor-pointer outline-none w-full text-left transition-colors">
                        <User size={18} className="text-gray-300 shrink-0" strokeWidth={2} />
                        <span>Personalization</span>
                    </button>
                    <button
                        className="flex items-center gap-3 px-3 py-3 rounded-xl text-[14.5px] text-gray-200 hover:bg-[#3f3f3f] cursor-pointer outline-none w-full text-left transition-colors"
                        onClick={() => {
                            onOpenSettings?.();
                            setIsProfileOpen(false);
                        }}
                    >
                        <Settings size={18} className="text-gray-300 shrink-0" strokeWidth={2} />
                        <span>Settings</span>
                    </button>

                    <div className="h-[1px] bg-[#3e3e3e] my-1 mx-2" />

                    <button className="flex items-center justify-between px-3 py-3 rounded-xl text-[14.5px] text-gray-200 hover:bg-[#3f3f3f] cursor-pointer outline-none w-full text-left transition-colors group">
                        <div className="flex items-center gap-3">
                            <LifeBuoy size={18} className="text-gray-300 shrink-0" strokeWidth={2} />
                            <span>Help</span>
                        </div>
                        <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-200 transition-colors" />
                    </button>
                    <button className="flex items-center gap-3 px-3 py-3 rounded-xl text-[14.5px] text-gray-200 hover:bg-[#3f3f3f] cursor-pointer outline-none w-full text-left transition-colors">
                        <LogOut size={18} className="text-gray-300 shrink-0" strokeWidth={2} />
                        <span>Log out</span>
                    </button>
                </div>
            )}
        </div>
    );
}
