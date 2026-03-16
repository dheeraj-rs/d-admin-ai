import { useState } from 'react';
import { X } from 'lucide-react';
import { useSettingsStore } from '../store/useSettingsStore';
import { ProviderSection } from './ProviderSection';

export default function ApiSettings() {
    const { gemini, openai, claude } = useSettingsStore();
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({ gemini: true });
    const [tutorial, setTutorial] = useState<{ isOpen: boolean; url: string }>({ isOpen: false, url: '' });

    const toggleExpand = (provider: string) => {
        setExpanded((prev) => ({ ...prev, [provider]: !prev[provider] }));
    };

    const openTutorial = (url: string) => {
        setTutorial({ isOpen: true, url });
    };

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Agent Connection</h2>
                <div className="bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full px-3 py-1 text-[10px] text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-widest border border-indigo-500/20">
                    Advanced
                </div>
            </div>
            <div className="flex flex-col space-y-6">
                <ProviderSection
                    id="gemini"
                    title="Gemini API Keys"
                    keys={gemini}
                    url="https://aistudio.google.com/app/apikey"
                    placeholder="Enter sk-..."
                    helpText="Optimized for high-availability. If multiple keys are provided, the system automatically rotates to the next available key when a quota limit is reached."
                    expanded={!!expanded.gemini}
                    videoUrl="https://www.youtube.com/embed/prrb0hsfI60"
                    onToggle={() => toggleExpand('gemini')}
                    onHelp={openTutorial}
                />

                <ProviderSection
                    id="openai"
                    title="ChatGPT API Keys"
                    keys={openai}
                    url="https://platform.openai.com/api-keys"
                    placeholder="Enter sk-proj-..."
                    helpText="Fail-safe rotation enabled. When multiple keys are added, we automatically switch to the next key if the current one hits its rate limit."
                    expanded={!!expanded.openai}
                    onToggle={() => toggleExpand('openai')}
                    onHelp={openTutorial}
                />

                <ProviderSection
                    id="claude"
                    title="Claude API Keys"
                    keys={claude}
                    url="https://console.anthropic.com/settings/keys"
                    placeholder="Enter sk-ant-..."
                    helpText="High-availability support. Automatically cycles through your provided keys to ensure uninterrupted service when hitting API response usage limits."
                    expanded={!!expanded.claude}
                    onToggle={() => toggleExpand('claude')}
                    onHelp={openTutorial}
                />
            </div>

            {/* Video Tutorial Modal */}
            {tutorial.isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
                    <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">How to get your API Key</h3>
                            <button 
                                onClick={() => setTutorial({ ...tutorial, isOpen: false })}
                                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500 hover:text-slate-900 dark:hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="aspect-video bg-black flex items-center justify-center">
                            <iframe
                                src={tutorial.url}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end">
                            <button 
                                onClick={() => setTutorial({ ...tutorial, isOpen: false })}
                                className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-lg shadow-indigo-500/20"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
