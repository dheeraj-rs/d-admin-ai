import { useState, useEffect, useRef } from 'react';
import { ChevronUpIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useBuilderStore } from '../store/builder-store';

interface ReorderItem {
  id: string;
  element: HTMLElement;
  preview: string;
  thumbnail: string;
}

interface SortableItemProps {
  item: ReorderItem;
  index: number;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onDelete: (element: HTMLElement) => void;
  isFirst: boolean;
  isLast: boolean;
}

function SortableItem({
  item,
  index,
  onMoveUp,
  onMoveDown,
  onDelete,
  isFirst,
  isLast,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-2 rounded-lg border p-2 transition-all ${
        isDragging
          ? 'z-10 border-[var(--d-admin-primary-color)] bg-[var(--d-admin-surface-hover)] shadow-lg'
          : 'border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] hover:bg-[var(--d-admin-surface-hover)]'
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none p-2 text-[var(--d-admin-text-color-secondary)] active:cursor-grabbing hover:text-[var(--d-admin-text-color)]"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
        >
          <path
            d="M2.66669 5.33333H13.3334M2.66669 8H13.3334M2.66669 10.6667H9.33335"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--d-admin-primary-color)] text-[10px] font-bold text-white">
        {index + 1}
      </div>

      <div className="flex h-16 w-32 flex-shrink-0 items-center justify-center overflow-hidden rounded border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)]">
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.preview}
            className="h-full w-full object-contain"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg
              className="h-5 w-5 animate-spin text-[var(--d-admin-text-color-secondary)] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1 pl-1">
        <p className="truncate text-xs font-medium text-[var(--d-admin-text-color)]">
          {item.preview}
        </p>
      </div>

      <div className="flex flex-col gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 sm:opacity-100">
        <button
          onClick={() => onMoveUp(index)}
          disabled={isFirst}
          className={`rounded p-0.5 transition-colors ${
            isFirst
              ? 'cursor-not-allowed text-[var(--d-admin-text-color-secondary)] opacity-30'
              : 'text-[var(--d-admin-text-color-secondary)] hover:bg-[var(--d-admin-surface-hover)] hover:text-[var(--d-admin-text-color)]'
          }`}
        >
          <ChevronUpIcon className="h-3 w-3" />
        </button>
        <button
          onClick={() => onMoveDown(index)}
          disabled={isLast}
          className={`rounded p-0.5 transition-colors ${
            isLast
              ? 'cursor-not-allowed text-[var(--d-admin-text-color-secondary)] opacity-30'
              : 'text-[var(--d-admin-text-color-secondary)] hover:bg-[var(--d-admin-surface-hover)] hover:text-[var(--d-admin-text-color)]'
          }`}
        >
          <ChevronDownIcon className="h-3 w-3" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.element);
          }}
          className="rounded p-0.5 text-[var(--d-admin-text-color-secondary)] transition-colors hover:bg-red-500/10 hover:text-red-500"
          title="Delete component"
        >
          <TrashIcon className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

