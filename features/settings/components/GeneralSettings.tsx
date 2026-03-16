import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import CustomSelect from '@/shared/ui/CustomSelect';

import { useSettingsStore } from '../store/useSettingsStore';

const THEME_OPTIONS = [
    { label: 'System', value: 'system' },
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
];

const LANGUAGE_OPTIONS = [{ label: 'English', value: 'English' }];

export default function GeneralSettings() {
    const { language, setLanguage } = useSettingsStore();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-8">
                General
            </h2>
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/30 border border-slate-200/50 dark:border-slate-800/50 transition-all hover:border-slate-300 dark:hover:border-slate-700">
                    <span className="text-[15px] font-bold text-slate-800 dark:text-slate-200">
                        Appearance
                    </span>
                    <CustomSelect value={theme} onChange={setTheme} options={THEME_OPTIONS} />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/30 border border-slate-200/50 dark:border-slate-800/50 transition-all hover:border-slate-300 dark:hover:border-slate-700">
                    <span className="text-[15px] font-bold text-slate-800 dark:text-slate-200">
                        Language
                    </span>
                    <CustomSelect
                        value={language}
                        onChange={setLanguage}
                        options={LANGUAGE_OPTIONS}
                        disabled
                    />
                </div>
            </div>
        </>
    );
}
