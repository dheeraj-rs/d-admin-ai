import { useEffect, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import { classMixin } from '../lib/class-utils';
import { useProjectsStore } from '../store/projects-store';

interface LinkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  element: HTMLAnchorElement | null;
  sectionIds?: string[];
}

export function LinkDialog({
  isOpen,
  onClose,
  element,
  sectionIds = [],
}: LinkDialogProps) {
  const [link, setLink] = useState('');
  const [newTab, setNewTab] = useState(true);
  const { currentProjectId, getProject } = useProjectsStore();

  useEffect(() => {
    if (element && element.href) {
      const url = new URL(element.href);
      if (url.origin === window.location.origin) {
        if (url.pathname === window.location.pathname) {
          setLink(url.hash);
        } else {
          setLink(url.pathname + url.hash);
        }
      } else {
        setLink(element.href);
      }
      setNewTab(element.target === '_blank');
    } else {
      setLink('');
      setNewTab(false);
    }
  }, [element]);

  const onSave = () => {
    if (!element) return;

    const linkElement = element;
    onClose();
    setLink('');
    linkElement.href = link;
    linkElement.target = newTab ? '_blank' : '_self';
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="animate-in fade-in-0 fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity" />
        <DialogPrimitive.Content
          className={classMixin(
            'fixed z-50 rounded-lg bg-[var(--d-admin-surface-ground)] p-4 shadow-xl',
            'w-[95vw] max-w-md md:w-full',
            'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform',
            'border border-[var(--d-admin-surface-border)]',
          )}
        >
          <DialogPrimitive.Title className="text-sm font-medium text-[var(--d-admin-text-color)]">
            Update Link
          </DialogPrimitive.Title>

          <div className="mt-6 mb-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <input
                  id="new-tab-checkbox"
                  checked={newTab}
                  type="checkbox"
                  onChange={(e) => setNewTab(e.target.checked)}
                  className="h-4 w-4 border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] text-[var(--d-admin-blue-600)] focus:ring-2 focus:ring-[var(--d-admin-blue-600)] rounded transition-all"
                />
                <label
                  htmlFor="new-tab-checkbox"
                  className="ml-2 text-sm text-[var(--d-admin-text-color)] cursor-pointer select-none"
                >
                  Open in new tab
                </label>
              </div>

              {(() => {
                const project = currentProjectId
                  ? getProject(currentProjectId)
                  : null;
                const showPages = newTab && project && project.pages.length > 0;
                const showSections =
                  !newTab && sectionIds && sectionIds.length > 0;

                if (showPages || showSections) {
                  return (
                    <div>
                      <label className="block text-xs font-medium text-[var(--d-admin-text-color-secondary)] mb-1">
                        {showPages ? 'Link to Page' : 'Link to Section'}
                      </label>
                      <select
                        className="block w-full rounded-lg border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] p-2.5 text-sm text-[var(--d-admin-text-color)] focus:border-[var(--d-admin-primary)] focus:ring-1 focus:ring-[var(--d-admin-primary)] outline-none transition-all"
                        onChange={(e) => {
                          if (e.target.value) {
                            setLink(e.target.value);
                          }
                        }}
                        value={
                          project?.pages.some((p) => p.path === link) ||
                          sectionIds.some((id) => `#${id}` === link)
                            ? link
                            : ''
                        }
                      >
                        <option value="">
                          {showPages
                            ? 'Select a page...'
                            : 'Select a section...'}
                        </option>

                        {showPages && (
                          <optgroup label="Pages">
                            {project.pages.map((page) => (
                              <option key={page.id} value={page.path}>
                                {page.name} ({page.path})
                              </option>
                            ))}
                          </optgroup>
                        )}

                        {showSections && (
                          <optgroup label="Sections (Current Page)">
                            {sectionIds.map((id) => (
                              <option key={id} value={`#${id}`}>
                                #{id}
                              </option>
                            ))}
                          </optgroup>
                        )}
                      </select>
                    </div>
                  );
                }
                return null;
              })()}

              <div>
                <label className="block text-xs font-medium text-[var(--d-admin-text-color-secondary)] mb-1">
                  URL
                </label>
                <input
                  type="text"
                  className="block w-full rounded-lg border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] p-2.5 text-sm text-[var(--d-admin-text-color)] focus:border-[var(--d-admin-primary)] focus:ring-1 focus:ring-[var(--d-admin-primary)] outline-none transition-all"
                  placeholder="Eg. https://github.com/LiveDuo/destack or #features"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <DialogPrimitive.Close
              onClick={onSave}
              className={classMixin(
                'inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium select-none',
                'border border-transparent bg-[var(--d-admin-blue-600)] text-[var(--d-admin-text-color)] hover:bg-[var(--d-admin-blue-700)] transition-colors shadow-sm',
              )}
            >
              Save
            </DialogPrimitive.Close>
          </div>

          <DialogPrimitive.Close
            onClick={() => onClose()}
            className={classMixin(
              'absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1',
            )}
          >
            <XMarkIcon className="h-4 w-4 text-[var(--d-admin-text-color-secondary)] hover:text-[var(--d-admin-text-color)] transition-colors" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
