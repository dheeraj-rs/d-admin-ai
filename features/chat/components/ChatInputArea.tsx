import { Mic, ArrowUp, Globe } from 'lucide-react';
import PlusActionMenu from '@/shared/ui/PlusActionMenu';

interface ChatInputAreaProps {
    inputValue: string;
    setInputValue: (val: string) => void;
    handleSubmit: () => void;
    isSidebar?: boolean;
}

export default function ChatInputArea({
    inputValue,
    setInputValue,
    handleSubmit,
    isSidebar = false,
}: ChatInputAreaProps) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div
            className={`absolute bottom-0 w-full bg-gradient-to-t from-gray-50 dark:from-[#212121] via-gray-50 dark:via-[#212121] to-transparent ${isSidebar ? 'pt-8 pb-4 sm:pb-6 px-4' : 'pt-6 pb-4 sm:pb-6 px-4'} pointer-events-none z-10 transition-colors duration-300`}
        >
            <div className={`${isSidebar ? 'w-full' : 'max-w-3xl mx-auto'} pointer-events-auto`}>
                <div className="relative flex items-center bg-white dark:bg-[#2f2f2f] border border-gray-200 dark:border-transparent rounded-[32px] p-2 pl-3 pr-3 shadow-lg transition-colors duration-300">
                    <PlusActionMenu />
                    <input
                        type="text"
                        className="flex-1 min-w-0 bg-transparent border-none outline-none text-gray-900 dark:text-gray-200 px-2 sm:px-3 py-3 placeholder-gray-400 dark:placeholder-gray-500 text-[16px] sm:text-[15px]"
                        placeholder="Ask anything"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <div className="flex items-center gap-1.5 pr-0.5">
                        <button className="text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-transparent w-[34px] h-[34px] flex items-center justify-center focus:outline-none transition-colors rounded-full">
                            <Mic size={20} strokeWidth={2} />
                        </button>
                        {inputValue.trim() ? (
                            <button
                                onClick={handleSubmit}
                                className="bg-gray-900 dark:bg-white text-white dark:text-black w-[34px] h-[34px] rounded-full outline-none focus:outline-none flex items-center justify-center shrink-0 hover:bg-gray-800 dark:hover:bg-gray-200 transition-transform hover:scale-105 active:scale-95 shadow-sm"
                            >
                                <ArrowUp size={18} strokeWidth={2.5} />
                            </button>
                        ) : (
                            <button className="bg-gray-900 dark:bg-white text-white dark:text-black w-[34px] h-[34px] rounded-full outline-none focus:outline-none flex items-center justify-center shrink-0 hover:bg-gray-800 dark:hover:bg-gray-200 transition-transform hover:scale-105 active:scale-95 shadow-sm">
                                <Globe size={18} strokeWidth={2.5} />
                            </button>
                        )}
                    </div>
                </div>
                <div className="text-center text-xs text-gray-500 dark:text-gray-500 mt-3 pb-1 mix-blend-normal dark:mix-blend-screen opacity-80 transition-colors duration-300">
                    d-admin can make mistakes. Check important info.
                </div>
            </div>
        </div>
    );
}
