'use client';
 
import React, { useState, useEffect } from 'react';
import { Upload, Globe, PanelLeft, ArrowLeft, MessageSquarePlus } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useWorkspace } from '@/features/workspace';
import AgentPicker from './AgentPicker';

export default function StandardTopBar() {
    const { state, actions } = useWorkspace();
    const { viewState, showAIPanel } = state;
    const { setShowLeftSidebar, setIsHelpOpen, handleNewChat, setShowAIPanel } = actions;

    const [mounted, setMounted] = React.useState(false);
    const pathname = usePathname();
    const router = useRouter();

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const isChatBuilder = pathname === '/ai-chat-panel';
    const isHome = pathname === '/';
    const isSpecializedRoute = pathname !== '/' && pathname !== '/ai-chat-panel';
    const shouldShowBackButton = (showAIPanel || isSpecializedRoute || isChatBuilder) && mounted;
    const shouldShowAgentPicker = (viewState !== 'initial' || showAIPanel || isChatBuilder) && !isHome && mounted;

    const handleBack = () => {
        if (isSpecializedRoute || isChatBuilder) {
            router.push('/');
        } else if (setShowAIPanel) {
            setShowAIPanel(false);
        }
    };

    return (
        <div className="sticky top-0 z-50 w-full flex items-center justify-between px-2 h-14 pointer-events-none">
            {/* LEFT — sidebar toggle + agent picker */}
            <div className="flex items-center gap-1.5 pointer-events-auto">
                <button
                    id="topbar-sidebar-toggle"
                    className="w-10 h-10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/[0.06] rounded-lg transition-all focus:outline-none active:scale-95 lg:hidden"
                    onClick={() => setShowLeftSidebar(true)}
                    aria-label="Open sidebar"
                >
                    <PanelLeft size={20} />
                </button>

                <div className="flex items-center gap-2">
                    {shouldShowBackButton && (
                        <button
                            onClick={() => handleBack()}
                            className="w-10 h-10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-all focus:outline-none active:scale-95"
                            aria-label="Back"
                        >
                            <ArrowLeft size={18} />
                        </button>
                    )}
                    <span className="text-white text-[16px] font-black tracking-tightest hidden sm:inline-block lg:ml-4">D-Admin</span>
                    
                    {shouldShowAgentPicker && (
                        <div className="flex items-center gap-1.5">
                            <AgentPicker />
                            {viewState !== 'initial' && !isHome && (
                                <button
                                    onClick={() => handleNewChat()}
                                    className="flex items-center justify-center gap-2 text-xs text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all focus:outline-none active:scale-95 bg-transparent border-none ml-1"
                                    title="New Chat"
                                >
                                    <MessageSquarePlus size={18} className="w-4 h-4" />
                                   <span className="hidden sm:inline text-xs whitespace-nowrap">New Chat</span>
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* SPACER */}
            <div className="flex-1" />

            {/* RIGHT — context action */}
            <div className="flex items-center pointer-events-auto gap-2">
                {viewState !== 'initial' && !isHome ? (
                    <button
                        id="topbar-share-btn"
                        className="flex items-center justify-center w-10 h-10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all focus:outline-none bg-transparent border-none"
                    >
                        <Upload size={18} />
                    </button>
                ) : (
                    <button
                        id="topbar-how-it-works-btn"
                        onClick={() => setIsHelpOpen(true)}
                        className="group flex items-center gap-1.5 px-3 h-10 text-white dark:text-gray-400 hover:text-white/90 dark:hover:text-white text-[13px] font-medium rounded-lg hover:bg-white/5 dark:hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-all focus:outline-none whitespace-nowrap cursor-pointer"
                    >
                        <Globe size={15} className="group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                        <span className="hidden sm:inline">How it works?</span>
                    </button>
                )}
            </div>
        </div>
    );
}
