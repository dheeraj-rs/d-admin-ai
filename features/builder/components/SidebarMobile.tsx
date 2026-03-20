import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useBuilderStore } from '../store/builder-store';
import { Sidebar } from './Sidebar';

export function SidebarMobile() {
  const { showMobileSidebar, setMobileSidebar } = useBuilderStore();
  const [height, setHeight] = React.useState('45vh');
  const [isResizing, setIsResizing] = React.useState(false);
  const startY = React.useRef(0);
  const startH = React.useRef(0);

  if (!showMobileSidebar) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsResizing(true);
    startY.current = e.touches[0].clientY;
    const currentHeight = window.innerHeight * (parseFloat(height) / 100);
    startH.current = currentHeight || window.innerHeight * 0.45;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const delta = startY.current - e.touches[0].clientY;
    const newH = startH.current + delta;
    const maxH = window.innerHeight * 0.9;
    const minH = window.innerHeight * 0.2;

    if (newH > minH && newH < maxH) {
      setHeight(`${(newH / window.innerHeight) * 100}vh`);
    }
  };

  const handleTouchEnd = () => {
    setIsResizing(false);
  };

  return (
    <div
      style={{ height }}
      className={`animate-in slide-in-from-bottom fixed right-0 bottom-0 left-0 z-[9999] flex transform-gpu flex-col rounded-t-3xl border-t border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] shadow-[0_-10px_40px_rgba(0,0,0,0.3)] ${isResizing ? 'transition-none duration-0' : 'duration-300'}`}
    >
      <div
        className="flex w-full cursor-grab touch-none justify-center pt-2 pb-1 active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => {
          // Only close if it was a quick tap, not a drag
          // Logic could optionally be added, but for now specific close button exists
        }}
      >
        <div className="h-1.5 w-12 rounded-full bg-[var(--d-admin-surface-border)]" />
      </div>

      <div className="flex items-center justify-between border-b border-[var(--d-admin-surface-border)]/50 px-6 py-2">
        <span className="text-lg font-semibold text-[var(--d-admin-text-color)]">
          Add Element
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileSidebar(false)}
            className="rounded-full p-2 text-[var(--d-admin-text-color-secondary)] transition-colors hover:bg-[var(--d-admin-surface-hover)] hover:text-[var(--d-admin-text-color)]"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-x-hidden overflow-y-auto p-2 pb-8">
        <Sidebar />
      </div>
    </div>
  );
}
