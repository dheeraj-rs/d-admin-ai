import { useState } from 'react';
import { X, Settings, Link as LinkIcon, Edit3 } from 'lucide-react';
import GeneralSettings from './GeneralSettings';
import ApiSettings from './ApiSettings';
import AgentSettings from './AgentSettings';

export default function SettingsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [activeTab, setActiveTab] = useState<'general' | 'api' | 'agent'>('general');
    const [agentRole, setAgentRole] = useState('');

    const [theme, setTheme] = useState('System');
    const [language, setLanguage] = useState('English');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 transition-opacity" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full sm:w-full sm:max-w-[800px] h-full sm:h-[550px] bg-[#212121] sm:rounded-2xl shadow-2xl flex flex-col sm:flex-row overflow-hidden animate-in sm:zoom-in-95 slide-in-from-bottom-2 sm:slide-in-from-bottom-0 duration-200">
                {/* Left Sidebar */}
                <div className="w-full sm:w-[240px] bg-[#212121] flex flex-col pt-3 px-3 sm:h-full shrink-0 border-b sm:border-b-0 sm:border-r border-[#2f2f2f]/50">
                    <div className="flex sm:hidden justify-between items-center mb-2 px-1 text-gray-200 font-medium tracking-wide">
                        Settings
                        <button
                            onClick={onClose}
                            className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-[#2f2f2f] rounded-lg transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <button
                        className="p-2 w-max text-gray-400 hover:text-gray-200 hover:bg-[#2f2f2f] rounded-lg transition-colors mb-4 hidden sm:block shrink-0"
                        onClick={onClose}
                    >
                        <X size={20} />
                    </button>

                    <div className="flex flex-row sm:flex-col gap-1 sm:gap-0.5 mt-0 sm:mt-2 overflow-x-auto pb-2 sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <button
                            onClick={() => setActiveTab('general')}
                            className={`shrink-0 flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-lg text-sm font-medium sm:w-full transition-colors ${activeTab === 'general' ? 'bg-[#2f2f2f] text-gray-100' : 'text-gray-300 hover:bg-[#2a2a2a]'}`}
                        >
                            <Settings
                                size={16}
                                className={`${activeTab === 'general' ? 'text-gray-300' : 'text-gray-400'}`}
                                strokeWidth={2}
                            />
                            General
                        </button>
                        <button
                            onClick={() => setActiveTab('api')}
                            className={`shrink-0 flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-lg text-sm font-medium sm:w-full transition-colors ${activeTab === 'api' ? 'bg-[#2f2f2f] text-gray-100' : 'text-gray-300 hover:bg-[#2a2a2a]'}`}
                        >
                            <LinkIcon
                                size={16}
                                className={`${activeTab === 'api' ? 'text-gray-300' : 'text-gray-400'}`}
                                strokeWidth={2}
                            />
                            API Settings
                        </button>
                        <button
                            onClick={() => setActiveTab('agent')}
                            className={`shrink-0 flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-lg text-sm font-medium sm:w-full transition-colors ${activeTab === 'agent' ? 'bg-[#2f2f2f] text-gray-100' : 'text-gray-300 hover:bg-[#2a2a2a]'}`}
                        >
                            <Edit3
                                size={16}
                                className={`${activeTab === 'agent' ? 'text-gray-300' : 'text-gray-400'}`}
                                strokeWidth={2}
                            />
                            Customize Agent
                        </button>
                    </div>
                </div>

                {/* Right Content */}
                <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 sm:py-7 bg-[#212121] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
