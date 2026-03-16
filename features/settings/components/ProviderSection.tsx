import { Plus } from 'lucide-react';
import { ApiKeyInput } from './ApiKeyInput';
import { ProviderHeader } from './ProviderHeader';
import { useSettingsStore, ProviderId } from '../store/useSettingsStore';

export interface ProviderSectionProps {
    id: ProviderId;
    title: string;
    keys: string[];
    url: string;
    helpText: string;
    placeholder: string;
    expanded: boolean;
    videoUrl?: string;
    onToggle: () => void;
    onHelp: (url: string) => void;
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
}: ProviderSectionProps) => {
    const { addApiKey } = useSettingsStore();

    return (
        <div className="flex flex-col gap-3 border-b border-slate-200/50 dark:border-slate-800/50 pb-8">
            <ProviderHeader
                title={title}
                url={url}
                expanded={expanded}
                videoUrl={videoUrl}
                onToggle={onToggle}
                onHelp={onHelp}
            />

            {expanded && (
                <>
                    {keys.length === 0 ? (
                        <ApiKeyInput
                            id={id}
                            apiKey=""
                            placeholder={placeholder}
                        />
                    ) : (
                        <div className="flex flex-col gap-2.5">
                            {keys.map((key, idx) => (
                                <ApiKeyInput
                                    key={`${id}-${idx}`}
                                    id={id}
                                    apiKey={key}
                                    index={idx}
                                    placeholder={placeholder}
                                />
                            ))}
                            <button
                                onClick={() => addApiKey(id as any, '')}
                                className="flex items-center gap-2 text-[11px] font-black text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all w-max mt-1 px-1 uppercase tracking-wider"
                            >
                                <Plus size={14} /> Add another key
                            </button>
                        </div>
                    )}
                    <p className="text-[12px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50/50 dark:bg-slate-950/30 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 italic opacity-80">
                        {helpText}
                    </p>
                </>
            )}
        </div>
    );
};
