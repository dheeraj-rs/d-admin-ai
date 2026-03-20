import React, { useState, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Icon } from '@iconify/react';
import { useProjectsStore } from '../store/projects-store';
import { useBuilderStore } from '../store/builder-store';
import { savePage } from '../lib/api';

interface CreateProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  'Personal',
  'Marketing',
  'E-commerce',
  'Portfolio',
  'Landing Page',
  'Other',
];

export function CreateProjectDialog({
  isOpen,
  onClose,
}: CreateProjectDialogProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { saveProject, setCurrentProject } = useProjectsStore();
  const { triggerClearCanvas } = useBuilderStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    const newId = crypto.randomUUID();

    saveProject({
      id: newId,
      name: name.trim(),
      category,
      thumbnail: imagePreview || undefined,
      pages: [
        {
          id: 'home',
          name: 'Home',
          path: '/index',
          html: '',
        },
      ],
    });

    savePage('', false);
    setCurrentProject(newId);
    triggerClearCanvas();
    setName('');
    setImagePreview(null);
    setCategory(CATEGORIES[0]);
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-5">
            <Dialog.Title className="text-lg font-semibold text-[var(--d-admin-text-color)]">
              Create New Project
            </Dialog.Title>
            <Dialog.Close className="rounded-full p-1 text-[var(--d-admin-text-color-secondary)] hover:bg-[var(--d-admin-surface-hover)] hover:text-[var(--d-admin-text-color)] transition-colors">
              <Icon icon="lucide:x" className="size-5" />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--d-admin-text-color-secondary)] uppercase tracking-wider">
                Project Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Awesome Project"
                className="w-full rounded-md border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] px-3 py-2 text-sm text-[var(--d-admin-text-color)] placeholder:text-[var(--d-admin-text-color-secondary)] focus:border-[var(--d-admin-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--d-admin-primary)] transition-all"
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--d-admin-text-color-secondary)] uppercase tracking-wider">
                Category
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none rounded-md border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] px-3 py-2 text-sm text-[var(--d-admin-text-color)] focus:border-[var(--d-admin-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--d-admin-primary)] transition-all"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <Icon
                  icon="lucide:chevron-down"
                  className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-[var(--d-admin-text-color-secondary)] pointer-events-none"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--d-admin-text-color-secondary)] uppercase tracking-wider">
                Thumbnail (Optional)
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="group relative flex aspect-video cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] transition-all hover:border-[var(--d-admin-primary)] hover:bg-[var(--d-admin-surface-hover)]"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-[var(--d-admin-text-color-secondary)] transition-colors group-hover:text-[var(--d-admin-primary)]">
                    <Icon icon="lucide:image-plus" className="size-8" />
                    <span className="text-xs font-medium">
                      Click to upload image
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />

                {imagePreview && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImagePreview(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70 backdrop-blur-sm"
                  >
                    <Icon icon="lucide:trash-2" className="size-3" />
                  </button>
                )}
              </div>
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
                disabled={!name.trim()}
                className="flex items-center gap-2 rounded-md bg-[var(--d-admin-primary)] px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-[var(--d-admin-primary)]/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon icon="lucide:plus" className="size-4" />
                Create Project
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
