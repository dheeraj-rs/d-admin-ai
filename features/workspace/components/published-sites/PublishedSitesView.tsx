'use client';

import React, { useState } from 'react';
import { Globe, Trash2, Search } from 'lucide-react';
import ItemCard from '@/shared/ui/ItemCard';
import WorkspaceViewBackground from '../shared/WorkspaceViewBackground';

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

export default function PublishedSitesView({ onBack }: { onBack?: () => void }) {
    const [searchValue, setSearchValue] = useState('');

    const filteredSites = MOCK_SITES.filter(site => 
        site.name.toLowerCase().includes(searchValue.toLowerCase()) || 
        site.url.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 pt-4 pb-12 w-full min-w-0 bg-[#ecfeff] dark:bg-[#02060D] text-gray-900 dark:text-white font-sans relative z-0 transition-colors duration-300">
            <WorkspaceViewBackground />

            <div className="w-full max-w-[1800px] relative z-10 px-4 2xl:px-8">
                <div className="mb-8 2xl:mb-16 text-center animate-in fade-in slide-in-from-top-4 duration-700">
                    <h1 className="text-3xl lg:text-4xl 2xl:text-6xl 3xl:text-8xl font-black text-gray-900 dark:text-white mb-3 2xl:mb-6">
                        Published <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 italic font-serif">Websites</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm lg:text-base 2xl:text-2xl 3xl:text-3xl font-medium max-w-xl 2xl:max-w-3xl mx-auto mb-8 2xl:mb-12">
                        Manage and monitor your live projects. You can view, share, or delete your published sites.
                    </p>

                    <div className="relative max-w-2xl 2xl:max-w-4xl mx-auto group">
                        <div className="absolute inset-0 bg-green-500/10 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        <div className="relative flex items-center">
                            <Search className="absolute left-4 2xl:left-6 text-gray-400 dark:text-gray-500 group-focus-within:text-green-500 dark:group-focus-within:text-green-400 transition-colors 2xl:w-6 2xl:h-6" size={20} />
                            <input 
                                type="text"
                                placeholder="Filter your live sites..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="w-full h-12 2xl:h-16 3xl:h-20 bg-cyan-50 dark:bg-white/[0.03] border border-cyan-200 dark:border-white/[0.08] rounded-2xl 2xl:rounded-3xl pl-12 2xl:pl-16 pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm 2xl:text-lg 3xl:text-xl focus:outline-none focus:border-green-500/50 focus:bg-cyan-100 dark:focus:bg-white/[0.05] transition-all shadow-sm dark:shadow-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </div>
        </div>
    );
}
