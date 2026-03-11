import { Inter } from 'next/font/google';
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
        <html lang="en" className={inter.variable}>
            <head>
                <JsonLd />
            </head>
            <body className="antialiased">
                <ServiceWorkerRegistrar />
                {children}
            </body>
        </html>
    );
}
