import { useEffect, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import { classMixin } from '../lib/class-utils';

interface SvgDialogProps {
  isOpen: boolean;
  onClose: () => void;
  element: SVGElement | SVGPathElement | null;
}

export function SvgDialog({ isOpen, onClose, element }: SvgDialogProps) {
  const [path, setPath] = useState('');

  useEffect(() => {
    if (element) {
      if (element.tagName === 'path') {
        setPath(element.getAttribute('d') ?? '');
      } else if (element.tagName === 'svg') {
        const pathElement = element.querySelector('path');
        setPath(pathElement?.getAttribute('d') ?? '');
      } else {
        setPath('');
      }
    } else {
      setPath('');
    }
  }, [element]);

  const onSave = () => {
    if (!element) return;

    onClose();

    if (element.tagName === 'path') {
      element.setAttribute('d', path);
    } else if (element.tagName === 'svg') {
      const pathElement = element.querySelector('path');
      pathElement?.setAttribute('d', path);
    }
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay>
          <DialogPrimitive.Content
            className={classMixin(
              'fixed rounded-lg bg-[var(--d-admin-surface-ground)] p-4 shadow',
              'w-[95vw] max-w-md md:w-full',
              'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform',
            )}
          >
            <DialogPrimitive.Title className="text-sm font-medium text-(--d-admin-text-color)">
              Update SVG Path
            </DialogPrimitive.Title>

            <div className="mt-8 mb-4">
              <div>
                <div>
                  <div className="mb-4 flex flex-col justify-center">
                    <input
                      type="text"
                      className="mb-4 block w-full rounded-lg border border-(--d-admin-surface-border) bg-(--d-admin-surface-ground) p-2.5 text-sm text-(--d-admin-text-color)"
                      placeholder="Eg. d = 'M150 0 L75 200 L225 200 Z'"
                      defaultValue={path}
                      onChange={(e) => setPath(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <DialogPrimitive.Close
                onClick={onSave}
                className={classMixin(
                  'inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium select-none',
                  'border border-transparent bg-(--d-admin-blue-600) text-(--d-admin-text-color) hover:bg-(--d-admin-blue-700)',
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
              <XMarkIcon className="h-4 w-4 text-(--d-admin-text-color-secondary) hover:text-(--d-admin-text-color)" />
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
