import { useState, useEffect } from 'react';
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon';
import ArrowSmallUpIcon from '@heroicons/react/24/outline/ArrowSmallUpIcon';
import { getImageUrl } from '../lib/utils';
import { Component } from '../types';
import { THEMES } from '../store/builder-store';

interface CategoryProps {
  themeIndex: number;
  category: string;
  components: Component[];
  standaloneServer: boolean;
  onComponentClick: (component: Component, index: number) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

import { useIsMobile } from '@/shared/hooks/use-mobile';
import { useBuilderStore } from '../store/builder-store';

export function Category({
  themeIndex,
  category,
  components,
  standaloneServer,
  onComponentClick,
  onDragStart,
  onDragEnd,
}: CategoryProps) {
  const [show, setShow] = useState(false);
  const isMobile = useIsMobile();
  const { canvasComponents, canvasTheme } = useBuilderStore();
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    if (canvasTheme === 'dark') return 'dark';
    if (canvasTheme === 'light') return 'light';
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (canvasTheme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () =>
        setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      setResolvedTheme(canvasTheme as 'light' | 'dark');
    }
  }, [canvasTheme]);

  return (
    <div id={category.toLowerCase()}>
      <div
        onClick={() => setShow((i) => !i)}
        className={`sticky top-0 z-10 flex h-12 cursor-pointer items-center border-b border-[var(--border-main)] bg-[var(--d-admin-surface-section)] px-2 text-[var(--d-admin-text-color)] transition-colors hover:bg-[var(--d-admin-surface-hover)] last:border-b-0 ${
          show ? 'shadow-sm' : ''
        }`}
      >
        <div className="flex flex-1 items-center">
          <Squares2X2Icon className="mr-4 ml-2 h-4 w-4" />{' '}
          <h2 className="text-xs uppercase">{category}</h2>
          {Object.keys(canvasComponents).some((k) =>
            k.startsWith(`${category}-`),
          ) && (
            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--d-admin-primary-color)] text-[10px] font-bold text-white">
              {Object.keys(canvasComponents)
                .filter((k) => k.startsWith(`${category}-`))
                .reduce((acc, k) => acc + canvasComponents[k].length, 0)}
            </span>
          )}
        </div>
        <div
          className="rotate-animation"
          style={{ transform: `rotate(${show ? 180 : 0}deg)` }}
        >
          <ArrowSmallUpIcon className="h-4 w-4" />
        </div>
      </div>
      {show && (
        <div
          className={`grid grid-cols-2 gap-2 p-3 transition-colors ${resolvedTheme === 'dark' ? 'bg-[#111827]' : 'bg-gray-50'}`}
        >
          {components.map((c: Component, i: number) => {
            const componentId = `${category}-${i}`;
            const addedPositions = canvasComponents[componentId] || [];

            return (
              <div key={i} className="relative group">
                <img
                  className={`h-auto w-full cursor-pointer rounded border border-transparent object-cover transition-all hover:border-[var(--d-admin-primary-color)] ${isMobile ? 'active:scale-95 active:opacity-80' : ''}`}
                  src={getImageUrl(
                    standaloneServer,
                    `/builder-elements/${THEMES[themeIndex].folder}/${c.folder}/preview.png`,
                  )}
                  draggable={!isMobile}
                  onClick={() => onComponentClick(c, i)}
                  onDragStart={(e) => {
                    e.dataTransfer.setData('component', `${category}-${i}`);
                    onDragStart();
                  }}
                  onDragEnd={onDragEnd}
                  alt={`${category} component ${i}`}
                />

                {addedPositions.length > 0 && (
                  <div className="absolute top-1 right-1 flex flex-col gap-1">
                    {addedPositions.map((pos) => (
                      <span
                        key={pos}
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--d-admin-primary-color)] text-[10px] font-bold text-white shadow-md ring-1 ring-white/20"
                      >
                        {pos}
                      </span>
                    ))}
                  </div>
                )}

                {!isMobile && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
                    <span className="text-xs font-medium text-white bg-black/60 px-2 py-1 rounded">
                      Add
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
