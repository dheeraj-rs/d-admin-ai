'use client';

import React, { useState, useEffect } from 'react';
import HomeBackground from './HomeBackground';
import HomeHero from './HomeHero';
import HomeAICard from './HomeAICard';
import HomeTemplateGallery from './HomeTemplateGallery';
import HomeDecorativeElements from './HomeDecorativeElements';
import HomeFooter from './HomeFooter';

export default function HomeView() {
    const [typedText, setTypedText] = useState('');
    const fullText = "A sleek, sustainable energy e-commerce site with green accents and modular navigation....";

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                setTypedText(prev => prev + fullText.charAt(i));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 40);
        return () => clearInterval(typingInterval);
    }, []);

    return (
        <div className="flex-1 w-full min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] font-sans overflow-x-hidden overflow-y-auto relative z-0 flex flex-col transition-colors duration-300">
            <HomeBackground />
            <div className="relative z-10 flex flex-col w-full min-h-screen max-w-[1800px] xl:max-w-[1700px] 2xl:max-w-[2200px] 3xl:max-w-[2800px] mx-auto pt-20 md:pt-28 2xl:pt-40 px-4 md:px-8 lg:px-12 pb-10 2xl:pb-20">
                <HomeHero />
                <main className="flex-1 flex flex-col items-center md:flex-row md:items-center justify-center md:justify-between relative z-20 w-full gap-8 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-24 3xl:gap-40 my-1 2xl:my-8">
                    <HomeDecorativeElements />
                    <HomeAICard typedText={typedText} />
                    <HomeTemplateGallery />
                </main>
                <HomeFooter />
            </div>
        </div>
    );
}