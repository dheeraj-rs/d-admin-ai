import { X, Play } from 'lucide-react';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/70 z-[110] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div
                className="bg-[#ecfeff] dark:bg-[#212121] w-full max-w-4xl rounded-[24px] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 border border-cyan-200 dark:border-[#3f3f3f]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-6 pb-4 bg-[#ecfeff] dark:bg-[#212121]">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                            <Play size={16} className="text-blue-500 fill-blue-500 ml-0.5" />
                        </div>
                        How d-admin works
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-full p-2 hover:bg-black/5 dark:hover:bg-[#3f3f3f]"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="px-6 pb-6 bg-[#ecfeff] dark:bg-[#212121]">
                    <div className="relative aspect-video bg-black w-full flex items-center justify-center rounded-xl overflow-hidden border border-cyan-200/50 dark:border-[#3f3f3f] shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(0,0,0,0.3)]">
                        <video
                            className="w-full h-full object-cover outline-none bg-black"
                            controls
                            autoPlay
                            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
                            poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg"
                        />
                    </div>
                </div>

                <div className="px-8 pb-8 pt-2 bg-[#ecfeff] dark:bg-[#212121] flex flex-col gap-3 text-center items-center">
                    <h3 className="text-[22px] font-semibold text-gray-900 dark:text-white tracking-tight">
                        Create websites in seconds using AI
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed max-w-2xl">
                        Welcome to <strong className="text-gray-800 dark:text-gray-200">d-admin</strong>! Just enter what you want to build
                        in the prompt, and our AI will automatically write the code, configure the environment, and
                        provide a live preview setup for all screen sizes. Click on the{' '}
                        <strong className="text-gray-800 dark:text-gray-200">Code</strong>,{' '}
                        <strong className="text-gray-800 dark:text-gray-200">Preview</strong>, or{' '}
                        <strong className="text-gray-800 dark:text-gray-200">Chat</strong> tabs to follow along!
                    </p>
                </div>
            </div>
        </div>
    );
}
