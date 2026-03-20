"use client";

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from './ThemeProvider';
import SplashLoader from '@/features/navigation/components/SplashLoader';

interface AppProvidersProps {
  children: ReactNode;
}


export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <SessionProvider>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <SplashLoader>
                {children}
            </SplashLoader>
        </ThemeProvider>
    </SessionProvider>
  );
}
