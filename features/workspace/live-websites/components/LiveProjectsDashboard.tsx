'use client';

import React, { useState } from 'react';
import { Globe, Trash2, Search, ArrowLeft } from 'lucide-react';
import ItemCard from '@/shared/ui/ItemCard';
import { WorkspaceViewBackground } from '@/features/home';

interface PublishedSite {
    id: string;
    url: string;
    name: string;
    publishedAt: string;
}

const MOCK_SITES: PublishedSite[] = [
    {
        id: '1',
        name: 'Personal Portfolio',
        url: 'https://portfolio-view.vercel.app',
        publishedAt: '2024-03-12',
    },
    {
        id: '2',
        name: 'Saas Landing Page',
        url: 'https://saas-demo.vercel.app',
        publishedAt: '2024-03-10',
    }
];

import FeatureLayout from '@/shared/ui/FeatureLayout';
import FeatureHeader from '@/shared/ui/FeatureHeader';

export default function LiveProjectsDashboard({ onBack }: { onBack?: () => void }) {
    const [searchValue, setSearchValue] = useState('');

    const filteredSites = MOCK_SITES.filter(site => 
        site.name.toLowerCase().includes(searchValue.toLowerCase()) || 
        site.url.toLowerCase().includes(searchValue.toLowerCase())
    );

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            window.history.back();
        }
    };

    return (
        <FeatureLayout>
            <FeatureHeader 
                title="Published"
                highlight="Websites"
                description="Manage and monitor your live projects. You can view, share, or delete your published sites instantly from this dashboard."
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                searchPlaceholder="Search live sites..."
                gradientFrom="from-green-500"
                gradientTo="to-emerald-500"
                darkGradientFrom="dark:from-green-400"
                darkGradientTo="dark:to-emerald-400"
                accentColor="green"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-10 mt-8">
                {filteredSites.map((site) => (
                    <ItemCard
                        key={site.id}
                        title={site.name}
                        description={site.url.replace('https://', '')}
                        icon={Globe}
                        badge="Live"
                        metaInfo={`Published on ${site.publishedAt}`}
                        primaryActionText="View Live"
                        onPrimaryAction={() => window.open(site.url, '_blank')}
                        secondaryAction={
                            <button className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                                <Trash2 size={16} />
                            </button>
                        }
                    />
                ))}
            </div>
        </FeatureLayout>
    );
}
