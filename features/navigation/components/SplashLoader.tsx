"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useBuilderStore } from '@/features/builder/store/builder-store';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashLoaderProps {
    children: React.ReactNode;
}

export default function SplashLoader({ children }: SplashLoaderProps) {
    const isHydratedFromStore = useBuilderStore((state) => state.isHydrated);
    const [mounted, setMounted] = useState(false);
    const [timeoutReached, setTimeoutReached] = useState(false);
    const { theme, resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
        
        // Safety timeout to ensure splash screen is removed even if hydration hangs
        const timer = setTimeout(() => {
            setTimeoutReached(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    // Show splash if not mounted yet (SSR) OR if not hydrated AND timeout hasn't reached
    const showSplash = !mounted || (!isHydratedFromStore && !timeoutReached);

    const renderOrbs = (
        <div className="d-splash-decoration">
            <div className="d-splash-orb d-splash-orb-1" />
            <div className="d-splash-orb d-splash-orb-2" />
        </div>
    );

    return (
        <>
            <AnimatePresence mode="wait">
                {showSplash && (
                    <motion.div 
                        key="splash"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="d-splash-root"
                    >
                        {renderOrbs}

                        <div className="d-splash-content">
                            <motion.div 
                                className="d-splash-logo-box"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <Image
                                    src="/d-admin-ai.png"
                                    alt="Logo"
                                    width={64}
                                    height={64}
                                    priority
                                    className="rounded-xl"
                                />
                            </motion.div>

                            <div className="text-center">
                                <h1 className="d-splash-title pr-4 leading-tight">
                                    D-Admin-Ai 
                                    <span className="text-white italic ml-2 bg-indigo-600 px-2 py-0.5 rounded text-xl" style={{ WebkitTextFillColor: 'white' }}>
                                        v3
                                    </span>
                                </h1>
                                <p className="text-[12px] uppercase tracking-[6px] text-gray-400 dark:text-gray-500 mt-4 font-black">
                                    Premium AI Builder
                                </p>
                            </div>

                            {/* Premium Progress Bar */}
                            <div className="w-[280px] h-[4px] bg-gray-200 dark:bg-white/10 rounded-full relative overflow-hidden mt-12 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                                <motion.div 
                                    className="absolute top-0 left-0 h-full w-[140px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-[0_0_20px_rgba(99,102,241,0.6)]"
                                    initial={{ x: "-150%" }}
                                    animate={{ x: "250%" }}
                                    transition={{ 
                                        duration: 1.8, 
                                        repeat: Infinity, 
                                        ease: "easeInOut",
                                        repeatDelay: 0.2
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {!showSplash && mounted && children}
        </>
    );
}
