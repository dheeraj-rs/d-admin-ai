import { useState } from 'react';
import { X, Settings, Link2, User, ChevronRight, ArrowLeft, Plug, Github, LayoutGrid } from 'lucide-react';
import GeneralSettings from './GeneralSettings';
import ApiSettings from './ApiSettings';
import AgentSettings from './AgentSettings';
import VercelSettings from './VercelSettings';
import GitHubSettings from './GitHubSettings';

export default function SettingsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [activeTab, setActiveTab] = useState<'general' | 'api' | 'agent' | 'vercel' | 'github'>('general');
    const [mobileView, setMobileView] = useState<'menu' | 'content'>('menu');
    const [agentRole, setAgentRole] = useState('');

    const [language, setLanguage] = useState('English');

    if (!isOpen) return null;

    const tabs = [
        { id: 'general', label: 'General', icon: Settings, component: GeneralSettings },
        { id: 'api', label: 'Agent Connection', icon: Plug, component: ApiSettings },
        { id: 'agent', label: 'Customize Agent', icon: User, component: AgentSettings },
        { id: 'vercel', label: 'Vercel Connection', icon: LayoutGrid, component: VercelSettings },
        { id: 'github', label: 'GitHub Connection', icon: Github, component: GitHubSettings },
    ] as const;

    const handleTabClick = (tabId: typeof activeTab) => {
        setActiveTab(tabId);
        setMobileView('content');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] transition-opacity duration-300" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full sm:w-full sm:max-w-[850px] h-full sm:h-[600px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl sm:rounded-3xl shadow-2xl flex flex-col sm:flex-row overflow-hidden animate-in sm:zoom-in-95 slide-in-from-bottom-2 sm:slide-in-from-bottom-0 duration-300 border border-slate-200/50 dark:border-slate-800/50">
                
                {/* Mobile Menu View */}
                {mobileView === 'menu' && (
                    <div className="flex sm:hidden flex-col w-full h-full">
                        <div className="flex justify-between items-center p-5 border-b border-slate-200/50 dark:border-slate-800/50">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                                <div className="p-2 bg-indigo-500/10 rounded-xl">
                                    <Settings className="text-indigo-600 dark:text-indigo-400" size={20} />
                                </div>
                                Settings
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all"
                                aria-label="Close"
                            >
                                <X size={22} />
                            </button>
                        </div>
                        <div className="flex flex-col p-3 space-y-1.5">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabClick(tab.id)}
                                    className="flex items-center justify-between w-full p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-200/50 dark:hover:border-slate-700/50 group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 transition-all">
                                            <tab.icon size={22} />
                                        </div>
                                        <span className="text-base font-semibold text-slate-900 dark:text-slate-100">{tab.label}</span>
                                    </div>
                                    <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Mobile Content View (sub-pages) */}
                {mobileView === 'content' && (
                    <div className="flex sm:hidden flex-col w-full h-full">
                        <div className="flex items-center justify-between p-5 border-b border-slate-200/50 dark:border-slate-800/50 sticky top-0 z-10 bg-inherit backdrop-blur-md">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setMobileView('menu')}
                                    className="p-2.5 -ml-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
                                >
                                    <ArrowLeft size={22} />
                                </button>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                    {tabs.find(t => t.id === activeTab)?.label}
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
                                aria-label="Close"
                            >
                                <X size={22} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-5">
                            {activeTab === 'general' && <GeneralSettings language={language} setLanguage={setLanguage} />}
                            {activeTab === 'api' && <ApiSettings />}
                            {activeTab === 'agent' && <AgentSettings agentRole={agentRole} setAgentRole={setAgentRole} />}
                            {activeTab === 'vercel' && <VercelSettings />}
                            {activeTab === 'github' && <GitHubSettings />}
                        </div>
                    </div>
                )}

                {/* Desktop Sidebar */}
                <div className="hidden sm:flex w-[230px] bg-slate-50/50 dark:bg-slate-950/20 flex-col pt-6 px-4 h-full shrink-0 border-r border-slate-200/50 dark:border-slate-800/50">
                    <div className="flex items-center justify-between mb-8 px-1">
                        <span className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] italic">Settings</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-[13px] font-bold w-full transition-all duration-300 border ${
                                    activeTab === tab.id 
                                        ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border-slate-200 dark:border-slate-700' 
                                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border-transparent hover:bg-slate-100/50 dark:hover:bg-slate-800/30'
                                }`}
                            >
                                <tab.icon
                                    size={18}
                                    className={`${activeTab === tab.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}
                                    strokeWidth={activeTab === tab.id ? 2.5 : 2}
                                />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="mt-auto pb-6">
                        <button
                            onClick={onClose}
                            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[13px] font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all w-full"
                        >
                            <X size={16} />
                            Close
                        </button>
                    </div>
                </div>

                {/* Desktop Content Area */}
                <div className="hidden sm:block flex-1 overflow-y-auto px-8 py-8 no-scrollbar">
                    <div className="max-w-[500px] mx-auto">
                        {activeTab === 'general' && <GeneralSettings language={language} setLanguage={setLanguage} />}
                        {activeTab === 'api' && <ApiSettings />}
                        {activeTab === 'agent' && <AgentSettings agentRole={agentRole} setAgentRole={setAgentRole} />}
                        {activeTab === 'vercel' && <VercelSettings />}
                        {activeTab === 'github' && <GitHubSettings />}
                    </div>
                </div>
            </div>
        </div>
    );
}
