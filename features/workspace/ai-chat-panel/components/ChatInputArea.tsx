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
            className={`absolute bottom-0 w-full bg-gradient-to-t from-[var(--bg-main)] via-[var(--bg-main)]/95 to-transparent ${isSidebar ? 'pt-8 pb-4 sm:pb-6 px-4' : 'pt-6 pb-4 sm:pb-6 px-4'} pointer-events-none z-10 transition-colors duration-300`}
        >
            <div className={`${isSidebar ? 'w-full' : 'max-w-3xl 2xl:max-w-6xl mx-auto'} pointer-events-auto`}>
                <div className="relative flex items-center bg-black/20 dark:bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[32px] 2xl:rounded-[48px] p-2 2xl:p-4 pl-3 pr-3 2xl:pl-5 2xl:pr-5 shadow-2xl transition-colors duration-300 ring-1 ring-white/5">
                    <PlusActionMenu />
                    <input
                        type="text"
                        className="flex-1 min-w-0 bg-transparent border-none outline-none text-[var(--text-main)] px-2 sm:px-3 py-3 2xl:py-6 3xl:py-8 placeholder-[var(--text-muted)] text-[16px] sm:text-[15px] 2xl:text-[24px] 3xl:text-[28px]"
                        placeholder="Ask anything"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <div className="flex items-center gap-1.5 2xl:gap-3 pr-0.5">
                        <button className="text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-transparent w-[34px] h-[34px] 2xl:w-[56px] 2xl:h-[56px] flex items-center justify-center focus:outline-none transition-colors rounded-full">
                            <Mic size={20} className="2xl:w-8 2xl:h-8" strokeWidth={2} />
                        </button>
                        {inputValue.trim() ? (
                            <button
                                onClick={() => handleSubmit()}
                                className="bg-gray-900 dark:bg-white text-white dark:text-black w-[34px] h-[34px] 2xl:w-[56px] 2xl:h-[56px] rounded-full outline-none focus:outline-none flex items-center justify-center shrink-0 hover:bg-gray-800 dark:hover:bg-gray-200 transition-transform hover:scale-105 active:scale-95 shadow-sm"
                            >
                                <ArrowUp size={18} className="2xl:w-7 2xl:h-7" strokeWidth={2.5} />
                            </button>
                        ) : (
                            <button className="bg-gray-900 dark:bg-white text-white dark:text-black w-[34px] h-[34px] 2xl:w-[56px] 2xl:h-[56px] rounded-full outline-none focus:outline-none flex items-center justify-center shrink-0 hover:bg-gray-800 dark:hover:bg-gray-200 transition-transform hover:scale-105 active:scale-95 shadow-sm">
                                <Globe size={18} className="2xl:w-7 2xl:h-7" strokeWidth={2.5} />
                            </button>
                        )}
                    </div>
                </div>
                <div className="text-center text-xs 2xl:text-lg text-[var(--text-muted)] mt-3 pb-1 mix-blend-normal dark:mix-blend-screen opacity-80 transition-colors duration-300">
                    d-admin can make mistakes. Check important info.
                </div>
            </div>
        </div>
    );
}
