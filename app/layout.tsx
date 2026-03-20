import { Inter } from 'next/font/google';
import AppProviders from '@/shared/providers/AppProviders';
import ServiceWorkerRegistrar from '@/shared/ui/ServiceWorkerRegistrar';
import { JsonLd } from '@/shared/ui/JsonLd';
import './globals.css';

export { metadata, viewport } from './metadata';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable} suppressHydrationWarning>
            <head>
                <JsonLd />
            </head>
            <body className="antialiased dark:bg-[#121212] bg-white dark:text-gray-100 text-gray-900 transition-colors duration-300" suppressHydrationWarning>
                <AppProviders>
                    <ServiceWorkerRegistrar />
                    {children}
                </AppProviders>
            </body>
        </html>
    );
}
