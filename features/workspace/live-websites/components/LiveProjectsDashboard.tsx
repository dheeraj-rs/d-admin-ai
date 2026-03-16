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
        <div className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 pt-4 pb-12 w-full min-w-0 bg-[#ecfeff] dark:bg-[#02060D] text-gray-900 dark:text-white font-sans relative z-0 transition-colors duration-300">
            <WorkspaceViewBackground />

            <div className="w-full max-w-[1800px] relative z-10 px-4 2xl:px-8">
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-8 2xl:mb-16">
                    <button 
                        onClick={handleBack}
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hover:shadow-md active:scale-95 group shrink-0"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    
                    <div className="flex-1 overflow-hidden">
                        <h1 className="text-xl md:text-2xl 2xl:text-4xl font-black text-gray-900 dark:text-white truncate">
                            Published <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 italic font-serif">Websites</span>
                        </h1>
                    </div>

                    <div className="relative max-w-xs md:max-w-md w-full group hidden sm:block">
                        <div className="absolute inset-0 bg-green-500/10 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        <div className="relative flex items-center">
                            <Search className="absolute left-4 text-gray-400 dark:text-gray-500 group-focus-within:text-green-500 dark:group-focus-within:text-green-400 transition-colors" size={18} />
                            <input 
                                type="text"
                                placeholder="Search live sites..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="w-full h-10 2xl:h-14 bg-white/60 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-xl pl-10 pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm 2xl:text-lg focus:outline-none focus:border-green-500/50 focus:bg-white dark:focus:bg-white/[0.05] transition-all shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Subtitle / Description */}
                <p className="text-gray-500 dark:text-gray-400 text-sm 2xl:text-xl font-medium mb-8 2xl:mb-12 max-w-2xl">
                    Manage and monitor your live projects. You can view, share, or delete your published sites instantly from this dashboard.
                </p>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-10">
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
