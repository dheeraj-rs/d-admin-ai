import { ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface GeneralSettingsProps {
    language: string;
    setLanguage: (val: string) => void;
}

export default function GeneralSettings({ language, setLanguage }: GeneralSettingsProps) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-8">General</h2>
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/30 border border-slate-200/50 dark:border-slate-800/50 transition-all hover:border-slate-300 dark:hover:border-slate-700">
                    <span className="text-[15px] font-bold text-slate-800 dark:text-slate-200">Appearance</span>
                    <div className="relative">
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            className="appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-1.5 pr-10 text-[13px] font-bold text-slate-700 dark:text-slate-200 hover:border-indigo-500/30 transition-all cursor-pointer outline-none shadow-sm"
                        >
                            <option value="system">System</option>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                        <ChevronDown
                            size={14}
                            className="text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                            strokeWidth={3}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/30 border border-slate-200/50 dark:border-slate-800/50 transition-all hover:border-slate-300 dark:hover:border-slate-700">
                    <span className="text-[15px] font-bold text-slate-800 dark:text-slate-200">Language</span>
                    <div className="relative">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-1.5 pr-10 text-[13px] font-bold text-slate-700 dark:text-slate-200 hover:border-indigo-500/30 transition-all cursor-pointer outline-none shadow-sm"
                        >
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                        </select>
                        <ChevronDown
                            size={14}
                            className="text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                            strokeWidth={3}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
