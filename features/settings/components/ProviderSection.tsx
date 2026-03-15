import { ExternalLink, Plus, Trash2, ChevronDown, ChevronUp, ClipboardPaste, HelpCircle } from 'lucide-react';

export interface ProviderSectionProps {
    id: 'gemini' | 'openai' | 'claude' | 'vercel' | 'github';
    title: string;
    keys: string[];
    url: string;
    helpText: string;
    placeholder: string;
    expanded: boolean;
    videoUrl?: string;
    onToggle: () => void;
    onHelp: (url: string) => void;
    addApiKey: (id: 'gemini' | 'openai' | 'claude' | 'vercel' | 'github', key: string) => void;
    removeApiKey: (id: 'gemini' | 'openai' | 'claude' | 'vercel' | 'github', index: number) => void;
    updateApiKey: (id: 'gemini' | 'openai' | 'claude' | 'vercel' | 'github', index: number, key: string) => void;
}

export const ProviderSection = ({
    id,
    title,
    keys,
    url,
    helpText,
    placeholder,
    expanded,
    videoUrl,
    onToggle,
    onHelp,
    addApiKey,
    removeApiKey,
    updateApiKey,
}: ProviderSectionProps) => {
    const handlePaste = async (index?: number) => {
        try {
            const text = await navigator.clipboard.readText();
            if (text.trim()) {
                if (typeof index === 'number') {
                    updateApiKey(id, index, text.trim());
                } else {
                    addApiKey(id, text.trim());
                }
            }
        } catch (err) {
            console.error('Failed to read clipboard', err);
        }
    };

    return (
        <div className="flex flex-col gap-3 border-b border-slate-200/50 dark:border-slate-800/50 pb-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 group cursor-pointer" onClick={() => videoUrl && onHelp(videoUrl)}>
                    <label className="text-[15px] font-bold text-slate-800 dark:text-slate-200 cursor-pointer group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase tracking-tight italic">{title}</label>
                    <HelpCircle size={14} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                </div>
                <div className="flex items-center gap-4">
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[11px] font-black text-indigo-600 dark:text-indigo-400 hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors uppercase tracking-wider"
                    >
                        Get Key <ExternalLink size={12} />
                    </a>
                    <button
                        onClick={onToggle}
                        className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                    >
                        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                </div>
            </div>

            {keys.length === 0 ? (
                <div className="relative group">
                    <input
                        type="password"
                        placeholder={placeholder}
                        className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 pr-24 text-[14px] font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm dark:shadow-none italic"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const val = (e.target as HTMLInputElement).value;
                                if (val.trim()) {
                                    addApiKey(id, val.trim());
                                    (e.target as HTMLInputElement).value = '';
                                }
                            }
                        }}
                        onBlur={(e) => {
                            const val = e.target.value;
                            if (val.trim()) {
                                addApiKey(id, val.trim());
                                e.target.value = '';
                            }
                        }}
                    />
                    <button 
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/30 transition-all text-[11px] font-black uppercase tracking-wider shadow-sm"
                        onClick={() => handlePaste()}
                    >
                        <ClipboardPaste size={14} /> Paste
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-2.5">
                    {keys.map((key, idx) => (
                        <div key={`${id}-${idx}`} className="flex gap-2.5">
                            <div className="relative flex-1 group">
                                <input
                                    type="password"
                                    value={key}
                                    placeholder={key === '' ? placeholder : ''}
                                    onChange={(e) => updateApiKey(id, idx, e.target.value)}
                                    className={`w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-[14px] font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all italic ${key === '' ? 'pr-24' : ''}`}
                                />
                                {key === '' && (
                                    <button 
                                        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all text-[11px] font-black uppercase tracking-wider shadow-sm"
                                        onClick={() => handlePaste(idx)}
                                    >
                                        <ClipboardPaste size={14} /> Paste
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={() => removeApiKey(id, idx)}
                                className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={() => addApiKey(id, '')}
                        className="flex items-center gap-2 text-[11px] font-black text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all w-max mt-1 px-1 uppercase tracking-wider"
                    >
                        <Plus size={14} /> Add another key
                    </button>
                </div>
            )}
            <p className="text-[12px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50/50 dark:bg-slate-950/30 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 italic opacity-80">
                {helpText}
            </p>
        </div>
    );
};
