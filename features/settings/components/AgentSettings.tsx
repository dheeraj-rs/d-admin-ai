interface AgentSettingsProps {
    agentRole: string;
    setAgentRole: (val: string) => void;
}

export default function AgentSettings({ agentRole, setAgentRole }: AgentSettingsProps) {
    return (
        <>
            <h2 className="text-lg font-medium text-gray-100 mb-6">Customize Agent</h2>
            <div className="flex flex-col h-full gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-[15px] font-medium text-gray-200">Custom Role & System Prompt</label>
                    <span className="text-[13px] text-gray-400 leading-snug">
                        Define how the AI should behave, what roles it should take, and how it should format its
                        responses. Keep this concise for the best results.
                    </span>
                </div>
                <textarea
                    value={agentRole}
                    onChange={(e) => setAgentRole(e.target.value)}
                    placeholder="e.g. You are an expert senior frontend engineer. Always provide React code using Tailwind CSS and functional components..."
                    className="w-full h-[240px] bg-[#151515] border border-[#3e3e3e] rounded-lg p-3 text-[16px] sm:text-[14px] text-gray-200 focus:outline-none focus:border-blue-500 transition-colors resize-none placeholder:text-gray-600"
                />
                <div className="flex justify-end pt-2">
                    <button className="bg-white text-black font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                        Save Customization
                    </button>
                </div>
            </div>
        </>
    );
}
