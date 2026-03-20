'use client';

import React, { useState } from 'react';
import ItemCard from '@/shared/ui/ItemCard';
import { TEMPLATES } from '@/features/workspace/templates';
import { WorkspaceViewBackground } from '@/features/home';
import TemplatesHeader from './TemplatesHeader';
import TemplatesFilter from './TemplatesFilter';
import { useProjectsStore } from '@/features/builder/store/projects-store';
import { useBuilderStore } from '@/features/builder/store/builder-store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'drjsde@gmail.com';

interface PremiumTemplatesGalleryProps {
    onBack?: () => void;
}

export default function PremiumTemplatesGallery({ onBack }: PremiumTemplatesGalleryProps) {
    const router = useRouter();
    const { data: session } = useSession();
    const { setPendingTemplate } = useBuilderStore();
    const [searchValue, setSearchValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const { templates: customTemplates } = useProjectsStore();
    const [isMounted, setIsMounted] = useState(false);

    const filteredCustomTemplates = React.useMemo(() => {
        // Everyone sees default templates. Logged-in users also see their own.
        return customTemplates.filter(t => 
            t.isDefault || (session?.user?.email && t.ownerEmail === session.user.email)
        );
    }, [customTemplates, session?.user?.email]);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const mappedCustomTemplates = filteredCustomTemplates.map(t => {
        const isOfficial = t.isDefault;
        return {
            id: t.id,
            title: t.title,
            description: t.author || (isOfficial ? 'Official Template' : 'My Saved Template'),
            image: t.thumbnail,
            category: isOfficial ? 'DEFAULT' : 'SAVED PROJECTS',
            html: t.html,
        };
    });

    const allTemplates = isMounted ? [...mappedCustomTemplates, ...TEMPLATES] : TEMPLATES;

    const filteredTemplates = allTemplates.filter(t => 
        (selectedCategory === 'All' && t.category !== 'SAVED PROJECTS' || t.category === selectedCategory) && 
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
                            description={(template as any).description || ''}
                            image={(template as any).image || (template as any).thumbnail || ''}
                            badge={template.category}
                            primaryActionText="Use Template"
                            onPrimaryAction={() => {
                                const html = (template as any).html || '';
                                setPendingTemplate(html, template.title);
                                router.push('/builder');
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
