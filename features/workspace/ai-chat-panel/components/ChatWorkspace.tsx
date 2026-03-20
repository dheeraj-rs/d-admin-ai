'use client';

import { useWorkspace } from '@/features/workspace';
import { ChatHistory, ChatInputArea } from '@/features/workspace/ai-chat-panel';
import { WorkbenchMock } from '@/features/workspace/code-editor';
import { WorkspaceViewBackground } from '@/features/home';
import AIChatLandingPage from './AIChatLandingPage';

export default function ChatWorkspace() {
    const { state, actions } = useWorkspace();
    const { viewState, activeTab, inputValue } = state;
    return (
        <div className="flex-1 flex overflow-hidden relative h-full bg-[#ecfeff] dark:bg-[#02060D] text-gray-900 dark:text-white font-sans z-0 transition-colors duration-300">
            {viewState !== 'fullscreen-editor' && (
                <WorkspaceViewBackground />
            )}
            
            {viewState === 'fullscreen-editor' ? (
                <>
                    <div className={`w-full lg:w-[450px] shrink-0 bg-[#0B0B0D] flex flex-col relative transition-colors duration-300 ${activeTab === 'chat' ? 'flex h-full' : 'hidden lg:flex h-full'}`}>
                        <div className="flex-1 overflow-y-auto no-scrollbar w-full pt-6">
                            <div className="px-4 pb-40 flex flex-col max-w-3xl mx-auto w-full">
                                <ChatHistory 
                                    messages={state.messages}
                                    viewState={viewState} 
                                    setViewState={actions.setViewState} 
                                    setActiveTab={actions.setActiveTab} 
                                />
                            </div>
                        </div>
                        <ChatInputArea inputValue={inputValue} setInputValue={actions.setInputValue} handleSubmit={actions.handleSubmit} isSidebar={true} />
                    </div>
                    <div className={`flex-1 relative flex flex-col transition-colors duration-300 min-w-0 ${activeTab === 'chat' ? 'hidden lg:flex' : 'flex'}`}>
                        <WorkbenchMock />
                    </div>
                </>
            ) : viewState === 'initial' ? (
                <AIChatLandingPage
                    inputValue={inputValue}
                    setInputValue={actions.setInputValue}
                    handleSubmit={actions.handleSubmit}
                    setViewState={actions.setViewState}
                />
            ) : (
                <div className="flex-1 flex overflow-hidden">
                    <div className="flex-1 flex flex-col relative min-w-0">
                        <div className="flex-1 overflow-y-auto no-scrollbar w-full pt-20 pb-40 relative z-10 transition-all duration-500 ease-in-out">
                            <div className="px-4 flex flex-col gap-8 max-w-2xl mx-auto w-full">
                                <ChatHistory 
                                    messages={state.messages} 
                                    viewState={viewState} 
                                    setViewState={actions.setViewState} 
                                    setActiveTab={actions.setActiveTab} 
                                />
                            </div>
                        </div>
                        <div className="relative z-20 w-full shrink-0">
                            <ChatInputArea 
                                inputValue={inputValue} 
                                setInputValue={actions.setInputValue} 
                                handleSubmit={actions.handleSubmit} 
                                isSidebar={false} 
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
