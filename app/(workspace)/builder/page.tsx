'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/features/builder/components/Header';
import { Interface } from '@/features/builder/components/Interface';
import { Workbench } from '@/features/builder/components/Workbench';
import { SidebarMobile } from '@/features/builder/components/SidebarMobile';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { useBuilderStore } from '@/features/builder/store/builder-store';
import { ProjectsGallery } from '@/features/builder/components/ProjectsGallery';
import { usePreventNavigation } from '@/shared/hooks/use-prevent-navigation';
import { UnsavedChangesDialog } from '@/shared/ui/UnsavedChangesDialog';
import { WorkspaceViewBackground } from '@/features/home';

export default function DragDropBuilderPage() {
  const isMobile = useIsMobile();
  const {
    isPreview,
    showProjectsGallery,
    historyIndex,
    lastSavedHistoryIndex,
  } = useBuilderStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);

  const isDirty = historyIndex !== lastSavedHistoryIndex;
  const { confirmExit } = usePreventNavigation(isDirty, () =>
    setShowUnsavedDialog(true),
  );

  if (!mounted) return <div className="h-full w-full bg-slate-950 flex items-center justify-center text-white">Loading...</div>;

  const showInterface = (isMobile ? false : true) && !isPreview;

  return (
    <main className="flex h-[100dvh] w-full flex-col dark bg-[#02060D] text-white overflow-hidden relative">
      <WorkspaceViewBackground />
      <div style={mounted ? undefined : { display: 'none' }} className="flex h-full w-full flex-col relative z-10">
        {!showProjectsGallery && <Header />}
        <div className="relative h-full w-full flex-1 overflow-hidden">
          {showProjectsGallery && <ProjectsGallery />}
          <SidebarMobile />
          {isMobile && !isPreview && (
            <button
              onClick={() => useBuilderStore.getState().setMobileSidebar(true)}
              className="fixed right-5 bottom-14 z-[9998] flex size-14 items-center justify-center rounded-full bg-[var(--d-admin-primary-color)] text-white shadow-lg transition-all hover:scale-105 active:scale-95"
              aria-label="Add Component"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          )}

          <div className="h-full w-full flex-1">
            <div className="flex size-full overscroll-contain">
              <PanelGroup
                direction="horizontal"
                key={isMobile ? 'mobile' : 'desktop'}
              >
                {showInterface && (
                  <Panel
                    id="interface-panel"
                    order={1}
                    defaultSize={isMobile ? 100 : 25}
                    minSize={isMobile ? 100 : 20}
                    className="h-full"
                  >
                    <Interface />
                  </Panel>
                )}
                {!isMobile && showInterface && (
                  <PanelResizeHandle
                    className="group relative"
                    style={{ touchAction: 'none' }}
                  >
                    <div className="absolute inset-0 z-10 flex w-2 items-center justify-center" />
                  </PanelResizeHandle>
                )}
                <Panel
                  id="workbench-panel"
                  order={2}
                  defaultSize={isMobile ? 100 : 75}
                  minSize={isMobile ? 100 : 50}
                  className="h-full"
                >
                  <Workbench />
                </Panel>
              </PanelGroup>
            </div>
          </div>
        </div>
      </div>
      <UnsavedChangesDialog
        isOpen={showUnsavedDialog}
        onClose={() => setShowUnsavedDialog(false)}
        onConfirm={confirmExit}
      />
    </main>
  );
}
