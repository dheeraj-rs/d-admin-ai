'use client';

import dynamic from 'next/dynamic';
import { useWorkspace } from '../hooks/useWorkspace';
import { Sidebar } from '@/features/navigation';
import TopBar from './TopBar';
import { ChatHistory, ChatInputArea } from '@/features/chat';
import { RightPanel, WorkbenchMock } from '@/features/editor';
import ChatInitialView from './ChatInitialView';

export default function ChatWorkspace() {
    const { state, actions } = useWorkspace();
    const { viewState, activeTab, inputValue } = state;

    return (
        <div className="flex-1 flex overflow-hidden relative h-full bg-white dark:bg-[#02060D] text-gray-900 dark:text-white font-sans z-0 transition-colors duration-300">
            {/* Ambient Theme Background for Chat Builder */}
            {viewState !== 'fullscreen-editor' && (
                <div className="fixed inset-0 w-[100dvw] h-[100dvh] z-0 pointer-events-none overflow-hidden bg-white dark:bg-[#02060D] transition-colors duration-300">
                    <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-cyan-600/5 dark:bg-cyan-600/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[120px]" />
                    <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] bg-indigo-600/2 dark:bg-indigo-600/5 rounded-full blur-[100px]" />
                </div>
            )}
            
            {viewState === 'fullscreen-editor' ? (
                <>
                    <div className={`w-full lg:w-[450px] shrink-0 border-r border-gray-200 dark:border-[#2f2f2f] bg-gray-50 dark:bg-[#212121] flex flex-col relative transition-colors duration-300 ${activeTab === 'chat' ? 'flex' : 'hidden lg:flex'}`}>
                        <div className="flex-1 overflow-y-auto w-full pt-6 scrollbar-gutter-stable">
                            <div className="px-4 pb-40 flex flex-col max-w-3xl mx-auto w-full">
                                <ChatHistory viewState={viewState} setViewState={actions.setViewState} setActiveTab={actions.setActiveTab} />
                            </div>
                        </div>
                        <ChatInputArea inputValue={inputValue} setInputValue={actions.setInputValue} handleSubmit={actions.handleSubmit} isSidebar={true} />
                    </div>
                    <div className={`flex-1 bg-white dark:bg-[#1e1e1e] relative flex flex-col transition-colors duration-300 ${activeTab === 'chat' ? 'hidden lg:flex' : 'flex'}`}>
                        {activeTab === 'code' ? <WorkbenchMock /> : <RightPanel />}
                    </div>
                </>
            ) : viewState === 'initial' ? (
                <ChatInitialView
                    inputValue={inputValue}
                    setInputValue={actions.setInputValue}
                    handleSubmit={actions.handleSubmit}
                    setViewState={actions.setViewState}
                />
            ) : (
                <>
                    <div className="flex-1 overflow-y-auto w-full pt-20 scrollbar-gutter-stable relative z-10">
                        <div className="px-4 pb-40 flex flex-col gap-8 max-w-3xl mx-auto w-full">
                            <ChatHistory viewState={viewState} setViewState={actions.setViewState} setActiveTab={actions.setActiveTab} />
                        </div>
                    </div>
                    <div className="relative z-20 w-full shrink-0">
                        <ChatInputArea inputValue={inputValue} setInputValue={actions.setInputValue} handleSubmit={actions.handleSubmit} isSidebar={false} />
                    </div>
                </>
            )}
        </div>
    );
}
