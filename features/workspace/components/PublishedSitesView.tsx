'use client';

import { Globe, ArrowLeft, ExternalLink, Trash2, Search } from 'lucide-react';

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

export default function PublishedSitesView({ onBack }: { onBack: () => void }) {
    return (
        <div className="flex-1 flex flex-col bg-[#212121] overflow-y-auto pb-20 scrollbar-gutter-stable">
            <div className="mx-auto w-full p-6">
                <div className="flex flex-col gap-6">

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                                <Globe size={24} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">Published Websites</h1>
                                <p className="text-gray-400 text-sm mt-0.5">Manage and monitor your live projects.</p>
                            </div>
                        </div>

                        <div className="relative group max-w-sm w-full">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input 
                                type="text"
                                placeholder="Search sites..."
                                className="w-full bg-[#1a1a1a] border border-[#2f2f2f] rounded-xl py-2 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {MOCK_SITES.map((site) => (
                            <div key={site.id} className="group bg-[#1a1a1a] rounded-2xl border border-[#2f2f2f] hover:border-blue-500/30 transition-all overflow-hidden flex flex-col">
                                <div className="aspect-video bg-[#2f2f2f] relative flex items-center justify-center group-hover:bg-[#363636] transition-colors">
                                    <Globe size={40} className="text-[#3f3f3f] group-hover:text-blue-500/20 transition-colors" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                        <a 
                                            href={site.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 hover:bg-blue-600 transition-colors"
                                        >
                                            View Live <ExternalLink size={12} />
                                        </a>
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col gap-3">
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">{site.name}</h3>
                                        <p className="text-gray-500 text-xs font-mono truncate">{site.url.replace('https://', '')}</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                        <span className="text-[11px] text-gray-500 font-medium">Published on {site.publishedAt}</span>
                                        <button className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
