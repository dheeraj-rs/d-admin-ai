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
        <div className="w-full relative min-w-0 max-w-full">
            <div className="mt-8 flex flex-wrap justify-center gap-2.5 w-full max-w-3xl mx-auto px-4">
                {SUGGESTIONS.map((sug, idx) => (
                    <button
                        key={idx}
                        onClick={() => onSelect(sug.title)}
                        className="flex items-center gap-2 md:gap-2.5 px-3.5 md:px-4 py-2 bg-transparent border border-[#3e3e3e] hover:bg-[#2a2a2a] hover:border-[#4a4a4a] rounded-full transition-all duration-200 cursor-pointer group shadow-sm text-left max-w-full"
                    >
                        <sug.icon
                            size={15}
                            strokeWidth={2}
                            className="text-gray-400 shrink-0 group-hover:text-gray-300 transition-colors"
                        />
                        <span className="text-[13px] md:text-[14px] text-gray-300 font-medium group-hover:text-gray-100 transition-colors tracking-wide truncate">
                            {sug.title}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
