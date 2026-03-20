import { useState } from 'react';
import { Github, ArrowRight, X, Loader2, CheckCircle2, Power } from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useSettingsStore } from '../store/useSettingsStore';
import { ProviderSection } from './ProviderSection';

export default function GitHubSettings() {
    const { data: session, status } = useSession();
    const isConnected = !!session?.user;
    
    const { github } = useSettingsStore();
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({ github: true });
    const [tutorial, setTutorial] = useState<{ isOpen: boolean; url: string }>({ isOpen: false, url: '' });

    const toggleExpand = (provider: string) => {
        setExpanded((prev) => ({ ...prev, [provider]: !prev[provider] }));
    };

    const openTutorial = (url: string) => {
        setTutorial({ isOpen: true, url });
    };

    const handleGitHubConnect = () => {
        if (isConnected) {
            signOut();
        } else {
            signIn('github');
        }
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
                <div className={`group relative overflow-hidden rounded-2xl p-4 border transition-all duration-500 ${
                    isConnected 
                    ? 'bg-blue-600/5 border-blue-500/20 shadow-xl shadow-blue-500/5' 
                    : 'bg-slate-950 border-slate-800/50 shadow-2xl'
                }`}>
                    <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] -mr-16 -mt-16 transition-all duration-700 ${
                        isConnected ? 'bg-green-500/10' : 'bg-blue-500/10 group-hover:bg-blue-500/20'
                    }`} />

                    <div className="flex items-center justify-between gap-4 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-xl shrink-0 transition-colors ${
                                isConnected ? 'bg-blue-600' : 'bg-white'
                            }`}>
                                <Github size={24} className={isConnected ? 'text-white' : 'text-black'} />
                            </div>
                            <div className="flex flex-col">
                                {isConnected ? (
                                    <>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h3 className="text-[14px] font-bold text-slate-900 dark:text-white tracking-tight">
                                                {session.user?.name || 'GitHub Account'}
                                            </h3>
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-green-500 uppercase tracking-widest bg-green-500/10 px-2 py-0.5 rounded-full">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                Connected
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                                            {session.user?.email || 'Logged in via OAuth'}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="text-[14px] font-bold text-white tracking-tight">
                                            Connect with GitHub
                                        </h3>
                                        <p className="text-[10px] text-slate-400 max-w-[200px] leading-tight italic">
                                            Link your account to enable automated commits and repository management.
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        <button 
                            onClick={handleGitHubConnect}
                            disabled={status === 'loading'}
                            className={`px-6 py-2.5 font-black text-[11px] uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 group/btn active:scale-95 whitespace-nowrap shadow-lg ${
                                isConnected 
                                ? 'bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-500 border border-slate-200 hover:border-red-200' 
                                : 'bg-white hover:bg-blue-50 text-black shadow-white/5'
                            }`}
                        >
                            {status === 'loading' ? (
                                <Loader2 size={14} className="animate-spin" />
                            ) : isConnected ? (
                                <>
                                    Disconnect
                                    <Power size={14} className="group-hover/btn:rotate-12 transition-transform" />
                                </>
                            ) : (
                                <>
                                    Connect
                                    <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                </>
                            )}
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
