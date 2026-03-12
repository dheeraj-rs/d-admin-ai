import { useState } from 'react';
import { ExternalLink, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useSettingsStore } from '../store/useSettingsStore';

export default function ApiSettings() {
    const { gemini, openai, claude, addApiKey, removeApiKey, updateApiKey } = useSettingsStore();
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

    const toggleExpand = (provider: string) => {
        setExpanded((prev) => ({ ...prev, [provider]: !prev[provider] }));
    };

    const ProviderSection = ({
        id,
        title,
        keys,
        url,
        helpText,
        placeholder,
    }: {
        id: 'gemini' | 'openai' | 'claude';
        title: string;
        keys: string[];
        url: string;
        helpText: string;
        placeholder: string;
    }) => {
        const isExpanded = expanded[id];

        return (
            <div className="flex flex-col gap-2 border-b border-[#2f2f2f]/60 pb-6">
                <div className="flex items-center justify-between">
                    <label className="text-[15px] font-medium text-gray-200">{title}</label>
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
                            onClick={() => toggleExpand(id)}
                            className="text-gray-400 hover:text-gray-200 transition-colors"
                        >
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                    </div>
                </div>

                {keys.length === 0 ? (
                    <div className="relative group">
                        <input
                            type="password"
                            placeholder={placeholder}
                            className="w-full bg-[#151515] border border-[#3e3e3e] rounded-lg px-3 py-2 text-[16px] sm:text-[14px] text-gray-200 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600"
                            onChange={(e) => {
                                if (e.target.value.trim()) {
                                    addApiKey(id, e.target.value);
                                    e.target.value = '';
                                }
                            }}
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-gray-300 transition-colors">
                            <Plus size={18} />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {keys.map((key, idx) => (
                            <div key={idx} className="flex gap-2">
                                <input
                                    type="password"
                                    value={key}
                                    onChange={(e) => updateApiKey(id, idx, e.target.value)}
                                    className="flex-1 bg-[#151515] border border-[#3e3e3e] rounded-lg px-3 py-2 text-[16px] sm:text-[14px] text-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                                <button
                                    onClick={() => removeApiKey(id, idx)}
                                    className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                        {isExpanded && (
                            <button
                                onClick={() => addApiKey(id, ' ')}
                                className="flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-gray-200 transition-colors w-max mt-1"
                            >
                                <Plus size={14} /> Add another key
                            </button>
                        )}
                    </div>
                )}
                <span className="text-[13px] text-gray-400 leading-snug">{helpText}</span>
            </div>
        );
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
                    helpText="Used for Google's Gemini models. Multiple keys enable automatic rotation on quota limits."
                />

                <ProviderSection
                    id="openai"
                    title="ChatGPT API Keys"
                    keys={openai}
                    url="https://platform.openai.com/api-keys"
                    placeholder="Enter sk-proj-..."
                    helpText="Used for OpenAI models. Rotation happens automatically if multiple keys are provided."
                />

                <ProviderSection
                    id="claude"
                    title="Claude API Keys"
                    keys={claude}
                    url="https://console.anthropic.com/settings/keys"
                    placeholder="Enter sk-ant-..."
                    helpText="Used for Anthropic's Claude models. High availability through multi-key support."
                />
            </div>
        </>
    );
}
