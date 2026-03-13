import React, { useState } from 'react';
import { Globe, Trash2, Plus, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useWorkspace } from '../hooks/useWorkspace';
import PageHeader from '@/shared/ui/PageHeader';
import ItemCard from '@/shared/ui/ItemCard';

interface PublishedSite {
    id: string;
    url: string;
    name: string;
    publishedAt: string;
    thumbnail?: string;
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
    const router = useRouter();
    const { actions } = useWorkspace();

    return (
        <div className="flex-1 flex flex-col items-center justify-start px-6 pt-4 pb-12 w-full min-w-0">
            <div className="w-full max-w-7xl">
                <div className="mb-8 text-center animate-in fade-in slide-in-from-top-4 duration-700">
                    <h1 className="text-3xl lg:text-4xl font-black text-white mb-3">
                        Published <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400 italic font-serif">Websites</span>
                    </h1>
                    <p className="text-gray-400 text-sm lg:text-base font-medium max-w-xl mx-auto mb-8">
                        Manage and monitor your live projects. You can view, share, or delete your published sites.
                    </p>

                    <div className="relative max-w-2xl mx-auto group">
                        <div className="absolute inset-0 bg-green-500/10 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        <div className="relative flex items-center">
                            <Search className="absolute left-4 text-gray-500 group-focus-within:text-green-400 transition-colors" size={20} />
                            <input 
                                type="text"
                                placeholder="Filter your live sites..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="w-full h-12 bg-white/[0.03] border border-white/[0.08] rounded-2xl pl-12 pr-4 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-green-500/50 focus:bg-white/[0.05] transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_SITES
                        .filter(site => site.name.toLowerCase().includes(searchValue.toLowerCase()) || site.url.toLowerCase().includes(searchValue.toLowerCase()))
                        .map((site) => (
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
