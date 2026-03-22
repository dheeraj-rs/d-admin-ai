import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Component, ComponentWithCategories, Theme } from '../types';
import { loadTheme } from '../lib/api';

export const THEMES: Theme[] = [
  { name: 'Business', folder: 'Business' },
  { name: 'Landing', folder: 'Landing' },
  { name: 'Portfolio', folder: 'Portfolio' },
  { name: 'E-Commerce', folder: 'E-Commerce' },
  { name: 'Blog', folder: 'Blog' },
  { name: 'Custom', folder: 'custom' },
];

interface DragDropState {
  themeIndex: number;
  components: ComponentWithCategories;
  error: string | null;
  currentPage: string;
  canvasComponents: Record<string, number[]>;
  setCanvasComponents: (map: Record<string, number[]>) => void;

  pendingAddComponent: {
    component: any;
    category: string;
    index: number;
  } | null;
  setPendingAddComponent: (
    c: { component: any; category: string; index: number } | null,
  ) => void;

  headerAction: string | null;
  setHeaderAction: (action: string | null) => void;

  clearCanvasTrigger: number;
  triggerClearCanvas: () => void;
  selectedElement: HTMLElement | null;
  setSelectedElement: (el: HTMLElement | null) => void;
  isPreview: boolean;
  setIsPreview: (v: boolean) => void;
  showMobileSidebar: boolean;
  toggleMobileSidebar: () => void;
  setMobileSidebar: (v: boolean) => void;
  showImageDialog: boolean;
  setShowImageDialog: (v: boolean) => void;
  showButtonDialog: boolean;
  setShowButtonDialog: (v: boolean) => void;
  showLinkDialog: boolean;
  setShowLinkDialog: (v: boolean) => void;
  showSvgDialog: boolean;
  setShowSvgDialog: (v: boolean) => void;
  showExportDialog: boolean;
  setShowExportDialog: (v: boolean) => void;
  showPublishDialog: boolean;
  setShowPublishDialog: (v: boolean) => void;
  showSaveDialog: boolean;
  setShowSaveDialog: (v: boolean) => void;
  showProjectsGallery: boolean;
  setShowProjectsGallery: (v: boolean) => void;
  showGitHubPushDialog: boolean;
  setShowGitHubPushDialog: (v: boolean) => void;
  projectsGalleryTab: 'projects' | 'templates';
  setProjectsGalleryTab: (tab: 'projects' | 'templates') => void;
  closeAllDialogs: () => void;
  setThemeIndex: (index: number) => void;
  setCurrentPage: (pageId: string) => void;
  setComponents: (components: ComponentWithCategories) => void;
  setError: (error: string | null) => void;
  loadThemeComponents: (
    index: number,
    standaloneServer?: boolean,
  ) => Promise<void>;
  sidebarView: 'components' | 'layers';
  toggleSidebarView: () => void;
  setSidebarView: (view: 'components' | 'layers') => void;
  activeLayers: HTMLElement[];
  setActiveLayers: (layers: HTMLElement[]) => void;
  reorderTrigger: number;
  triggerReorder: () => void;
  history: string[];
  historyIndex: number;
  addToHistory: (html: string) => void;
  undo: () => void;
  redo: () => void;
  lastSavedHistoryIndex: number;
  markAsSaved: () => void;

  canvasTheme: 'light' | 'dark' | 'system';
  setCanvasTheme: (v: 'light' | 'dark' | 'system') => void;

  pendingTemplateHtml: string | null;
  pendingTemplateName: string | null;
  setPendingTemplate: (html: string | null, name: string | null) => void;

  isHydrated: boolean;
  setIsHydrated: (isHydrated: boolean) => void;
}

