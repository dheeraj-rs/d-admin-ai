import {
    PanelLeft,
    SquarePen,
    LayoutTemplate,
    Globe,
    LayoutDashboard
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWorkspace } from '@/features/workspace';
import UserProfileMenu from './UserProfileMenu';

const NAV_ITEMS = [
    { icon: LayoutDashboard, label: 'Home', href: '/' },
    { icon: SquarePen, label: 'AI Chat Panel', shortcut: '⇧⌘O', href: '/ai-chat-panel' },
    { icon: LayoutTemplate, label: 'Templates', href: '/templates' },
    { icon: Globe, label: 'Live Websites', href: '/live-websites' },
];

const RECENT_CHATS = [
    'Fix request clarification',
    'Restart Node.js EC2',
    'GitHub Auth Callback URL',
];

export default function Sidebar() {
    const { state, actions } = useWorkspace();
    const { showLeftSidebar: isOpen } = state;
    const { setShowLeftSidebar: toggleSidebar, handleNewChat: onNewChat, setIsSettingsOpen } = actions;
    const onOpenSettings = () => setIsSettingsOpen(true);
    
    const pathname = usePathname();
    return (
        <>
            <div
                className={`bg-white/60 dark:bg-[#02060D] backdrop-blur-3xl border-r border-black/5 dark:border-white/5 h-full transition-all duration-300 ease-in-out relative flex flex-col flex-shrink-0 ${isOpen ? 'w-64' : 'w-16'}`}
            >
                <div className="flex items-center h-[60px] relative w-full shrink-0">
                    <div className="absolute left-2 right-2 inset-y-2 rounded-xl transition-colors duration-300" />
                    <div className="w-16 h-full flex items-center justify-center shrink-0 z-10">
                        <button
                            onClick={() => toggleSidebar(!isOpen)}
                            className={`w-10 h-10 rounded-full bg-white/40 dark:bg-gradient-to-br dark:from-indigo-600 dark:to-indigo-700 text-slate-900 dark:text-white flex items-center justify-center transition-all duration-300 shadow-lg shadow-indigo-500/10 dark:shadow-indigo-500/40 border border-indigo-200/50 dark:border-white/10 hover:scale-105 active:scale-90 group cursor-pointer z-20 backdrop-blur-md`}
                            title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                        >
                            <PanelLeft size={22} className={`transition-transform duration-300 ${!isOpen ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                    {isOpen && (
                        <div className="flex items-center gap-2 overflow-hidden animate-in fade-in slide-in-from-left-2 duration-300">
                             <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />
                             <span className="text-[11px] font-bold text-slate-500 dark:text-slate-500 tracking-widest uppercase">Navigation</span>
                        </div>
                    )}
                </div>
                <div className="mt-4 flex-shrink-0 flex flex-col items-start gap-1 w-full">
                    {NAV_ITEMS.map((item, idx) => {
                        const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                        return (
                            <div key={idx} className="relative w-full h-11 group">
                                <Link
                                    href={item.href}
                                    className={`absolute inset-0 flex items-center transition-all duration-300 ease-in-out font-sans overflow-hidden whitespace-nowrap cursor-pointer px-0`}
                                    onClick={() => {
                                        if (item.label === 'New chat') onNewChat?.();
                                        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                                            toggleSidebar(false);
                                        }
                                    }}
                                >
                                    <div className={`absolute transition-all duration-300 ease-in-out rounded-full ${
                                        isOpen 
                                            ? 'left-2.5 right-2.5 inset-y-0.5' 
                                            : 'left-[12px] right-[12px] inset-y-0.5'
                                    } ${
                                        isActive 
                                            ? 'bg-gradient-to-r from-indigo-600/10 to-blue-600/10 dark:from-indigo-600/20 dark:to-blue-600/20 border border-indigo-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' 
                                            : 'group-hover:bg-black/[0.05] dark:group-hover:bg-white/[0.05] border border-transparent group-hover:border-black/[0.05] dark:group-hover:border-white/[0.05]'
                                    }`} />
                                    <div className="absolute left-0 w-16 h-full flex items-center justify-center shrink-0 z-10">
                                        <div className={`flex items-center justify-center rounded-lg transition-all ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200'}`}>
                                            <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                        </div>
                                    </div>
                                    <span className={`absolute left-16 font-bold text-[13.5px] tracking-tight transition-all duration-300 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                                        {item.label}
                                    </span>
                                </Link>

                                {!isOpen && (
                                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-[#ecfeff] dark:bg-[#1e1e1e] text-gray-900 dark:text-white text-[12px] font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-[70] hidden lg:flex items-center shadow-xl dark:shadow-2xl border border-cyan-200 dark:border-white/[0.1] pointer-events-none whitespace-nowrap translate-x-1 group-hover:translate-x-0">
                                        {item.label}
                                        {item.shortcut && (
                                            <span className="text-gray-500 text-[10px] ml-3 tracking-widest font-black flex items-center bg-black/[0.05] dark:bg-white/[0.05] px-1.5 py-0.5 rounded-lg">
                                                {item.shortcut}
                                            </span>
                                        )}
                                        <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#ecfeff] dark:bg-[#1e1e1e] rotate-45 border-l border-b border-cyan-200 dark:border-white/[0.1]" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className={`flex-1 overflow-y-auto overflow-x-hidden mt-6 transition-opacity duration-300 ${isOpen ? 'opacity-100 delay-100' : 'opacity-0 pointer-events-none delay-0'}`}>
                    <div className="px-5 py-2 text-[10px] font-black text-slate-500 dark:text-gray-500 uppercase tracking-[0.2em]">Recent active</div>
                    <div className="px-3 space-y-1 w-[240px]">
                        {RECENT_CHATS.map((chat, idx) => (
                            <div                                 key={idx} 
                                 onClick={() => {
                                     if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                                         toggleSidebar(false);
                                     }
                                 }}
                                 className="group/chat flex items-center gap-2 p-2 px-3 rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.04] cursor-pointer text-[13px] text-slate-700 dark:text-gray-400 hover:text-slate-950 dark:hover:text-gray-200 transition-all truncate border border-transparent hover:border-black/[0.05] dark:hover:border-white/[0.05]"
                            >
                                <div className="w-1 h-1 rounded-full bg-blue-500 opacity-0 group-hover/chat:opacity-100 transition-opacity" />
                                <span className="truncate font-medium">{chat}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <UserProfileMenu 
                    isOpen={isOpen} 
                    onOpenSettings={onOpenSettings} 
                    onSignIn={() => actions.setIsAuthOpen(true)}
                />
            </div>
        </>
    );
}
