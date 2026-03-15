'use client';

import { useRouter } from 'next/navigation';
import { TemplatesView } from '@/features/workspace';

export default function TemplatesPage() {
    const router = useRouter();

    return (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
            <TemplatesView onBack={() => router.push('/')} />
        </div>
    );
}
