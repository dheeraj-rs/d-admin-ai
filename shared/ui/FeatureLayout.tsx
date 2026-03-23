'use client';

import React, { ReactNode } from 'react';
import { WorkspaceViewBackground } from '@/features/home';

interface FeatureLayoutProps {
    children: ReactNode;
    maxWidth?: string;
    className?: string;
}

export default function FeatureLayout({ 
    children, 
    maxWidth = "max-w-[1800px]",
    className = ""
}: FeatureLayoutProps) {
    return (
        <div className={`flex-1 flex flex-col pt-4 pb-12 w-full min-w-0 bg-[var(--bg-main)] text-[var(--text-main)] font-sans relative z-0 transition-colors duration-300 ${className}`}>
            <WorkspaceViewBackground />
            <div className={`w-full ${maxWidth} mx-auto relative z-10 px-4 2xl:px-8`}>
                {children}
            </div>
        </div>
    );
}
