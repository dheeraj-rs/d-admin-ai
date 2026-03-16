import { useState } from 'react';
import { PanelLeft, TerminalSquare, Lock, RotateCw } from 'lucide-react';
import type { ActiveTab } from '@/features/workspace/types';
import RightPanel from './RightPanel';

interface WorkbenchMockProps {
    activeTab?: ActiveTab;
    setActiveTab?: (v: ActiveTab) => void;
    showTerminal?: boolean;
    setShowTerminal?: (v: boolean) => void;
}

export default function WorkbenchMock({ 
    activeTab = 'code', 
    setActiveTab,
    showTerminal = false,
    setShowTerminal 
}: WorkbenchMockProps) {
    const [showFiles, setShowFiles] = useState(false);

    return (
        <div className="w-full h-full bg-[#0B0B0D] flex flex-col text-gray-300 font-sans relative overflow-hidden p-0.5 sm:p-2.5 lg:p-3.5 max-w-full">
            <div className="flex-1 flex flex-col relative h-full min-h-0 bg-[#151517] rounded-lg sm:rounded-2xl border border-[#2A2A2C] overflow-hidden shadow-2xl max-w-full">
                <div className="h-10 flex items-center justify-between px-4 bg-[#1A1A1C] border-b border-[#2A2A2C] shrink-0">
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex bg-[#0B0B0D] p-1 rounded-lg border border-[#2A2A2C] scale-95 origin-left">
                            <button 
                                onClick={() => setActiveTab?.('code')}
                                className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${
                                    activeTab === 'code' 
                                    ? 'bg-[#2A2A2C] text-white shadow-sm' 
                                    : 'text-gray-500 hover:text-gray-300'
                                }`}
                            >
                                CODE
                            </button>
                            <button 
                                onClick={() => setActiveTab?.('preview')}
                                className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${
                                    activeTab === 'preview' 
                                    ? 'bg-[#2A2A2C] text-white shadow-sm' 
                                    : 'text-gray-500 hover:text-gray-300'
                                }`}
                            >
                                PREVIEW
                            </button>
                        </div>

                        {activeTab === 'code' && (
                            <button 
                                onClick={() => setShowFiles(!showFiles)}
                                className="flex items-center gap-3 group transition-colors"
                            >
                                <PanelLeft 
                                    size={16} 
                                    className={`${showFiles ? 'text-white' : 'text-gray-500'} group-hover:text-gray-300 transition-colors`} 
                                />
                                <span className={`text-[11px] font-bold tracking-wider transition-colors ${
                                    showFiles ? 'text-white' : 'text-gray-500'
                                } group-hover:text-gray-300`}>
                                    FILES
                                </span>
                            </button>
                        )}
                    </div>

                    {/* Right-aligned Path Bar & Terminal Toggle */}
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
                                showTerminal 
                                ? 'text-white bg-[#3A3A3C] shadow-inner' 
                                : 'text-gray-400 hover:text-white hover:bg-[#2A2A2C]'
                            }`}
                            title="Toggle Terminal"
                        >
                            <TerminalSquare size={18} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex flex-row relative min-h-0">
                    {/* Mobile overlay for Files sidebar */}
                    {activeTab === 'code' && showFiles && <div className="md:hidden absolute inset-0 z-10" onClick={() => setShowFiles(false)} />}

                    {/* Sidebar / Files mobile absolute wrapper */}
                    {activeTab === 'code' && (
                        <div
                            className={`
                  absolute inset-y-0 left-0 z-20 bg-[#1A1A1C] border-r border-[#2A2A2C] flex-col shrink-0 w-64 min-w-[200px] h-full
                  transform transition-all duration-300 ease-in-out
                  md:relative
                  ${showFiles ? 'flex translate-x-0 opacity-100' : 'hidden md:hidden -translate-x-full opacity-0 pointer-events-none'}
                `}
                        >
                            <div className="flex-1 flex flex-col py-3 overflow-y-auto">
                                <div
                                    onClick={() => setShowFiles(false)}
                                    className="px-3 cursor-pointer rounded-lg mx-2 py-2 flex items-center gap-2.5 text-sm text-gray-200 bg-[#2A2A2C]"
                                >
                                    <span className="text-gray-400">📄</span> 
                                    <span className="font-medium">index.tsx</span>
                                </div>
                                <div
                                    onClick={() => setShowFiles(false)}
                                    className="px-3 cursor-pointer rounded-lg mx-2 py-2 flex items-center gap-2.5 text-sm text-gray-400 hover:bg-[#2A2A2C]/50 transition-colors"
                                >
                                    <span className="text-gray-500">📄</span> 
                                    <span>styles.css</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main Area: Editor/Preview + Terminal */}
                    <div className="flex-1 h-full flex flex-col relative min-w-0">
                        <div className="flex-1 relative flex flex-col bg-[#0B0B0D] overflow-hidden">
                            {activeTab === 'code' ? (
                                <div className="flex-1 p-6 overflow-y-auto font-mono text-[14px] leading-relaxed text-gray-400">
                                    <div className="flex gap-4">
                                        <span className="text-gray-600 select-none w-5 text-right">1</span>
                                        <div className="flex gap-2">
                                            <span className="text-[#C678DD]">import</span>
                                            <span className="text-gray-200">React</span>
                                            <span className="text-[#C678DD]">from</span>
                                            <span className="text-[#98C379]">'react'</span>
                                            <span className="text-gray-200">;</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-gray-600 select-none w-5 text-right">2</span>
                                        <div className="flex gap-2">
                                            <span className="text-[#61AFEF]">export default function</span>
                                            <span className="text-[#61AFEF] ml-1">App</span>
                                            <span className="text-gray-200">() {'{'}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-gray-600 select-none w-5 text-right">3</span>
                                        <div className="flex gap-2 pl-4">
                                            <span className="text-[#C678DD]">return (</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-gray-600 select-none w-5 text-right">4</span>
                                        <div className="flex gap-2 pl-8">
                                            <span className="text-gray-500">&lt;div className="min-h-screen ..."&gt;</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-gray-600 select-none w-5 text-right">5</span>
                                        <div className="flex gap-2 pl-8">
                                            <span className="text-gray-500">&lt;/div&gt;</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-gray-600 select-none w-5 text-right">6</span>
                                        <div className="flex gap-2 pl-4">
                                            <span className="text-[#C678DD]">);</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-gray-600 select-none w-5 text-right">7</span>
                                        <div className="flex gap-2">
                                            <span className="text-gray-200">{'}'}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 bg-white overflow-auto flex flex-col relative">
                                    <RightPanel />
                                </div>
                            )}
                        </div>

                        {showTerminal && (
                            <div className="h-48 bg-[#0B0B0D] border-t border-[#2A2A2C] flex flex-col font-mono text-[12px]">
                                <div className="h-8 flex items-center px-4 bg-[#1A1A1C] border-b border-[#2A2A2C] text-gray-400">
                                    <TerminalSquare size={14} className="mr-2" />
                                    <span>TERMINAL</span>
                                </div>
                                <div className="flex-1 p-4 overflow-y-auto text-green-500/80">
                                    <div className="mb-1">$ npm install</div>
                                    <div className="mb-1 text-gray-400">added 42 packages in 2s</div>
                                    <div className="mb-1">$ npm run dev</div>
                                    <div className="text-cyan-400">ready - started server on 0.0.0.0:3000, url: http://localhost:3000</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
