'use client';

import { X, Settings, ChevronRight, ArrowLeft } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { useSettingsStore } from '../store/useSettingsStore';

interface Tab {
    id: string;
    label: string;
    icon: LucideIcon;
    component: React.ComponentType<any>;
}

interface MobileSettingsViewProps {
    tabs: readonly Tab[];
    onClose: () => void;
}

export const MobileSettingsView = ({
    tabs,
    onClose,
}: MobileSettingsViewProps) => {
    const { 
        mobileView, 
        activeTab, 
        setMobileView, 
        setActiveTab, 
    } = useSettingsStore();

    const handleTabClick = (id: string) => {
        setActiveTab(id as any);
        setMobileView('content');
    };
    if (mobileView === 'menu') {
        return (
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
        );
    }

    const ActiveComponent = tabs.find((t) => t.id === activeTab)?.component;

    return (
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
                        {tabs.find((t) => t.id === activeTab)?.label}
                    </h2>
                </div>
                <button
                    onClick={onClose}
                    className="p-2.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
                >
                    <X size={22} />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
                {ActiveComponent && (
                    <ActiveComponent />
                )}
            </div>
        </div>
    );
};
