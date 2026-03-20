'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Icon } from '@iconify/react';

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  itemName?: string;
}

export function DeleteConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  itemName,
}: DeleteConfirmationDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm animate-in fade-in-0" />
        <DialogPrimitive.Content className="fixed z-[101] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md rounded-lg border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] p-6 shadow-xl animate-in fade-in-0 zoom-in-95">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-[var(--d-admin-red-500)]/10">
              <Icon
                icon="lucide:trash-2"
                className="size-6 text-[var(--d-admin-red-500)]"
              />
            </div>
            <div className="flex-1">
              <DialogPrimitive.Title className="text-lg font-semibold text-[var(--d-admin-text-color)] mb-1">
                {title}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="text-sm text-[var(--d-admin-text-color-secondary)]">
                {message}
              </DialogPrimitive.Description>
            </div>
          </div>
          {itemName && (
            <div className="mb-6 rounded-md bg-[var(--d-admin-surface-section)] border border-[var(--d-admin-surface-border)] px-3 py-2">
              <p className="text-sm font-medium text-[var(--d-admin-text-color)] truncate">
                {itemName}
              </p>
            </div>
          )}

          <div className="mb-6 flex items-start gap-2 rounded-md bg-[var(--d-admin-red-500)]/5 border border-[var(--d-admin-red-500)]/20 px-3 py-2">
            <Icon
              icon="lucide:alert-triangle"
              className="size-4 text-[var(--d-admin-red-500)] mt-0.5 shrink-0"
            />
            <p className="text-xs text-[var(--d-admin-text-color-secondary)]">
              This action cannot be undone.
            </p>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-md text-[var(--d-admin-text-color)] hover:bg-[var(--d-admin-surface-hover)] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 text-sm font-medium rounded-md bg-[var(--d-admin-red-500)] text-white hover:bg-[var(--d-admin-red-600)] transition-colors shadow-sm"
            >
              Delete
            </button>
          </div>

          <DialogPrimitive.Close
            onClick={onClose}
            className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full p-1.5 text-[var(--d-admin-text-color-secondary)] transition-colors hover:bg-[var(--d-admin-surface-hover)] hover:text-[var(--d-admin-text-color)]"
          >
            <Icon icon="lucide:x" className="size-4" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
