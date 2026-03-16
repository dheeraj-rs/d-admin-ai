'use client';

import { useWorkspace } from '@/features/workspace';
import EditorTopBar from './EditorTopBar';
import StandardTopBar from './StandardTopBar';

export default function TopBar() {
    const { state } = useWorkspace();
    const { viewState } = state;

    if (viewState === 'fullscreen-editor') {
        return <EditorTopBar />;
    }

    return <StandardTopBar />;
}
