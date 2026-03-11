import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'd-admin-ai',
        short_name: 'd-admin',
        description: 'Next generation AI-powered website builder',
        start_url: '/',
        display: 'standalone',
        background_color: '#212121',
        theme_color: '#212121',
        icons: [
            {
                src: '/icon',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/apple-icon',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable',
            }
        ],
    };
}
