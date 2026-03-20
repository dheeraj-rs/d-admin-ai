"use client";
 
import React from 'react';
import Image from 'next/image';
 
export default function HomeBackground() {
    return (
        <div className="fixed inset-0 w-[100dvw] h-[100dvh] z-0 pointer-events-none overflow-hidden bg-[#0A0A0B] transition-colors duration-300 font-sans">
            {/* Dark background (Used for both themes for visual consistency and zero-flicker reload) */}
            <div className="absolute inset-0 opacity-100">
                <Image
                    src="/home_hero_bg.png"
                    alt="Hero Background"
                    fill
                    priority={true}
                    quality={100}
                    className="object-cover object-center"
                />
            </div>
            
            {/* Subtle overlay to pull everything together */}
            <div className="absolute inset-0 bg-black/10 dark:bg-black/20 pointer-events-none" />
        </div>
    );
}
