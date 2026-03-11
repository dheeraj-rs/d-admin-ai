import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
    metadataBase: new URL('https://dheerajrs.com'),
    title: {
        default: 'd-admin | AI Website Builder & Code Vibe Generator',
        template: '%s | d-admin-ai',
    },
    description:
        'The ultimate AI-powered website builder. Generate, host, and edit vibe code instantly using AI models like Gemini, Claude, and ChatGPT.',
    keywords: ['ai', 'website builder', 'builder', 'vibe code', 'ai chat', 'frontend generator', 'no-code', 'd-admin'],
    authors: [{ name: 'd-admin' }],
    creator: 'd-admin',
    publisher: 'd-admin',
    alternates: { canonical: 'https://dheerajrs.com' },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://dheerajrs.com',
        title: 'd-admin | AI Website Builder & Code Vibe Generator',
        description: 'Generate, host, and edit vibe code instantly using AI models like Gemini, Claude, and ChatGPT.',
        siteName: 'd-admin',
        images: [{ url: '/icon', width: 512, height: 512, alt: 'd-admin-ai Builder Logo' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'd-admin | AI Website Builder & Code Vibe Generator',
        description: 'Generate, host, and edit vibe code instantly using AI.',
        creator: '@dadmin_ai',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    appleWebApp: { capable: true, statusBarStyle: 'default', title: 'd-admin' },
    formatDetection: { telephone: false },
};

export const viewport: Viewport = {
    themeColor: '#212121',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};
