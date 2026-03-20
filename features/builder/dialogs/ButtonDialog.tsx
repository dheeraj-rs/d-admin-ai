import React, { useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import { classMixin } from '../lib/class-utils';
import { Select } from '../components/Select';

const capitalize = (text: string) =>
  text[0].toUpperCase() + text.substring(1, text.length);

const typeOptions = ['url', 'email', 'submit'];
const methodOptions = ['GET', 'POST'];

interface ButtonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  element: HTMLButtonElement | null;
}

export function ButtonDialog({ isOpen, onClose, element }: ButtonDialogProps) {
  const [openSelect, setOpenSelect] = useState(false);
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [submitUrl, setSubmitUrl] = useState('');
  const [submitMethod, setSubmitMethod] = useState('GET');
  const [submitAsync, setSubmitAsync] = useState(true);
  const [methodSelect, setMethodSelect] = useState(false);
  const [newTab, setNewTab] = useState(true);
  const [type, setType] = useState('url');

  const onSave = () => {
    if (!element) return;

    onClose();

    if (type === 'url') {
      if (newTab) {
        const source = `window.open('${url}', '_blank')`;
        element.setAttribute('onclick', source);
        element.setAttribute('type', 'button');
      } else {
        const source = `window.location.href = '${url}'`;
        element.setAttribute('onclick', source);
        element.setAttribute('type', 'button');
      }
    } else if (type === 'email') {
      const source = `window.location.href = 'mailto:${email}'`;
      element.setAttribute('onclick', source);
      element.setAttribute('type', 'button');
    } else if (type === 'submit') {
      if (submitAsync) {
        const source = `
          const e = arguments[0]
          const form = e.target.closest('form')

          const formData = new FormData()
          for (let e of form.elements) {
            if (e.type !== 'submit') {
              formData.append(e.id, e.type === 'radio' ? e.checked : e.value)
            }
          }

          const options = { method: '${submitMethod}', body: ${submitMethod !== 'GET' ? 'formData' : 'null'} }
          fetch('${submitUrl}', options)
            .then((e) => e.text().then((d) => ({ ok: e.ok, text: d })))
            .then(({ ok, text }) => {
              alert(ok ? text ?? 'Success' : 'Something went wrong')
          })
        `;
        element.setAttribute('onclick', source);
        element.setAttribute('type', 'button');
      } else {
        const source = `
          const e = arguments[0]
          const form = e.target.closest('form')
          form.submit()
        `;
        element.setAttribute('onclick', source);
        element.setAttribute('type', 'button');
      }
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
              Update Button
            </DialogPrimitive.Title>

            <div className="mt-2 text-sm font-normal text-(--d-admin-text-color-secondary)">
              <div className="mt-4 mb-4">
                <div>
                  <Select
                    trigger={
                      <div className="mb-4 ml-2 flex cursor-pointer items-center rounded px-4 py-2 transition">
                        {capitalize(type)}{' '}
                        <ChevronDownIcon className="ml-2 h-4 w-4" />
                      </div>
                    }
                    defaultValue={type}
                    values={typeOptions.map((o) => capitalize(o))}
                    open={openSelect}
                    setOpen={setOpenSelect}
                    onChange={(e) => setType(e.toLowerCase())}
                  />

                  <div>
                    {type === 'url' && (
                      <div className="mb-4 flex flex-col justify-center">
                        <input
                          type="text"
                          className="mb-4 block w-full rounded-lg border border-(--d-admin-surface-border) bg-(--d-admin-surface-ground) p-2.5 text-sm text-(--d-admin-text-color)"
                          placeholder="Eg. https://github.com/LiveDuo/destack"
                          defaultValue={url}
                          onChange={(e) => setUrl(e.target.value)}
                        />
                        <div className="ml-4 flex items-center">
                          <span>Open in new tab</span>
                          <input
                            defaultChecked={newTab}
                            type="checkbox"
                            onChange={(e) => setNewTab(e.target.checked)}
                            className="ml-4 h-4 w-4 border-(--d-admin-surface-border) bg-(--d-admin-surface-ground) text-(--d-admin-blue-600) focus:ring-2 focus:ring-(--d-admin-blue-600)"
                          />
                        </div>
                      </div>
                    )}
                    {type === 'email' && (
                      <div className="mb-4 flex justify-center">
                        <input
                          type="text"
                          className="block w-full rounded-lg border border-(--d-admin-surface-border) bg-(--d-admin-surface-ground) p-2.5 text-sm text-(--d-admin-text-color)"
                          placeholder="Eg. matt@mullenweg.com"
                          defaultValue={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    )}
                    {type === 'submit' && (
                      <div className="mb-4 flex flex-col justify-center">
                        <div className="mb-4 flex justify-end">
                          <input
                            type="text"
                            className="block w-full rounded-lg border border-(--d-admin-surface-border) bg-(--d-admin-surface-ground) p-2.5 text-sm text-(--d-admin-text-color)"
                            placeholder="Eg. /api/submit"
                            defaultValue={submitUrl}
                            onChange={(e) => setSubmitUrl(e.target.value)}
                          />
                          <Select
                            trigger={
                              <div className="ml-2 flex cursor-pointer items-center rounded px-4 py-2 transition">
                                {submitMethod}{' '}
                                <ChevronDownIcon className="ml-2 h-4 w-4" />
                              </div>
                            }
                            defaultValue={submitMethod}
                            values={methodOptions}
                            open={methodSelect}
                            setOpen={setMethodSelect}
                            onChange={(e) => setSubmitMethod(e)}
                          />
                        </div>
                        <div className="ml-4 flex items-center">
                          <span>Async</span>
                          <input
                            defaultChecked={submitAsync}
                            type="checkbox"
                            onChange={(e) => setSubmitAsync(e.target.checked)}
                            className="ml-4 h-4 w-4 border-(--d-admin-surface-border) bg-(--d-admin-surface-ground) text-(--d-admin-blue-600) focus:ring-2 focus:ring-(--d-admin-blue-600)"
                          />
                        </div>
                      </div>
                    )}
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
