'use client';

import React, { useState } from 'react';
import ItemCard from '@/shared/ui/ItemCard';
import { TEMPLATES } from '../../constants/templates';
import TemplatesHeader from './TemplatesHeader';
import TemplatesFilter from './TemplatesFilter';
import WorkspaceViewBackground from '../shared/WorkspaceViewBackground';

interface TemplatesViewProps {
    onBack?: () => void;
}

export default function TemplatesView({ onBack }: TemplatesViewProps) {
    const [searchValue, setSearchValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filteredTemplates = TEMPLATES.filter(t => 
        (selectedCategory === 'All' || t.category === selectedCategory) && 
        (t.title.toLowerCase().includes(searchValue.toLowerCase()) || 
         t.category.toLowerCase().includes(searchValue.toLowerCase()))
    );

    return (
        <div className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 pt-4 pb-12 w-full min-w-0 bg-[#ecfeff] dark:bg-[#02060D] text-gray-900 dark:text-white font-sans relative z-0 transition-colors duration-300">
            <WorkspaceViewBackground />

            <div className="w-full max-w-[1800px] relative z-10 px-4 2xl:px-8">
                <TemplatesHeader searchValue={searchValue} setSearchValue={setSearchValue} />

                <TemplatesFilter 
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    isFilterOpen={isFilterOpen}
                    setIsFilterOpen={setIsFilterOpen}
                    onBack={onBack}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-10">
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
