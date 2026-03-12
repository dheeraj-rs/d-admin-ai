'use client';

import { useWorkspace } from '@/features/workspace/hooks/useWorkspace';
import { Sidebar } from '@/features/navigation';
import dynamic from 'next/dynamic';

const AuthModal = dynamic(() => import('@/features/auth/components/AuthModal'), { ssr: false });
const SettingsModal = dynamic(() => import('@/features/settings/components/SettingsModal'), { ssr: false });
const HelpModal = dynamic(() => import('@/features/help/components/HelpModal'), { ssr: false });

export default function WorkspaceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { state, actions } = useWorkspace();
    const { showLeftSidebar, isAuthOpen, isSettingsOpen, isHelpOpen, viewState } = state;

    return (
        <div className="h-[100dvh] w-full bg-[#212121] text-gray-200 flex font-sans selection:bg-blue-500/30 overflow-hidden relative">
            <AuthModal isOpen={isAuthOpen} onClose={() => actions.setIsAuthOpen(false)} />
            <SettingsModal isOpen={isSettingsOpen} onClose={() => actions.setIsSettingsOpen(false)} />
            <HelpModal isOpen={isHelpOpen} onClose={() => actions.setIsHelpOpen(false)} />

            {showLeftSidebar && (
                <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => actions.setShowLeftSidebar(false)} />
            )}

            <div className={`fixed lg:relative z-[60] h-full transform transition-transform duration-300 ${showLeftSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <Sidebar
                    isOpen={showLeftSidebar}
                    toggleSidebar={() => actions.setShowLeftSidebar(!showLeftSidebar)}
                    onNewChat={actions.handleNewChat}
                    onOpenSettings={() => actions.setIsSettingsOpen(true)}
                />
            </div>

            <div className="flex-1 flex flex-col relative overflow-hidden w-full scrollbar-gutter-stable">
                {children}
            </div>
        </div>
    );
}
