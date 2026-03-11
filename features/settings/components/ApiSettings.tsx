import { ExternalLink } from 'lucide-react';

export default function ApiSettings() {
    return (
        <>
            <h2 className="text-lg font-medium text-gray-100 mb-6">API Settings</h2>
            <div className="flex flex-col space-y-6">
                <div className="flex flex-col gap-2 border-b border-[#2f2f2f]/60 pb-6">
                    <div className="flex items-center justify-between">
                        <label className="text-[15px] font-medium text-gray-200">Gemini API Key</label>
                        <a
                            href="https://aistudio.google.com/app/apikey"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-[13px] text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            Get API Key <ExternalLink size={12} />
                        </a>
                    </div>
                    <input
                        type="password"
                        placeholder="sk-..."
                        className="w-full bg-[#151515] border border-[#3e3e3e] rounded-lg px-3 py-2 text-[16px] sm:text-[14px] text-gray-200 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600"
                    />
                    <span className="text-[13px] text-gray-400 leading-snug">
                        Used for Google's Gemini models. Requires an active Google AI Studio account.
                    </span>
                </div>

                <div className="flex flex-col gap-2 border-b border-[#2f2f2f]/60 pb-6">
                    <div className="flex items-center justify-between">
                        <label className="text-[15px] font-medium text-gray-200">ChatGPT API Key</label>
                        <a
                            href="https://platform.openai.com/api-keys"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-[13px] text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            Get API Key <ExternalLink size={12} />
                        </a>
                    </div>
                    <input
                        type="password"
                        placeholder="sk-proj-..."
                        className="w-full bg-[#151515] border border-[#3e3e3e] rounded-lg px-3 py-2 text-[16px] sm:text-[14px] text-gray-200 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600"
                    />
                    <span className="text-[13px] text-gray-400 leading-snug">
                        Used for OpenAI models. Ensure you have billing configured in your developer portal.
                    </span>
                </div>

                <div className="flex flex-col gap-2 pb-2">
                    <div className="flex items-center justify-between">
                        <label className="text-[15px] font-medium text-gray-200">Claude API Key</label>
                        <a
                            href="https://console.anthropic.com/settings/keys"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-[13px] text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            Get API Key <ExternalLink size={12} />
                        </a>
                    </div>
                    <input
                        type="password"
                        placeholder="sk-ant-..."
                        className="w-full bg-[#151515] border border-[#3e3e3e] rounded-lg px-3 py-2 text-[16px] sm:text-[14px] text-gray-200 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600"
                    />
                    <span className="text-[13px] text-gray-400 leading-snug">
                        Used for Anthropic's Claude models. Claude 3 Opus, Sonnet, and Haiku are supported.
                    </span>
                </div>
            </div>
        </>
    );
}
