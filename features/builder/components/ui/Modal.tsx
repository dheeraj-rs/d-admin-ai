'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = true,
  size = 'md',
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div
        ref={modalRef}
        className={`relative w-full ${sizeClasses[size]} animate-in zoom-in-95 rounded-lg border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-background)] shadow-2xl duration-200`}
        style={{ maxHeight: '90vh' }}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between rounded-t-lg border-b border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] px-6 py-4">
            {title && (
              <h2 className="text-xl font-semibold text-[var(--d-admin-text-color)]">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="rounded-md p-2 text-[var(--d-admin-text-color-secondary)] hover:bg-[var(--d-admin-surface-hover)] hover:text-[var(--d-admin-text-color)] transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}
        <div
          className={`overflow-y-auto ${title || showCloseButton ? 'rounded-b-lg' : 'rounded-lg'} bg-[var(--d-admin-surface-ground)] px-6 py-4`}
          style={{ maxHeight: 'calc(90vh - 70px)' }}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
