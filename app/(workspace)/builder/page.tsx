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
import { Icon } from '@iconify/react';
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
    canvasTheme,
  } = useBuilderStore();

  const [mounted, setMounted] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDirty = historyIndex !== lastSavedHistoryIndex;
  const { confirmExit } = usePreventNavigation(isDirty, () =>
    setShowUnsavedDialog(true),
  );

  const resolvedTheme = canvasTheme === 'system' 
    ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : canvasTheme;

  if (!mounted) return <div className="h-full w-full bg-slate-950 flex items-center justify-center text-white">Loading...</div>;

  const showInterface = (isMobile ? false : true) && !isPreview;

  return (
    <main className="flex h-[100dvh] w-full flex-col overflow-hidden relative transition-colors duration-300 bg-[var(--bg-main)]">
      <WorkspaceViewBackground />
      <div style={mounted ? undefined : { display: 'none' }} className="flex h-full w-full flex-col relative z-10">
        {!showProjectsGallery && (
          <Header />
        )}
        <div className="relative h-full w-full flex-1 overflow-hidden">
          {showProjectsGallery && <ProjectsGallery />}
          
          <div className="dark contents">
            <SidebarMobile />
          </div>

          <PanelGroup direction="horizontal" className="h-full w-full">
            {showInterface && (
              <>
                <Panel defaultSize={20} minSize={15} maxSize={30}>
                  <div className="h-full w-full dark">
                    <Interface />
                  </div>
                </Panel>
                <PanelResizeHandle className="w-1.5 bg-[#02060D] hover:bg-indigo-500/30 transition-colors border-x border-[var(--border-main)]" />
              </>
            )}
            <Panel>
              <div className={`h-full w-full ${resolvedTheme}`}>
                <Workbench />
              </div>
            </Panel>
          </PanelGroup>

          {isMobile && !isPreview && (
            <button
               onClick={() => useBuilderStore.getState().setMobileSidebar(true)}
               className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl hover:bg-indigo-700 transition-all active:scale-95"
            >
              <Icon icon="lucide:plus" className="text-xl" />
            </button>
          )}
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
