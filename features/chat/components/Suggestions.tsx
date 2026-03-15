import { Layout, Rocket, Database, Command, Code, Globe } from 'lucide-react';

const SUGGESTIONS = [
    { title: 'Build a portfolio website', icon: Globe },
    { title: 'Create a landing page', icon: Rocket },
    { title: 'Build a CRUD app', icon: Database },
    { title: 'Tic-Tac-Toe game', icon: Command },
    { title: 'Dashboard UI', icon: Layout },
    { title: 'Write a React component', icon: Code },
];

export default function Suggestions({ onSelect }: { onSelect: (text: string) => void }) {
    return (
        <div className="w-full relative min-w-0 max-w-full overflow-x-hidden">
            <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-2 w-full max-w-2xl mx-auto px-2">
                {SUGGESTIONS.map((sug, idx) => (
                    <button
                        key={idx}
                        onClick={() => onSelect(sug.title)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/[0.08] hover:border-gray-300 dark:hover:border-white/20 rounded-lg transition-all duration-200 cursor-pointer group shadow-sm text-left"
                    >
                        <sug.icon
                            size={14}
                            strokeWidth={2}
                            className="text-gray-500 dark:text-gray-400 shrink-0 group-hover:text-gray-700 dark:group-hover:text-white transition-colors"
                        />
                        <span className="text-[12px] sm:text-[13px] text-gray-700 dark:text-gray-300 font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors tracking-tight truncate">
                            {sug.title}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
