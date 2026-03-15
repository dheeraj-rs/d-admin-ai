'use client';

import { ChevronDown, Upload, Globe, PanelLeft, Check, Sparkles, ArrowLeft } from 'lucide-react';
import type { ViewState } from '../types/index';
import { AGENTS } from '../constants/agents';
import { usePathname, useRouter } from 'next/navigation';

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
    const currentAgent = AGENTS.find((a) => a.id === selectedAgent) || AGENTS[0];
    const pathname = usePathname();
    const router = useRouter();

    const isChatBuilder = pathname === '/ai-chat-builder';
    const isSpecializedRoute = pathname !== '/';
    const shouldShowBackButton = showAIPanel || isSpecializedRoute;
    const shouldShowAgentPicker = viewState !== 'initial' || showAIPanel || isChatBuilder;

    const handleBack = () => {
        if (isSpecializedRoute) {
            router.push('/');
        } else if (setShowAIPanel) {
            setShowAIPanel(false);
        }
    };

    return (
        <div className="sticky top-0 z-50 w-full flex items-center justify-between px-2 lg:px-8 h-14 pointer-events-none">
            {/* LEFT — sidebar toggle + agent picker */}
            <div className="flex items-center gap-1 pointer-events-auto">
                <button
                    id="topbar-sidebar-toggle"
                    className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/[0.06] rounded-xl transition-all focus:outline-none active:scale-95"
                    onClick={() => setShowLeftSidebar(true)}
                    aria-label="Open sidebar"
                >
                    <PanelLeft size={20} />
                </button>

                <div className="flex items-center gap-2 ml-2">
                    {shouldShowBackButton && (
                        <button
                            onClick={handleBack}
                            className="w-8 h-8 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] rounded-lg transition-all focus:outline-none active:scale-95 mr-1"
                            aria-label="Back"
                        >
                            <ArrowLeft size={18} />
                        </button>
                    )}
                    <span className="text-gray-900 dark:text-white text-[16px] font-black tracking-tightest">D-Admin</span>
                    
                    {shouldShowAgentPicker && (
                        <div className="flex items-center gap-1.5">
                            <div className="relative group">
                                <button
                                    id="topbar-agent-picker"
                                    onClick={() => setIsAgentOpen(!isAgentOpen)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all font-semibold focus:outline-none border shadow-sm dark:shadow-none ${
                                        isAgentOpen 
                                            ? 'bg-gray-100 dark:bg-white/[0.08] text-gray-900 dark:text-white border-gray-200 dark:border-white/[0.15]' 
                                            : 'text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/[0.05] border-transparent hover:border-gray-200 dark:hover:border-white/[0.1]'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        {currentAgent.icon}
                                        <span className="text-[12px] font-bold tracking-tight hidden sm:inline text-inherit">{currentAgent.name}</span>
                                    </div>
                                    <ChevronDown
                                        size={12}
                                        className={`text-gray-400 dark:text-gray-500 transition-transform duration-200 ${isAgentOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {isAgentOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setIsAgentOpen(false)} />
                                        <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-2xl border border-slate-200 dark:border-slate-800 z-50 flex flex-col p-1.5 animate-in fade-in slide-in-from-top-2 zoom-in-95">
                                            {AGENTS.map((agent) => (
                                                <button
                                                    key={agent.id}
                                                    onClick={() => {
                                                        setSelectedAgent(agent.id);
                                                        setIsAgentOpen(false);
                                                    }}
                                                    className={`flex items-center justify-between px-3 py-2.5 text-[13px] rounded-xl transition-all text-left w-full font-medium ${selectedAgent === agent.id ? 'bg-slate-100 dark:bg-slate-800 text-[var(--text-main)]' : 'text-[var(--text-muted)] hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-[var(--text-main)]'}`}
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    {agent.icon}
                                                    {agent.name}
                                                </div>
                                                {selectedAgent === agent.id && (
                                                    <Check size={13} className="text-indigo-500 dark:text-indigo-400" strokeWidth={2.5} />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                        {viewState !== 'initial' && (
                            <button
                                onClick={handleNewChat}
                                className="flex items-center gap-1.5 px-1.5 py-1 h-8 text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 text-[12px] font-bold transition-all focus:outline-none active:scale-95 bg-transparent border-none shadow-none"
                            >
                                <Sparkles size={14} />
                                <span>New Chat</span>
                            </button>
                        )}
                    </div>
                )}
            </div>
            </div>

            {/* SPACER */}
            <div className="flex-1" />

            {/* RIGHT — context action */}
            <div className="flex items-center pointer-events-auto">
                {viewState !== 'initial' ? (
                    <button
                        id="topbar-share-btn"
                        className="flex items-center gap-1.5 px-3 py-1.5 h-9 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-[13px] font-medium rounded-xl hover:bg-black/5 dark:hover:bg-white/[0.06] transition-all focus:outline-none"
                    >
                        <Upload size={14} />
                        <span className="hidden sm:inline">Share</span>
                    </button>
                ) : (
                    <button
                        id="topbar-how-it-works-btn"
                        onClick={() => setIsHelpOpen(true)}
                        className="group flex items-center gap-1.5 px-2.5 py-1.5 h-9 text-black dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-[13px] font-medium rounded-xl hover:bg-black/5 dark:hover:bg-white/[0.06] transition-all focus:outline-none whitespace-nowrap cursor-pointer"
                    >
                        <Globe size={15} className="group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                        <span className="hidden sm:inline">How it works?</span>
                    </button>
                )}
            </div>
        </div>
    );
}