export const useBuilderStore = create<DragDropState>()(
  persist(
    (set, get) => ({
      themeIndex: 0,
      currentPage: '/index',
      components: {},
      error: null,

      canvasComponents: {},
      setCanvasComponents: (map) => set({ canvasComponents: map }),

      sidebarView: 'components',
      toggleSidebarView: () =>
        set((state) => ({
          sidebarView:
            state.sidebarView === 'components' ? 'layers' : 'components',
        })),
      setSidebarView: (view) => set({ sidebarView: view }),

      activeLayers: [],
      setActiveLayers: (layers) => set({ activeLayers: layers }),
      reorderTrigger: 0,
      triggerReorder: () =>
        set((state) => ({ reorderTrigger: state.reorderTrigger + 1 })),

      isPreview: false,
      pendingAddComponent: null,
      headerAction: null,
      clearCanvasTrigger: 0,
      selectedElement: null,
      showImageDialog: false,
      showButtonDialog: false,
      showLinkDialog: false,
      showSvgDialog: false,
      showExportDialog: false,
      showPublishDialog: false,
      showSaveDialog: false,
      showProjectsGallery: false,
      showGitHubPushDialog: false,

      setThemeIndex: (index) => set({ themeIndex: index }),
      setCurrentPage: (pageId) =>
        set({
          currentPage: pageId,
          history: [],
          historyIndex: -1,
          lastSavedHistoryIndex: -1,
          selectedElement: null,
        }),
      setComponents: (components) => set({ components }),
      setError: (error) => set({ error }),
      setIsPreview: (v) => set({ isPreview: v }),

      setPendingAddComponent: (c) => set({ pendingAddComponent: c }),
      setHeaderAction: (action) => set({ headerAction: action }),
      triggerClearCanvas: () =>
        set((state) => ({ clearCanvasTrigger: state.clearCanvasTrigger + 1 })),

      setSelectedElement: (el) => set({ selectedElement: el }),

      setShowImageDialog: (v) => set({ showImageDialog: v }),
      setShowButtonDialog: (v) => set({ showButtonDialog: v }),
      setShowLinkDialog: (v) => set({ showLinkDialog: v }),
      setShowSvgDialog: (v) => set({ showSvgDialog: v }),
      setShowExportDialog: (v) => set({ showExportDialog: v }),
      setShowPublishDialog: (v) => set({ showPublishDialog: v }),
      setShowSaveDialog: (v) => set({ showSaveDialog: v }),
      setShowProjectsGallery: (v: boolean) => set({ showProjectsGallery: v }),
      setShowGitHubPushDialog: (v) => set({ showGitHubPushDialog: v }),
      projectsGalleryTab: 'templates',
      setProjectsGalleryTab: (tab) => set({ projectsGalleryTab: tab }),

      closeAllDialogs: () =>
        set({
          showImageDialog: false,
          showButtonDialog: false,
          showLinkDialog: false,
          showSvgDialog: false,
          showExportDialog: false,
          showPublishDialog: false,
          showSaveDialog: false,
          showProjectsGallery: false,
          showGitHubPushDialog: false,
        }),

      pendingTemplateHtml: null,
      pendingTemplateName: null,
      setPendingTemplate: (html, name) =>
        set({ pendingTemplateHtml: html, pendingTemplateName: name }),

      loadThemeComponents: async (
        index: number,
        standaloneServer?: boolean,
      ) => {
        try {
          const componentsList = await loadTheme(
            THEMES[index].folder,
            standaloneServer ?? false,
          );

          if (!Array.isArray(componentsList)) {
            set({ error: JSON.stringify(componentsList, null, 2) });
            return;
          }
          set({ error: null });

          const components = componentsList.reduce(
            (r: ComponentWithCategories, c: Component) => {
              const category = c.folder.replace(/[0-9]/g, '');
              if (!r[category]) r[category] = [];
              r[category].push(c);
              return r;
            },
            {},
          );

          set({ components });
        } catch (e: any) {
          set({ error: e.message });
        }
      },
      history: [''],
      historyIndex: 0,

      addToHistory: (html: string) => {
        const { history, historyIndex } = get();
        if (history[historyIndex] === html) return;

        const newHistory = history.slice(0, historyIndex + 1);

        newHistory.push(html);

        if (newHistory.length > 25) {
          newHistory.shift();
        }

        set({
          history: newHistory,
          historyIndex: newHistory.length - 1,
        });
      },

      undo: () => {
        const { historyIndex } = get();
        if (historyIndex > 0) {
          set({ historyIndex: historyIndex - 1 });
        }
      },

      redo: () => {
        const { history, historyIndex } = get();
        if (historyIndex < history.length - 1) {
          set({ historyIndex: historyIndex + 1 });
        }
      },

      showMobileSidebar: false,
      toggleMobileSidebar: () =>
        set((state) => ({ showMobileSidebar: !state.showMobileSidebar })),
      setMobileSidebar: (v) => set({ showMobileSidebar: v }),

      lastSavedHistoryIndex: 0,
      markAsSaved: () =>
        set((state) => ({ lastSavedHistoryIndex: state.historyIndex })),

      canvasTheme: 'system',
      setCanvasTheme: (v) => set({ canvasTheme: v }),

      isHydrated: false,
      setIsHydrated: (isHydrated) => set({ isHydrated }),
    }),
    {
      name: 'd-admin-builder-storage',
      partialize: (state) => ({
        themeIndex: state.themeIndex,
        currentPage: state.currentPage,
        projectsGalleryTab: state.projectsGalleryTab,
        canvasTheme: state.canvasTheme,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setIsHydrated(true);
      },
    },
  ),
);
