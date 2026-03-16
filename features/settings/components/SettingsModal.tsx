import { useState } from 'react';
import { Settings, User, Plug, Github, LayoutGrid } from 'lucide-react';
import GeneralSettings from './GeneralSettings';
import ApiSettings from './ApiSettings';
import AgentSettings from './AgentSettings';
import VercelSettings from './VercelSettings';
import GitHubSettings from './GitHubSettings';
import { MobileSettingsView } from './MobileSettingsView';
import { DesktopSettingsView } from './DesktopSettingsView';

type TabId = 'general' | 'api' | 'agent' | 'vercel' | 'github';

export default function SettingsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;

    const tabs = [
        { id: 'general', label: 'General', icon: Settings, component: GeneralSettings },
        { id: 'api', label: 'Agent Connection', icon: Plug, component: ApiSettings },
        { id: 'agent', label: 'Customize Agent', icon: User, component: AgentSettings },
        { id: 'vercel', label: 'Vercel Connection', icon: LayoutGrid, component: VercelSettings },
        { id: 'github', label: 'GitHub Connection', icon: Github, component: GitHubSettings },
    ] as const;


    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto">
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] transition-opacity duration-300" onClick={onClose} />
            <div className="relative w-full sm:w-full sm:max-w-[850px] h-full sm:h-[600px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl sm:rounded-3xl shadow-2xl flex flex-col sm:flex-row overflow-hidden animate-in sm:zoom-in-95 slide-in-from-bottom-2 sm:slide-in-from-bottom-0 duration-300 border border-slate-200/50 dark:border-slate-800/50">
                <MobileSettingsView
                    tabs={tabs}
                    onClose={onClose}
                />
                <DesktopSettingsView
                    tabs={tabs}
                    onClose={onClose}
                />
            </div>
        </div>
    );
}

