'use client';

import dynamic from 'next/dynamic';
import { useWorkspace } from '../hooks/useWorkspace';
import { Sidebar } from '@/features/navigation';
import TopBar from './TopBar';
import { ChatHistory, ChatInputArea } from '@/features/chat';
import { RightPanel, WorkbenchMock } from '@/features/editor';
import InitialInputView from './InitialInputView';

const AuthModal = dynamic(() => import('@/features/auth/components/AuthModal'), { ssr: false });
const SettingsModal = dynamic(() => import('@/features/settings/components/SettingsModal'), { ssr: false });
const HelpModal = dynamic(() => import('@/features/help/components/HelpModal'), { ssr: false });


export default function Workspace() {
    const { state, actions } = useWorkspace();
    const { viewState, activeTab, showLeftSidebar, inputValue, isAuthOpen, isSettingsOpen, isHelpOpen, isAgentOpen, isShareOpen, selectedAgent } = state;

    return (
        <div className="h-[100dvh] w-full bg-[#212121] text-gray-200 flex font-sans selection:bg-blue-500/30 overflow-hidden relative">
            <AuthModal isOpen={isAuthOpen} onClose={() => actions.setIsAuthOpen(false)} />
            <SettingsModal isOpen={isSettingsOpen} onClose={() => actions.setIsSettingsOpen(false)} />
            <HelpModal isOpen={isHelpOpen} onClose={() => actions.setIsHelpOpen(false)} />

            {showLeftSidebar && (
                <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => actions.setShowLeftSidebar(false)} />
            )}

            <div className={`fixed lg:relative z-50 h-full transform transition-transform duration-300 ${showLeftSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <Sidebar
                    isOpen={showLeftSidebar}
                    toggleSidebar={() => actions.setShowLeftSidebar(!showLeftSidebar)}
                    onNewChat={actions.handleNewChat}
                    onOpenSettings={() => actions.setIsSettingsOpen(true)}
                />
            </div>

            <div className="flex-1 flex flex-col relative overflow-hidden w-full">
                <TopBar
                    viewState={viewState}
                    setViewState={actions.setViewState}
                    activeTab={activeTab}
                    setActiveTab={actions.setActiveTab}
                    setShowLeftSidebar={actions.setShowLeftSidebar}
                    isAgentOpen={isAgentOpen}
                    setIsAgentOpen={actions.setIsAgentOpen}
                    isShareOpen={isShareOpen}
                    setIsShareOpen={actions.setIsShareOpen}
                    setIsHelpOpen={actions.setIsHelpOpen}
                    selectedAgent={selectedAgent}
                    setSelectedAgent={actions.setSelectedAgent}
                />

                <div className="flex-1 flex overflow-hidden relative">
                    {viewState === 'fullscreen-editor' ? (
                        <>
                            <div className={`w-full lg:w-[450px] shrink-0 border-r border-[#2f2f2f] bg-[#212121] flex flex-col relative ${activeTab === 'chat' ? 'flex' : 'hidden lg:flex'}`}>
                                <div className="flex-1 overflow-y-auto w-full pt-6">
                                    <div className="px-4 pb-40 flex flex-col max-w-3xl mx-auto w-full">
                                        <ChatHistory viewState={viewState} setViewState={actions.setViewState} setActiveTab={actions.setActiveTab} />
                                    </div>
                                </div>
                                <ChatInputArea inputValue={inputValue} setInputValue={actions.setInputValue} handleSubmit={actions.handleSubmit} isSidebar={true} />
                            </div>
                            <div className={`flex-1 bg-[#1e1e1e] relative flex flex-col ${activeTab === 'chat' ? 'hidden lg:flex' : 'flex'}`}>
                                {activeTab === 'code' ? <WorkbenchMock /> : <RightPanel />}
                            </div>
                        </>
                    ) : viewState === 'initial' ? (
                        <InitialInputView
                            inputValue={inputValue}
                            setInputValue={actions.setInputValue}
                            handleSubmit={actions.handleSubmit}
                            setViewState={actions.setViewState}
                        />
                    ) : (
                        <>
                            <div className="flex-1 overflow-y-auto w-full pt-20">
                                <div className="px-4 pb-40 flex flex-col gap-8 max-w-3xl mx-auto w-full">
                                    <ChatHistory viewState={viewState} setViewState={actions.setViewState} setActiveTab={actions.setActiveTab} />
                                </div>
                            </div>
                            <ChatInputArea inputValue={inputValue} setInputValue={actions.setInputValue} handleSubmit={actions.handleSubmit} isSidebar={false} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
