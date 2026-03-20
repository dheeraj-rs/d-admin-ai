'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface TemplatesHeaderProps {
    searchValue: string;
    setSearchValue: (v: string) => void;
}

import FeatureHeader from '@/shared/ui/FeatureHeader';

interface TemplatesHeaderProps {
    searchValue: string;
    setSearchValue: (v: string) => void;
}

export default function TemplatesHeader({ searchValue, setSearchValue }: TemplatesHeaderProps) {
    return (
        <FeatureHeader 
            title="Start with"
            highlight="Templates"
            description="Choose a starting point and build exactly what you imagine with drag-and-drop."
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            searchPlaceholder="Search templates..."
        />
    );
}
