'use client';

interface FileSidebarProps {
    showFiles: boolean;
    onFileClick: () => void;
}

export const FileSidebar = ({ showFiles, onFileClick }: FileSidebarProps) => {
    return (
        <>
            {/* Mobile overlay */}
            {showFiles && <div className="md:hidden absolute inset-0 z-10" onClick={onFileClick} />}

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
                        onClick={onFileClick}
                        className="px-3 cursor-pointer rounded-lg mx-2 py-2 flex items-center gap-2.5 text-sm text-gray-200 bg-[#2A2A2C]"
                    >
                        <span className="text-gray-400">📄</span>
                        <span className="font-medium">index.tsx</span>
                    </div>
                    <div
                        onClick={onFileClick}
                        className="px-3 cursor-pointer rounded-lg mx-2 py-2 flex items-center gap-2.5 text-sm text-gray-400 hover:bg-[#2A2A2C]/50 transition-colors"
                    >
                        <span className="text-gray-500">📄</span>
                        <span>styles.css</span>
                    </div>
                </div>
            </div>
        </>
    );
};
