import { ChevronDown, Upload, Globe, PanelLeft, Check } from 'lucide-react';
import type { ViewState } from '../types/index';
import { AGENTS } from '../constants/agents';

interface DefaultTopBarProps {
    viewState: ViewState;
    setShowLeftSidebar: (s: boolean) => void;
    isAgentOpen: boolean;
    setIsAgentOpen: (s: boolean) => void;
    setIsHelpOpen: (s: boolean) => void;
    selectedAgent: string;
    setSelectedAgent: (s: string) => void;
}

export default function DefaultTopBar({
    viewState,
    setShowLeftSidebar,
    isAgentOpen,
    setIsAgentOpen,
    setIsHelpOpen,
    selectedAgent,
    setSelectedAgent,
}: DefaultTopBarProps) {
    const currentAgent = AGENTS.find((a) => a.id === selectedAgent) || AGENTS[0];

    return (
        <div className="sticky top-0 w-full p-2 sm:p-3 flex justify-between items-center backdrop-blur-md bg-[#212121]/80 z-50 text-gray-400 pointer-events-none">
            <div className="flex items-center gap-1 sm:gap-2 pointer-events-auto">
                <button
                    className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg transition-colors shrink-0 focus:outline-none focus:ring-0 active:bg-transparent"
                    onClick={() => setShowLeftSidebar(true)}
                >
                    <PanelLeft size={20} />
                </button>
                <div className="relative pointer-events-auto min-w-0">
                    <button
                        onClick={() => setIsAgentOpen(!isAgentOpen)}
                        className={`flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-1.5 transition-all cursor-pointer font-semibold text-[14px] sm:text-[15px] whitespace-nowrap focus:outline-none focus:ring-0 ${isAgentOpen ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        <span className="text-white truncate">d-admin</span>
                        <div className="flex items-center gap-1.5 ml-0.5">
                            {currentAgent.icon}
                            <span className="text-gray-300 font-medium text-[13px] hidden xs:inline">{currentAgent.name}</span>
                        </div>
                        <ChevronDown
                            size={14}
                            className={`text-gray-400 transition-transform duration-200 ml-0.5 shrink-0 ${isAgentOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {isAgentOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsAgentOpen(false)} />
                            <div className="absolute top-full left-0 mt-2 w-44 sm:w-48 bg-[#1a1a1a] rounded-xl shadow-2xl border border-[#2f2f2f] z-50 flex flex-col p-1 animate-in fade-in slide-in-from-top-2 zoom-in-95">
                                {AGENTS.map((agent) => (
                                    <button
                                        key={agent.id}
                                        onClick={() => {
                                            setSelectedAgent(agent.id);
                                            setIsAgentOpen(false);
                                        }}
                                        className={`flex items-center justify-between px-3 py-2 text-[14px] rounded-lg transition-all text-left w-full font-medium ${selectedAgent === agent.id ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            {agent.icon}
                                            {agent.name}
                                        </div>
                                        {selectedAgent === agent.id && (
                                            <Check size={14} className="text-gray-200" strokeWidth={2.5} />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
            {viewState !== 'initial' ? (
                <div className="flex items-center gap-1 pr-1 sm:pr-2 pointer-events-auto">
                    <button className="flex items-center gap-1.5 px-2.5 sm:px-3 h-[34px] text-gray-400 hover:text-white transition-colors text-[13px] sm:text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-0">
                        <Upload size={14} /> <span className="hidden xs:inline">Share</span>
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-1 pr-1 sm:pr-2 pointer-events-auto shrink-0">
                    <button
                        onClick={() => setIsHelpOpen(true)}
                        className="group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 h-[36px] text-gray-400 hover:text-white transition-all duration-300 text-[13px] sm:text-sm font-medium cursor-pointer whitespace-nowrap focus:outline-none focus:ring-0"
                    >
                        <Globe
                            size={16}
                            className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300"
                        />
                        <span className="hidden xss:inline font-medium">How it works ?</span>
                    </button>
                </div>
            )}
        </div>
    );
}
