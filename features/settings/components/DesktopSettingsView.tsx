'use client';

import { X } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { useSettingsStore } from '../store/useSettingsStore';

interface Tab {
    id: string;
    label: string;
    icon: LucideIcon;
    component: React.ComponentType<any>;
}

interface DesktopSettingsViewProps {
    tabs: readonly Tab[];
    onClose: () => void;
}

export const DesktopSettingsView = ({
    tabs,
    onClose,
}: DesktopSettingsViewProps) => {
    const { activeTab, setActiveTab } = useSettingsStore();
    const ActiveComponent = tabs.find((t) => t.id === activeTab)?.component;

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden sm:flex w-[230px] bg-slate-50/50 dark:bg-slate-950/20 flex-col pt-6 px-4 h-full shrink-0 border-r border-slate-200/50 dark:border-slate-800/50">
                <div className="flex items-center justify-between mb-8 px-1">
                    <span className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] italic">
                        Settings
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                </div>

                <div className="flex flex-col gap-1.5">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
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
                    {ActiveComponent && (
                        <ActiveComponent />
                    )}
                </div>
            </div>
        </>
    );
};
