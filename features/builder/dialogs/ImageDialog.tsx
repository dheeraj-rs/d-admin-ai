import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import Cropper from 'react-easy-crop';
import { classMixin } from '../lib/class-utils';
import getCroppedImg from '../lib/crop-utils';

interface ImageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  element: HTMLImageElement | null;
  standaloneServer: boolean;
}

export function ImageDialog({
  isOpen,
  onClose,
  element,
  standaloneServer,
}: ImageDialogProps) {
  const [url, setUrl] = useState<string>('');
  const [urlText, setUrlText] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isCropping, setIsCropping] = useState(false);

  const [aspect, setAspect] = useState(16 / 9);

  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (element) {
      setUrl(element.getAttribute('src') ?? '');

      const { width, height } = element.getBoundingClientRect();
      if (width && height) {
        setAspect(width / height);
      }
    }
  }, [element]);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const uploadedFile = e.target.files![0];
    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target!.result as string;
      setUrl(result);
      setIsCropping(true);
    };
    reader.readAsDataURL(uploadedFile);
  };

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const onSave = async () => {
    if (!element) return;

    if (isCropping && croppedAreaPixels && url) {
      try {
        const croppedImage = await getCroppedImg(url, croppedAreaPixels);
        // eslint-disable-next-line
        element.src = croppedImage;
      } catch (e) {
        console.error('Failed to crop image', e);
      }
    } else {
      // eslint-disable-next-line
            element.src = url;
    }

    onClose();
    setIsCropping(false);
    setZoom(1);
  };

  const onCancel = () => {
    onClose();
    setIsCropping(false);
    setZoom(1);
  };

  const [mediaSize, setMediaSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [resetAspectOnLoad, setResetAspectOnLoad] = useState(false);

  const onMediaLoaded = (mediaSize: {
    width: number;
    height: number;
    naturalWidth: number;
    naturalHeight: number;
  }) => {
    setMediaSize({
      width: mediaSize.naturalWidth,
      height: mediaSize.naturalHeight,
    });
    if (resetAspectOnLoad) {
      setAspect(mediaSize.naturalWidth / mediaSize.naturalHeight);
      setResetAspectOnLoad(false);
    }
  };

  const onUploadWithReset = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResetAspectOnLoad(true);
    onUpload(e);
  };

  const setAspectRatio = (ratio: number | undefined) => {
    if (ratio === undefined && mediaSize) {
      setAspect(mediaSize.width / mediaSize.height);
    } else if (ratio !== undefined) {
      setAspect(ratio);
    }
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onCancel}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay>
          <DialogPrimitive.Content
            className={classMixin(
              'fixed rounded-lg bg-[var(--d-admin-surface-ground)] p-4 shadow',
              'w-[95vw] max-w-md md:w-full',
              'flex max-h-[90vh] flex-col',
              'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform',
              'z-50',
            )}
          >
            <DialogPrimitive.Title className="shrink-0 text-sm font-medium text-(--d-admin-text-color)">
              {isCropping ? 'Crop Image' : 'Upload Image'}
            </DialogPrimitive.Title>

            <div className="mt-4 mb-4 flex min-h-0 flex-1 flex-col">
              {!url || !isCropping ? (
                <div>
                  <div className="mt-8 mb-4 flex justify-center">
                    <input
                      ref={input}
                      type="file"
                      onChange={onUpload}
                      style={{ display: 'none' }}
                      accept="image/*"
                    />
                    <button
                      className="rounded-md border border-(--d-admin-blue-600) bg-transparent px-4 py-2 text-sm font-medium text-(--d-admin-blue-600) hover:bg-(--d-admin-blue-700) hover:text-(--d-admin-text-color)"
                      onClick={() => input.current?.click()}
                    >
                      Upload
                    </button>
                  </div>
                  <div className="mb-4 flex justify-center">OR</div>
                  <div className="mb-4 flex justify-center">
                    <input
                      type="text"
                      className="block w-full rounded-lg border border-(--d-admin-surface-border) bg-(--d-admin-surface-ground) p-2.5 text-sm text-(--d-admin-text-color)"
                      placeholder="Eg. https://www.w3schools.com/html/pic_trulli.jpg"
                      onChange={(e) => setUrlText(e.target.value)}
                    />
                    <button
                      onClick={() => {
                        setUrl(urlText);
                        setIsCropping(true);
                      }}
                      className={classMixin(
                        'rounded-md border bg-transparent px-4 py-2 text-sm font-medium',
                        'border border-transparent text-(--d-admin-blue-600) hover:opacity-50',
                        `${urlText !== '' ? 'hover:opacity-50' : 'cursor-not-allowed opacity-50'}`,
                      )}
                      disabled={urlText === ''}
                    >
                      Set
                    </button>
                  </div>
                  {url && (
                    <div className="mt-4 flex justify-center">
                      <img
                        src={url}
                        alt="Current"
                        className="max-h-40 rounded object-contain"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative flex h-64 shrink-0 flex-col md:h-80">
                  <div className="relative flex-1 overflow-hidden rounded bg-black">
                    <Cropper
                      image={url}
                      crop={crop}
                      zoom={zoom}
                      aspect={aspect}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                      onMediaLoaded={onMediaLoaded}
                    />
                  </div>

                  <div className="mt-4 flex flex-col space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="w-12 text-xs text-(--d-admin-text-color-secondary)">
                        Zoom:
                      </span>
                      <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="h-1 flex-1 cursor-pointer appearance-none rounded-lg bg-gray-600"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-auto flex justify-end pt-2">
              {url && !isCropping && (
                <button
                  style={{ marginRight: 'auto' }}
                  className={classMixin(
                    'rounded-md border bg-transparent px-4 py-2 text-sm font-medium',
                    'border border-transparent text-(--d-admin-blue-600) hover:opacity-50',
                  )}
                  onClick={() => {
                    input.current?.click();
                  }}
                >
                  Replace
                </button>
              )}

              {isCropping && (
                <button
                  style={{ marginRight: 'auto' }}
                  className={classMixin(
                    'rounded-md border bg-transparent px-4 py-2 text-sm font-medium',
                    'border border-transparent text-(--d-admin-text-color-secondary) hover:text-(--d-admin-text-color)',
                  )}
                  onClick={() => setIsCropping(false)}
                >
                  Back
                </button>
              )}

              <DialogPrimitive.Close
                onClick={onSave}
                className={classMixin(
                  'inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium select-none',
                  `border border-transparent bg-(--d-admin-blue-600) text-(--d-admin-text-color) ${
                    url
                      ? 'hover:bg-(--d-admin-blue-700)'
                      : 'cursor-not-allowed opacity-50'
                  }`,
                )}
                disabled={!url}
              >
                {isCropping ? 'Crop & Save' : 'Save'}
              </DialogPrimitive.Close>
            </div>

            <DialogPrimitive.Close
              onClick={onCancel}
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
