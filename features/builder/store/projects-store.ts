import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Page {
  id: string;
  name: string;
  path: string;
  html: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  pages: Page[];
  updatedAt: number;
  thumbnail?: string;
  category?: string;
  deploymentUrl?: string;
  likes?: number;
  views?: number;
  ownerEmail?: string;
}

export interface Template {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  isTeam?: boolean;
  thumbnail: string;
  video?: string;
  category: string;
  likes: string;
  views: string;
  usageCount?: string;
  html?: string;
  deploymentUrl?: string;
  ownerEmail?: string;
  isDefault?: boolean;
}

interface ProjectsState {
  projects: Project[];
  currentProjectId: string | null;
  templates: Template[];
  likedTemplateIds: string[];
  usedTemplateIds: string[];

  saveProject: (project: Omit<Project, 'updatedAt'>) => void;
  deleteProject: (id: string) => void;
  deleteProjects: (ids: string[]) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  setCurrentProject: (id: string | null) => void;
  getProject: (id: string) => Project | undefined;

  addPage: (projectId: string, page: Page) => void;
  updatePage: (
    projectId: string,
    pageId: string,
    updates: Partial<Page>,
  ) => void;
  deletePage: (projectId: string, pageId: string) => void;

  addTemplate: (template: Template) => void;
  toggleTemplateLike: (id: string) => void;
  incrementTemplateUsage: (id: string) => void;
  deleteTemplate: (id: string) => void;
  
  initializeStore: () => Promise<void>;
}

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set, get) => ({
      projects: [],
      currentProjectId: null,

      likedTemplateIds: [],
      usedTemplateIds: [],

      saveProject: async (projectData) => {
        const now = Date.now();
        const project = { ...projectData, updatedAt: now };

        // Sync to MongoDB
        try {
          await fetch('/api/projects', {
            method: 'POST',
            body: JSON.stringify(project),
          });
        } catch (error) {
          console.error('Failed to sync project to MongoDB:', error);
        }

        set((state) => {
          const existingIndex = state.projects.findIndex(
            (p) => p.id === projectData.id,
          );
          if (existingIndex >= 0) {
            const updatedProjects = [...state.projects];
            updatedProjects[existingIndex] = project;
            return { projects: updatedProjects };
          } else {
            return {
              projects: [...state.projects, project],
            };
          }
        });
      },

      deleteProject: async (id) => {
        // Sync to MongoDB
        try {
          await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
        } catch (error) {
          console.error('Failed to delete project from MongoDB:', error);
        }

        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        }));
      },

      deleteProjects: async (ids: string[]) => {
        // Sync to MongoDB
        try {
          await fetch(`/api/projects?ids=${ids.join(',')}`, { method: 'DELETE' });
        } catch (error) {
          console.error('Failed to delete projects from MongoDB:', error);
        }

        set((state) => ({
          projects: state.projects.filter((p) => !ids.includes(p.id)),
        }));
      },

      setCurrentProject: (id) => set({ currentProjectId: id }),

      getProject: (id) => get().projects.find((p) => p.id === id),

      addPage: (projectId, page) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId
              ? { ...p, pages: [...p.pages, page], updatedAt: Date.now() }
              : p,
          ),
        })),

      updatePage: (projectId, pageId, updates) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  pages: p.pages.map((page) =>
                    page.id === pageId ? { ...page, ...updates } : page,
                  ),
                  updatedAt: Date.now(),
                }
              : p,
          ),
        })),

      deletePage: async (projectId, pageId) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  pages: p.pages.filter((page) => page.id !== pageId),
                  updatedAt: Date.now(),
                }
              : p,
          ),
        }));

        const project = get().getProject(projectId);
        if (project) {
          try {
            await fetch('/api/projects', {
              method: 'POST',
              body: JSON.stringify(project),
            });
          } catch (error) {
            console.error('Failed to sync page deletion to MongoDB:', error);
          }
        }
      },

      templates: [],

      addTemplate: async (template) => {
        // Sync to MongoDB
        try {
          await fetch('/api/templates', {
            method: 'POST',
            body: JSON.stringify(template),
          });
        } catch (error) {
          console.error('Failed to sync template to MongoDB:', error);
        }

        set((state) => ({ templates: [...state.templates, template] }));
      },

      toggleTemplateLike: (id) =>
        set((state) => {
          const isLiked = state.likedTemplateIds?.includes(id);
          const newLikedIds = isLiked
            ? state.likedTemplateIds.filter((lid) => lid !== id)
            : [...(state.likedTemplateIds || []), id];

          return {
            likedTemplateIds: newLikedIds,
            templates: state.templates.map((t) => {
              if (t.id === id) {
                const currentLikes = parseInt(t.likes || '0');
                const newLikes = isLiked
                  ? Math.max(0, currentLikes - 1)
                  : currentLikes + 1;
                return { ...t, likes: newLikes.toString() };
              }
              return t;
            }),
          };
        }),

      incrementTemplateUsage: (id) =>
        set((state) => {
          if (state.usedTemplateIds?.includes(id)) {
            return {};
          }
          return {
            usedTemplateIds: [...(state.usedTemplateIds || []), id],
            templates: state.templates.map((t) => {
              if (t.id === id) {
                const currentUsage = parseInt(t.usageCount || '0');
                return { ...t, usageCount: (currentUsage + 1).toString() };
              }
              return t;
            }),
          };
        }),

      deleteTemplate: async (id) => {
        // Sync to MongoDB
        try {
          await fetch(`/api/templates?id=${id}`, { method: 'DELETE' });
        } catch (error) {
          console.error('Failed to delete template from MongoDB:', error);
        }

        set((state) => ({
          templates: state.templates.filter((t) => t.id !== id),
        }));
      },

      initializeStore: async () => {
        try {
          const [projectsRes, templatesRes] = await Promise.all([
            fetch('/api/projects'),
            fetch('/api/templates'),
          ]);

          if (projectsRes.ok && templatesRes.ok) {
            const projects = await projectsRes.json();
            const templates = await templatesRes.json();
            set({ projects, templates });
          }
        } catch (error) {
          console.error('Failed to initialize store from MongoDB:', error);
        }
      },

      updateProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: Date.now() } : p,
          ),
        })),
    }),
    {
      name: 'd-admin-projects-storage',
      version: 2,
      migrate: (persistedState: any, version: number) => {
        let state = persistedState;

        if (version === 0) {
          state = {
            ...state,
            templates: [],
          };
        }

        if (version <= 1) {
          state = {
            ...state,
            projects: state.projects.map((p: any) => ({
              ...p,
              pages: p.pages || [
                {
                  id: 'home',
                  name: 'Home',
                  path: '/index',
                  html: p.html || '',
                },
              ],
            })),
          };
        }

        return state;
      },
    },
  ),
);
