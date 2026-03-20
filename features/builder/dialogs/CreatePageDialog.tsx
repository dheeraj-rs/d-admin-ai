import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Icon } from '@iconify/react';
import { useProjectsStore } from '../store/projects-store';
import { useBuilderStore } from '../store/builder-store';

interface CreatePageDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePageDialog({ isOpen, onClose }: CreatePageDialogProps) {
  const [name, setName] = useState('');
  const [path, setPath] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { currentProjectId, getProject, addPage } = useProjectsStore();
  const { setCurrentPage, triggerClearCanvas } = useBuilderStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Page name is required');
      return;
    }
    if (!path.trim()) {
      setError('Page path is required');
      return;
    }

    if (!path.startsWith('/')) {
      setError('Path must start with /');
      return;
    }

    if (!currentProjectId) {
      setError('No active project');
      return;
    }

    const project = getProject(currentProjectId);
    if (!project) {
      setError('Project not found');
      return;
    }

    if (project.pages && project.pages.some((p) => p.path === path)) {
      setError('Path already exists');
      return;
    }

    const newPageId = crypto.randomUUID();

    addPage(currentProjectId, {
      id: newPageId,
      name: name.trim(),
      path: path.trim(),
      html: '',
    });

    setCurrentPage(path.trim());
    triggerClearCanvas();
    setName('');
    setPath('');
    onClose();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (
      !path ||
      path === '/' ||
      path.replace('/', '') === name.toLowerCase().replace(/\s+/g, '-')
    ) {
      setPath('/' + newName.toLowerCase().replace(/\s+/g, '-'));
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-5">
            <Dialog.Title className="text-lg font-semibold text-[var(--d-admin-text-color)]">
              Create New Page
            </Dialog.Title>
            <Dialog.Close className="rounded-full p-1 text-[var(--d-admin-text-color-secondary)] hover:bg-[var(--d-admin-surface-hover)] hover:text-[var(--d-admin-text-color)] transition-colors">
              <Icon icon="lucide:x" className="size-5" />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--d-admin-text-color-secondary)] uppercase tracking-wider">
                Page Name
              </label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="About Us"
                className="w-full rounded-md border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] px-3 py-2 text-sm text-[var(--d-admin-text-color)] placeholder:text-[var(--d-admin-text-color-secondary)] focus:border-[var(--d-admin-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--d-admin-primary)] transition-all"
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--d-admin-text-color-secondary)] uppercase tracking-wider">
                Page Path
              </label>
              <input
                type="text"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                placeholder="/about-us"
                className="w-full rounded-md border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] px-3 py-2 text-sm text-[var(--d-admin-text-color)] placeholder:text-[var(--d-admin-text-color-secondary)] focus:border-[var(--d-admin-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--d-admin-primary)] transition-all"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md px-4 py-2 text-sm font-medium text-[var(--d-admin-text-color-secondary)] hover:text-[var(--d-admin-text-color)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!name.trim() || !path.trim()}
                className="flex items-center gap-2 rounded-md bg-[var(--d-admin-primary)] px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-[var(--d-admin-primary)]/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon icon="lucide:plus" className="size-4" />
                Create Page
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
