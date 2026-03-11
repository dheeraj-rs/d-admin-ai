import { Sparkles } from 'lucide-react';
import { GeminiLogo, ChatGPTLogo, ClaudeLogo } from '@/shared/ui/Logos';

export const AGENTS = [
    { id: 'auto', name: 'Auto', icon: <Sparkles size={16} className="text-gray-400" /> },
    { id: 'gemini', name: 'Gemini', icon: <GeminiLogo className="w-4 h-4 text-blue-400" /> },
    { id: 'chatgpt', name: 'ChatGPT', icon: <ChatGPTLogo className="w-4 h-4 text-emerald-400" /> },
    { id: 'claude', name: 'Claude', icon: <ClaudeLogo className="w-4 h-4 text-[#d97757]" /> },
];
