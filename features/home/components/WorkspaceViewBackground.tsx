'use client';

import React from 'react';

export default function WorkspaceViewBackground() {
    return (
        <div className="fixed inset-0 w-[100dvw] h-[100dvh] z-0 pointer-events-none overflow-hidden bg-[#ecfeff] dark:bg-[#02060D] transition-colors duration-300">
            <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-cyan-600/5 dark:bg-cyan-600/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[120px]" />
            <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] bg-indigo-600/2 dark:bg-indigo-600/5 rounded-full blur-[100px]" />
        </div>
    );
}
