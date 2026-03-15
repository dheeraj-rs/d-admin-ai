import React, { useState } from 'react';
import { Plus, ExternalLink, MousePointerClick, LayoutTemplate, Search, Filter, ChevronDown } from 'lucide-react';
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
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const router = useRouter();
    const { actions } = useWorkspace();

    const categories = ['All', 'Portfolio', 'Business', 'Blog', 'Tool', 'E-commerce'];

    return (
        <div className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 pt-4 pb-12 w-full min-w-0 bg-[#ecfeff] dark:bg-[#02060D] text-gray-900 dark:text-white font-sans relative z-0 transition-colors duration-300">
            {/* Ambient Theme Background */}
            <div className="fixed inset-0 w-[100dvw] h-[100dvh] z-0 pointer-events-none overflow-hidden bg-[#ecfeff] dark:bg-[#02060D] transition-colors duration-300">
                <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-cyan-600/5 dark:bg-cyan-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] bg-indigo-600/2 dark:bg-indigo-600/5 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-[1800px] relative z-10 px-4 2xl:px-8">
                <div className="mb-8 2xl:mb-16 text-center animate-in fade-in slide-in-from-top-4 duration-700">
                    <h1 className="text-3xl lg:text-4xl 2xl:text-6xl 3xl:text-8xl font-black text-gray-900 dark:text-white mb-3 2xl:mb-6">
                        Start with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 italic font-serif">Templates</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm lg:text-base 2xl:text-2xl 3xl:text-3xl font-medium max-w-xl 2xl:max-w-3xl mx-auto mb-8 2xl:mb-12">
                        Choose a starting point and build exactly what you imagine with drag-and-drop.
                    </p>

                    <div className="relative max-w-2xl 2xl:max-w-4xl mx-auto group">
                        <div className="absolute inset-0 bg-blue-500/10 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        <div className="relative flex items-center">
                            <Search className="absolute left-4 2xl:left-6 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors 2xl:w-6 2xl:h-6" size={20} />
                            <input 
                                type="text"
                                placeholder="Search premium templates..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="w-full h-12 2xl:h-16 3xl:h-20 bg-cyan-50 dark:bg-white/[0.03] border border-cyan-200 dark:border-white/[0.08] rounded-2xl 2xl:rounded-3xl pl-12 2xl:pl-16 pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm 2xl:text-lg 3xl:text-xl focus:outline-none focus:border-blue-500/50 focus:bg-cyan-100 dark:focus:bg-white/[0.05] transition-all shadow-sm dark:shadow-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Categories and Actions */}
                <div className="flex items-center justify-between mb-8 2xl:mb-12 gap-2 sm:gap-4 pb-2 border-b border-gray-200 dark:border-white/5 px-1 relative">
                    {/* Desktop Categories */}
                    <div className="hidden sm:flex items-center gap-2 2xl:gap-4 overflow-x-auto no-scrollbar scroll-smooth">
                        {categories.map((cat) => (
                            <button 
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 2xl:px-8 2xl:py-3 rounded-full text-sm 2xl:text-xl font-medium transition-all whitespace-nowrap ${
                                    cat === selectedCategory ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-gray-100 dark:bg-[#2a2a2a] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#333333] hover:text-gray-900 dark:hover:text-gray-200 border border-gray-200 dark:border-[#3e3e3e]'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Filter Dropdown */}
                    <div className="sm:hidden relative">
                        <button 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-200 rounded-xl border border-gray-200 dark:border-white/10 font-bold text-[13px] sm:text-sm"
                        >
                            <Filter size={16} />
                            <span>{selectedCategory}</span>
                            <ChevronDown size={14} className={`transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isFilterOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => {
                                                setSelectedCategory(cat);
                                                setIsFilterOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                                                cat === selectedCategory ? 'bg-blue-500/10 text-blue-500' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#222]'
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <button 
                        onClick={onBack}
                        className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 2xl:px-10 2xl:py-5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white rounded-xl 2xl:rounded-2xl font-bold text-[13px] sm:text-sm 2xl:text-2xl hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(37,99,235,0.4)] transition-all active:scale-[0.98] whitespace-nowrap group shrink-0"
                    >
                        <Plus size={18} className="2xl:w-8 2xl:h-8 group-hover:rotate-90 transition-transform duration-300" />
                        <span>Start from scratch</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-10">

                    {TEMPLATES
                        .filter(t => (selectedCategory === 'All' || t.category === selectedCategory) && (t.title.toLowerCase().includes(searchValue.toLowerCase()) || t.category.toLowerCase().includes(searchValue.toLowerCase())))
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
            </div>
        </div>
    );
}
