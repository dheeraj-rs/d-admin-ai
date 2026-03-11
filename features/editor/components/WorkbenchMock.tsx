import { useState } from 'react';
import { ChevronDown, PanelLeft, TerminalSquare } from 'lucide-react';

export default function WorkbenchMock() {
    const [showTerminal, setShowTerminal] = useState(false);
    const [showFiles, setShowFiles] = useState(false);

    return (
        <div className="w-full h-full bg-[#1e1e1e] flex flex-col text-gray-300 font-sans relative overflow-hidden">
            <div className="flex-1 flex flex-col md:flex-row relative h-[75%] min-h-0">
                {/* Mobile overlay for Files sidebar (invisible to allow outside click closing without modal effect) */}
                {showFiles && <div className="md:hidden absolute inset-0 z-10" onClick={() => setShowFiles(false)} />}

                {/* Sidebar / Files mobile absolute wrapper */}
                <div
                    className={`
          absolute inset-y-0 left-0 z-20 bg-[#1e1e1e] border-r border-[#2f2f2f] flex-col shrink-0 w-64 min-w-[200px] h-full
          transform transition-transform duration-300 ease-in-out
          md:relative md:flex md:translate-x-0
          ${showFiles ? 'flex translate-x-0' : 'hidden md:flex -translate-x-full md:translate-x-0'}
        `}
                >
                    <div className="h-9 flex items-center justify-between px-3 text-xs font-semibold text-gray-400 border-b border-[#2f2f2f] shrink-0">
                        <span>Files</span>
                        <button className="md:hidden p-1 hover:text-white" onClick={() => setShowFiles(false)}>
                            <PanelLeft size={16} />
                        </button>
                    </div>
                    <div className="flex-1 flex flex-col py-2 overflow-y-auto">
                        {/* Mock Files List */}
                        <div
                            onClick={() => setShowFiles(false)}
                            className="px-2 cursor-pointer rounded-md mx-2 py-1.5 flex items-center gap-2 text-sm text-gray-200 bg-[#2f2f2f]"
                        >
                            <span className="text-gray-400">📄</span> index.html
                        </div>
                        <div
                            onClick={() => setShowFiles(false)}
                            className="px-2 cursor-pointer rounded-md mx-2 py-1.5 flex items-center gap-2 text-sm text-gray-400 hover:bg-[#2f2f2f]/50 transition-colors"
                        >
                            <span className="text-gray-500">📄</span> style.css
                        </div>
                        <div
                            onClick={() => setShowFiles(false)}
                            className="px-2 cursor-pointer rounded-md mx-2 py-1.5 flex items-center gap-2 text-sm text-gray-400 hover:bg-[#2f2f2f]/50 transition-colors"
                        >
                            <span className="text-blue-400">📄</span> script.js
                        </div>
                    </div>
                </div>

                {/* Resizer Mock */}
                <div className="hidden md:block w-1 bg-transparent hover:bg-blue-500 transition-colors cursor-col-resize shrink-0" />

                {/* Editor Area */}
                <div className="flex-1 h-full flex flex-col relative min-w-0">
                    {/* Header */}
                    <div className="h-9 flex items-center justify-between px-3 border-b border-[#2f2f2f] shrink-0">
                        <button
                            onClick={() => setShowFiles(!showFiles)}
                            className="md:hidden p-1 rounded-md text-gray-400 hover:bg-[#2f2f2f] hover:text-gray-200 transition-colors"
                            title="Toggle Files"
                        >
                            <PanelLeft size={16} />
                        </button>

                        <button
                            onClick={() => setShowTerminal(!showTerminal)}
                            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-200 transition-colors ml-auto"
                        >
                            <TerminalSquare size={14} /> Terminal
                        </button>
                    </div>
                    {/* Editor Content (HTML view Mock) */}
                    <div className="flex-1 p-4 overflow-y-auto font-mono text-sm text-gray-300">
                        <div className="text-blue-400">&lt;!DOCTYPE html&gt;</div>
                        <div>
                            <span className="text-blue-400">&lt;html</span>{' '}
                            <span className="text-purple-400">lang</span>=<span className="text-green-400">"en"</span>
                            <span className="text-blue-400">&gt;</span>
                        </div>
                        <div className="pl-4">
                            <span className="text-blue-400">&lt;head&gt;</span>
                        </div>
                        <div className="pl-8">
                            <span className="text-blue-400">&lt;title&gt;</span>
                            <span className="text-gray-300">Document</span>
                            <span className="text-blue-400">&lt;/title&gt;</span>
                        </div>
                        <div className="pl-4">
                            <span className="text-blue-400">&lt;/head&gt;</span>
                        </div>
                        <div className="pl-4">
                            <span className="text-blue-400">&lt;body&gt;</span>
                        </div>
                        <div className="pl-8">
                            <span className="text-blue-400">&lt;h1&gt;</span>
                            <span className="text-gray-300">Hello, World!</span>
                            <span className="text-blue-400">&lt;/h1&gt;</span>
                        </div>
                        <div className="pl-4">
                            <span className="text-blue-400">&lt;/body&gt;</span>
                        </div>
                        <div>
                            <span className="text-blue-400">&lt;/html&gt;</span>
                        </div>
                    </div>
                </div>
            </div>

            {showTerminal && (
                <>
                    <div className="h-1 bg-[#2f2f2f] hover:bg-blue-500 transition-colors cursor-row-resize shrink-0" />

                    {/* Terminal */}
                    <div className="h-[35%] min-h-[150px] flex flex-col shrink-0">
                        <div className="h-9 flex items-center justify-between px-2 bg-[#1e1e1e] border-b border-[#2f2f2f] shrink-0">
                            <div className="flex items-center gap-2 px-3 py-1 bg-[#2f2f2f]/50 text-gray-300 rounded-full text-xs cursor-pointer hover:bg-[#2f2f2f]">
                                <TerminalSquare size={14} /> Terminal
                            </div>
                            <button
                                onClick={() => setShowTerminal(false)}
                                className="text-gray-500 hover:text-gray-300 p-1"
                            >
                                <ChevronDown size={16} />
                            </button>
                        </div>
                        <div className="flex-1 bg-black p-2 font-mono text-sm text-gray-300 overflow-y-auto">
                            {/* Terminal Output */}
                            <div className="text-gray-500">Terminal ready...</div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
