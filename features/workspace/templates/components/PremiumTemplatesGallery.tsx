'use client';

import React, { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import ItemCard from '@/shared/ui/ItemCard';
import { TEMPLATES } from '@/features/workspace/templates';
import { WorkspaceViewBackground } from '@/features/home';
import TemplatesHeader from './TemplatesHeader';
import TemplatesFilter from './TemplatesFilter';

interface PremiumTemplatesGalleryProps {
    onBack?: () => void;
}

export default function PremiumTemplatesGallery({ onBack }: PremiumTemplatesGalleryProps) {
    const [searchValue, setSearchValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filteredTemplates = TEMPLATES.filter(t => 
        (selectedCategory === 'All' || t.category === selectedCategory) && 
        (t.title.toLowerCase().includes(searchValue.toLowerCase()) || 
         t.category.toLowerCase().includes(searchValue.toLowerCase()))
    );

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            window.history.back();
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 pt-4 pb-12 w-full min-w-0 bg-[#ecfeff] dark:bg-[#02060D] text-gray-900 dark:text-white font-sans relative z-0 transition-colors duration-300">
            <WorkspaceViewBackground />

            <div className="w-full max-w-[1800px] relative z-10 px-4 2xl:px-8">
                {/* Header with Back Button */}
                <div className="flex items-center gap-4 mb-6 2xl:mb-12">
                    <button 
                        onClick={handleBack}
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hover:shadow-md active:scale-95 group shrink-0"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <TemplatesHeader searchValue={searchValue} setSearchValue={setSearchValue} />
                </div>

                <TemplatesFilter 
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    isFilterOpen={isFilterOpen}
                    setIsFilterOpen={setIsFilterOpen}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-10 mt-8">
                    {filteredTemplates.map((template) => (
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
