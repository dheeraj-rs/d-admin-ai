export type ViewState = 'initial' | 'chat' | 'chat-with-code' | 'fullscreen-editor' | 'templates' | 'published-sites';
export type ActiveTab = 'chat' | 'preview' | 'code';

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}

export interface ProjectSummary {
    branding?: string;
    pages?: string[];
    features?: string[];
    techStack?: string[];
}
