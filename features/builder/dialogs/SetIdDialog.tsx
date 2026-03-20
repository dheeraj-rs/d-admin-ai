import React, { useState, useEffect } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Icon } from '@iconify/react';
import { classMixin } from '../lib/class-utils';

interface SetIdDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentId: string;
  onSave: (newId: string) => void;
}

export function SetIdDialog({
  isOpen,
  onClose,
  currentId,
  onSave,
}: SetIdDialogProps) {
  const [id, setId] = useState(currentId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setId(currentId);
      setError(null);
    }
  }, [isOpen, currentId]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedId = id.trim();
    if (trimmedId.length > 0 && !/^[a-zA-Z0-9-_]+$/.test(trimmedId)) {
      setError(
        'ID can only contain letters, numbers, hyphens, and underscores.',
      );
      return;
    }

    onSave(trimmedId);
    onClose();
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in" />
        <DialogPrimitive.Content
          className={classMixin(
            'fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2',
            'rounded-xl border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] p-6 shadow-xl',
            'animate-in fade-in zoom-in-95 duration-200',
          )}
        >
          <div className="flex items-center justify-between mb-5">
            <DialogPrimitive.Title className="text-lg font-semibold text-[var(--d-admin-text-color)]">
              Set Section ID
            </DialogPrimitive.Title>
            <DialogPrimitive.Close className="rounded-full p-1 text-[var(--d-admin-text-color-secondary)] hover:bg-[var(--d-admin-surface-hover)] hover:text-[var(--d-admin-text-color)] transition-colors">
              <Icon icon="lucide:x" className="size-5" />
            </DialogPrimitive.Close>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--d-admin-text-color-secondary)] uppercase tracking-wider">
                Unique ID
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--d-admin-text-color-secondary)] font-medium">
                  #
                </span>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                    setError(null);
                  }}
                  placeholder="features"
                  className="w-full rounded-md border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] pl-7 pr-3 py-2 text-sm text-[var(--d-admin-text-color)] placeholder:text-[var(--d-admin-text-color-secondary)] focus:border-[var(--d-admin-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--d-admin-primary)] transition-all"
                  autoFocus
                />
              </div>
              {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
              <p className="text-xs text-[var(--d-admin-text-color-secondary)]">
                Use this ID to link to this section from buttons or nav links
                (e.g. link to <strong>#features</strong>).
              </p>
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
                className="rounded-md bg-[var(--d-admin-primary)] px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-[var(--d-admin-primary)]/90"
              >
                Save ID
              </button>
            </div>
          </form>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
