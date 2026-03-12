import { useState } from 'react';
import { X, Settings, Link as LinkIcon, Edit3, ChevronRight, ArrowLeft } from 'lucide-react';
import GeneralSettings from './GeneralSettings';
import ApiSettings from './ApiSettings';
import AgentSettings from './AgentSettings';

export default function SettingsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [activeTab, setActiveTab] = useState<'general' | 'api' | 'agent'>('general');
    const [mobileView, setMobileView] = useState<'menu' | 'content'>('menu');
    const [agentRole, setAgentRole] = useState('');

    const [theme, setTheme] = useState('System');
    const [language, setLanguage] = useState('English');

    if (!isOpen) return null;

    const tabs = [
        { id: 'general', label: 'General', icon: Settings, component: GeneralSettings },
        { id: 'api', label: 'API Settings', icon: LinkIcon, component: ApiSettings },
        { id: 'agent', label: 'Customize Agent', icon: Edit3, component: AgentSettings },
    ] as const;

    const handleTabClick = (tabId: typeof activeTab) => {
        setActiveTab(tabId);
        setMobileView('content');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 transition-opacity" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full sm:w-full sm:max-w-[700px] h-full sm:h-[480px] bg-[#212121] sm:rounded-2xl shadow-2xl flex flex-col sm:flex-row overflow-hidden animate-in sm:zoom-in-95 slide-in-from-bottom-2 sm:slide-in-from-bottom-0 duration-200">
                
                {/* Mobile Menu View */}
                {mobileView === 'menu' && (
                    <div className="flex sm:hidden flex-col w-full h-full bg-[#212121]">
                        <div className="flex justify-between items-center p-4 border-b border-[#2f2f2f]/60">
                            <h2 className="text-lg font-semibold text-gray-100 italic tracking-tight flex items-center gap-2">
                                <Settings className="text-blue-500" size={20} />
                                Settings
                            </h2>
                            <button
                                onClick={onClose}
                                className="group relative p-2 text-gray-400 hover:text-white transition-all transform hover:rotate-90 duration-300"
                                aria-label="Close"
                            >
                                <div className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                                <X size={22} className="relative z-10" />
                            </button>
                        </div>
                        <div className="flex flex-col p-2 space-y-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabClick(tab.id)}
                                    className="flex items-center justify-between w-full p-4 rounded-xl hover:bg-[#2a2a2a] transition-colors group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#2f2f2f] flex items-center justify-center text-gray-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                                            <tab.icon size={20} />
                                        </div>
                                        <span className="text-[16px] font-medium text-gray-200">{tab.label}</span>
                                    </div>
                                    <ChevronRight size={18} className="text-gray-500" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Mobile Content View (sub-pages) */}
                {mobileView === 'content' && (
                    <div className="flex sm:hidden flex-col w-full h-full bg-[#212121]">
                        <div className="flex items-center justify-between p-4 border-b border-[#2f2f2f]/60 bg-[#212121] sticky top-0 z-10">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setMobileView('menu')}
                                    className="p-2 -ml-2 text-gray-400 hover:text-gray-200 hover:bg-[#2f2f2f] rounded-full transition-colors"
                                >
                                    <ArrowLeft size={22} />
                                </button>
                                <h2 className="text-lg font-semibold text-gray-100">
                                    {tabs.find(t => t.id === activeTab)?.label}
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="group relative p-2 text-gray-400 hover:text-white transition-all transform hover:rotate-90 duration-300"
                                aria-label="Close"
                            >
                                <div className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                                <X size={22} className="relative z-10" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                            {activeTab === 'general' && (
                                <GeneralSettings
                                    theme={theme}
                                    setTheme={setTheme}
                                    language={language}
                                    setLanguage={setLanguage}
                                />
                            )}
                            {activeTab === 'api' && <ApiSettings />}
                            {activeTab === 'agent' && <AgentSettings agentRole={agentRole} setAgentRole={setAgentRole} />}
                        </div>
                    </div>
                )}

                <div className="hidden sm:flex w-[200px] bg-[#212121] flex-col pt-3 px-3 h-full shrink-0 border-r border-[#2f2f2f]/50">
                    <button
                        onClick={onClose}
                        className="group relative p-2 w-max text-gray-400 hover:text-white transition-all transform hover:rotate-90 duration-300 mb-4"
                        aria-label="Close"
                    >
                        <div className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                        <X size={20} className="relative z-10" />
                    </button>

                    <div className="flex flex-col gap-0.5 mt-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full transition-colors ${activeTab === tab.id ? 'bg-[#2f2f2f] text-gray-100' : 'text-gray-300 hover:bg-[#2a2a2a]'}`}
                            >
                                <tab.icon
                                    size={15}
                                    className={`${activeTab === tab.id ? 'text-gray-300' : 'text-gray-400'}`}
                                    strokeWidth={2}
                                />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Desktop Content Area */}
                <div className="hidden sm:block flex-1 overflow-y-auto px-6 py-6 bg-[#212121]">
                    {activeTab === 'general' && (
                        <GeneralSettings
                            theme={theme}
                            setTheme={setTheme}
                            language={language}
                            setLanguage={setLanguage}
                        />
                    )}

                    {activeTab === 'api' && <ApiSettings />}

                    {activeTab === 'agent' && <AgentSettings agentRole={agentRole} setAgentRole={setAgentRole} />}
                </div>
            </div>
        </div>
    );
}
