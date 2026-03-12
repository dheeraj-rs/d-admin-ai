'use client';

import React from 'react';
import { LayoutTemplate, MousePointerClick, ArrowLeft, Search, Plus, ExternalLink } from 'lucide-react';

interface Template {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
}

const TEMPLATES: Template[] = [
    {
        id: 'portfolio-1',
        title: 'Modern Portfolio',
        description: 'Clean, minimalist portfolio for designers and developers.',
        category: 'Portfolio',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 'landing-1',
        title: 'SaaS Landing Page',
        description: 'High-converting landing page with feature sections and pricing.',
        category: 'Business',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 'dashboard-1',
        title: 'Admin Dashboard',
        description: 'Comprehensive dashboard with charts, tables, and analytics.',
        category: 'Tool',
        image: 'https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 'blog-1',
        title: 'Minimalist Blog',
        description: 'Focus on content with a clean, readable typography-focused blog.',
        category: 'Blog',
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop',
    }
];

interface TemplatesViewProps {
    onBack: () => void;
}

export default function TemplatesView({ onBack }: TemplatesViewProps) {
    return (
        <div className="flex-1 flex flex-col items-center justify-start p-6 w-full min-w-0 overflow-y-auto custom-scrollbar bg-[#212121]">
            <div className="w-full">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                            Start with <span className="text-blue-400 underline decoration-blue-500/30 underline-offset-8">Templates</span>
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Choose a starting point and build exactly what you imagine with drag-and-drop.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search templates..." 
                                className="bg-[#2a2a2a] border border-[#3e3e3e] rounded-xl pl-10 pr-4 py-2.5 w-full md:w-64 text-sm focus:outline-none focus:border-blue-500/50 transition-all text-gray-200 placeholder:text-gray-500"
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
                                cat === 'All' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-[#2a2a2a] text-gray-400 hover:bg-[#333333] hover:text-gray-200 border border-[#3e3e3e]'
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
                        <div className="aspect-[4/3] rounded-2xl bg-[#1a1a1a] border-2 border-dashed border-[#3e3e3e] flex flex-col items-center justify-center gap-4 transition-all hover:border-blue-500/50 hover:bg-[#202020] mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                <Plus size={24} />
                            </div>
                            <span className="text-gray-400 font-medium group-hover:text-gray-200 transition-colors">Blank Canvas</span>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-1">Start from scratch</h3>
                        <p className="text-gray-500 text-sm">Full freedom with our drag-and-drop builder.</p>
                    </div>

                    {TEMPLATES.map((template) => (
                        <div key={template.id} className="flex flex-col group cursor-pointer">
                            <div className="aspect-[4/3] rounded-2xl bg-[#1a1a1a] border border-[#3e3e3e] overflow-hidden relative mb-4">
                                <img 
                                    src={template.image} 
                                    alt={template.title} 
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 shadow-xl shadow-blue-600/20 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        Use Template
                                        <ExternalLink size={14} />
                                    </button>
                                </div>
                                <div className="absolute top-4 left-4">
                                    <span className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded-md">
                                        {template.category}
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">{template.title}</h3>
                            <p className="text-gray-500 text-sm line-clamp-2">{template.description}</p>
                        </div>
                    ))}
                </div>

                {/* Drag and Drop Feature Highlight */}
                <div className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-white/5 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                            <MousePointerClick size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Visual Builder</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            Don't want to use AI? No problem. Use our fast, intuitive drag-and-drop builder to turn your ideas into reality in minutes.
                        </p>
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                                <span className="text-white font-bold text-xl">100+</span>
                                <span className="text-gray-500 text-sm uppercase tracking-wider">UI Sections</span>
                            </div>
                            <div className="h-8 w-px bg-white/10" />
                            <div className="flex flex-col">
                                <span className="text-white font-bold text-xl">0</span>
                                <span className="text-gray-500 text-sm uppercase tracking-wider">Coding Required</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full aspect-video rounded-2xl bg-black/40 border border-white/5 overflow-hidden flex items-center justify-center">
                        <div className="text-gray-600 flex flex-col items-center gap-4 italic">
                            <LayoutTemplate size={48} className="opacity-20 translate-y-2 animate-bounce transition-all duration-1000" />
                            <span className="text-sm">Interactive Builder Preview</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
