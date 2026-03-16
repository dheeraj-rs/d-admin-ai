'use client';

import React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useWorkspace } from '@/features/workspace';
import { AGENTS } from '@/features/workspace/constants/agents';

export default function AgentPicker() {
    const { state, actions } = useWorkspace();
    const { selectedAgent, isAgentOpen } = state;
    const { setSelectedAgent, setIsAgentOpen } = actions;
    
    const currentAgent = AGENTS.find((a) => a.id === selectedAgent) || AGENTS[0];

    return (
        <div className="relative group">
            <button
                id="topbar-agent-picker"
                onClick={() => setIsAgentOpen(!isAgentOpen)}
                className={`flex items-center gap-1.5 px-2 h-10 rounded-lg transition-all font-semibold focus:outline-none border-none bg-transparent ${
                    isAgentOpen 
                        ? 'text-gray-900 dark:text-white' 
                        : 'text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
                <div className="flex items-center gap-2">
                    {currentAgent.icon}
                    <span className="text-[12px] font-bold tracking-tight hidden md:inline text-inherit">{currentAgent.name}</span>
                </div>
                <ChevronDown
                    size={12}
                    className={`text-gray-400 dark:text-gray-500 transition-transform duration-200 ${isAgentOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isAgentOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsAgentOpen(false)} />
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl dark:shadow-2xl border border-slate-200 dark:border-slate-800 z-50 flex flex-col p-1.5 animate-in fade-in slide-in-from-top-2 zoom-in-95">
                        {AGENTS.map((agent) => (
                            <button
                                key={agent.id}
                                onClick={() => {
                                    setSelectedAgent(agent.id);
                                    setIsAgentOpen(false);
                                }}
                                className={`flex items-center justify-between px-3 py-2.5 text-[13px] rounded-lg transition-all text-left w-full font-medium ${selectedAgent === agent.id ? 'bg-slate-100 dark:bg-slate-800 text-[var(--text-main)]' : 'text-[var(--text-muted)] hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-[var(--text-main)]'}`}
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
    );
}
