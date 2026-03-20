'use client';

import { useWorkspace } from '@/features/workspace';
import { Sidebar } from '@/features/navigation';
import { TopBar } from '@/features/workspace';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useProjectsStore } from '@/features/builder/store/projects-store';
import { useSession } from 'next-auth/react';

const AuthModal = dynamic(() => import('@/features/auth/components/AuthModal'), { ssr: false });
const SettingsModal = dynamic(() => import('@/features/settings/components/SettingsModal'), { ssr: false });
const HelpModal = dynamic(() => import('@/features/help/components/HelpModal'), { ssr: false });

export default function WorkspaceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { state, actions } = useWorkspace();
    const pathname = usePathname();
    const { data: session } = useSession();
    const { initializeStore } = useProjectsStore();
    const isHome = pathname === '/';
    const isBuilder = pathname === '/builder';
    const { showLeftSidebar, isAuthOpen, isSettingsOpen, isHelpOpen, viewState } = state;

    useEffect(() => {
        initializeStore();
    }, [initializeStore, session]);

    if (isBuilder) {
        return (
            <div className="h-[100dvh] w-full flex overflow-hidden">
                <AuthModal isOpen={isAuthOpen} onClose={() => actions.setIsAuthOpen(false)} />
                <SettingsModal isOpen={isSettingsOpen} onClose={() => actions.setIsSettingsOpen(false)} />
                <HelpModal isOpen={isHelpOpen} onClose={() => actions.setIsHelpOpen(false)} />
                {showLeftSidebar && (
                    <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => actions.setShowLeftSidebar(false)} />
                )}
                <div className={`fixed lg:relative z-[60] h-full transform transition-transform duration-300 ${showLeftSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                    <Sidebar />
                </div>
                <div className="flex-1 overflow-hidden">
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div className="h-[100dvh] w-full bg-[#ecfeff] dark:bg-[#02060D] text-gray-900 dark:text-gray-200 flex font-sans selection:bg-cyan-500/30 overflow-hidden relative transition-colors duration-300">
            <AuthModal isOpen={isAuthOpen} onClose={() => actions.setIsAuthOpen(false)} />
            <SettingsModal isOpen={isSettingsOpen} onClose={() => actions.setIsSettingsOpen(false)} />
            <HelpModal isOpen={isHelpOpen} onClose={() => actions.setIsHelpOpen(false)} />

            {showLeftSidebar && (
                <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => actions.setShowLeftSidebar(false)} />
            )}

            <div className={`fixed lg:relative z-[60] h-full transform transition-transform duration-300 ${showLeftSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col relative overflow-hidden w-full">
                <div className={`${isHome ? 'absolute top-0 left-0 right-0' : ''} z-50`}>
                    <TopBar />
                </div>
                
                {isHome ? (
                    <div className="flex-1 relative overflow-auto w-full h-full">
                        {children}
                    </div>
                ) : (
                    <>
                        {viewState === 'fullscreen-editor' && (
                            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                                <div className="absolute top-[-10%] left-[-20%] w-[80%] h-[300px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
                                <div className="absolute top-[20%] right-[-20%] w-[60%] h-[200px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                                <div className="absolute bottom-[-10%] left-[30%] w-[50%] h-[250px] bg-cyan-600/10 rounded-full blur-[110px] animate-pulse" style={{ animationDelay: '2s' }} />
                            </div>
                        )}
                        <div className="flex-1 relative overflow-auto z-10">
                            {children}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
