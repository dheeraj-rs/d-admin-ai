import { create } from 'zustand';
import type { ViewState, ActiveTab } from '../types/index';

interface WorkspaceState {
    showLeftSidebar: boolean;
    viewState: ViewState;
    inputValue: string;
    activeTab: ActiveTab;
    isShareOpen: boolean;
    isAgentOpen: boolean;
    isSettingsOpen: boolean;
    isAuthOpen: boolean;
    isHelpOpen: boolean;
    selectedAgent: string;
    showAIPanel: boolean;
}

interface WorkspaceActions {
    setShowLeftSidebar: (v: boolean) => void;
    setViewState: (v: ViewState) => void;
    setInputValue: (v: string) => void;
    setActiveTab: (v: ActiveTab) => void;
    setIsShareOpen: (v: boolean) => void;
    setIsAgentOpen: (v: boolean) => void;
    setIsSettingsOpen: (v: boolean) => void;
    setIsAuthOpen: (v: boolean) => void;
    setIsHelpOpen: (v: boolean) => void;
    setSelectedAgent: (v: string) => void;
    setShowAIPanel: (v: boolean) => void;
    handleNewChat: () => void;
    handleSubmit: () => void;
}

export type WorkspaceStore = WorkspaceState & WorkspaceActions;

const INITIAL_STATE: WorkspaceState = {
    showLeftSidebar: false,
    viewState: 'initial',
    inputValue: '',
    activeTab: 'code',
    isShareOpen: false,
    isAgentOpen: false,
    isSettingsOpen: false,
    isAuthOpen: true,
    isHelpOpen: false,
    selectedAgent: 'auto',
    showAIPanel: false,
};

export const useWorkspaceStore = create<WorkspaceStore>((set, get) => ({
    ...INITIAL_STATE,

    setShowLeftSidebar: (v) => set({ showLeftSidebar: v }),
    setViewState: (v) => set({ viewState: v }),
    setInputValue: (v) => set({ inputValue: v }),
    setActiveTab: (v) => set({ activeTab: v }),
    setIsShareOpen: (v) => set({ isShareOpen: v }),
    setIsAgentOpen: (v) => set({ isAgentOpen: v }),
    setIsSettingsOpen: (v) => set({ isSettingsOpen: v }),
    setIsAuthOpen: (v) => set({ isAuthOpen: v }),
    setIsHelpOpen: (v) => set({ isHelpOpen: v }),
    setSelectedAgent: (v) => set({ selectedAgent: v }),
    setShowAIPanel: (v) => set({ showAIPanel: v }),

    handleNewChat: () => {
        set({ viewState: 'initial', inputValue: '', showAIPanel: false });
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
            set({ showLeftSidebar: false });
        }
    },

    handleSubmit: () => {
        const { inputValue } = get();
        if (!inputValue.trim()) return;
        const lower = inputValue.toLowerCase();
        const nextView: ViewState = lower === 'code' ? 'chat-with-code' : 'chat';
        set({ viewState: nextView, inputValue: '' });
    },
}));
