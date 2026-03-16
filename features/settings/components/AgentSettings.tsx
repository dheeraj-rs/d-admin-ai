import { useSettingsStore } from '../store/useSettingsStore';

export default function AgentSettings() {
    const { agentRole, setAgentRole } = useSettingsStore();
    return (
        <>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tigh mb-8">Customize Agent</h2>
            <div className="flex flex-col h-full gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-[15px] font-bold text-slate-800 dark:text-slate-200">Custom Role & System Prompt</label>
                    <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-950/30 p-3 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                        Define how the AI should behave, what roles it should take, and how it should format its
                        responses. Keep this concise for the best results.
                    </p>
                </div>
                <div className="relative group">
                    <textarea
                        value={agentRole}
                        onChange={(e) => setAgentRole(e.target.value)}
                        placeholder="e.g. You are an expert senior frontend engineer. Always provide React code using Tailwind CSS and functional components..."
                        className="w-full h-[200px] bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-[15px] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm dark:shadow-none"
                    />
                </div>
                <div className="flex justify-end">
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 text-sm active:scale-95">
                        Save Customization
                    </button>
                </div>
            </div>
        </>
    );
}
