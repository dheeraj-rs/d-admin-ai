'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useProjectsStore } from '../store/projects-store';
import { useBuilderStore } from '../store/builder-store';
import { savePage } from '../lib/api';
import * as Tabs from '@radix-ui/react-tabs';
import { CreateProjectDialog } from '../dialogs/CreateProjectDialog';
import { ProjectSettingsDialog } from '../dialogs/ProjectSettingsDialog';
import { DeleteConfirmationDialog } from '../dialogs/DeleteConfirmationDialog';
import { TemplatesList } from './TemplatesList';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface ProjectsGalleryProps {
  onClose?: () => void;
  activeTab?: 'projects' | 'templates';
  onTabChange?: (tab: 'projects' | 'templates') => void;
  onCreateNew?: () => void;
  onOpenProject?: (id: string) => void;
}

export function ProjectsGallery({
  onClose,
  activeTab,
  onTabChange,
  onCreateNew,
  onOpenProject,
}: ProjectsGalleryProps = {}) {
  const { projects, setCurrentProject, deleteProject, deleteProjects } =
    useProjectsStore();
  const builderStore = useBuilderStore();
  const router = useRouter();

  const currentTab = activeTab || builderStore.projectsGalleryTab;
  const setCurrentTab = onTabChange || builderStore.setProjectsGalleryTab;
  const closeGallery =
    onClose || (() => builderStore.setShowProjectsGallery(false));

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [settingsDialog, setSettingsDialog] = useState<{
    isOpen: boolean;
    mode: 'edit' | 'template' | 'bulk-template';
    projectId: string | null;
  }>({
    isOpen: false,
    mode: 'edit',
    projectId: null,
  });
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    projectId: string | null;
    projectName: string;
    isBulk?: boolean;
  }>({
    isOpen: false,
    projectId: null,
    projectName: '',
    isBulk: false,
  });

  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);

  const handleOpenProject = (id: string) => {
    if (isSelectionMode) {
      toggleSelection(id);
      return;
    }

    if (onOpenProject) {
      onOpenProject(id);
    } else {
      setCurrentProject(id);
      builderStore.setShowProjectsGallery(false);
      router.push('/drag-drop-builder');
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedProjectIds((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id],
    );
  };

  const handleBulkDelete = () => {
    setDeleteDialog({
      isOpen: true,
      projectId: null,
      projectName: `${selectedProjectIds.length} projects`,
      isBulk: true,
    });
  };

  const handleDeleteProject = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const project = projects.find((p) => p.id === id);
    setDeleteDialog({
      isOpen: true,
      projectId: id,
      projectName: project?.name || 'this project',
    });
    setActiveMenuId(null);
  };

  const confirmDelete = () => {
    if (deleteDialog.isBulk) {
      deleteProjects(selectedProjectIds);
      setIsSelectionMode(false);
      setSelectedProjectIds([]);
    } else if (deleteDialog.projectId) {
      deleteProject(deleteDialog.projectId);
    }
  };

  const handleBulkAddToTemplate = () => {
    setSettingsDialog({
      isOpen: true,
      mode: 'bulk-template',
      projectId: null,
    });
  };

  const handleCreateNew = () => {
    if (onCreateNew) {
      onCreateNew();
    } else {
      savePage('', false);
      setCurrentProject(null);
      builderStore.setShowProjectsGallery(false);
      builderStore.triggerClearCanvas();
      router.push('/drag-drop-builder');
    }
  };

  return (
    <div className="relative h-full w-full bg-gradient-to-tl from-[var(--d-admin-surface-ground)] to-[var(--d-admin-surface-section)] text-[var(--d-admin-text-color)] overflow-hidden">
      <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col px-4 py-4">
        <Tabs.Root
          value={currentTab}
          onValueChange={(val) =>
            setCurrentTab(val as 'projects' | 'templates')
          }
          className="flex h-full flex-col min-h-0"
        >
          <Tabs.Content
            value="projects"
            className="animate-in fade-in slide-in-from-bottom-4 flex-1 overflow-y-auto duration-500 outline-none pr-1"
          >
            <div className="flex items-center justify-between mb-8 gap-4 px-1">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentTab('templates')}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-md bg-[var(--d-admin-surface-section)] border border-[var(--d-admin-surface-border)] text-[var(--d-admin-text-color-secondary)] hover:text-[var(--d-admin-text-color)] hover:bg-[var(--d-admin-surface-hover)] transition-all shrink-0"
                  title="Back to Templates"
                >
                  <Icon icon="lucide:layout-template" className="size-4" />
                  <span className="hidden lg:inline">Templates Gallery</span>
                </button>
                <div className="w-px h-6 bg-[var(--d-admin-surface-border)] shrink-0" />
              </div>

              <div className="flex items-center gap-2">
                {projects.length > 0 && (
                  <>
                    {isSelectionMode ? (
                      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-[calc(100vw-160px)] sm:max-w-none">
                        <button
                          onClick={handleBulkDelete}
                          disabled={selectedProjectIds.length === 0}
                          className="flex items-center justify-center gap-2 px-3 h-8 text-xs font-medium text-white bg-red-500 rounded-md hover:bg-red-600 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                          title="Delete Selected"
                        >
                          <Icon icon="lucide:trash-2" className="size-3.5" />
                          <span className="hidden sm:inline">Delete</span>
                          <span>({selectedProjectIds.length})</span>
                        </button>
                        <button
                          onClick={() => {
                            toast.info('Move feature coming soon');
                          }}
                          disabled={selectedProjectIds.length === 0}
                          className="flex items-center justify-center gap-2 px-3 h-8 text-xs font-medium text-[var(--d-admin-text-color)] bg-[var(--d-admin-surface-ground)] border border-[var(--d-admin-surface-border)] rounded-md hover:bg-[var(--d-admin-surface-hover)] shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Move to Folder"
                        >
                          <Icon
                            icon="lucide:folder-input"
                            className="size-3.5"
                          />
                          <span>Move</span>
                        </button>
                        <button
                          onClick={handleBulkAddToTemplate}
                          disabled={selectedProjectIds.length === 0}
                          className="flex items-center justify-center gap-2 px-3 h-8 text-xs font-medium text-[var(--d-admin-text-color)] bg-[var(--d-admin-surface-ground)] border border-[var(--d-admin-surface-border)] rounded-md hover:bg-[var(--d-admin-surface-hover)] shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Add to Templates"
                        >
                          <Icon icon="lucide:folder-up" className="size-3.5" />
                          <span className="hidden sm:inline">
                            Add to Templates
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            setIsSelectionMode(false);
                            setSelectedProjectIds([]);
                          }}
                          className="flex items-center justify-center px-3 h-8 text-xs font-medium text-[var(--d-admin-text-color)] bg-[var(--d-admin-surface-ground)] border border-[var(--d-admin-surface-border)] rounded-md hover:bg-[var(--d-admin-surface-hover)] shrink-0"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsSelectionMode(true)}
                        className="flex items-center gap-2 px-3 h-8 text-xs font-medium rounded-md bg-[var(--d-admin-surface-section)] border border-[var(--d-admin-surface-border)] text-[var(--d-admin-text-color)] hover:bg-[var(--d-admin-surface-hover)] transition-colors"
                      >
                        <Icon icon="lucide:check-square" className="size-3.5" />
                        Select
                      </button>
                    )}
                    <div className="w-px h-6 bg-[var(--d-admin-surface-border)] shrink-0" />
                  </>
                )}

                <button
                  onClick={() => closeGallery()}
                  className="flex items-center gap-2 px-4 h-8 text-xs font-medium rounded-md bg-[var(--d-admin-surface-section)] border border-[var(--d-admin-surface-border)] text-[var(--d-admin-text-color)] hover:bg-[var(--d-admin-surface-hover)] transition-colors shadow-sm shrink-0"
                >
                  <Icon icon="lucide:arrow-left" className="size-3.5" />
                  <span className="hidden sm:inline">Back to Edit</span>
                </button>
              </div>
            </div>

            {projects.length === 0 ? (
              <div className="mx-auto flex h-[50vh] max-w-2xl flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)]/50">
                <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-[var(--d-admin-surface-hover)]">
                  <Icon
                    icon="lucide:package-open"
                    className="size-8 text-[var(--d-admin-text-color-secondary)]"
                  />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-[var(--d-admin-text-color)]">
                  No projects yet
                </h3>
                <p className="mb-8 max-w-sm text-center text-[var(--d-admin-text-color-secondary)]">
                  Start fresh with a blank canvas or choose a template to
                  kickstart your next big idea.
                </p>
                <button
                  onClick={() => setCurrentTab('templates')}
                  className="flex items-center gap-2 rounded-lg bg-[var(--d-admin-primary)] px-6 py-3 font-medium text-white transition-colors hover:bg-[var(--d-admin-primary)]/90"
                >
                  <Icon icon="lucide:plus" />
                  Start New Project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div
                  onClick={() => handleCreateNew()}
                  className="group flex flex-col gap-2 cursor-pointer"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(var(--d-admin-surface-border)_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />

                    <div className="flex size-16 items-center justify-center rounded-xl bg-[var(--d-admin-surface-ground)] text-[var(--d-admin-text-color)] shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <Icon icon="lucide:plus" className="size-8" />
                    </div>

                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <div className="flex items-center justify-end gap-3">
                        <button className="px-3 py-1.5 rounded-md bg-white text-black text-xs font-bold hover:bg-gray-100 transition-colors shadow-sm whitespace-nowrap">
                          Create Blank
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-0.5 mt-1">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span className="text-xs sm:text-sm font-medium text-[var(--d-admin-text-color)] truncate">
                        Create New Project
                      </span>
                    </div>
                  </div>
                </div>

                {projects
                  .filter(
                    (p) =>
                      p.pages &&
                      p.pages.length > 0 &&
                      p.pages.some(
                        (page) => page.html && page.html.trim().length > 0,
                      ),
                  )
                  .sort((a, b) => b.updatedAt - a.updatedAt)
                  .map((project) => (
                    <div
                      key={project.id}
                      onClick={() => handleOpenProject(project.id)}
                      className="group flex flex-col gap-2 cursor-pointer"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)]">
                        <div className="absolute inset-0 bg-[radial-gradient(var(--d-admin-surface-border)_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />

                        <div className="absolute inset-0 flex items-center justify-center">
                          {project.thumbnail ? (
                            <img
                              src={project.thumbnail}
                              alt={project.name}
                              className={`h-full w-full object-cover object-top transition-opacity ${isSelectionMode ? 'opacity-50' : 'opacity-90 group-hover:opacity-100'}`}
                            />
                          ) : (
                            <div
                              className={`flex size-16 items-center justify-center rounded-xl bg-[var(--d-admin-surface-ground)] text-2xl font-bold text-[var(--d-admin-text-color)] shadow-sm ${isSelectionMode ? 'opacity-50' : ''}`}
                            >
                              {project.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>

                        {isSelectionMode && (
                          <div className="absolute top-2 right-2 z-30">
                            <div
                              className={`flex size-6 items-center justify-center rounded-full border ${selectedProjectIds.includes(project.id) ? 'bg-[var(--d-admin-primary)] border-[var(--d-admin-primary)] text-white' : 'bg-[var(--d-admin-surface-section)] border-[var(--d-admin-surface-border)] text-transparent'}`}
                            >
                              <Icon icon="lucide:check" className="size-3.5" />
                            </div>
                          </div>
                        )}

                        {!isSelectionMode && (
                          <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            <div className="flex items-center justify-end gap-3">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenProject(project.id);
                                }}
                                className="px-3 py-1.5 rounded-md bg-white text-black text-xs font-bold hover:bg-gray-100 transition-colors shadow-sm whitespace-nowrap"
                              >
                                Open Project
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between px-0.5 mt-1">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <span
                            className="text-xs sm:text-sm font-medium text-[var(--d-admin-text-color)] truncate hover:underline uppercase"
                            title={project.name}
                          >
                            {project.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs font-medium text-[var(--d-admin-text-color-secondary)] shrink-0">
                          <span className="hidden sm:inline-block">
                            {new Date(project.updatedAt).toLocaleDateString()}
                          </span>

                          {!isSelectionMode && (
                            <div className="relative">
                              <button
                                className="p-1 rounded-md hover:bg-[var(--d-admin-surface-hover)] hover:text-[var(--d-admin-text-color)] transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenuId(
                                    activeMenuId === project.id
                                      ? null
                                      : project.id,
                                  );
                                }}
                              >
                                <Icon
                                  icon="lucide:more-vertical"
                                  className="size-4"
                                />
                              </button>

                              {activeMenuId === project.id && (
                                <>
                                  <div
                                    className="fixed inset-0 z-40"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveMenuId(null);
                                    }}
                                  />
                                  <div className="absolute right-0 bottom-full mb-1 w-40 rounded-lg border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSettingsDialog({
                                          isOpen: true,
                                          mode: 'edit',
                                          projectId: project.id,
                                        });
                                        setActiveMenuId(null);
                                      }}
                                      className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-[var(--d-admin-text-color)] hover:bg-[var(--d-admin-surface-hover)] transition-colors text-left"
                                    >
                                      <Icon
                                        icon="lucide:pencil"
                                        className="size-3.5"
                                      />
                                      Rename
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSettingsDialog({
                                          isOpen: true,
                                          mode: 'template',
                                          projectId: project.id,
                                        });
                                        setActiveMenuId(null);
                                      }}
                                      className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-[var(--d-admin-text-color)] hover:bg-[var(--d-admin-surface-hover)] transition-colors text-left"
                                    >
                                      <Icon
                                        icon="lucide:folder-up"
                                        className="size-3.5"
                                      />
                                      Add to Template
                                    </button>
                                    <div className="h-px bg-[var(--d-admin-surface-border)]" />
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteProject(e, project.id);
                                        setActiveMenuId(null);
                                      }}
                                      className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-500/10 transition-colors text-left"
                                    >
                                      <Icon
                                        icon="lucide:trash-2"
                                        className="size-3.5"
                                      />
                                      Delete
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </Tabs.Content>

          <Tabs.Content
            value="templates"
            className="animate-in fade-in slide-in-from-bottom-4 flex-1 overflow-y-auto duration-500 outline-none pr-1"
          >
            <TemplatesList />
          </Tabs.Content>
        </Tabs.Root>
      </div>

      <CreateProjectDialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
      />

      <ProjectSettingsDialog
        isOpen={settingsDialog.isOpen}
        onClose={() =>
          setSettingsDialog({ isOpen: false, mode: 'edit', projectId: null })
        }
        mode={settingsDialog.mode}
        project={
          settingsDialog.projectId
            ? projects.find((p) => p.id === settingsDialog.projectId) || null
            : null
        }
        projects={
          settingsDialog.mode === 'bulk-template'
            ? projects.filter((p) => selectedProjectIds.includes(p.id))
            : undefined
        }
      />

      <DeleteConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={() =>
          setDeleteDialog({
            isOpen: false,
            projectId: null,
            projectName: '',
            isBulk: false,
          })
        }
        onConfirm={confirmDelete}
        title={deleteDialog.isBulk ? 'Delete Projects' : 'Delete Project'}
        message={
          deleteDialog.isBulk
            ? `Are you sure you want to delete ${selectedProjectIds.length} projects? This action cannot be undone.`
            : 'Are you sure you want to delete this project? This action cannot be undone.'
        }
        itemName={deleteDialog.projectName}
      />
    </div>
  );
}
