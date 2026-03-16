import {
    Share2,
    Github,
    Download,
    Upload,
    ArrowLeftToLine,
} from 'lucide-react';
import type { ViewState, ActiveTab } from '../../types/index';

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
        <div className="flex items-center justify-between px-2.5 sm:px-4 h-14 bg-[#0B0B0D] border-b border-white/5 select-none z-50">
            {/* Left Section: Logo & Ops */}
            <div className="flex items-center gap-2 sm:gap-4 flex-none sm:flex-1 min-w-0 sm:pr-4">
                <button 
                    onClick={() => setViewState('chat-with-code')}
                    className="flex items-center justify-center w-10 h-10 sm:w-auto sm:h-10 sm:px-4 bg-[#151515] border border-[#2f2f2f] hover:text-white text-gray-400 rounded-lg transition-colors shrink-0 max-w-full min-w-0 group"
                    title="Hide Editor"
                >
                    <ArrowLeftToLine size={20} />
                    <span className="text-gray-200 hidden sm:inline truncate ml-2 text-[14px] font-medium">
                        Hide Editor
                    </span>
                </button>
            </div>

            {/* Right Section: Tools & Actions */}
            <div className="flex items-center gap-3">
                <div className="hidden lg:flex items-center gap-3 mr-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] font-medium text-gray-400 hover:text-gray-100 hover:bg-[#1A1A1C] transition-all">
                        <Github size={15} />
                        GitHub
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] font-medium text-gray-400 hover:text-gray-100 hover:bg-[#1A1A1C] transition-all">
                        <Download size={15} />
                        Export
                    </button>
                    <button className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-medium bg-white text-black hover:bg-gray-200 transition-all">
                        <Upload size={14} strokeWidth={2.5} />
                        Publish
                    </button>
                </div>
                {/* Segmented Toggle (3-way on Mobile, 2-way internal on Desktop) */}
                <div className="flex items-center bg-[#1A1A1C] p-1 rounded-lg border border-[#2A2A2C] lg:hidden h-10">
                    <button
                        onClick={() => setActiveTab('chat')}
                        className={`h-full px-3 sm:px-4 rounded-[6px] text-[13px] font-medium transition-all ${
                            activeTab === 'chat' 
                            ? 'bg-[#2A2A2C] text-white shadow-lg' 
                            : 'text-gray-400 hover:text-gray-200'
                        }`}
                    >
                        Chat
                    </button>
                    <button
                        onClick={() => setActiveTab('code')}
                        className={`h-full px-3 sm:px-4 rounded-[6px] text-[13px] font-medium transition-all ${
                            activeTab === 'code' 
                            ? 'bg-[#2A2A2C] text-white shadow-lg' 
                            : 'text-gray-400 hover:text-gray-200'
                        }`}
                    >
                        Code
                    </button>
                    <button
                        onClick={() => setActiveTab('preview')}
                        className={`h-full px-3 sm:px-4 rounded-[6px] text-[13px] font-medium transition-all ${
                            activeTab === 'preview' 
                            ? 'bg-[#2A2A2C] text-white shadow-lg' 
                            : 'text-gray-400 hover:text-gray-200'
                        }`}
                    >
                        Preview
                    </button>
                </div>

                {/* Share Button (Box Type on Mobile) */}
                <button
                    onClick={() => setIsShareOpen(!isShareOpen)}
                    className="flex items-center justify-center w-10 h-10 sm:w-auto sm:h-10 sm:px-4 bg-[#1A1A1C] hover:bg-[#2A2A2C] text-gray-300 hover:text-white rounded-lg border border-[#2A2A2C] transition-all group shrink-0 lg:hidden"
                >
                    <Share2 size={16} className="group-hover:scale-110 transition-transform shrink-0" />
                    <span className="text-[13px] font-semibold hidden sm:inline ml-2">Share</span>
                </button>               
            </div>
        </div>
    );
}
