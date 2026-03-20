export function debounce(callback: Function, timeout = 1000) {
  let timer: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, timeout);
  };
}

export function getBaseUrl(standaloneServer: boolean): string {
  if (standaloneServer) {
    const standaloneServerPort = 12785;
    return `http://localhost:${standaloneServerPort}`;
  }

  return '/api/drag-drop-builder';
}

export function getImageUrl(
  standaloneServer: boolean,
  imageSrc: string,
): string {
  if (standaloneServer) {
    const standaloneServerPort = 12785;
    return `http://localhost:${standaloneServerPort}/asset?path=${imageSrc}`;
  }

  const baseUrl = process.env.NEXT_PUBLIC_ASSETS_URL || '';
  return baseUrl ? `${baseUrl}${imageSrc}` : imageSrc;
}

export function isEventOnElement(
  element: Element | null,
  event: React.MouseEvent<any> | MouseEvent,
): boolean {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom &&
    event.clientX >= rect.left &&
    event.clientX <= rect.right
  );
}

export function isElementTopHalf(
  element: Element | null,
  event: React.MouseEvent<any> | MouseEvent,
): boolean {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  const middle = (rect.bottom - rect.top) / 2 + rect.top;
  return event.clientY < middle;
}
