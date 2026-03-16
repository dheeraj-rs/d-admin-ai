'use client';

import { Lock, RotateCw, TerminalSquare } from 'lucide-react';
import { useWorkspace } from '@/features/workspace';
import type { ActiveTab } from '@/features/workspace';

interface WorkbenchHeaderProps {
    showFiles: boolean;
    setShowFiles: (v: boolean) => void;
}

export const WorkbenchHeader = ({
    showFiles,
    setShowFiles,
}: WorkbenchHeaderProps) => {
    const { state, actions } = useWorkspace();
    const { activeTab, showTerminal } = state;
    const { setActiveTab, setShowTerminal } = actions;
    return (
        <div className="h-10 flex items-center justify-between px-4 bg-[#1A1A1C] border-b border-[#2A2A2C] shrink-0">
            <div className="flex items-center gap-6">
                <div className="hidden md:flex bg-[#0B0B0D] p-1 rounded-lg border border-[#2A2A2C] scale-95 origin-left">
                    <button
                        onClick={() => setActiveTab?.('code')}
                        className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${
                            activeTab === 'code' ? 'bg-[#2A2A2C] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'
                        }`}
                    >
                        CODE
                    </button>
                    <button
                        onClick={() => setActiveTab?.('preview')}
                        className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${
                            activeTab === 'preview' ? 'bg-[#2A2A2C] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'
                        }`}
                    >
                        PREVIEW
                    </button>
                </div>

                {activeTab === 'code' && (
                    <button onClick={() => setShowFiles(!showFiles)} className="flex items-center gap-3 group transition-colors">
                        <span
                            className={`text-[11px] font-bold tracking-wider transition-colors ${
                                showFiles ? 'text-white' : 'text-gray-500'
                            } group-hover:text-gray-300`}
                        >
                            FILES
                        </span>
                    </button>
                )}
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 justify-end h-10">
                {activeTab === 'preview' && (
                    <div className="flex items-center bg-[#0B0B0D] border border-[#2A2A2C] rounded-lg px-2 sm:px-3 h-[32px] group hover:border-[#444] transition-colors flex-1 min-w-0 max-w-[400px] overflow-hidden">
                        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-gray-400 truncate flex-1 min-w-0">
                            <Lock size={10} className="text-gray-500 shrink-0" />
                            <span className="font-medium truncate">/index.tsx</span>
                        </div>
                        <button className="text-gray-400 hover:text-white transition-colors p-0.5 ml-1.5 sm:ml-2 shrink-0">
                            <RotateCw size={10} strokeWidth={2} />
                        </button>
                    </div>
                )}

                <button
                    onClick={() => setShowTerminal?.(!showTerminal)}
                    className={`p-2 rounded-lg transition-all shrink-0 h-[32px] w-[32px] flex items-center justify-center ${
                        showTerminal ? 'text-white bg-[#3A3A3C] shadow-inner' : 'text-gray-400 hover:text-white hover:bg-[#2A2A2C]'
                    }`}
                    title="Toggle Terminal"
                >
                    <TerminalSquare size={18} />
                </button>
            </div>
        </div>
    );
};
