import { create } from 'zustand';
import type { ViewState, ActiveTab, Message, ProjectSummary } from '../types/index';
import { INITIAL_STATE, type WorkspaceState } from './workspace-store.constants';

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
    setShowTerminal: (v: boolean) => void;
    handleNewChat: () => void;
    handleSubmit: () => void;
    addMessage: (message: Message) => void;
    updateProjectSummary: (summary: Partial<ProjectSummary>) => void;
}

export type WorkspaceStore = WorkspaceState & WorkspaceActions;

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
    setShowTerminal: (v) => set({ showTerminal: v }),
    addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
    updateProjectSummary: (summary) => set((state) => ({ projectSummary: { ...state.projectSummary, ...summary } })),

    handleNewChat: () => {
        set({ ...INITIAL_STATE, isAuthOpen: false });
        if (typeof window !== 'undefined' && window.innerWidth < 1024) set({ showLeftSidebar: false });
    },

    handleSubmit: () => {
        const { inputValue, addMessage, updateProjectSummary } = get();
        if (!inputValue.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: inputValue, timestamp: Date.now() };
        addMessage(userMsg);
        set({ inputValue: '' });

        setTimeout(() => {
            const lower = userMsg.content.toLowerCase();
            let aiResponse = "I understand. I'm working on setting up your project based on your requirements.";
            
            if (lower.includes('portfolio') || lower.includes('website')) {
                aiResponse = "That sounds like a great project! I'll help you build a professional portfolio website.";
                updateProjectSummary({ 
                    branding: userMsg.content.length > 20 ? userMsg.content.substring(0, 20) + "..." : userMsg.content,
                    pages: ['Home', 'Projects', 'About', 'Contact'],
                    features: ['Responsive Layout', 'Dark Mode', 'Contact Form']
                });
            }

            addMessage({ id: (Date.now() + 1).toString(), role: 'assistant', content: aiResponse, timestamp: Date.now() });
            set({ viewState: lower.includes('code') || lower.includes('portfolio') ? 'chat-with-code' : 'chat' });
        }, 600);
    },
}));

