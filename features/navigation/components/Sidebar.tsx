import { useState, useRef, useEffect } from 'react';
import {
    SquareTerminal,
    PanelLeftClose,
    PanelLeft,
    SquarePen,
    LayoutTemplate,
    MousePointerClick,
    Globe,
} from 'lucide-react';
import UserProfileMenu from './UserProfileMenu';

const NAV_ITEMS = [
    { icon: SquarePen, label: 'New chat', shortcut: '⇧⌘O' },
    { icon: LayoutTemplate, label: 'Templates' },
    { icon: MousePointerClick, label: 'Drag and drop builder' },
    { icon: Globe, label: 'Published website' },
];

const RECENT_CHATS = [
    'Birthday Wish for Girlfriend',
    'Casual chat tips',
    'First Girl-Friend Chat Tips',
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
    return (
        <>
            <div
                className={`bg-[#171717] h-full transition-[width] duration-300 ease-in-out relative flex flex-col flex-shrink-0 ${isOpen ? 'w-64' : 'w-[68px]'}`}
            >
                {/* Top Header Actions */}
                <div className="flex items-center h-[60px] px-3 relative w-full shrink-0 group">
                    <div className="relative w-11 h-11 flex items-center justify-center shrink-0 z-10 transition-transform duration-300">
                        <div
                            className={`w-8 h-8 rounded-full bg-white text-black flex items-center justify-center cursor-pointer transition-opacity duration-200 ${!isOpen ? 'group-hover:opacity-0' : 'hover:opacity-80'}`}
                        >
                            <SquareTerminal size={16} strokeWidth={2} />
                        </div>
                    </div>

                    <div
                        className={`absolute right-3 flex items-center transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    >
                        <button
                            className="p-2 hover:bg-[#202020] rounded-lg transition-colors text-gray-400 hover:text-gray-200"
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
                            <div className="p-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-[#202020]">
                                <PanelLeft size={20} strokeWidth={1.5} />
                            </div>
                        </div>
                    </button>
                </div>

                {/* Navigation Items */}
                <div className="px-3 pb-2 mt-2 flex-shrink-0 flex flex-col items-start gap-1 w-full">
                    {NAV_ITEMS.map((item, idx) => (
                        <div key={idx} className="relative w-full group">
                            <button
                                className="flex items-center rounded-lg hover:bg-[#202020] transition-colors duration-200 ease-in-out text-gray-200 font-sans overflow-hidden whitespace-nowrap w-full cursor-pointer h-10 px-3 gap-3 shrink-0"
                                onClick={item.label === 'New chat' ? onNewChat : undefined}
                            >
                                <item.icon size={18} className="text-gray-300 shrink-0" strokeWidth={1.5} />
                                <span
                                    className={`text-[13.5px] transition-opacity duration-300 ${isOpen ? 'opacity-100 delay-100' : 'opacity-0'}`}
                                >
                                    {item.label}
                                </span>
                            </button>

                            {/* Tooltip for collapsed state */}
                            {!isOpen && (
                                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-1 px-3 py-2 bg-black text-white text-[13.5px] font-medium rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 flex items-center shadow-xl border border-[#2d2d2d] pointer-events-none whitespace-nowrap">
                                    {item.label}
                                    {item.shortcut && (
                                        <span className="text-gray-400 text-[13.5px] ml-3 tracking-[0.15em] font-sans flex items-center">
                                            {item.shortcut}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Scrollable History Area */}
                <div
                    className={`flex-1 overflow-y-auto overflow-x-hidden mt-2 transition-opacity duration-300 ${isOpen ? 'opacity-100 delay-100' : 'opacity-0 pointer-events-none delay-0'}`}
                >
                    <div className="px-5 py-2 text-xs font-semibold text-gray-500 whitespace-nowrap">Your chats</div>
                    <div className="px-3 space-y-0.5 w-[240px]">
                        {RECENT_CHATS.map((chat, idx) => (
                            <div
                                key={idx}
                                className="p-2 px-3 rounded-lg hover:bg-[#202020] cursor-pointer text-sm text-gray-300 transition-colors truncate"
                            >
                                {chat}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom User Menu */}
                <UserProfileMenu isOpen={isOpen} onOpenSettings={onOpenSettings} />
            </div>
        </>
    );
}
