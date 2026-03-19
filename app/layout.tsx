import { Inter } from 'next/font/google';
import ServiceWorkerRegistrar from '@/shared/ui/ServiceWorkerRegistrar';
import { JsonLd } from '@/shared/ui/JsonLd';
import { ThemeProvider } from '@/shared/providers/ThemeProvider';
import { AuthProvider } from '@/shared/providers/AuthProvider';
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
                <AuthProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ServiceWorkerRegistrar />
                    {children}
                </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
