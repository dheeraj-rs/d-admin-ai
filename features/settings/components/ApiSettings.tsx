import { useState } from 'react';
import { ExternalLink, Plus, Trash2, ChevronDown, ChevronUp, ClipboardPaste, HelpCircle, X } from 'lucide-react';
import { useSettingsStore } from '../store/useSettingsStore';

interface ProviderSectionProps {
    id: 'gemini' | 'openai' | 'claude';
    title: string;
    keys: string[];
    url: string;
    helpText: string;
    placeholder: string;
    expanded: boolean;
    videoUrl?: string;
    onToggle: () => void;
    onHelp: (url: string) => void;
    addApiKey: (id: 'gemini' | 'openai' | 'claude', key: string) => void;
    removeApiKey: (id: 'gemini' | 'openai' | 'claude', index: number) => void;
    updateApiKey: (id: 'gemini' | 'openai' | 'claude', index: number, key: string) => void;
}

const ProviderSection = ({
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
        <div className="flex flex-col gap-2 border-b border-[#2f2f2f]/60 pb-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 group cursor-pointer" onClick={() => videoUrl && onHelp(videoUrl)}>
                    <label className="text-[15px] font-medium text-gray-200 cursor-pointer">{title}</label>
                    <HelpCircle size={14} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
                </div>
                <div className="flex items-center gap-3">
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[13px] text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        Get Key <ExternalLink size={12} />
                    </a>
                    <button
                        onClick={onToggle}
                        className="text-gray-400 hover:text-gray-200 transition-colors p-1"
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
                        className="w-full bg-[#151515] border border-[#3e3e3e] rounded-lg px-3 py-2 pr-24 text-[16px] sm:text-[14px] text-gray-200 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600"
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
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#252525] border border-[#3e3e3e] text-gray-300 hover:text-white hover:bg-[#333] transition-all text-xs font-medium"
                        onClick={() => handlePaste()}
                    >
                        <ClipboardPaste size={14} /> Paste
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {keys.map((key, idx) => (
                        <div key={`${id}-${idx}`} className="flex gap-2">
                            <div className="relative flex-1 group">
                                <input
                                    type="password"
                                    value={key}
                                    placeholder={key === '' ? placeholder : ''}
                                    onChange={(e) => updateApiKey(id, idx, e.target.value)}
                                    className={`w-full bg-[#151515] border border-[#3e3e3e] rounded-lg px-3 py-2 text-[16px] sm:text-[14px] text-gray-200 focus:outline-none focus:border-blue-500 transition-colors ${key === '' ? 'pr-24' : ''}`}
                                />
                                {key === '' && (
                                    <button 
                                        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#252525] border border-[#3e3e3e] text-gray-300 hover:text-white hover:bg-[#333] transition-all text-xs font-medium"
                                        onClick={() => handlePaste(idx)}
                                    >
                                        <ClipboardPaste size={14} /> Paste
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={() => removeApiKey(id, idx)}
                                className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={() => addApiKey(id, '')}
                        className="flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-gray-200 transition-colors w-max mt-1"
                    >
                        <Plus size={14} /> Add another key
                    </button>
                </div>
            )}
            <p className="text-[12px] text-gray-500 leading-normal bg-[#252525]/30 p-2 rounded-md border border-white/5">
                {helpText}
            </p>
        </div>
    );
};

export default function ApiSettings() {
    const { gemini, openai, claude, addApiKey, removeApiKey, updateApiKey } = useSettingsStore();
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
    const [tutorial, setTutorial] = useState<{ isOpen: boolean; url: string }>({ isOpen: false, url: '' });

    const toggleExpand = (provider: string) => {
        setExpanded((prev) => ({ ...prev, [provider]: !prev[provider] }));
    };

    const openTutorial = (url: string) => {
        setTutorial({ isOpen: true, url });
    };

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-100">API Settings</h2>
                <div className="bg-[#2f2f2f] rounded-full px-2 py-0.5 text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                    Advanced
                </div>
            </div>
            <div className="flex flex-col space-y-6">
                <ProviderSection
                    id="gemini"
                    title="Gemini API Keys"
                    keys={gemini}
                    url="https://aistudio.google.com/app/apikey"
                    placeholder="Enter sk-..."
                    helpText="Optimized for high-availability. If multiple keys are provided, the system automatically rotates to the next available key when a quota limit is reached."
                    expanded={!!expanded.gemini}
                    videoUrl="https://www.youtube.com/embed/prrb0hsfI60"
                    onToggle={() => toggleExpand('gemini')}
                    onHelp={openTutorial}
                    addApiKey={addApiKey}
                    removeApiKey={removeApiKey}
                    updateApiKey={updateApiKey}
                />

                <ProviderSection
                    id="openai"
                    title="ChatGPT API Keys"
                    keys={openai}
                    url="https://platform.openai.com/api-keys"
                    placeholder="Enter sk-proj-..."
                    helpText="Fail-safe rotation enabled. When multiple keys are added, we automatically switch to the next key if the current one hits its rate limit."
                    expanded={!!expanded.openai}
                    videoUrl="https://www.youtube.com/embed/prrb0hsfI60"
                    onToggle={() => toggleExpand('openai')}
                    onHelp={openTutorial}
                    addApiKey={addApiKey}
                    removeApiKey={removeApiKey}
                    updateApiKey={updateApiKey}
                />

                <ProviderSection
                    id="claude"
                    title="Claude API Keys"
                    keys={claude}
                    url="https://console.anthropic.com/settings/keys"
                    placeholder="Enter sk-ant-..."
                    helpText="High-availability support. Automatically cycles through your provided keys to ensure uninterrupted service when hitting API response usage limits."
                    expanded={!!expanded.claude}
                    videoUrl="https://www.youtube.com/embed/prrb0hsfI60"
                    onToggle={() => toggleExpand('claude')}
                    onHelp={openTutorial}
                    addApiKey={addApiKey}
                    removeApiKey={removeApiKey}
                    updateApiKey={updateApiKey}
                />
            </div>

            {/* Video Tutorial Modal */}
            {tutorial.isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="relative w-full max-w-2xl bg-[#1a1a1a] rounded-xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[#252525]">
                            <h3 className="text-sm font-semibold text-gray-200">How to get your API Key</h3>
                            <button 
                                onClick={() => setTutorial({ ...tutorial, isOpen: false })}
                                className="p-1 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="aspect-video bg-black flex items-center justify-center">
                            <iframe
                                src={tutorial.url}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <div className="p-4 bg-[#252525] flex justify-end">
                            <button 
                                onClick={() => setTutorial({ ...tutorial, isOpen: false })}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
