import React, { useState } from 'react';
import { Plus, ExternalLink, MousePointerClick, LayoutTemplate, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useWorkspace } from '../hooks/useWorkspace';
import PageHeader from '@/shared/ui/PageHeader';
import ItemCard from '@/shared/ui/ItemCard';

interface Template {
    id: string;
    title: string;
    description: string;
    image: string;
    category: 'Portfolio' | 'Business' | 'Blog' | 'Tool';
}

const TEMPLATES: Template[] = [
    {
        id: '1',
        title: 'Modern Portfolio',
        description: 'A sleek, dark-themed portfolio for creatives and developers.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        category: 'Portfolio'
    },
    {
        id: '1a',
        title: 'SaaS Platform',
        description: 'Clean and professional landing page for software products.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
        category: 'Business'
    },
    {
        id: '2',
        title: 'Creative Agency',
        description: 'Bold designs for marketing and design agencies.',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800',
        category: 'Business'
    },
    {
        id: '3',
        title: 'Minimal Blog',
        description: 'Focus on content with this elegant blogging template.',
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
        category: 'Blog'
    },
    {
        id: '4',
        title: 'Personal Sidebar',
        description: 'A unique sidebar-first landing page.',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
        category: 'Portfolio'
    }
];

interface TemplatesViewProps {
    onBack?: () => void;
}

export default function TemplatesView({ onBack }: TemplatesViewProps) {
    const [searchValue, setSearchValue] = useState('');
    const router = useRouter();
    const { actions } = useWorkspace();

    return (
        <div className="flex-1 flex flex-col items-center justify-start px-6 pt-4 pb-12 w-full min-w-0 bg-[#ecfeff] dark:bg-[#02060D] text-gray-900 dark:text-white font-sans relative z-0 transition-colors duration-300">
            {/* Ambient Theme Background */}
            <div className="fixed inset-0 w-[100dvw] h-[100dvh] z-0 pointer-events-none overflow-hidden bg-[#ecfeff] dark:bg-[#02060D] transition-colors duration-300">
                <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-cyan-600/5 dark:bg-cyan-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] bg-indigo-600/2 dark:bg-indigo-600/5 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-7xl relative z-10">
                <div className="mb-8 text-center animate-in fade-in slide-in-from-top-4 duration-700">
                    <h1 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-3">
                        Start with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 italic font-serif">Templates</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm lg:text-base font-medium max-w-xl mx-auto mb-8">
                        Choose a starting point and build exactly what you imagine with drag-and-drop.
                    </p>

                    <div className="relative max-w-2xl mx-auto group">
                        <div className="absolute inset-0 bg-blue-500/10 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        <div className="relative flex items-center">
                            <Search className="absolute left-4 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors" size={20} />
                            <input 
                                type="text"
                                placeholder="Search premium templates..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="w-full h-12 bg-cyan-50 dark:bg-white/[0.03] border border-cyan-200 dark:border-white/[0.08] rounded-2xl pl-12 pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-cyan-100 dark:focus:bg-white/[0.05] transition-all shadow-sm dark:shadow-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
                    {['All', 'Portfolio', 'Business', 'Blog', 'Tool', 'E-commerce'].map((cat) => (
                        <button 
                            key={cat}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                                cat === 'All' ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-gray-100 dark:bg-[#2a2a2a] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#333333] hover:text-gray-900 dark:hover:text-gray-200 border border-gray-200 dark:border-[#3e3e3e]'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Blank Canvas Option */}
                    <div className="flex flex-col group cursor-pointer">
                        <div className="aspect-[4/3] rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] border-2 border-dashed border-gray-300 dark:border-[#3e3e3e] flex flex-col items-center justify-center gap-4 transition-all hover:border-blue-500/50 hover:bg-gray-100 dark:hover:bg-[#202020] mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                <Plus size={24} />
                            </div>
                            <span className="text-gray-600 dark:text-gray-400 font-medium group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">Blank Canvas</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Start from scratch</h3>
                        <p className="text-gray-500 dark:text-gray-500 text-sm">Full freedom with our drag-and-drop builder.</p>
                    </div>

                    {TEMPLATES
                        .filter(t => t.title.toLowerCase().includes(searchValue.toLowerCase()) || t.category.toLowerCase().includes(searchValue.toLowerCase()))
                        .map((template) => (
                            <ItemCard
                                key={template.id}
                                title={template.title}
                                description={template.description}
                                image={template.image}
                                badge={template.category}
                                primaryActionText="Use Template"
                                onPrimaryAction={() => {}}
                            />
                        ))}
                </div>

                {/* Drag and Drop Feature Highlight */}
                <div className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white dark:from-[#2a2a2a] dark:to-[#1a1a1a] border border-gray-200 dark:border-white/5 flex flex-col md:flex-row items-center gap-10 shadow-sm dark:shadow-none">
                    <div className="flex-1">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                            <MousePointerClick size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Visual Builder</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-6">
                            Don't want to use AI? No problem. Use our fast, intuitive drag-and-drop builder to turn your ideas into reality in minutes.
                        </p>
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                                <span className="text-gray-900 dark:text-white font-bold text-xl">100+</span>
                                <span className="text-gray-500 text-sm uppercase tracking-wider">UI Sections</span>
                            </div>
                            <div className="h-8 w-px bg-gray-200 dark:bg-white/10" />
                            <div className="flex flex-col">
                                <span className="text-gray-900 dark:text-white font-bold text-xl">0</span>
                                <span className="text-gray-500 text-sm uppercase tracking-wider">Coding Required</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full aspect-video rounded-2xl bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/5 overflow-hidden flex items-center justify-center">
                        <div className="text-gray-400 dark:text-gray-600 flex flex-col items-center gap-4 italic">
                            <LayoutTemplate size={48} className="opacity-20 translate-y-2 animate-bounce transition-all duration-1000" />
                            <span className="text-sm">Interactive Builder Preview</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
