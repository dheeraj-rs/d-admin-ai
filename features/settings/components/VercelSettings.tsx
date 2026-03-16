import { useState } from 'react';
import { LayoutGrid, ArrowRight, X } from 'lucide-react';
import { useSettingsStore } from '../store/useSettingsStore';
import { ProviderSection } from './ProviderSection';

export default function VercelSettings() {
    const { vercel, addApiKey, removeApiKey, updateApiKey } = useSettingsStore();
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({ vercel: true });
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
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Vercel Connection</h2>
                    <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400 italic">Deploy your websites instantly to Vercel</p>
                </div>
                <div className="bg-slate-900 dark:bg-white rounded-full p-2.5 shadow-lg shadow-slate-500/10">
                    <LayoutGrid size={20} className="text-white dark:text-slate-950" />
                </div>
            </div>

            <div className="space-y-8">
                {/* Direct Connection Section */}
                <div className="group relative overflow-hidden bg-slate-950 rounded-2xl p-3 border border-slate-800/50 shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[80px] -mr-16 -mt-16 group-hover:bg-indigo-500/20 transition-all duration-700" />

                    <div className="flex items-center justify-between gap-4 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-xl shrink-0">
                                <svg
                                    viewBox="0 0 76 65"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-black"
                                >
                                    <path d="M37.5273 0L75.0546 65H0L37.5273 0Z" fill="currentColor" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-[13.5px] font-bold text-white tracking-tight">
                                    Direct Integration
                                </h3>
                                <p className="text-[10px] text-slate-400 max-w-[200px] leading-tight italic line-clamp-2">
                                    Connect your Vercel account via OAuth for the most seamless deployment experience.
                                </p>
                            </div>
                        </div>
                        <button className="px-5 py-2 bg-white hover:bg-slate-100 text-black font-black text-[11px] uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-2 group/btn active:scale-95 whitespace-nowrap">
                            Connect
                            <ArrowRight
                                size={12}
                                className="group-hover/btn:translate-x-0.5 transition-transform"
                            />
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
                    id="vercel"
                    title="Manual Vercel Token"
                    keys={vercel}
                    url="https://vercel.com/account/tokens"
                    placeholder="Enter Vercel Token"
                    helpText="Connecting your Vercel account manually requires an API Token. This allows the AI to create projects and trigger deployments on your behalf."
                    expanded={!!expanded.vercel}
                    onToggle={() => toggleExpand('vercel')}
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
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">Setting up Vercel</h3>
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
