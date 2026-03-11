import { ChevronDown, Upload, Globe, Menu, Check } from 'lucide-react';
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
        <div className="absolute top-0 w-full p-3 flex justify-between items-center bg-transparent z-10 text-gray-400 pointer-events-none">
            <div className="flex items-center gap-2 pointer-events-auto">
                <button
                    className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-[#2f2f2f] rounded-lg transition-colors"
                    onClick={() => setShowLeftSidebar(true)}
                >
                    <Menu size={20} />
                </button>
                <div className="relative pointer-events-auto">
                    <button
                        onClick={() => setIsAgentOpen(!isAgentOpen)}
                        onBlur={() => setTimeout(() => setIsAgentOpen(false), 200)}
                        className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all cursor-pointer font-semibold text-[14px] sm:text-[15px] border ${isAgentOpen ? 'bg-transparent border-[#555] shadow-sm' : 'bg-transparent border-transparent hover:bg-[#2f2f2f]'}`}
                    >
                        <span className="text-white">d-admin</span>
                        <div className="flex items-center gap-1.5 ml-1 px-2 py-0.5">
                            {currentAgent.icon}
                            <span className="text-gray-300 font-medium text-[13px]">{currentAgent.name}</span>
                        </div>
                        <ChevronDown
                            size={14}
                            className={`text-gray-400 transition-transform duration-200 ml-0.5 ${isAgentOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {isAgentOpen && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-[#212121] rounded-xl shadow-2xl border border-[#3e3e3e] z-50 flex flex-col p-1.5 animate-in fade-in slide-in-from-top-2 zoom-in-95">
                            {AGENTS.map((agent) => (
                                <button
                                    key={agent.id}
                                    onClick={() => {
                                        setSelectedAgent(agent.id);
                                        setIsAgentOpen(false);
                                    }}
                                    className={`flex items-center justify-between px-3 py-2.5 text-[14px] hover:bg-[#2f2f2f] rounded-lg transition-all text-left w-full font-medium ${selectedAgent === agent.id ? 'bg-[#2a2a2a] text-white' : 'text-gray-300 hover:text-white'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-1 bg-[#151515] rounded-md shadow-sm border border-[#333]">
                                            {agent.icon}
                                        </div>
                                        {agent.name}
                                    </div>
                                    {selectedAgent === agent.id && (
                                        <Check size={16} className="text-gray-200" strokeWidth={2.5} />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {viewState !== 'initial' ? (
                <div className="flex items-center gap-1 pr-2 pointer-events-auto">
                    <button className="flex items-center gap-1.5 px-3 h-[34px] rounded-lg border border-[#2f2f2f] text-gray-300 hover:text-white hover:bg-[#2f2f2f] transition-colors text-[13px] sm:text-sm font-medium">
                        <Upload size={14} /> Share
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-1 pr-2 pointer-events-auto">
                    <button
                        onClick={() => setIsHelpOpen(true)}
                        className="group flex items-center gap-2 px-3 sm:px-4 h-[36px] rounded-full bg-gradient-to-r from-[#212121] to-[#2a2a2a] border border-[#3e3e3e] hover:border-blue-500/50 hover:from-blue-500/10 hover:to-purple-500/10 text-gray-300 hover:text-white transition-all duration-300 text-[13px] sm:text-sm font-medium shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:-translate-y-0.5 cursor-pointer"
                    >
                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#1a1a1a] border border-[#3e3e3e] group-hover:border-blue-500/30 group-hover:bg-blue-500/20 transition-all duration-300 shadow-sm">
                            <Globe
                                size={12}
                                className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300"
                            />
                        </div>
                        How it works ?
                    </button>
                </div>
            )}
        </div>
    );
}
