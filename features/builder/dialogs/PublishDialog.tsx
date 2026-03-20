import { useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon';
import CodeBracketIcon from '@heroicons/react/24/outline/CodeBracketIcon';
import { classMixin } from '../lib/class-utils';
import { DeploymentModal } from './DeploymentModal';
import { Project } from '../store/projects-store';

interface PublishDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project;
  currentHtml?: string;
}

export function PublishDialog({
  isOpen,
  onClose,
  project,
  currentHtml = '',
}: PublishDialogProps) {
  const [showDeploymentModal, setShowDeploymentModal] = useState(false);
  const [deploymentFormat, setDeploymentFormat] = useState<'html' | 'react'>(
    'html',
  );

  const handleStaticHTMLClick = () => {
    setDeploymentFormat('html');
    onClose();
    setShowDeploymentModal(true);
  };

  const handleReactClick = () => {
    setDeploymentFormat('react');
    onClose();
    setShowDeploymentModal(true);
  };

  return (
    <>
      <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm" />
          <DialogPrimitive.Content
            className={classMixin(
              'fixed z-[9999] rounded-xl bg-[var(--d-admin-surface-ground)] shadow-2xl',
              'w-[90vw] max-w-lg',
              'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform',
              'border border-[var(--d-admin-surface-border)]',
            )}
          >
            <div className="border-b border-[var(--d-admin-surface-border)] px-6 py-4">
              <DialogPrimitive.Title className="text-lg font-semibold text-[var(--d-admin-text-color)]">
                Choose Deployment Format
              </DialogPrimitive.Title>
            </div>

            <div className="p-6 space-y-3">
              <button
                onClick={handleStaticHTMLClick}
                className={classMixin(
                  'flex w-full items-start gap-4 rounded-lg border-2 p-4',
                  'border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)]',
                  'transition-all duration-200',
                  'hover:border-[var(--d-admin-blue-600)] hover:bg-[var(--d-admin-surface-section)]',
                  'focus:outline-none focus:ring-2 focus:ring-[var(--d-admin-blue-600)] focus:ring-offset-2',
                  'group text-left',
                )}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--d-admin-surface-section)] transition-colors group-hover:bg-[var(--d-admin-blue-100)]">
                  <DocumentIcon className="h-6 w-6 text-[var(--d-admin-text-color-secondary)] transition-colors group-hover:text-[var(--d-admin-blue-600)]" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="mb-1 font-semibold text-[var(--d-admin-text-color)] transition-colors group-hover:text-[var(--d-admin-blue-600)]">
                    Static HTML
                  </div>
                  <div className="text-sm leading-relaxed text-[var(--d-admin-text-color-secondary)]">
                    Deploy as a standalone HTML file with Tailwind CSS
                  </div>
                </div>
              </button>

              <button
                onClick={handleReactClick}
                className={classMixin(
                  'flex w-full items-start gap-4 rounded-lg border-2 p-4',
                  'border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)]',
                  'transition-all duration-200',
                  'hover:border-[var(--d-admin-primary-600)] hover:bg-[var(--d-admin-surface-section)]',
                  'focus:outline-none focus:ring-2 focus:ring-[var(--d-admin-primary-600)] focus:ring-offset-2',
                  'group text-left',
                )}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--d-admin-surface-section)] transition-colors group-hover:bg-[var(--d-admin-primary-100)]">
                  <CodeBracketIcon className="h-6 w-6 text-[var(--d-admin-text-color-secondary)] transition-colors group-hover:text-[var(--d-admin-primary-600)]" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="mb-1 font-semibold text-[var(--d-admin-text-color)] transition-colors group-hover:text-[var(--d-admin-primary-600)]">
                    React Project (Vite)
                  </div>
                  <div className="text-sm leading-relaxed text-[var(--d-admin-text-color-secondary)]">
                    Deploy as a complete React + Vite + Tailwind CSS project
                  </div>
                </div>
              </button>
            </div>

            <DialogPrimitive.Close
              onClick={() => onClose()}
              className={classMixin(
                'absolute top-4 right-4 inline-flex items-center justify-center rounded-full p-1.5',
                'text-[var(--d-admin-text-color-secondary)]',
                'transition-colors hover:bg-[var(--d-admin-surface-hover)] hover:text-[var(--d-admin-text-color)]',
              )}
            >
              <XMarkIcon className="h-5 w-5" />
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>

      <DeploymentModal
        isOpen={showDeploymentModal}
        onClose={() => setShowDeploymentModal(false)}
        project={project}
        currentHtml={currentHtml}
        deploymentFormat={deploymentFormat}
      />
    </>
  );
}
