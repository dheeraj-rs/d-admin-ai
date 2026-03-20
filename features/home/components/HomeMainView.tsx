import React from 'react';
import HomeBackground from './HomeBackground';
import HomeHero from './HomeHero';
import HomeAICard from './HomeAICard';
import HomeTemplateGallery from './HomeTemplateGallery';
import HomeDecorativeElements from './HomeDecorativeElements';
import HomeFooter from './HomeFooter';

export default function HomeMainView() {
    return (
        <div className="dark flex-1 w-full min-h-screen text-[var(--text-main)] font-sans overflow-x-hidden overflow-y-auto relative z-0 flex flex-col transition-colors duration-300">
            <HomeBackground />
            <div className="relative z-10 flex flex-col w-full min-h-screen max-w-[1800px] xl:max-w-[1700px] 2xl:max-w-[2200px] 3xl:max-w-[2800px] mx-auto pt-20 md:pt-28 2xl:pt-40 px-4 md:px-8 lg:px-12 pb-10 2xl:pb-20">
                <HomeHero />
                <main className="flex-1 flex flex-col items-center md:flex-row md:items-center justify-center relative z-20 w-full gap-8 md:gap-12 lg:gap-16 xl:gap-20 2xl:gap-24 3xl:gap-32 my-1 2xl:my-8 overflow-visible">
                    <HomeDecorativeElements />
                    <div className="flex-1 max-w-[650px] 3xl:max-w-[850px] flex justify-end">
                        <HomeAICard />
                    </div>
                    <div className="flex-1 max-w-[650px] 3xl:max-w-[850px] flex justify-start">
                        <HomeTemplateGallery />
                    </div>
                </main>
                <HomeFooter />
            </div>
        </div>
    );
}
