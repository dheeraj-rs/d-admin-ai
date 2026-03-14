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
        <div className="flex-1 flex overflow-hidden relative h-full">
            {viewState === 'fullscreen-editor' ? (
                <>
                    <div className={`w-full lg:w-[450px] shrink-0 border-r border-[#2f2f2f] bg-[#212121] flex flex-col relative ${activeTab === 'chat' ? 'flex' : 'hidden lg:flex'}`}>
                        <div className="flex-1 overflow-y-auto w-full pt-6 scrollbar-gutter-stable">
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
                <ChatInitialView
                    inputValue={inputValue}
                    setInputValue={actions.setInputValue}
                    handleSubmit={actions.handleSubmit}
                    setViewState={actions.setViewState}
                />
            ) : (
                <>
                    <div className="flex-1 overflow-y-auto w-full pt-20 scrollbar-gutter-stable">
                        <div className="px-4 pb-40 flex flex-col gap-8 max-w-3xl mx-auto w-full">
                            <ChatHistory viewState={viewState} setViewState={actions.setViewState} setActiveTab={actions.setActiveTab} />
                        </div>
                    </div>
                    <ChatInputArea inputValue={inputValue} setInputValue={actions.setInputValue} handleSubmit={actions.handleSubmit} isSidebar={false} />
                </>
            )}
        </div>
    );
}
