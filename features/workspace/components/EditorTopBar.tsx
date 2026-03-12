import {
    Share,
    ArrowLeftToLine,
    Eye,
    Code,
    Upload,
    Download,
    Github,
    RotateCw,
    MessageSquare,
    ArrowUp,
} from 'lucide-react';
import type { ViewState, ActiveTab } from '../types/index';

interface EditorTopBarProps {
    setViewState: (s: ViewState) => void;
    activeTab: ActiveTab;
    setActiveTab: (t: ActiveTab) => void;
    isShareOpen: boolean;
    setIsShareOpen: (s: boolean) => void;
}

export default function EditorTopBar({
    setViewState,
    activeTab,
    setActiveTab,
    isShareOpen,
    setIsShareOpen,
}: EditorTopBarProps) {
    return (
        <div className="h-14 flex items-center justify-between gap-2 bg-[#1e1e1e] border-b border-[#2f2f2f] px-2 sm:px-4 shrink-0 transition-opacity w-full">
            <div className="flex items-center gap-2 sm:gap-4 flex-none sm:flex-1 min-w-0 sm:pr-4">
                <button
                    onClick={() => setViewState('chat-with-code')}
                    className="flex items-center justify-center w-[34px] h-[34px] sm:w-auto sm:h-auto sm:bg-transparent rounded-lg sm:rounded-none bg-[#151515] border border-[#2f2f2f] sm:border-0 hover:text-white text-gray-400 transition-colors shrink-0 max-w-full min-w-0 group"
                    title="Hide Editor"
                >
                    <ArrowLeftToLine className="shrink-0 w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                    <span className="text-gray-200 hidden sm:inline truncate ml-2 text-[15px] font-medium">
                        Hide Editor
                    </span>
                </button>
            </div>

            {/* Middle/Toggles */}
            <div className="flex-1 flex justify-center sm:justify-start lg:justify-center min-w-0">
                <div className="flex items-center justify-center bg-[#151515] p-1 rounded-lg border border-[#2f2f2f] h-[36px] w-full sm:w-auto">
                    <button
                        onClick={() => setActiveTab('chat')}
                        className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 h-full rounded-md transition-colors lg:hidden ${activeTab === 'chat' ? 'bg-[#2f2f2f] text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
                        title="Chat"
                    >
                        <MessageSquare size={15} />
                        <span className="hidden sm:inline text-sm font-medium">Chat</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('preview')}
                        className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 h-full rounded-md transition-colors ${activeTab === 'preview' ? 'bg-[#2f2f2f] text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
                        title="Preview"
                    >
                        <Eye size={15} />
                        <span className="hidden min-[400px]:inline text-sm font-medium">Preview</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('code')}
                        className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 h-full rounded-md transition-colors ${activeTab === 'code' ? 'bg-[#2f2f2f] text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
                        title="Code"
                    >
                        <Code size={15} />
                        <span className="hidden min-[400px]:inline text-sm font-medium">Code</span>
                    </button>
                </div>
            </div>

            {/* Right Group: Path & Actions */}
            <div className="flex items-center justify-end flex-none sm:flex-1 gap-2 sm:gap-3 shrink-0">
                <div className="flex items-center bg-[#151515] border border-[#2f2f2f] rounded-lg px-2 hidden lg:flex w-[220px] xl:w-[300px] h-[34px] justify-between text-xs overflow-hidden group hover:border-[#444] transition-colors focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                    <div className="flex-1 flex items-center justify-center gap-1.5 text-gray-400 w-full truncate pl-4">
                        <span className="text-[11px] shrink-0">🔒</span>
                        <input
                            type="text"
                            defaultValue="/"
                            className="bg-transparent border-none outline-none text-gray-300 w-full min-w-[50px] font-sans focus:text-white"
                        />
                    </div>
                    <button className="text-gray-400 hover:text-white transition-colors shrink-0 p-1 rounded-md hover:bg-[#2f2f2f]">
                        <RotateCw size={12} strokeWidth={2.5} />
                    </button>
                </div>

                <div className="flex items-center gap-2 relative">
                    <div className="hidden lg:flex items-center gap-2">
                        <button
                            className="flex items-center gap-2 px-3 h-[34px] rounded-lg bg-[#151515] border border-[#2f2f2f] text-gray-300 hover:text-white hover:bg-[#2f2f2f] transition-colors text-sm font-medium"
                            title="Push to GitHub"
                        >
                            <Github size={15} /> GitHub
                        </button>
                        <button
                            className="flex items-center gap-2 px-3 h-[34px] rounded-lg bg-[#151515] border border-[#2f2f2f] text-gray-300 hover:text-white hover:bg-[#2f2f2f] transition-colors text-sm font-medium"
                            title="Export Project"
                        >
                            <Download size={15} /> Export
                        </button>
                        <button className="flex items-center gap-2 px-3 h-[34px] rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors shadow-sm">
                            <Upload size={14} strokeWidth={2.5} /> Publish
                        </button>
                    </div>

                    <div className="lg:hidden flex items-center relative">
                        <button
                            onClick={() => setIsShareOpen(!isShareOpen)}
                            onBlur={() => setTimeout(() => setIsShareOpen(false), 200)}
                            className={`flex items-center justify-center gap-1.5 px-2 min-[400px]:px-3 h-[34px] min-[400px]:w-auto w-[34px] rounded-lg transition-all text-sm font-medium border ${isShareOpen ? 'bg-[#151515] text-white border-blue-500 ring-1 ring-blue-500' : 'bg-[#151515] border-[#2f2f2f] text-gray-400 hover:text-white'}`}
                        >
                            <Share size={14} className="shrink-0" />
                            <span className="hidden min-[400px]:inline text-sm font-medium">Share</span>
                        </button>

                        {isShareOpen && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-[#2d2d2d] rounded-xl shadow-2xl border border-[#3e3e3e] z-50 flex flex-col p-1.5 animate-in fade-in zoom-in-95">
                                <button className="flex items-center gap-2.5 px-3 py-2.5 text-[13.5px] text-gray-200 hover:bg-[#3f3f3f] rounded-lg transition-colors text-left w-full group">
                                    <Github size={16} className="text-gray-400 group-hover:text-gray-200" /> Push to
                                    GitHub
                                </button>
                                <button className="flex items-center gap-2.5 px-3 py-2.5 text-[13.5px] text-gray-200 hover:bg-[#3f3f3f] rounded-lg transition-colors text-left w-full group">
                                    <Download size={16} className="text-gray-400 group-hover:text-gray-200" /> Export
                                    Project
                                </button>
                                <div className="h-[1px] bg-[#3e3e3e] my-1 mx-1" />
                                <button className="flex items-center gap-2.5 px-3 py-2.5 text-[13.5px] font-medium text-white hover:bg-white hover:text-black rounded-lg transition-colors text-left w-full group">
                                    <ArrowUp
                                        size={16}
                                        className="text-gray-300 group-hover:text-black transition-colors"
                                    />{' '}
                                    Publish
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