export function LayersPanel() {
  const { activeLayers, setActiveLayers, triggerReorder, components, themeIndex } = useBuilderStore();
  const [items, setItems] = useState<ReorderItem[]>([]);
  const cachedItems = useRef<ReorderItem[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    let isActive = true;

    const initialItems = activeLayers.map((comp) => {
      const cached = cachedItems.current.find((item) => item.element === comp);
      if (cached) return cached;
      return {
        id: `layer-${Math.random().toString(36).substring(2, 11)}`,
        element: comp,
        preview: getComponentPreview(comp),
        thumbnail: '',
      };
    });

    setItems(initialItems);
    cachedItems.current = initialItems;

    const generateThumbnails = async () => {
      let changed = false;
      const updatedItems = [...initialItems];

      for (let i = 0; i < updatedItems.length; i++) {
        if (!updatedItems[i].thumbnail && isActive) {
          try {
            const thumbPromise = generateThumbnail(updatedItems[i].element);
            const timeoutPromise = new Promise<string>((resolve) =>
              setTimeout(() => resolve('timeout'), 1500),
            );
            const result = await Promise.race([thumbPromise, timeoutPromise]);

            updatedItems[i].thumbnail =
              result === 'timeout'
                ? 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gUHJldmlldzwvdGV4dD48L3N2Zz4='
                : result;
            changed = true;
          } catch (e) {
            console.error('Thumbnail generation failed', e);
          }
        }
      }

      if (isActive && changed) {
        cachedItems.current = [...updatedItems];
        setItems([...updatedItems]);
      }
    };

    if (activeLayers.length > 0) {
      generateThumbnails();
    } else {
      cachedItems.current = [];
      setItems([]);
    }

    return () => {
      isActive = false;
    };
  }, [activeLayers]);

  const generateThumbnail = async (element: HTMLElement): Promise<string> => {
    // 1. Try to use the static preview.png from the component's folder
    try {
      const sidebarId = element.getAttribute('data-sidebar-id'); // e.g. "Hero-0"
      if (sidebarId) {
        const lastDash = sidebarId.lastIndexOf('-');
        const category = sidebarId.slice(0, lastDash);   // "Hero"
        const idx = parseInt(sidebarId.slice(lastDash + 1), 10); // 0
        const comp = components[category]?.[idx];
        if (comp?.folder) {
          // Determine the theme folder name
          const THEMES_MAP: Record<number, string> = {
            0: 'Business', 1: 'Landing', 2: 'Portfolio',
            3: 'E-Commerce', 4: 'Blog', 5: 'custom',
          };
          const themeFolder = THEMES_MAP[themeIndex] ?? 'Portfolio';
          const previewUrl = `/builder-elements/${themeFolder}/${comp.folder}/preview.png`;

          // Try loading the image
          const loaded = await new Promise<boolean>((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = previewUrl;
          });

          if (loaded) return previewUrl;
        }
      }
    } catch { /* fall through */ }

    // 2. Canvas-based thumbnail as fallback
    try {
      const style = window.getComputedStyle(element);
      const bg = style.backgroundColor || '#1f2937';
      const name =
        element.getAttribute('data-component-name') ||
        element.querySelector('h1,h2,h3')?.textContent?.trim().slice(0, 20) ||
        'Component';

      const isDark = (() => {
        const m = bg.match(/\d+/g);
        if (!m) return true;
        const [r, g, b] = m.map(Number);
        return (r * 299 + g * 587 + b * 114) / 1000 < 128;
      })();

      const w = 256, h = 100;
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error();

      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, isDark ? '#1e293b' : '#f8fafc');
      grad.addColorStop(1, isDark ? '#0f172a' : '#e2e8f0');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';
      ctx.lineWidth = 1;
      for (let y = 20; y < h; y += 12) {
        ctx.beginPath(); ctx.moveTo(16, y); ctx.lineTo(w - 16, y); ctx.stroke();
      }

      const accent = isDark ? '#6366f1' : '#4f46e5';
      ctx.fillStyle = accent;
      ctx.fillRect(0, 0, w, 3);

      ctx.fillStyle = isDark ? 'rgba(99,102,241,0.2)' : 'rgba(79,70,229,0.12)';
      ctx.beginPath();
      ctx.roundRect(12, 12, Math.min(name.length * 7 + 20, w - 24), 22, 11);
      ctx.fill();

      ctx.fillStyle = isDark ? '#a5b4fc' : '#4338ca';
      ctx.font = 'bold 11px system-ui,sans-serif';
      ctx.fillText(name, 22, 28);

      [[12, 44, 160, 10], [12, 60, 100, 8], [12, 74, 130, 8]].forEach(([x, y, bw, bh]) => {
        ctx.fillStyle = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)';
        ctx.beginPath(); ctx.roundRect(x, y, bw, bh, 4); ctx.fill();
      });

      return canvas.toDataURL('image/png', 0.8);
    } catch {
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzFlMjkzYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjExIiBmaWxsPSIjNjM2NmYxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UHJldmlldzwvdGV4dD48L3N2Zz4=';
    }
  };


  const getComponentPreview = (element: HTMLElement): string => {
    const dataName =
      element.getAttribute('data-component-name') ||
      element.getAttribute('data-name');

    if (dataName) {
      const icon = getIconForCategory(dataName);
      return `${icon} ${dataName}`;
    }

    const heading = element.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading?.textContent) {
      const text = heading.textContent.trim();
      const emoji = heading.tagName === 'H1' ? '🎯' : '📝';
      return text.length <= 25
        ? `${emoji} ${text}`
        : `${emoji} ${text.substring(0, 22)}...`;
    }

    return 'Component';
  };

  const getIconForCategory = (name: string): string => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('banner')) return '🎯';
    if (lowerName.includes('cta')) return '📢';
    if (lowerName.includes('footer')) return '📋';
    if (lowerName.includes('nav')) return '🧭';
    return '🧩';
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);

      const newOrder = newItems.map((i) => i.element);
      setActiveLayers(newOrder);
      triggerReorder();
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newItems = arrayMove(items, index, index - 1);
    setItems(newItems);
    setActiveLayers(newItems.map((i) => i.element));
    triggerReorder();
  };

  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    const newItems = arrayMove(items, index, index + 1);
    setItems(newItems);
    setActiveLayers(newItems.map((i) => i.element));
    triggerReorder();
  };

  const deleteElement = (element: HTMLElement) => {
    element.remove();
    // Immediately remove from local state and the store so the list is
    // updated without waiting for the debounced MutationObserver.
    const newItems = items.filter((i) => i.element !== element);
    cachedItems.current = newItems;
    setItems(newItems);
    setActiveLayers(newItems.map((i) => i.element));
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-2 overflow-y-auto p-2 custom-scrollbar">
        {items.length === 0 ? (
          <div className="py-8 text-center text-sm text-[var(--d-admin-text-color-secondary)]">
            No components added yet.
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {items.map((item, index) => (
                <SortableItem
                  key={item.id}
                  item={item}
                  index={index}
                  onMoveUp={moveUp}
                  onMoveDown={moveDown}
                  onDelete={deleteElement}
                  isFirst={index === 0}
                  isLast={index === items.length - 1}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}
