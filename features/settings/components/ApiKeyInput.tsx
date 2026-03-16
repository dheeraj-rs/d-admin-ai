'use client';

import { ClipboardPaste, Trash2 } from 'lucide-react';
import { useSettingsStore, ProviderId } from '../store/useSettingsStore';

interface ApiKeyInputProps {
    id: ProviderId;
    apiKey: string;
    index?: number;
    placeholder: string;
}

export const ApiKeyInput = ({
    id,
    apiKey,
    index,
    placeholder,
}: ApiKeyInputProps) => {
    const { addApiKey, updateApiKey, removeApiKey } = useSettingsStore();

    const onPaste = async (idx?: number) => {
        try {
            const text = await navigator.clipboard.readText();
            if (text.trim()) {
                if (typeof idx === 'number') {
                    updateApiKey(id as any, idx, text.trim());
                } else {
                    addApiKey(id as any, text.trim());
                }
            }
        } catch (err) {
            console.error('Failed to read clipboard', err);
        }
    };
    return (
        <div className="flex gap-2.5">
            <div className="relative flex-1 group">
                <input
                    type="password"
                    value={apiKey}
                    placeholder={apiKey === '' ? placeholder : ''}
                    onChange={(e) => typeof index === 'number' && updateApiKey(id as any, index, e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && typeof index !== 'number') {
                            const val = (e.target as HTMLInputElement).value;
                            if (val.trim()) {
                                addApiKey(id as any, val.trim());
                                (e.target as HTMLInputElement).value = '';
                            }
                        }
                    }}
                    onBlur={(e) => {
                        if (typeof index !== 'number') {
                            const val = e.target.value;
                            if (val.trim()) {
                                addApiKey(id as any, val.trim());
                                e.target.value = '';
                            }
                        }
                    }}
                    className={`w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-[14px] font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all italic ${apiKey === '' ? 'pr-24' : ''}`}
                />
                {apiKey === '' && (
                    <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all text-[11px] font-black uppercase tracking-wider shadow-sm"
                        onClick={() => onPaste(index)}
                    >
                        <ClipboardPaste size={14} /> Paste
                    </button>
                )}
            </div>
            {typeof index === 'number' && (
                <button
                    onClick={() => removeApiKey(id as any, index)}
                    className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all"
                >
                    <Trash2 size={18} />
                </button>
            )}
        </div>
    );
};
