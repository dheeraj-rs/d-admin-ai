import type { ViewState, ActiveTab } from '../types/index';
import EditorTopBar from './EditorTopBar';
import DefaultTopBar from './DefaultTopBar';
interface TopBarProps {
    viewState: ViewState;
    setViewState: (s: ViewState) => void;
    activeTab: ActiveTab;
    setActiveTab: (t: ActiveTab) => void;
    setShowLeftSidebar: (s: boolean) => void;
    isAgentOpen: boolean;
    setIsAgentOpen: (s: boolean) => void;
    isShareOpen: boolean;
    setIsShareOpen: (s: boolean) => void;
    setIsHelpOpen: (s: boolean) => void;
    selectedAgent: string;
    setSelectedAgent: (s: string) => void;
    showAIPanel: boolean;
    setShowAIPanel: (v: boolean) => void;
}

export default function TopBar({
    viewState,
    setViewState,
    activeTab,
    setActiveTab,
    setShowLeftSidebar,
    isAgentOpen,
    setIsAgentOpen,
    isShareOpen,
    setIsShareOpen,
    setIsHelpOpen,
    selectedAgent,
    setSelectedAgent,
    showAIPanel,
    setShowAIPanel,
}: TopBarProps) {
    if (viewState === 'fullscreen-editor') {
        return (
            <EditorTopBar
                setViewState={setViewState}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isShareOpen={isShareOpen}
                setIsShareOpen={setIsShareOpen}
            />
        );
    }

    return (
        <DefaultTopBar
            viewState={viewState}
            setShowLeftSidebar={setShowLeftSidebar}
            isAgentOpen={isAgentOpen}
            setIsAgentOpen={setIsAgentOpen}
            setIsHelpOpen={setIsHelpOpen}
            selectedAgent={selectedAgent}
            setSelectedAgent={setSelectedAgent}
            showAIPanel={showAIPanel}
            setShowAIPanel={setShowAIPanel}
        />
    );
}
