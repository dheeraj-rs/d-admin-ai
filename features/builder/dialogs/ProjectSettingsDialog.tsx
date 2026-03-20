import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Icon } from '@iconify/react';
import {
  useProjectsStore,
  Project,
  Template,
} from '../store/projects-store';
import { useBuilderStore } from '../store/builder-store';

export interface ProjectSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'edit' | 'template' | 'bulk-template';
  project: Project | null;
  projects?: Project[];
}

const CATEGORIES = [
  'Portfolio',
  'Landing Pages',
  'E-commerce',
  'Business',
  'Events',
  'Other',
];

export function ProjectSettingsDialog({
  isOpen,
  onClose,
  mode,
  project,
  projects,
}: ProjectSettingsDialogProps) {
  const { updateProject, addTemplate } = useProjectsStore();
  const { setProjectsGalleryTab } = useBuilderStore();

  const [formData, setFormData] = useState({
    name: '',
    thumbnail: '',
    deploymentUrl: '',
    category: 'Landing Pages',
  });

  useEffect(() => {
    if (isOpen) {
      if (mode === 'bulk-template' && projects) {
        setFormData({
          name: `${projects.length} Projects`,
          thumbnail: '',
          deploymentUrl: '',
          category: 'Landing Pages',
        });
      } else if (project) {
        setFormData({
          name: project.name,
          thumbnail: project.thumbnail || '',
          deploymentUrl: project.deploymentUrl || '',
          category: project.category || 'Landing Pages',
        });
      }
    }
  }, [isOpen, project, projects, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'bulk-template' && projects) {
      projects.forEach((p) => {
        const newTemplate: Template = {
          id: `t-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: p.name,
          author: 'You',
          authorAvatar:
            'https://cdn.dribbble.com/users/4626561/avatars/small/3e7a9cae12ddff5464716c73428efe8f.jpg?1631241699',
          thumbnail:
            p.thumbnail ||
            'https://placehold.co/400x300/e2e8f0/64748b?text=Template',
          category: formData.category,
          likes: '0',
          views: '0',
          html:
            p.pages.find((page) => page.path === '/index' || page.path === '/')
              ?.html || '',
          deploymentUrl: p.deploymentUrl,
        };
        addTemplate(newTemplate);
      });
      setProjectsGalleryTab('templates');
      onClose();
      return;
    }

    if (!project) return;

    if (mode === 'edit') {
      updateProject(project.id, {
        name: formData.name,
        thumbnail: formData.thumbnail,
        deploymentUrl: formData.deploymentUrl,
      });
      onClose();
    } else {
      const newTemplate: Template = {
        id: `t-${Date.now()}`,
        title: formData.name,
        author: 'You',
        authorAvatar:
          'https://cdn.dribbble.com/users/4626561/avatars/small/3e7a9cae12ddff5464716c73428efe8f.jpg?1631241699',
        thumbnail:
          formData.thumbnail ||
          'https://placehold.co/400x300/e2e8f0/64748b?text=Template',
        category: formData.category,
        likes: '0',
        views: '0',
        html:
          project.pages.find((p) => p.path === '/index' || p.path === '/')
            ?.html || '',
        deploymentUrl: formData.deploymentUrl,
      };
      addTemplate(newTemplate);
      setProjectsGalleryTab('templates');
      onClose();
    }
  };

  let title = '';
  let buttonText = '';
  let icon = '';

  switch (mode) {
    case 'edit':
      title = 'Edit Project Details';
      buttonText = 'Save Changes';
      icon = 'lucide:pencil';
      break;
    case 'template':
      title = 'Add to Templates';
      buttonText = 'Add to Templates';
      icon = 'lucide:folder-up';
      break;
    case 'bulk-template':
      title = `Add ${projects?.length || 0} Projects to Templates`;
      buttonText = 'Add All to Templates';
      icon = 'lucide:folder-up';
      break;
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-[130] w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-2xl border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--d-admin-surface-section)] shadow-sm">
                <Icon
                  icon={icon}
                  className="size-5 text-[var(--d-admin-primary)]"
                />
              </div>
              <Dialog.Title className="text-lg font-semibold text-[var(--d-admin-text-color)]">
                {title}
              </Dialog.Title>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-[var(--d-admin-text-color-secondary)] hover:bg-[var(--d-admin-surface-hover)] hover:text-[var(--d-admin-text-color)] transition-colors"
            >
              <Icon icon="lucide:x" className="size-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'bulk-template' && (
              <div className="bg-[var(--d-admin-surface-section)] p-3 rounded-lg border border-[var(--d-admin-surface-border)]">
                <p className="text-sm text-[var(--d-admin-text-color-secondary)]">
                  You are adding <strong>{projects?.length}</strong> projects to
                  your templates. They will be added with their current names
                  and thumbnails.
                </p>
              </div>
            )}
            {mode !== 'bulk-template' && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--d-admin-text-color-secondary)]">
                  Project Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] px-3 py-2 text-sm text-[var(--d-admin-text-color)] placeholder:text-[var(--d-admin-text-color-secondary)]/50 focus:border-[var(--d-admin-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--d-admin-primary)]"
                  placeholder="e.g. My Awesome Site"
                />
              </div>
            )}
            {(mode === 'template' || mode === 'bulk-template') && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--d-admin-text-color-secondary)]">
                  Category {mode === 'bulk-template' && '(Applies to all)'}
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full rounded-lg border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] px-3 py-2 text-sm text-[var(--d-admin-text-color)] focus:border-[var(--d-admin-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--d-admin-primary)] appearance-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {mode !== 'bulk-template' && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--d-admin-text-color-secondary)]">
                  Thumbnail URL
                </label>
                <input
                  type="text"
                  value={formData.thumbnail}
                  onChange={(e) =>
                    setFormData({ ...formData, thumbnail: e.target.value })
                  }
                  className="w-full rounded-lg border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] px-3 py-2 text-sm text-[var(--d-admin-text-color)] placeholder:text-[var(--d-admin-text-color-secondary)]/50 focus:border-[var(--d-admin-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--d-admin-primary)]"
                  placeholder="https://..."
                />
              </div>
            )}
            {mode !== 'bulk-template' && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--d-admin-text-color-secondary)]">
                  Deployment / Live URL
                </label>
                <input
                  type="text"
                  value={formData.deploymentUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, deploymentUrl: e.target.value })
                  }
                  className="w-full rounded-lg border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] px-3 py-2 text-sm text-[var(--d-admin-text-color)] placeholder:text-[var(--d-admin-text-color-secondary)]/50 focus:border-[var(--d-admin-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--d-admin-primary)]"
                  placeholder="https://..."
                />
              </div>
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--d-admin-text-color-secondary)] hover:bg-[var(--d-admin-surface-hover)] hover:text-[var(--d-admin-text-color)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[var(--d-admin-primary-color)] px-6 py-2 text-sm font-medium text-[var(--d-admin-primary-color-text)] hover:opacity-90 transition-opacity shadow-sm"
              >
                {buttonText}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
