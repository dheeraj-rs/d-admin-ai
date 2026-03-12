'use client';

import { useRouter } from 'next/navigation';
import PublishedSitesView from '@/features/workspace/components/PublishedSitesView';

export default function PublishedSitesPage() {
    const router = useRouter();

    return (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
            <PublishedSitesView onBack={() => router.push('/')} />
        </div>
    );
}
