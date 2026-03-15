import { create } from 'zustand';
import type { ViewState, ActiveTab, Message, ProjectSummary } from '../types/index';

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
    messages: Message[];
    projectSummary: ProjectSummary;
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
    addMessage: (message: Message) => void;
    updateProjectSummary: (summary: Partial<ProjectSummary>) => void;
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
    messages: [],
    projectSummary: {
        branding: '',
        pages: [],
        features: [],
        techStack: ['Next.js', 'Tailwind CSS', 'Lucide React'],
    },
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

    addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
    updateProjectSummary: (summary) => set((state) => ({ projectSummary: { ...state.projectSummary, ...summary } })),

    handleNewChat: () => {
        set({ ...INITIAL_STATE, isAuthOpen: false }); // Keep auth closed on new chat if already in
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
            set({ showLeftSidebar: false });
        }
    },

    handleSubmit: () => {
        const { inputValue, messages, addMessage, updateProjectSummary } = get();
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: Date.now(),
        };

        addMessage(userMsg);
        set({ inputValue: '' });

        // Simulate AI response
        setTimeout(() => {
            const lower = userMsg.content.toLowerCase();
            let aiResponse = "I understand. I'm working on setting up your project based on your requirements.";
            
            if (lower.includes('portfolio') || lower.includes('website')) {
                aiResponse = "That sounds like a great project! I'll help you build a professional portfolio website. I've updated the project summary with these details.";
                updateProjectSummary({ 
                    branding: userMsg.content.length > 20 ? userMsg.content.substring(0, 20) + "..." : userMsg.content,
                    pages: ['Home', 'Projects', 'About', 'Contact'],
                    features: ['Responsive Layout', 'Dark Mode', 'Contact Form']
                });
            }

            const assistantMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: aiResponse,
                timestamp: Date.now(),
            };
            addMessage(assistantMsg);
            
            const nextView: ViewState = lower.includes('code') || lower.includes('portfolio') ? 'chat-with-code' : 'chat';
            set({ viewState: nextView });
        }, 600);
    },
}));
