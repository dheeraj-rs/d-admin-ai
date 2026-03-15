'use client';

import { Upload, Globe, PanelLeft, ArrowLeft, MessageSquarePlus } from 'lucide-react';
import type { ViewState } from '../../types/index';
import { usePathname, useRouter } from 'next/navigation';
import AgentPicker from './AgentPicker';

interface DefaultTopBarProps {
    viewState: ViewState;
    setShowLeftSidebar: (s: boolean) => void;
    isAgentOpen: boolean;
    setIsAgentOpen: (s: boolean) => void;
    setIsHelpOpen: (s: boolean) => void;
    selectedAgent: string;
    setSelectedAgent: (s: string) => void;
    handleNewChat: () => void;
    showAIPanel?: boolean;
    setShowAIPanel?: (v: boolean) => void;
}

export default function DefaultTopBar({
    viewState,
    setShowLeftSidebar,
    isAgentOpen,
    setIsAgentOpen,
    setIsHelpOpen,
    selectedAgent,
    setSelectedAgent,
    handleNewChat,
    showAIPanel,
    setShowAIPanel,
}: DefaultTopBarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const isChatBuilder = pathname === '/ai-chat-builder';
    const isHome = pathname === '/';
    const isSpecializedRoute = pathname !== '/' && pathname !== '/ai-chat-builder';
    const shouldShowBackButton = showAIPanel || isSpecializedRoute || isChatBuilder;
    const shouldShowAgentPicker = (viewState !== 'initial' || showAIPanel || isChatBuilder) && !isHome;

    const handleBack = () => {
        if (isSpecializedRoute || isChatBuilder) {
            router.push('/');
        } else if (setShowAIPanel) {
            setShowAIPanel(false);
        }
    };

    return (
        <div className="sticky top-0 z-50 w-full flex items-center justify-between px-2 lg:px-8 h-14 pointer-events-none">
            {/* LEFT — sidebar toggle + agent picker */}
            <div className="flex items-center gap-1.5 pointer-events-auto">
                <button
                    id="topbar-sidebar-toggle"
                    className="w-10 h-10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/[0.06] rounded-lg transition-all focus:outline-none active:scale-95"
                    onClick={() => setShowLeftSidebar(true)}
                    aria-label="Open sidebar"
                >
                    <PanelLeft size={20} />
                </button>

                <div className="flex items-center gap-2">
                    {shouldShowBackButton && (
                        <button
                            onClick={handleBack}
                            className="w-10 h-10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-all focus:outline-none active:scale-95"
                            aria-label="Back"
                        >
                            <ArrowLeft size={18} />
                        </button>
                    )}
                    <span className="text-gray-900 dark:text-white text-[16px] font-black tracking-tightest hidden sm:inline-block">D-Admin</span>
                    
                    {shouldShowAgentPicker && (
                        <div className="flex items-center gap-1.5">
                            <AgentPicker 
                                selectedAgent={selectedAgent}
                                setSelectedAgent={setSelectedAgent}
                                isAgentOpen={isAgentOpen}
                                setIsAgentOpen={setIsAgentOpen}
                            />
                            {viewState !== 'initial' && !isHome && (
                                <button
                                    onClick={handleNewChat}
                                    className="flex items-center justify-center w-10 h-10 text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all focus:outline-none active:scale-95 bg-transparent border-none ml-1"
                                    title="New Chat"
                                >
                                    <MessageSquarePlus size={18} />
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
                        className="group flex items-center gap-1.5 px-3 h-10 text-black dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-[13px] font-medium rounded-lg hover:bg-black/5 dark:hover:bg-white/[0.06] border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all focus:outline-none whitespace-nowrap cursor-pointer"
                    >
                        <Globe size={15} className="group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                        <span className="hidden sm:inline">How it works?</span>
                    </button>
                )}
            </div>
        </div>
    );
}
