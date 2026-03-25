import React, { useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import { Icon } from '@iconify/react';
import { useProjectsStore } from '../store/projects-store';
import { useBuilderStore } from '../store/builder-store';
import { classMixin } from '../lib/class-utils';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'drjsde@gmail.com';

const PROJECT_TYPES = [
  'Landing Page',
  'Portfolio',
  'E-commerce',
  'Business',
  'Blog',
  'Personal',
  'Other',
];

interface SaveProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  getHtmlContent: () => string;
}

export function SaveProjectModal({
  isOpen,
  onClose,
  getHtmlContent,
}: SaveProjectModalProps) {
  const { saveProject, setCurrentProject, currentProjectId, getProject, addTemplate } =
    useProjectsStore();
  const existingProject = currentProjectId ? getProject(currentProjectId) : null;

  const [name, setName] = useState(existingProject?.name || '');
  const [projectType, setProjectType] = useState(existingProject?.category || PROJECT_TYPES[0]);
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const canUpdate = !!existingProject;

  React.useEffect(() => {
    if (isOpen && existingProject) {
      setName(existingProject.name);
      setProjectType(existingProject.category || PROJECT_TYPES[0]);
    } else if (isOpen && !existingProject) {
      setName('');
      setProjectType(PROJECT_TYPES[0]);
      setSaveAsTemplate(false);
    }
  }, [isOpen, existingProject]);

  const generateId = () =>
    Date.now().toString(36) + Math.random().toString(36).substr(2);

  const handleSave = async () => {
    if (!name.trim()) return;
    setIsSaving(true);

    const html = getHtmlContent();
    const id = canUpdate ? existingProject!.id : generateId();
    const ownerEmail = undefined;

    let thumbnail = existingProject?.thumbnail || '';
    try {
      const editor = document.getElementById('editor');
      if (editor) {
        const { toJpeg } = await import('html-to-image');
        thumbnail = await toJpeg(editor, {
          quality: 0.9,
          pixelRatio: 0.6,
          backgroundColor: '#1a1a1a',
          skipAutoScale: true,
          fontEmbedCSS: '',
        });
      }
    } catch {
      // thumbnail generation is best-effort
    }

    saveProject({
      id,
      name: name.trim(),
      pages: [{ id: 'home', name: 'Home', path: '/index', html }],
      thumbnail,
      category: projectType,
      ownerEmail,
    });

    if (!canUpdate) setCurrentProject(id);
    
    // Default Template saving is disabled without auth for now

    const isDefaultSave = false;

    import('react-hot-toast').then(({ toast }) => {
      (toast as any).success(
        isDefaultSave
          ? 'Published as Default Template!'
          : 'Saved successfully',
      );
    });

    useBuilderStore.getState().markAsSaved();
    setIsSaving(false);
    onClose();
    if (!existingProject) {
      setName('');
      setSaveAsTemplate(false);
    }
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="animate-in fade-in-0 fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <DialogPrimitive.Content
          className={classMixin(
            'fixed z-50 rounded-xl bg-[var(--d-admin-surface-ground)] p-6 shadow-2xl',
            'w-[95vw] max-w-md md:w-full',
            'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform',
            'border border-[var(--d-admin-surface-border)]',
            'animate-in fade-in zoom-in-95 duration-200',
          )}
        >
          <DialogPrimitive.Close
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full p-1 opacity-60 transition-opacity hover:opacity-100 hover:bg-[var(--d-admin-surface-hover)]"
          >
            <XMarkIcon className="h-5 w-5 text-[var(--d-admin-text-color)]" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          <div className="flex flex-col gap-5">
            {/* Header */}
            <div>
              <DialogPrimitive.Title className="text-xl font-semibold text-[var(--d-admin-text-color)]">
                {canUpdate ? 'Update Project' : 'Save Project'}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-1 text-sm text-[var(--d-admin-text-color-secondary)]">
                {canUpdate
                  ? 'Update your project details and save changes.'
                  : 'Give your project a name to save it to your gallery.'}
              </DialogPrimitive.Description>
            </div>

            {/* Project Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--d-admin-text-color-secondary)]">
                Project Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Awesome Landing Page"
                className="w-full rounded-lg border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] px-3 py-2.5 text-sm text-[var(--d-admin-text-color)] placeholder:text-[var(--d-admin-text-color-secondary)] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                autoFocus
              />
            </div>

            {/* Project Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--d-admin-text-color-secondary)]">
                Project Type
              </label>
              <div className="relative">
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] px-3 py-2.5 text-sm text-[var(--d-admin-text-color)] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
                >
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <Icon
                  icon="lucide:chevron-down"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-[var(--d-admin-text-color-secondary)]"
                />
              </div>
            </div>

            {/* Save as Template Toggle - Disabled without auth */}
            {false && (
              <button
                type="button"
                onClick={() => setSaveAsTemplate(!saveAsTemplate)}
                className={`flex items-center gap-3 w-full rounded-lg border px-4 py-3 text-sm transition-all ${
                  saveAsTemplate
                    ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-400'
                    : 'border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] text-[var(--d-admin-text-color-secondary)] hover:border-indigo-500/30 hover:text-[var(--d-admin-text-color)]'
                }`}
              >
                <div
                  className={`flex size-5 shrink-0 items-center justify-center rounded border-2 transition-all ${
                    saveAsTemplate
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-[var(--d-admin-surface-border)]'
                  }`}
                >
                  {saveAsTemplate && (
                    <Icon icon="lucide:check" className="size-3 text-white" />
                  )}
                </div>
                <div className="text-left">
                  <div className="font-medium text-[var(--d-admin-text-color)]">
                    Save as Default Template
                  </div>
                  <div className="text-xs opacity-60">
                    Appears in Templates for ALL users
                  </div>
                </div>
                <Icon
                  icon="lucide:layout-template"
                  className="ml-auto size-5 opacity-40"
                />
              </button>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-1">
              <button
                type="button"
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-[var(--d-admin-text-color-secondary)] hover:bg-[var(--d-admin-surface-hover)] hover:text-[var(--d-admin-text-color)] transition-colors"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!name.trim() || isSaving}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSave}
              >
                {isSaving ? (
                  <Icon icon="lucide:loader-2" className="size-4 animate-spin" />
                ) : (
                  <Icon icon="lucide:save" className="size-4" />
                )}
                {canUpdate ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
