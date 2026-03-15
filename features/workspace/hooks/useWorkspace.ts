import { useWorkspaceStore } from '../store/useWorkspaceStore';
import type { ViewState, ActiveTab } from '../types/index';

export type { ViewState, ActiveTab };

/** Thin adapter — keeps the existing { state, actions } shape so no consumers need to change. */
export function useWorkspace() {
    const store = useWorkspaceStore();

    return {
        state: {
            showLeftSidebar: store.showLeftSidebar,
            viewState: store.viewState,
            inputValue: store.inputValue,
            activeTab: store.activeTab,
            isShareOpen: store.isShareOpen,
            isAgentOpen: store.isAgentOpen,
            isSettingsOpen: store.isSettingsOpen,
            isAuthOpen: store.isAuthOpen,
            isHelpOpen: store.isHelpOpen,
            selectedAgent: store.selectedAgent,
            showAIPanel: store.showAIPanel,
            showTerminal: store.showTerminal,
            messages: store.messages,
            projectSummary: store.projectSummary,
        },
        actions: {
            setShowLeftSidebar: store.setShowLeftSidebar,
            handleNewChat: store.handleNewChat,
            setViewState: store.setViewState,
            setInputValue: store.setInputValue,
            setActiveTab: store.setActiveTab,
            setIsShareOpen: store.setIsShareOpen,
            setIsAgentOpen: store.setIsAgentOpen,
            setIsSettingsOpen: store.setIsSettingsOpen,
            setIsAuthOpen: store.setIsAuthOpen,
            setIsHelpOpen: store.setIsHelpOpen,
            setSelectedAgent: store.setSelectedAgent,
            setShowAIPanel: store.setShowAIPanel,
            setShowTerminal: store.setShowTerminal,
            handleSubmit: store.handleSubmit,
        },
    };
}
