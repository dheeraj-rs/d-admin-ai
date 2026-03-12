import React, { useState } from 'react';
import { Globe, Trash2 } from 'lucide-react';
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
        <div className="flex-1 flex flex-col items-center justify-start p-6 w-full min-w-0 overflow-y-auto custom-scrollbar bg-[#212121] scrollbar-gutter-stable">
            <div className="w-full max-w-7xl">
                <PageHeader 
                    title="Published"
                    highlight="Websites"
                    description="Manage and monitor your live projects. You can view, share, or delete your published sites."
                    icon={Globe}
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    searchPlaceholder="Search sites..."
                    onBack={() => router.push('/')}
                    onToggleSidebar={() => actions.setShowLeftSidebar(true)}
                />

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
