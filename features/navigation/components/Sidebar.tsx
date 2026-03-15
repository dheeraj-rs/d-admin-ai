import {
    SquareTerminal,
    PanelLeftClose,
    PanelLeft,
    SquarePen,
    LayoutTemplate,
    Globe,
    LayoutDashboard
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ViewState } from '../../workspace/types';
import UserProfileMenu from './UserProfileMenu';

const NAV_ITEMS = [
    { icon: LayoutDashboard, label: 'Home', href: '/' },
    { icon: SquarePen, label: 'New chat', shortcut: '⇧⌘O', href: '/ai-chat-builder' },
    { icon: LayoutTemplate, label: 'Templates', href: '/templates' },
    { icon: Globe, label: 'Published website', href: '/published-sites' },
];

const RECENT_CHATS = [
    'Fix request clarification',
    'Restart Node.js EC2',
    'GitHub Auth Callback URL',
];

export default function Sidebar({
    isOpen,
    toggleSidebar,
    onNewChat,
    onOpenSettings,
}: {
    isOpen: boolean;
    toggleSidebar: () => void;
    onNewChat?: () => void;
    onOpenSettings?: () => void;
}) {
    const pathname = usePathname();
    return (
        <>
            <div
                className={`bg-white/60 dark:bg-[#02060D]/60 backdrop-blur-3xl border-r border-black/5 dark:border-white/5 h-full transition-all duration-300 ease-in-out relative flex flex-col flex-shrink-0 ${isOpen ? 'w-64' : 'w-[68px]'}`}
            >
                {/* Top Header Actions */}
                <div className="flex items-center h-[60px] px-3 relative w-full shrink-0 group">
                    <div className="relative w-11 h-11 flex items-center justify-center shrink-0 z-10 transition-transform duration-300">
                        <div
                            className={`w-8 h-8 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black flex items-center justify-center cursor-pointer transition-opacity duration-200 ${!isOpen ? 'group-hover:opacity-0' : 'hover:opacity-80'}`}
                        >
                            <SquareTerminal size={16} strokeWidth={2} />
                        </div>
                    </div>

                    <div
                        className={`absolute right-3 flex items-center transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    >
                        <button
                            className="p-2 hover:bg-gray-200 dark:hover:bg-[#202020] rounded-lg transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                            title="Close sidebar"
                            onClick={toggleSidebar}
                        >
                            <PanelLeftClose size={20} strokeWidth={1.5} />
                        </button>
                    </div>

                    <button
                        className={`absolute left-3 w-11 h-11 flex items-center justify-center z-20 transition-opacity duration-300 ${!isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                        onClick={toggleSidebar}
                        title="Open sidebar"
                    >
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute inset-0 flex items-center justify-center">
                            <div className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-[#202020]">
                                <PanelLeft size={20} strokeWidth={1.5} />
                            </div>
                        </div>
                    </button>
                </div>

                {/* Navigation Items */}
                <div className="px-3 pb-2 mt-4 flex-shrink-0 flex flex-col items-start gap-1.5 w-full">
                    {NAV_ITEMS.map((item, idx) => {
                        // Exact match for Home ('/'), prefix match for others
                        const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                            
                        return (
                            <div key={idx} className="relative w-full group">
                                <Link
                                    href={item.href}
                                    className={`flex items-center rounded-xl transition-all duration-300 ease-in-out font-sans overflow-hidden whitespace-nowrap w-full cursor-pointer h-11 px-3 shrink-0 ${
                                        isActive 
                                            ? 'bg-gradient-to-r from-cyan-600/10 to-blue-600/10 dark:from-cyan-600/20 dark:to-blue-600/20 text-gray-900 dark:text-white border border-cyan-500/20' 
                                            : 'hover:bg-black/[0.05] dark:hover:bg-white/[0.05] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border border-transparent hover:border-black/[0.05] dark:hover:border-white/[0.05]'
                                    }`}
                                    onClick={() => {
                                        if (item.label === 'New chat') onNewChat?.();
                                    }}
                                >
                                    <div className="w-11 flex items-center justify-center shrink-0 -ml-3">
                                        <div className={`flex items-center justify-center p-1.5 rounded-lg transition-all ${isActive ? 'bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 shadow-[0_0_15px_-3px_rgba(34,211,238,0.3)] dark:shadow-[0_0_15px_-3px_rgba(34,211,238,0.5)]' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200'}`}>
                                            <item.icon 
                                                size={18} 
                                                strokeWidth={isActive ? 2.5 : 2} 
                                            />
                                        </div>
                                    </div>
                                    <span
                                        className={`text-[13.5px] tracking-tight transition-all duration-300 ml-1 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}
                                    >
                                        {item.label}
                                    </span>
                                </Link>
                                
                                {/* Tooltip for collapsed state */}
                                {!isOpen && (
                                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white text-[12px] font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-[70] flex items-center shadow-xl dark:shadow-2xl border border-gray-200 dark:border-white/[0.1] pointer-events-none whitespace-nowrap translate-x-1 group-hover:translate-x-0">
                                        {item.label}
                                        {item.shortcut && (
                                            <span className="text-gray-500 text-[10px] ml-3 tracking-widest font-black flex items-center bg-black/[0.05] dark:bg-white/[0.05] px-1.5 py-0.5 rounded-lg">
                                                {item.shortcut}
                                            </span>
                                        )}
                                        <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-white dark:bg-[#1e1e1e] rotate-45 border-l border-b border-gray-200 dark:border-white/[0.1]" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Scrollable History Area */}
                <div
                    className={`flex-1 overflow-y-auto overflow-x-hidden mt-6 transition-opacity duration-300 ${isOpen ? 'opacity-100 delay-100' : 'opacity-0 pointer-events-none delay-0'}`}
                >
                    <div className="px-5 py-2 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Recent active</div>
                    <div className="px-3 space-y-1 w-[240px]">
                        {RECENT_CHATS.map((chat, idx) => (
                            <div
                                key={idx}
                                className="group/chat flex items-center gap-2 p-2 px-3 rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.04] cursor-pointer text-[13px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all truncate border border-transparent hover:border-black/[0.05] dark:hover:border-white/[0.05]"
                            >
                                <div className="w-1 h-1 rounded-full bg-blue-500 opacity-0 group-hover/chat:opacity-100 transition-opacity" />
                                <span className="truncate font-medium">{chat}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <UserProfileMenu isOpen={isOpen} onOpenSettings={onOpenSettings} />
            </div>
        </>
    );
}
