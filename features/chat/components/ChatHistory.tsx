import { SquareTerminal, Code, Download, Edit2, Play, Maximize } from 'lucide-react';
import type { ViewState, ActiveTab } from '@/features/workspace';


interface ChatHistoryProps {
    viewState: ViewState;
    setViewState: (s: ViewState) => void;
    setActiveTab: (t: ActiveTab) => void;
}

export default function ChatHistory({ viewState, setViewState, setActiveTab }: ChatHistoryProps) {
    return (
        <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-2 items-end">
                <div className="bg-gray-100 dark:bg-[#2f2f2f] px-5 py-2.5 rounded-3xl max-w-[80%] text-[15px] text-gray-800 dark:text-gray-100 self-end break-words border border-gray-200 dark:border-transparent shadow-sm dark:shadow-none">
                    hi
                </div>
            </div>
            <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 flex-shrink-0 flex items-center justify-center bg-white dark:bg-white text-gray-900 dark:text-black shadow-sm dark:shadow-none">
                    <SquareTerminal size={14} />
                </div>
                <div className="flex flex-col gap-2 flex-1 min-w-0 pt-1">
                    <div className="text-gray-800 dark:text-gray-200 leading-relaxed text-[15px] break-words">
                        Hey! 👋
                        <br />
                        <br />
                        How's it going? What can I help you with today?
                    </div>
                </div>
            </div>

            {(viewState === 'chat-with-code' || viewState === 'fullscreen-editor') && (
                <>
                    <div className="flex flex-col gap-2 items-end">
                        <div className="bg-gray-100 dark:bg-[#2f2f2f] px-5 py-2.5 rounded-3xl max-w-[80%] text-[15px] text-gray-800 dark:text-gray-100 self-end break-words border border-gray-200 dark:border-transparent shadow-sm dark:shadow-none">
                            code
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 flex-shrink-0 flex items-center justify-center bg-white dark:bg-white text-gray-900 dark:text-black shadow-sm dark:shadow-none">
                            <SquareTerminal size={14} />
                        </div>
                        <div className="flex flex-col gap-2 flex-1 min-w-0 pt-1">
                            <div className="text-gray-800 dark:text-gray-200 leading-relaxed text-[15px] break-words">
                                If you want a <strong>simple, clean portfolio website</strong>, you can build it quickly
                                with <strong>HTML + Tailwind CSS</strong>.<br />
                                <br />
                                Below is a <strong>basic one-page portfolio layout</strong> with sections: Hero, About,
                                Projects, and Contact.
                            </div>

                            <div className="mt-4 bg-gray-50 dark:bg-[#1e1e1e] rounded-xl overflow-hidden border border-gray-200 dark:border-[#2f2f2f] flex flex-col min-w-0 w-full shadow-sm dark:shadow-none">
                                <div className="flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-[#2f2f2f] text-xs font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-transparent">
                                    <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                                        <Code size={14} /> <span>HTML</span>
                                    </div>
                                    <div className="flex gap-2 text-gray-500 dark:text-gray-400 shrink-0">
                                        <button className="p-1 hover:text-gray-900 dark:hover:text-white transition-colors" title="Download">
                                            <Download size={14} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setViewState('fullscreen-editor');
                                                setActiveTab('code');
                                            }}
                                            className="p-1 hover:text-gray-900 dark:hover:text-white transition-colors"
                                            title="Edit code"
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setViewState('fullscreen-editor');
                                                setActiveTab('code');
                                            }}
                                            className="p-1 hover:text-gray-900 dark:hover:text-white transition-colors"
                                            title="Expand"
                                        >
                                            <Maximize size={14} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setViewState('fullscreen-editor');
                                                setActiveTab('preview');
                                            }}
                                            className="p-1 hover:text-gray-900 dark:hover:text-white transition-colors"
                                            title="Preview"
                                        >
                                            <Play size={14} />
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className="px-4 py-3 text-sm font-mono text-gray-800 dark:text-gray-300 overflow-x-auto whitespace-pre cursor-pointer w-full bg-white dark:bg-transparent"
                                    onClick={() => {
                                        setViewState('fullscreen-editor');
                                        setActiveTab('code');
                                    }}
                                >
                                    &lt;!DOCTYPE html&gt;{'\n'}
                                    &lt;html lang="en"&gt;{'\n'}
                                    &lt;head&gt;{'\n'}
                                    {'  '}&lt;meta charset="UTF-8"&gt;{'\n'}
                                    {'  '}&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
                                    {'\n'}
                                    {'  '}&lt;title&gt;Dheeraj | Portfolio&lt;/title&gt;{'\n'}
                                    &lt;/head&gt;
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
