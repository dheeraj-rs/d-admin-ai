import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
  XMarkIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

interface UnsavedChangesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export function UnsavedChangesDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Unsaved Changes',
  description = 'You have unsaved changes. Are you sure you want to leave? Your changes will be lost.',
}: UnsavedChangesDialogProps) {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="animate-in fade-in-0 fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm transition-opacity" />
        <DialogPrimitive.Content
          className="
            fixed z-[9999] rounded-lg bg-[var(--d-admin-surface-ground)] p-6 shadow-xl
            w-[90vw] max-w-md
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform
            border border-[var(--d-admin-surface-border)]
          "
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                <ExclamationTriangleIcon
                  className="h-6 w-6 text-yellow-600 dark:text-yellow-500"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1">
                <DialogPrimitive.Title className="text-lg font-semibold text-[var(--d-admin-text-color)]">
                  {title}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="mt-1 text-sm text-[var(--d-admin-text-color-secondary)]">
                  {description}
                </DialogPrimitive.Description>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                type="button"
                className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-[var(--d-admin-text-color)] transition-colors hover:bg-[var(--d-admin-surface-hover)] border border-[var(--d-admin-surface-border)]"
                onClick={onClose}
              >
                Stay
              </button>
              <button
                type="button"
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-500"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                Leave
              </button>
            </div>

            <DialogPrimitive.Close
              onClick={onClose}
              className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
            >
              <XMarkIcon className="h-5 w-5 text-[var(--d-admin-text-color-secondary)] hover:text-[var(--d-admin-text-color)]" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
