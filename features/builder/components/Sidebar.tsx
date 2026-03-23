import { useState, useEffect } from 'react';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon';
import { useBuilderStore, THEMES } from '../store/builder-store';
import { Category } from './Category';
import { Select } from './Select';
import { LayersPanel } from './LayersPanel';

export function Sidebar() {
  const {
    themeIndex,
    components,
    setThemeIndex,
    loadThemeComponents,
    setPendingAddComponent,
    sidebarView,
    setSidebarView,
  } = useBuilderStore();

  const [selectOpen, setSelectOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    loadThemeComponents(themeIndex);
  }, [themeIndex, loadThemeComponents]);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[var(--d-admin-surface-ground)] text-[var(--d-admin-text-color)] transition-colors duration-300">
      <div className="shrink-0 flex items-center gap-2 border-b border-[var(--border-main)] p-3">
        <Select
          trigger={
            <div className="flex h-[34px] w-full cursor-pointer items-center justify-between rounded-md border border-[var(--border-main)] bg-[var(--d-admin-surface-section)] px-3 text-sm shadow-sm transition-colors hover:bg-[var(--d-admin-surface-hover)]">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-[var(--d-admin-text-color-secondary)]">
                  Website Type :
                </span>
                <span className="truncate font-medium">
                  {THEMES[themeIndex].name}
                </span>
              </div>
              <ChevronDownIcon className="h-3.5 w-3.5 opacity-50 shrink-0 ml-2" />
            </div>
          }
          defaultValue={THEMES[themeIndex].name}
          values={THEMES.map((c) => c.name)}
          open={selectOpen}
          setOpen={setSelectOpen}
          onChange={(e) => {
            const index = THEMES.findIndex((r) => r.name === e);
            loadThemeComponents(index).then(() => setThemeIndex(index));
          }}
        />
        <button
          onClick={() =>
            setSidebarView(
              sidebarView === 'components' ? 'layers' : 'components',
            )
          }
          className={`flex h-[34px] items-center justify-between gap-3 rounded-md border px-3 transition-colors ${
            sidebarView === 'layers'
              ? 'border-[var(--d-admin-primary-color)] bg-[var(--d-admin-primary-color)] text-white'
              : 'border-[var(--border-main)] bg-[var(--d-admin-surface-section)] text-[var(--d-admin-text-color-secondary)] hover:bg-[var(--d-admin-surface-hover)] hover:text-[var(--d-admin-text-color)]'
          }`}
          title={
            sidebarView === 'components'
              ? 'Reorder Components'
              : 'Back to Components'
          }
        >
          <span
            className={`shrink-0 text-[10px] font-bold uppercase tracking-wider ${sidebarView === 'layers' ? 'text-white' : 'text-[var(--d-admin-text-color-secondary)]'}`}
          >
            ORDERING :
          </span>
          {sidebarView === 'components' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-4.5 w-4.5 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 6l4-4 4 4M8 18l4 4 4-4M4 12h16M4 9h16M4 15h16"
              />
            </svg>
          ) : (
            <Squares2X2Icon className="h-4.5 w-4.5 shrink-0" />
          )}
        </button>
      </div>

      <div className="custom-scrollbar flex-1 overflow-y-auto px-4 pb-4">
        {sidebarView === 'components' ? (
          Object.keys(components).map((c, i) => (
            <Category
              key={i}
              category={c}
              themeIndex={themeIndex}
              components={components[c]}
              standaloneServer={false}
              onComponentClick={(component, index) =>
                setPendingAddComponent({ component, category: c, index })
              }
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
            />
          ))
        ) : (
          <LayersPanel />
        )}
      </div>
    </div>
  );
}
