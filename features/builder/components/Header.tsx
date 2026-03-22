'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useSession } from 'next-auth/react';
import { Icon } from '@iconify/react';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { useProjectsStore } from '../store/projects-store';
import { useBuilderStore } from '../store/builder-store';
import { CreatePageDialog } from '../dialogs/CreatePageDialog';
import GitHubPushDialog from '../dialogs/GitHubPushDialog';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'drjsde@gmail.com';

export function Header() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { data: session } = useSession();
  const { setTheme } = useTheme();
  const {
    isPreview,
    setIsPreview,
    setShowExportDialog,
    setHeaderAction,
    showProjectsGallery,
    setShowProjectsGallery,
    triggerClearCanvas,
    projectsGalleryTab,
    setProjectsGalleryTab,
    pendingTemplateName,
    setShowGitHubPushDialog,
    showGitHubPushDialog,
    setCanvasTheme,
    canvasTheme,
  } = useBuilderStore();

  const resolvedTheme = canvasTheme === 'system'
    ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : canvasTheme as 'light' | 'dark';

  const { currentProjectId, getProject, setCurrentProject, deletePage } =
    useProjectsStore();
  const project = currentProjectId ? getProject(currentProjectId) : null;
  const currentProjectName = pendingTemplateName || project?.name || null;

  const canUpdate =
    project &&
    (session?.user?.email === project.ownerEmail ||
      session?.user?.email === ADMIN_EMAIL);

  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isCreatePageOpen, setIsCreatePageOpen] = useState(false);
  const [isPageMenuOpen, setIsPageMenuOpen] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  return (
    <header className="dark bg-[#0A0B0E] flex h-[var(--header-height)] w-full shrink-0 items-center pr-3 pl-2 select-none">
      <div className="flex w-full max-w-[75%] min-w-0 flex-1 items-center gap-2 md:max-w-[40.5%]">
        <button
          onClick={() => router.back()}
          className="hidden md:flex items-center justify-center gap-2 font-medium min-w-0 max-w-full rounded-md focus-visible:outline-2 disabled:op-50 relative disabled:cursor-not-allowed focus-visible:outline-[var(--d-admin-blue-600)] bg-[var(--d-admin-surface-section)] border border-[var(--border-main)] text-[var(--d-admin-text-color)] hover:bg-[var(--d-admin-surface-hover)] transition-colors gap-1.7 shrink-0 h-8 text-sm px-2"
          type="button"
          title="Go Back"
        >
          <Icon icon="ph:caret-left" className="text-lg" />
        </button>
        <button
          onClick={() => {
            const { setCurrentProject } = useProjectsStore.getState();
            const { setCurrentPage, setPendingTemplate, triggerClearCanvas } =
              useBuilderStore.getState();
            setCurrentProject(null);
            setPendingTemplate(null, null);
            setCurrentPage('/index');
            triggerClearCanvas();
          }}
          className="flex md:hidden items-center justify-center gap-2 font-medium min-w-0 rounded-md focus-visible:outline-2 disabled:op-50 relative disabled:cursor-not-allowed focus-visible:outline-[var(--d-admin-blue-600)] bg-[var(--d-admin-surface-section)] border border-[var(--border-main)] text-[var(--d-admin-text-color)] hover:bg-[var(--d-admin-surface-hover)] transition-colors shrink-0 h-8 text-sm px-2"
          type="button"
          title="Create New Project"
        >
          <Icon icon="lucide:plus" className="text-lg" />
        </button>
        <button
          className="flex-1 md:flex-none flex items-center justify-start md:justify-center font-semibold min-w-0 rounded-md focus-visible:outline-2 disabled:op-50 relative disabled:cursor-not-allowed gap-1 h-9 focus-visible:outline-[var(--d-admin-blue-600)] bg-transparent enabled:hover:bg-[var(--d-admin-surface-hover)] text-[var(--d-admin-text-color)] text-base px-1 md:px-3 -mr-px"
          type="button"
        >
          <span className="max-w-full truncate md:max-w-md lg:max-w-lg uppercase">
            {currentProjectName ? (
              <span className="text-primary flex-1 truncate text-center">
                {currentProjectName}
              </span>
            ) : (
              'Start from scratch'
            )}
          </span>
        </button>
        <button
          onClick={() => {
            const { setCurrentProject } = useProjectsStore.getState();
            const { setCurrentPage, setPendingTemplate, triggerClearCanvas } =
              useBuilderStore.getState();
            setCurrentProject(null);
            setPendingTemplate(null, null);
            setCurrentPage('/index');
            triggerClearCanvas();
          }}
          className="hidden md:flex items-center justify-center gap-2 font-medium min-w-0 max-w-full rounded-md focus-visible:outline-2 disabled:op-50 relative disabled:cursor-not-allowed focus-visible:outline-[var(--d-admin-blue-600)] bg-[var(--d-admin-surface-section)] border border-[var(--border-main)] text-[var(--d-admin-text-color)] hover:bg-[var(--d-admin-surface-hover)] transition-colors gap-1.7 shrink-0 h-8 text-sm px-3 ml-auto mr-2"
          type="button"
          title="Create New Project"
        >
          <Icon icon="lucide:plus" className="text-lg" />
          <span>New Project</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setIsPageMenuOpen(!isPageMenuOpen)}
            className="flex items-center justify-center gap-2 font-medium min-w-0 max-w-full rounded-md focus-visible:outline-2 disabled:op-50 relative disabled:cursor-not-allowed focus-visible:outline-[var(--d-admin-blue-600)] bg-[var(--d-admin-surface-section)] border border-[var(--border-main)] text-[var(--d-admin-text-color)] hover:bg-[var(--d-admin-surface-hover)] transition-colors gap-1.7 shrink-0 h-8 text-sm px-3"
            type="button"
            title="Switch Page"
          >
            <Icon icon="ph:files-duotone" className="text-lg" />
            <span className="hidden sm:inline">
              {useBuilderStore((state) => state.currentPage)}
            </span>
            <Icon icon="lucide:chevron-down" className="size-4 opacity-50" />
          </button>

          {isPageMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsPageMenuOpen(false)}
              />
              <div className="animate-in fade-in zoom-in-95 absolute top-full left-0 z-[100] mt-2 flex w-64 flex-col overflow-hidden rounded-lg border border-[var(--border-main)] bg-[var(--d-admin-surface-section)] p-1 shadow-xl duration-100 text-[var(--d-admin-text-color)] dark">
                <div className="max-h-60 overflow-y-auto p-1">
                  {project?.pages.map((page) => (
                    <div
                      key={page.id}
                      className={`group flex w-full items-center px-1 py-1 text-sm rounded-md transition-colors ${
                        useBuilderStore.getState().currentPage === page.path
                          ? 'bg-[var(--d-admin-surface-hover)]'
                          : 'hover:bg-[var(--d-admin-surface-hover)]'
                      }`}
                    >
                      <button
                        onClick={() => {
                          useBuilderStore.getState().setCurrentPage(page.path);
                          setIsPageMenuOpen(false);
                        }}
                        className={`flex-1 flex items-center px-2 py-1.5 text-left rounded-md transition-colors ${
                          useBuilderStore.getState().currentPage === page.path
                            ? 'text-[var(--d-admin-text-color)] font-medium'
                            : 'text-[var(--d-admin-text-color-secondary)] hover:text-[var(--d-admin-text-color)]'
                        }`}
                      >
                        <span className="truncate">
                          {page.path}{' '}
                          <span className="opacity-50">({page.name})</span>
                        </span>
                        {useBuilderStore.getState().currentPage ===
                          page.path && (
                          <Icon
                            icon="ph:check-bold"
                            className="ml-auto size-3.5"
                          />
                        )}
                      </button>

                      {page.path !== '/index' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (currentProjectId) {
                              const { currentPage, setCurrentPage } =
                                useBuilderStore.getState();
                              if (
                                confirm(
                                  `Are you sure you want to delete page "${page.path}"?`,
                                )
                              ) {
                                deletePage(currentProjectId, page.id);
                                if (currentPage === page.path) {
                                  setCurrentPage('/index');
                                }
                              }
                            }
                          }}
                          className="p-1.5 rounded-md text-red-500/70 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                          title="Delete Page"
                        >
                          <Icon icon="lucide:trash-2" className="size-3.5" />
                        </button>
                      )}
                    </div>
                  ))}

                  {!project && (
                    <button
                      onClick={() => setIsPageMenuOpen(false)}
                      className="flex w-full items-center px-3 py-2 text-sm rounded-md bg-[var(--d-admin-surface-hover)] text-[var(--d-admin-text-color)] font-medium text-left"
                    >
                      /index (Home)
                      <Icon icon="ph:check-bold" className="ml-auto size-3.5" />
                    </button>
                  )}

                  <div className="h-px bg-[var(--d-admin-surface-border)] my-1" />

                  <button
                    onClick={() => {
                      if (!project) {
                        const newProjectId = `project-${Date.now()}`;
                        const { saveProject, setCurrentProject } =
                          useProjectsStore.getState();
                        const currentHtml =
                          useBuilderStore.getState().history[
                            useBuilderStore.getState().historyIndex
                          ] || '';

                        saveProject({
                          id: newProjectId,
                          name: 'New Project',
                          pages: [
                            {
                              id: 'home',
                              name: 'Home',
                              path: '/index',
                              html: currentHtml,
                            },
                          ],
                        });
                        setCurrentProject(newProjectId);
                        useBuilderStore.getState().setCurrentPage('/index');
                      }
                      setIsCreatePageOpen(true);
                      setIsPageMenuOpen(false);
                    }}
                    className="flex w-full items-center px-3 py-2 text-sm rounded-md text-[var(--d-admin-primary)] hover:bg-[var(--d-admin-surface-hover)] font-medium transition-colors text-left"
                  >
                    <Icon icon="lucide:plus" className="size-3.5 mr-2" />
                    Add New Page
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="ml-auto hidden gap-3 md:flex">
        <div className="flex items-center gap-1 bg-[var(--d-admin-surface-section)] border border-[var(--border-main)] rounded-md p-0.5 h-8">
          <button
            onClick={useBuilderStore.getState().undo}
            disabled={useBuilderStore((state) => state.historyIndex <= 0)}
            className="flex items-center justify-center p-1.5 rounded hover:bg-[var(--d-admin-surface-hover)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-[var(--d-admin-text-color)]"
            title="Undo"
          >
            <Icon icon="lucide:undo-2" className="size-4" />
          </button>
          <div className="w-px h-4 bg-[var(--d-admin-surface-border)]" />
          <button
            onClick={useBuilderStore.getState().redo}
            disabled={useBuilderStore(
              (state) => state.historyIndex >= state.history.length - 1,
            )}
            className="flex items-center justify-center p-1.5 rounded hover:bg-[var(--d-admin-surface-hover)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-[var(--d-admin-text-color)]"
            title="Redo"
          >
            <Icon icon="lucide:redo-2" className="size-4" />
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
            className="flex items-center justify-center h-8 w-8 rounded-md bg-[var(--d-admin-surface-section)] border border-[var(--border-main)] text-[var(--d-admin-text-color)] hover:bg-[var(--d-admin-surface-hover)] transition-colors shrink-0"
            title={`Theme: ${canvasTheme}`}
            type="button"
          >
            <Icon
              icon={
                canvasTheme === 'light'
                  ? 'ph:sun-duotone'
                  : canvasTheme === 'dark'
                    ? 'ph:moon-duotone'
                    : 'ph:desktop-duotone'
              }
              className="text-lg"
            />
          </button>

          {isThemeMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsThemeMenuOpen(false)}
              />
              <div className="animate-in fade-in zoom-in-95 absolute top-full right-0 z-[100] mt-2 flex w-36 flex-col overflow-hidden rounded-lg border border-[var(--border-main)] bg-[var(--d-admin-surface-section)] p-1 shadow-xl duration-100 text-[var(--d-admin-text-color)] dark">
                {[
                  { id: 'light', icon: 'ph:sun-duotone', label: 'Light' },
                  { id: 'dark', icon: 'ph:moon-duotone', label: 'Dark' },
                  { id: 'system', icon: 'ph:desktop-duotone', label: 'System' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setCanvasTheme(t.id as any);
                      setTheme(t.id);
                      setIsThemeMenuOpen(false);
                    }}
                    className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      canvasTheme === t.id
                        ? 'bg-[var(--d-admin-surface-hover)] text-[var(--d-admin-text-color)] font-medium'
                        : 'text-[var(--d-admin-text-color-secondary)] hover:bg-[var(--d-admin-surface-hover)] hover:text-[var(--d-admin-text-color)]'
                    }`}
                  >
                    <Icon icon={t.icon} className="size-4" />
                    <span>{t.label}</span>
                    {canvasTheme === t.id && (
                      <Icon icon="ph:check-bold" className="ml-auto size-3" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <button
          className="items-center justify-center gap-2 font-medium min-w-0 max-w-full rounded-md focus-visible:outline-2 disabled:op-50 relative disabled:cursor-not-allowed focus-visible:outline-[var(--d-admin-blue-600)] bg-[var(--d-admin-surface-section)] border border-[var(--border-main)] text-[var(--d-admin-text-color)] hover:bg-[var(--d-admin-surface-hover)] transition-colors flex gap-1.7 shrink-0 h-8 text-sm px-3"
          onClick={() => {
            if (showProjectsGallery && projectsGalleryTab === 'templates') {
              setShowProjectsGallery(false);
            } else {
              setProjectsGalleryTab('templates');
              setShowProjectsGallery(true);
            }
          }}
          title="Templates"
        >
          <Icon icon="lucide:layout-template" className="text-lg" />
          <span>Templates</span>
        </button>
        <button
          className="items-center justify-center gap-2 font-medium min-w-0 max-w-full rounded-md focus-visible:outline-2 disabled:op-50 relative disabled:cursor-not-allowed focus-visible:outline-[var(--d-admin-blue-600)] bg-[var(--d-admin-surface-section)] border border-[var(--border-main)] text-[var(--d-admin-text-color)] hover:bg-[var(--d-admin-surface-hover)] transition-colors flex gap-1.7 shrink-0 h-8 text-sm px-3"
          onClick={() => setHeaderAction('save')}
          title="Save Project"
        >
          <Icon icon="lucide:save" className="text-lg" />
          <span>{canUpdate ? 'Update' : 'Save'}</span>
        </button>

        {!isPreview ? (
          <button
            className="items-center justify-center gap-2 font-medium min-w-0 max-w-full rounded-md focus-visible:outline-2 disabled:op-50 relative disabled:cursor-not-allowed focus-visible:outline-[var(--d-admin-blue-600)] bg-[var(--d-admin-surface-section)] border border-[var(--border-main)] text-[var(--d-admin-text-color)] hover:bg-[var(--d-admin-surface-hover)] transition-colors flex gap-1.7 shrink-0 h-8 text-sm px-3"
            onClick={() => setIsPreview(true)}
          >
            <Icon icon="lucide:eye" className="text-lg" />
            <span>Preview</span>
          </button>
        ) : (
          <button
            className="items-center justify-center gap-2 font-medium min-w-0 max-w-full rounded-md focus-visible:outline-2 disabled:op-50 relative disabled:cursor-not-allowed focus-visible:outline-[var(--d-admin-blue-600)] bg-[var(--d-admin-blue-600)] border border-[var(--d-admin-blue-600)] text-white hover:bg-[var(--d-admin-blue-700)] transition-colors flex gap-1.7 shrink-0 h-8 text-sm px-3"
            onClick={() => setIsPreview(false)}
          >
            <Icon icon="lucide:pencil" className="text-lg" />
            <span>Editor</span>
          </button>
        )}

        <div className="relative">
          <button
            className="items-center justify-center gap-2 font-medium min-w-0 max-w-full rounded-md focus-visible:outline-2 disabled:op-50 relative disabled:cursor-not-allowed focus-visible:outline-[var(--d-admin-blue-600)] bg-[var(--d-admin-surface-section)] border border-[var(--border-main)] text-[var(--d-admin-text-color)] hover:bg-[var(--d-admin-surface-hover)] transition-colors flex gap-1.7 shrink-0 h-8 text-sm px-3"
            onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
            title="Share & Export"
          >
            <Icon icon="ph:share-network-duotone" className="text-lg" />
            <span>Share</span>
            <Icon icon="lucide:chevron-down" className="size-4 opacity-50" />
          </button>

          {isShareMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsShareMenuOpen(false)}
              />
              <div className="animate-in fade-in zoom-in-95 absolute top-full right-0 z-[100] mt-2 flex w-48 flex-col overflow-hidden rounded-lg border border-[var(--border-main)] bg-[var(--d-admin-surface-section)] p-1 shadow-xl duration-100 text-[var(--d-admin-text-color)] dark">
                <button
                  onClick={() => {
                    setShowExportDialog(true);
                    setIsShareMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-[var(--d-admin-text-color)] transition-colors hover:bg-[var(--d-admin-surface-hover)]"
                >
                  <Icon icon="ph:download-duotone" className="size-4" />
                  <span>Export</span>
                </button>

                <button
                  onClick={() => {
                    setShowGitHubPushDialog(true);
                    setIsShareMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-[var(--d-admin-text-color)] transition-colors hover:bg-[var(--d-admin-surface-hover)]"
                >
                  <Icon icon="ph:github-logo-duotone" className="size-4" />
                  <span>Push to GitHub</span>
                </button>

                <button
                  onClick={() => {
                    setHeaderAction('preparePublish');
                    setIsShareMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-[var(--d-admin-text-color)] transition-colors hover:bg-[var(--d-admin-surface-hover)]"
                >
                  <Icon icon="ph:rocket-launch-duotone" className="size-4" />
                  <span>Publish</span>
                </button>
              </div>
            </>
          )}
        </div>
        {isMobile && (
          <button
            className="items-center justify-center gap-2 font-medium min-w-0 max-w-full rounded-md focus-visible:outline-2 disabled:op-50 relative disabled:cursor-not-allowed focus-visible:outline-[var(--d-admin-blue-600)] bg-[var(--d-admin-blue-600)] border border-[var(--d-admin-blue-600)] text-white hover:bg-[var(--d-admin-blue-700)] transition-colors flex gap-1.7 shrink-0 h-8 text-sm px-3 ml-auto"
            onClick={() => useBuilderStore.getState().setMobileSidebar(true)}
          >
            <Icon icon="lucide:plus" className="text-lg" />
            <span className="hidden sm:inline">Add</span>
          </button>
        )}
      </div>
      <div className="flex items-center gap-1 md:hidden">
        <button
          onClick={useBuilderStore.getState().undo}
          disabled={useBuilderStore((state) => state.historyIndex <= 0)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--d-admin-text-color)] transition-colors hover:bg-[var(--d-admin-surface-hover)] disabled:opacity-30"
        >
          <Icon icon="lucide:undo-2" className="size-5" />
        </button>
        <button
          onClick={useBuilderStore.getState().redo}
          disabled={useBuilderStore(
            (state) => state.historyIndex >= state.history.length - 1,
          )}
          className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--d-admin-text-color)] transition-colors hover:bg-[var(--d-admin-surface-hover)] disabled:opacity-30"
        >
          <Icon icon="lucide:redo-2" className="size-5" />
        </button>
        <button
          onClick={() => setIsPreview(!isPreview)}
          className={`flex h-9 w-9 items-center justify-center rounded-md text-[var(--d-admin-text-color)] transition-colors hover:bg-[var(--d-admin-surface-hover)] ${isPreview ? 'bg-[var(--d-admin-surface-hover)] text-blue-500' : ''}`}
        >
          <Icon
            icon={isPreview ? 'lucide:pencil' : 'lucide:eye'}
            className="size-5"
          />
        </button>
        <div className="relative">
          <button
            onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
            className={`flex h-9 w-9 items-center justify-center rounded-md text-[var(--d-admin-text-color)] transition-colors hover:bg-[var(--d-admin-surface-hover)] ${isMoreMenuOpen ? 'bg-[var(--d-admin-surface-hover)]' : ''}`}
          >
            <Icon icon="ph:dots-three-vertical-bold" className="size-5" />
          </button>

          {isMoreMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsMoreMenuOpen(false)}
              ></div>
              <div className="animate-in fade-in zoom-in-95 absolute top-full right-0 z-[100] mt-2 flex w-56 flex-col overflow-hidden rounded-lg border border-[var(--border-main)] bg-[var(--d-admin-surface-section)] p-1 shadow-xl duration-100">
                <button
                  onClick={() => {
                    const { setCurrentProject } = useProjectsStore.getState();
                    setCurrentProject(null);
                    triggerClearCanvas();
                    setIsMoreMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-[var(--d-admin-text-color)] transition-colors hover:bg-[var(--d-admin-surface-hover)]"
                >
                  <Icon icon="lucide:plus" className="size-4" />
                  <span>New Project</span>
                </button>

                <button
                  onClick={() => {
                    setHeaderAction('save');
                    setIsMoreMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-[var(--d-admin-text-color)] transition-colors hover:bg-[var(--d-admin-surface-hover)]"
                >
                  <Icon icon="lucide:save" className="size-4" />
                  <span>Save Project</span>
                </button>

                <button
                  onClick={() => {
                    if (
                      showProjectsGallery &&
                      projectsGalleryTab === 'templates'
                    ) {
                      setShowProjectsGallery(false);
                    } else {
                      setProjectsGalleryTab('templates');
                      setShowProjectsGallery(true);
                    }
                    setIsMoreMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-[var(--d-admin-text-color)] transition-colors hover:bg-[var(--d-admin-surface-hover)]"
                >
                  <Icon icon="lucide:layout-template" className="size-4" />
                  <span>Templates</span>
                </button>

                <button
                  onClick={() => {
                    setShowExportDialog(true);
                    setIsMoreMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-[var(--d-admin-text-color)] transition-colors hover:bg-[var(--d-admin-surface-hover)]"
                >
                  <Icon icon="ph:download-duotone" className="size-4" />
                  <span>Export</span>
                </button>

                <button
                  onClick={() => {
                    setShowGitHubPushDialog(true);
                    setIsMoreMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-[var(--d-admin-text-color)] transition-colors hover:bg-[var(--d-admin-surface-hover)]"
                >
                  <Icon icon="ph:github-logo-duotone" className="size-4" />
                  <span>Push to GitHub</span>
                </button>

                <button
                  onClick={() => {
                    setHeaderAction('preparePublish');
                    setIsMoreMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-[var(--d-admin-text-color)] transition-colors hover:bg-[var(--d-admin-surface-hover)]"
                >
                  <Icon icon="ph:rocket-launch-duotone" className="size-4" />
                  <span>Publish</span>
                </button>
                <button
                  onClick={() => {
                    useBuilderStore.getState().setMobileSidebar(true);
                    setIsMoreMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-[var(--d-admin-text-color)] transition-colors hover:bg-[var(--d-admin-surface-hover)]"
                >
                  <Icon icon="lucide:plus" className="size-4" />
                  <span>Add Element</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <CreatePageDialog
        isOpen={isCreatePageOpen}
        onClose={() => setIsCreatePageOpen(false)}
      />
    </header>
  );
}
