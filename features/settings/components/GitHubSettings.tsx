import { useState } from 'react';
import { Github, ArrowRight, X } from 'lucide-react';
import { useSettingsStore } from '../store/useSettingsStore';
import { ProviderSection } from './ProviderSection';

export default function GitHubSettings() {
    const { github, addApiKey, removeApiKey, updateApiKey } = useSettingsStore();
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({ github: true });
    const [tutorial, setTutorial] = useState<{ isOpen: boolean; url: string }>({ isOpen: false, url: '' });

    const toggleExpand = (provider: string) => {
        setExpanded((prev) => ({ ...prev, [provider]: !prev[provider] }));
    };

    const openTutorial = (url: string) => {
        setTutorial({ isOpen: true, url });
    };

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">GitHub Connection</h2>
                    <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400 italic">Push code and manage repositories with ease</p>
                </div>
                <div className="bg-slate-900 dark:bg-white rounded-full p-2.5 shadow-lg shadow-slate-500/10">
                    <Github size={20} className="text-white dark:text-slate-950" />
                </div>
            </div>

            <div className="space-y-8">
                {/* Direct Connection Section */}
                <div className="group relative overflow-hidden bg-slate-950 rounded-[32px] p-8 border border-slate-800/50 shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[80px] -mr-16 -mt-16 group-hover:bg-indigo-500/20 transition-all duration-700" />
                    
                    <div className="flex flex-col items-center text-center gap-6 relative z-10">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl mb-2">
                             <Github size={32} className="text-black" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-bold text-white tracking-tight">Connect with GitHub</h3>
                            <p className="text-[13px] text-slate-400 max-w-[280px] leading-relaxed italic">
                                Link your account to enable automated commits and private repository generation.
                            </p>
                        </div>
                        <button className="w-full py-4 bg-white hover:bg-slate-100 text-black font-black text-[13px] uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-2 group/btn">
                            Connect Account
                            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4 px-2">
                    <div className="h-[1px] flex-1 bg-slate-100 dark:bg-slate-800" />
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">OR MANUAL CONFIG</span>
                    <div className="h-[1px] flex-1 bg-slate-100 dark:bg-slate-800" />
                </div>

                {/* Manual Connection Section */}
                <ProviderSection
                    id="github"
                    title="Manual GitHub Token"
                    keys={github}
                    url="https://github.com/settings/tokens"
                    placeholder="Enter GitHub Token"
                    helpText="Provide a Personal Access Token (PAT) to allow the AI to push code to your account and manage repositories securely."
                    expanded={!!expanded.github}
                    onToggle={() => toggleExpand('github')}
                    onHelp={openTutorial}
                    addApiKey={addApiKey}
                    removeApiKey={removeApiKey}
                    updateApiKey={updateApiKey}
                />
            </div>

            {/* Video Tutorial Modal */}
            {tutorial.isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
                    <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">GitHub Integration Guide</h3>
                            <button 
                                onClick={() => setTutorial({ ...tutorial, isOpen: false })}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="aspect-video bg-black">
                            <iframe
                                src={tutorial.url}
                                className="w-full h-full"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
