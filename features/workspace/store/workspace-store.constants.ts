import type { ViewState, Message, ProjectSummary } from '../types/index';

export interface WorkspaceState {
    showLeftSidebar: boolean;
    viewState: ViewState;
    inputValue: string;
    activeTab: 'code' | 'preview' | 'chat';
    isShareOpen: boolean;
    isAgentOpen: boolean;
    isSettingsOpen: boolean;
    isAuthOpen: boolean;
    isHelpOpen: boolean;
    selectedAgent: string;
    showAIPanel: boolean;
    showTerminal: boolean;
    messages: Message[];
    projectSummary: ProjectSummary;
}

export const INITIAL_STATE: WorkspaceState = {
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
    showTerminal: false,
    messages: [],
    projectSummary: {
        branding: '',
        pages: [],
        features: [],
        techStack: ['Next.js', 'Tailwind CSS', 'Lucide React'],
    },
};
