'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistrar() {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(console.error);
        }
    }, []);

    return null;
}
