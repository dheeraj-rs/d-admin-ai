'use client';

import React, { useEffect, useRef, useState } from 'react';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import ArrowDownIcon from '@heroicons/react/24/outline/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/outline/ArrowUpIcon';
import CursorArrowRaysIcon from '@heroicons/react/24/outline/CursorArrowRaysIcon';
import HashtagIcon from '@heroicons/react/24/outline/HashtagIcon';

import { ImageDialog } from '../dialogs/ImageDialog';
import { ButtonDialog } from '../dialogs/ButtonDialog';
import { LinkDialog } from '../dialogs/LinkDialog';
import { SvgDialog } from '../dialogs/SvgDialog';
import { ExportDialog } from '../dialogs/ExportDialog';
import GitHubPushDialog from '../dialogs/GitHubPushDialog';
import { PublishDialog } from '../dialogs/PublishDialog';
import { SaveProjectModal } from '../dialogs/SaveProjectModal';
import { SetIdDialog } from '../dialogs/SetIdDialog';
import { savePage, loadPage } from '../lib/api';
import { debounce, isEventOnElement, isElementTopHalf } from '../lib/utils';
import { Component } from '../types';
import { exportAsHTML, exportAsReactProject } from '../lib/export-utils';
import { useBuilderStore } from '../store/builder-store';
import { useProjectsStore } from '../store/projects-store';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import '../styles/builder.css';

export function Workbench() {
  const {
    components,
    isPreview,
    error,
    pendingAddComponent,
    selectedElement,
    showImageDialog,
    showButtonDialog,
    showLinkDialog,
    showSvgDialog,
    showExportDialog,
    showPublishDialog,
    setPendingAddComponent,
    setSelectedElement,
    setShowImageDialog,
    setShowButtonDialog,
    setShowLinkDialog,
    setShowSvgDialog,
    setShowExportDialog,
    setShowPublishDialog,
    showSaveDialog,
    setShowSaveDialog,
    showGitHubPushDialog,
    setShowGitHubPushDialog,
    clearCanvasTrigger,
    setCanvasComponents,
    sidebarView,
    setActiveLayers,
    activeLayers,
    reorderTrigger,
    addToHistory,
    history,
    historyIndex,
    currentPage,
    markAsSaved,
  } = useBuilderStore();
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
  const { currentProjectId, getProject, updatePage } = useProjectsStore();
  const isMobile = useIsMobile();

  const canvasRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const moveUpRef = useRef<SVGSVGElement>(null);
  const moveDownRef = useRef<SVGSVGElement>(null);
  const deleteRef = useRef<SVGSVGElement>(null);
  const hashtagRef = useRef<SVGSVGElement>(null);
  const popoverElementRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<SVGSVGElement>(null);

  const [hoveredComponent, setHoveredComponent] =
    useState<HTMLDivElement | null>(null);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(
    null,
  );
  const [isEmptyCanvas, setIsEmptyCanvas] = useState<boolean>(true);
  const [hasContent, setHasContent] = useState(false);
  const [canMoveUp, setCanMoveUp] = useState(false);
  const [canMoveDown, setCanMoveDown] = useState(false);
  const [showSetIdDialog, setShowSetIdDialog] = useState(false);
  const [activeComponentForId, setActiveComponentForId] =
    useState<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const standaloneServer = false;

  const onDomChange = () => {
    const config = {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    };
    const observer = new MutationObserver(
      debounce(() => {
        const html = canvasRef.current?.innerHTML;
        if (html !== undefined) {
          savePage(html, standaloneServer);
          addToHistory(html);
          const { currentProjectId, getProject } = useProjectsStore.getState();
          const { currentPage } = useBuilderStore.getState();
          if (currentProjectId && currentPage) {
            const project = getProject(currentProjectId);
            const page = project?.pages.find((p) => p.path === currentPage);
            if (page) {
              useProjectsStore
                .getState()
                .updatePage(currentProjectId, page.id, { html });
            }
          }
        }
        setHasContent(!!html && html.trim().length > 0);
        setIsEmptyCanvas(!html || html.trim().length === 0);
        if (canvasRef.current) {
          const newMap: Record<string, number[]> = {};
          const children = Array.from(canvasRef.current.children);
          children.forEach((child, index) => {
            const sidebarId = (child as HTMLElement).getAttribute(
              'data-sidebar-id',
            );
            if (sidebarId) {
              if (!newMap[sidebarId]) newMap[sidebarId] = [];
              newMap[sidebarId].push(index + 1);
            }
          });
          setCanvasComponents(newMap);
        }
      }),
    );
    observer.observe(canvasRef.current!, config);
    return observer;
  };

  useEffect(() => {
    if (canvasRef.current) {
      const observer = onDomChange();
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.innerHTML = '';
      setHasContent(false);
      setIsEmptyCanvas(true);
      savePage('', standaloneServer);
      setActiveLayers([]);
    }
  }, [clearCanvasTrigger]);

  useEffect(() => {
    if (sidebarView === 'layers' && canvasRef.current) {
      const components = Array.from(canvasRef.current.children ?? []).filter(
        (c) => c.tagName !== 'SCRIPT' && c.tagName !== 'STYLE',
      ) as HTMLDivElement[];
      setActiveLayers(components);
    }
  }, [sidebarView, setActiveLayers]);

  useEffect(() => {
    if (reorderTrigger > 0 && canvasRef.current && activeLayers.length > 0) {
      canvasRef.current.innerHTML = '';
      activeLayers.forEach((element) => {
        canvasRef.current!.appendChild(element);
      });
    }
  }, [reorderTrigger]);

  useEffect(() => {
    if (!canvasRef.current || history.length === 0) return;

    const currentHistoryHtml = history[historyIndex];
    if (
      currentHistoryHtml !== undefined &&
      canvasRef.current.innerHTML !== currentHistoryHtml
    ) {
      canvasRef.current.innerHTML = currentHistoryHtml;
      setHasContent(
        !!currentHistoryHtml && currentHistoryHtml.trim().length > 0,
      );
      setIsEmptyCanvas(
        !currentHistoryHtml || currentHistoryHtml.trim().length === 0,
      );
      savePage(currentHistoryHtml, standaloneServer);

      // Sync layers panel after history navigation (undo/redo)
      const layers = Array.from(canvasRef.current.children).filter(
        (c) => c.tagName !== 'SCRIPT' && c.tagName !== 'STYLE',
      ) as HTMLDivElement[];
      setActiveLayers(layers);
    }
  }, [historyIndex, history]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const syncLayers = () => {
      if (!canvasRef.current) return;
      const layers = Array.from(canvasRef.current.children).filter(
        (c) => c.tagName !== 'SCRIPT' && c.tagName !== 'STYLE',
      ) as HTMLDivElement[];
      setActiveLayers(layers);
    };

    if (currentProjectId) {
      const project = getProject(currentProjectId);
      if (project) {
        const page = project.pages.find((p) => p.path === currentPage);
        const html = page?.html || '';
        canvasRef.current.innerHTML = html;
        savePage(html, standaloneServer);
        addToHistory(html);
        setHasContent(!!html && html.trim().length > 0);
        setIsEmptyCanvas(!html || html.trim().length === 0);
        markAsSaved();
        syncLayers();
      }
    } else {
      loadPage(standaloneServer).then((html) => {
        if (
          canvasRef.current &&
          !useProjectsStore.getState().currentProjectId
        ) {
          canvasRef.current.innerHTML = html;
          setHasContent(!!html && html.trim().length > 0);
          setIsEmptyCanvas(!html || html.trim().length === 0);
          markAsSaved();
          syncLayers();
        }
      });
    }
  }, [currentProjectId, getProject, standaloneServer, currentPage]);

  const { headerAction, setHeaderAction } = useBuilderStore();

  useEffect(() => {
    if (headerAction === 'preparePublish') {
      if (canvasRef.current) {
        const html = canvasRef.current.innerHTML;
        localStorage.setItem('drag-drop-builder-html', html);
        setShowPublishDialog(true);
      }
      setHeaderAction(null);
    } else if (headerAction === 'save') {
      setShowSaveDialog(true);
      setHeaderAction(null);
    } else if (headerAction === 'refreshPreview') {
      setIsLoading(true);
      setTimeout(() => {
        const { currentProjectId, getProject } = useProjectsStore.getState();
        const { currentPage } = useBuilderStore.getState();

        if (canvasRef.current) {
          if (currentProjectId) {
            const project = getProject(currentProjectId);
            const page = project?.pages.find((p) => p.path === currentPage);
            if (page) {
              canvasRef.current.innerHTML = page.html;
              setHasContent(!!page.html && page.html.trim().length > 0);
              setIsEmptyCanvas(!page.html || page.html.trim().length === 0);
              markAsSaved();
            }
          } else {
            loadPage(standaloneServer).then((html) => {
              if (canvasRef.current) {
                canvasRef.current.innerHTML = html;
                setHasContent(!!html && html.trim().length > 0);
                setIsEmptyCanvas(!html || html.trim().length === 0);
                markAsSaved();
              }
            });
          }
        }
        setIsLoading(false);
        setHeaderAction(null);
      }, 500);
    }
  }, [
    headerAction,
    setHeaderAction,
    setShowPublishDialog,
    setShowSaveDialog,
    currentProjectId,
    getProject,
    currentPage,
    standaloneServer,
  ]);

  useEffect(() => {
    if (pendingAddComponent) {
      addComponentToCanvas(pendingAddComponent);
      setPendingAddComponent(null);
    }
  }, [pendingAddComponent, setPendingAddComponent]);

  useEffect(() => {
    if (!isMobile || !canvasRef.current) return;

    const canvas = canvasRef.current;
    let touchStartY = 0;
    let isScrolling = false;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      isScrolling = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchMoveY = e.touches[0].clientY;
      const deltaY = Math.abs(touchMoveY - touchStartY);

      if (deltaY > 10) {
        isScrolling = true;
        canvas.style.userSelect = 'none';
        canvas.style.webkitUserSelect = 'none';
      }
    };

    const handleTouchEnd = () => {
      if (isScrolling) {
        setTimeout(() => {
          canvas.style.userSelect = '';
          canvas.style.webkitUserSelect = '';
        }, 50);
      }
      isScrolling = false;
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, hasContent]);

  const clearComponents = async () => {
    canvasRef.current!.innerHTML = '';
  };

  const getComponents = (): HTMLDivElement[] => {
    return Array.from(canvasRef.current?.children ?? []).filter(
      (c) => c.tagName !== 'SCRIPT' && c.tagName !== 'STYLE',
    ) as HTMLDivElement[];
  };

  const onCanvasDrop = async (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();

    const [categoryId, componentId] = e
      .dataTransfer!.getData('component')
      .split('-');
    if (!components[categoryId] || !components[categoryId][Number(componentId)])
      return;

    const component: Component = components[categoryId][Number(componentId)];
    const html = component.source;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const firstChild = tempDiv.firstElementChild as HTMLElement;
    if (firstChild) {
      const componentName = `${categoryId.toUpperCase()} ${parseInt(componentId) + 1}`;
      firstChild.setAttribute('data-component-name', componentName);
      firstChild.setAttribute(
        'data-sidebar-id',
        `${categoryId}-${componentId}`,
      );
    }

    const modifiedHtml = tempDiv.innerHTML;

    const _components = getComponents();
    if (_components.length === 0) {
      canvasRef.current!.innerHTML = modifiedHtml;
    } else if (hoveredComponent && isElementTopHalf(hoveredComponent!, e)) {
      hoveredComponent!.insertAdjacentHTML('beforebegin', modifiedHtml);
    } else if (hoveredComponent && !isElementTopHalf(hoveredComponent!, e)) {
      hoveredComponent!.insertAdjacentHTML('afterend', modifiedHtml);
    }

    removeBorders();
    setHoveredComponent(null);
    setIsEmptyCanvas(false);

    const newLayers = Array.from(canvasRef.current!.children).filter(
      (c) => c.tagName !== 'SCRIPT' && c.tagName !== 'STYLE',
    ) as HTMLDivElement[];
    setActiveLayers(newLayers);
  };

  const onCanvasMouseOver = (e: React.MouseEvent<HTMLElement>) => {
    if (!popoverRef.current) return;

    const target = e.target as HTMLElement;
    const canvasRect = canvasRef.current!.getBoundingClientRect();

    const positionPopover = (element: HTMLElement, popover: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      popover.style.top = `${rect.top - canvasRect.top}px`;
      popover.style.left = `${rect.left - canvasRect.left}px`;
    };

    if (target.tagName === 'A') {
      setHoveredElement(target);
      if (popoverElementRef.current) {
        positionPopover(target, popoverElementRef.current);
      }
    } else if (target.tagName === 'BUTTON') {
      setHoveredElement(target);
      if (popoverElementRef.current) {
        positionPopover(target, popoverElementRef.current);
      }
    }

    const components = getComponents();
    const component = components.find((c) => c.matches(':hover'));
    if (!component) return;

    setHoveredComponent(component);
    if (popoverRef.current) {
      positionPopover(component, popoverRef.current);
    }

    const index = components.indexOf(component);
    setCanMoveUp(index > 0);
    setCanMoveDown(index < components.length - 1);
  };

  const onCanvasMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (!isEventOnElement(popoverRef.current!, e)) {
      setHoveredComponent(null);
    }
  };

  const onCanvasMouseOut = (e: React.MouseEvent<HTMLElement>) => {
    if (!isEventOnElement(popoverElementRef.current!, e)) {
      setHoveredElement(null);
    }
  };

  const onComponentSetId = () => {
    if (!hoveredComponent) return;
    setActiveComponentForId(hoveredComponent);
    setShowSetIdDialog(true);
  };

  const handleSaveId = (newId: string) => {
    if (activeComponentForId) {
      if (newId.trim() === '') {
        activeComponentForId.removeAttribute('id');
      } else {
        activeComponentForId.id = newId;
      }

      if (canvasRef.current) {
        savePage(canvasRef.current.innerHTML, standaloneServer);
      }
    }
    setActiveComponentForId(null);
  };

  const onCanvasClickCapture = (e: React.MouseEvent<HTMLElement>) => {
    if (isPreview) {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor) {
        e.preventDefault();
        e.stopPropagation();

        const href = anchor.getAttribute('href');
        if (href) {
          const { currentProjectId, getProject } = useProjectsStore.getState();

          if (href.startsWith('#')) {
            const id = href.substring(1);
            const targetElement = canvasRef.current?.querySelector(
              `[id="${id}"]`,
            );
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            return;
          }

          const isInternal = href.startsWith('/') && !href.startsWith('//');

          if (isInternal) {
            useBuilderStore.getState().setCurrentPage(href);
          } else {
            window.open(href, '_blank');
          }
        }
      }
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const target = e.target as HTMLElement;
    setSelectedElement(target);

    if (target.tagName === 'IMG') {
      setShowImageDialog(true);
    } else if (target.tagName === 'path') {
      setShowSvgDialog(true);
    } else if (target.tagName === 'svg') {
      setShowSvgDialog(true);
    }

    if (isEventOnElement(deleteRef.current, e)) {
      const clickEvent = new MouseEvent('click', { bubbles: true });
      deleteRef.current!.dispatchEvent(clickEvent);
    } else if (isEventOnElement(moveUpRef.current, e)) {
      const clickEvent = new MouseEvent('click', { bubbles: true });
      moveUpRef.current!.dispatchEvent(clickEvent);
    } else if (isEventOnElement(moveDownRef.current, e)) {
      const clickEvent = new MouseEvent('click', { bubbles: true });
      moveDownRef.current!.dispatchEvent(clickEvent);
    } else if (isEventOnElement(hashtagRef.current, e)) {
      const clickEvent = new MouseEvent('click', { bubbles: true });
      hashtagRef.current!.dispatchEvent(clickEvent);
    }
  };

  const onComponentDelete = () => {
    if (canvasRef.current && hoveredComponent) {
      canvasRef.current.removeChild(hoveredComponent);
      setHoveredComponent(null);

      const newLayers = Array.from(canvasRef.current.children).filter(
        (c) => c.tagName !== 'SCRIPT' && c.tagName !== 'STYLE',
      ) as HTMLDivElement[];
      setActiveLayers(newLayers);
    }
  };

  const onComponentMoveUp = () => {
    if (
      canvasRef.current &&
      hoveredComponent &&
      hoveredComponent.previousElementSibling
    ) {
      canvasRef.current.insertBefore(
        hoveredComponent,
        hoveredComponent.previousElementSibling,
      );
      setHoveredComponent(null);

      const newLayers = Array.from(canvasRef.current.children).filter(
        (c) => c.tagName !== 'SCRIPT' && c.tagName !== 'STYLE',
      ) as HTMLDivElement[];
      setActiveLayers(newLayers);
    }
  };

  const onComponentMoveDown = () => {
    if (
      canvasRef.current &&
      hoveredComponent &&
      hoveredComponent.nextElementSibling
    ) {
      canvasRef.current.insertBefore(
        hoveredComponent.nextElementSibling,
        hoveredComponent,
      );
      setHoveredComponent(null);

      const newLayers = Array.from(canvasRef.current.children).filter(
        (c) => c.tagName !== 'SCRIPT' && c.tagName !== 'STYLE',
      ) as HTMLDivElement[];
      setActiveLayers(newLayers);
    }
  };

  const onCanvasDragOver = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const components = getComponents();
    const isEmpty = components.length === 0;
    if (isEmpty !== isEmptyCanvas) setIsEmptyCanvas(isEmpty);

    if (components.length === 0) return;
    const componentWithEvent = components.find((c) => isEventOnElement(c, e));
    const component = componentWithEvent ?? components[components.length - 1];

    if (!component) return;

    const isTopHalf = isElementTopHalf(component, e);
    component.style.setProperty(
      'box-shadow',
      isTopHalf
        ? ' 0px 6px 0px -2px var(--d-admin-primary-color) inset'
        : '0px -6px 0px -2px var(--d-admin-primary-color) inset',
    );

    if (!component.isEqualNode(hoveredComponent)) {
      setHoveredComponent(component);
    }
  };

  const removeBorders = () => {
    const components = getComponents();
    components.forEach((c: HTMLDivElement) => {
      c.style.setProperty('box-shadow', '');
    });
  };

  const onCanvasDragLeave = (e: React.DragEvent<HTMLElement>) => {
    if (!canvasRef.current?.contains(e.relatedTarget as HTMLElement)) {
      setHoveredComponent(null);
      removeBorders();
    }
    setIsEmptyCanvas(false);
  };

  const addComponentToCanvas = (data: {
    component: Component;
    category: string;
    index: number;
  }) => {
    const { component, category, index } = data;
    const html = component.source;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const firstChild = tempDiv.firstElementChild as HTMLElement;
    if (firstChild) {
      const folderName = category || component.folder.replace(/[0-9]/g, '');
      const folderNumber = component.folder.match(/\d+/)?.[0] || '';
      const componentName = `${folderName.toUpperCase()} ${index + 1}`;

      firstChild.setAttribute('data-component-name', componentName.trim());
      firstChild.setAttribute('data-sidebar-id', `${category}-${index}`);
    }

    const modifiedHtml = tempDiv.innerHTML;

    if (canvasRef.current) {
      canvasRef.current.insertAdjacentHTML('beforeend', modifiedHtml);
      savePage(canvasRef.current.innerHTML, standaloneServer);

      const newLayers = Array.from(canvasRef.current.children).filter(
        (c) => c.tagName !== 'SCRIPT' && c.tagName !== 'STYLE',
      ) as HTMLDivElement[];
      setActiveLayers(newLayers);
    }
  };

  const handleApplyReorder = (newOrder: HTMLDivElement[]) => {
    if (!canvasRef.current) return;

    canvasRef.current.innerHTML = '';

    newOrder.forEach((element) => {
      canvasRef.current!.appendChild(element);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleToggleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const toggleBtn = target.closest('[data-collapse-toggle]');

      if (toggleBtn) {
        const targetId = toggleBtn.getAttribute('data-collapse-toggle');
        if (targetId) {
          const targetEl = canvas.querySelector(`#${targetId}`);
          if (targetEl) {
            targetEl.classList.toggle('hidden');
            const isExpanded =
              toggleBtn.getAttribute('aria-expanded') === 'true';
            toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
          }
        }
      }
    };

    canvas.addEventListener('click', handleToggleClick);
    return () => canvas.removeEventListener('click', handleToggleClick);
  }, []);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[var(--d-admin-surface-section)] text-[var(--d-admin-text-color)] border-t border-[var(--d-admin-surface-border)]">
      {/* Error Alert */}
      {error && (
        <div
          className="relative m-2 mx-4 rounded border border-red-500 bg-red-50 px-4 py-3 text-red-600"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div
        className={`relative flex-1 overflow-y-auto ${isPreview ? 'p-0' : ''}`}
      >
        {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[var(--d-admin-surface-ground)]/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-[var(--d-admin-surface-card)] shadow-lg border border-[var(--d-admin-surface-border)]">
              <svg
                className="animate-spin h-8 w-8 text-[var(--d-admin-primary)]"
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
              <span className="text-sm font-medium text-[var(--d-admin-text-color)]">
                Refreshing...
              </span>
            </div>
          </div>
        )}
        <div
          className={`flex min-h-full justify-center ${resolvedTheme === 'dark' ? 'dark bg-[#111827]' : 'light bg-white'}`}
        >
          <ImageDialog
            isOpen={showImageDialog}
            onClose={() => setShowImageDialog(false)}
            element={selectedElement as HTMLImageElement}
            standaloneServer={standaloneServer}
          />
          <ButtonDialog
            isOpen={showButtonDialog}
            onClose={() => setShowButtonDialog(false)}
            element={selectedElement as HTMLButtonElement}
          />
          <LinkDialog
            isOpen={showLinkDialog}
            onClose={() => setShowLinkDialog(false)}
            element={selectedElement as HTMLAnchorElement}
            sectionIds={
              canvasRef.current
                ? Array.from(canvasRef.current.querySelectorAll('[id]'))
                    .map((el) => el.id)
                    .filter((id) => id && id !== 'editor')
                : []
            }
          />
          <SvgDialog
            isOpen={showSvgDialog}
            onClose={() => setShowSvgDialog(false)}
            element={selectedElement as unknown as SVGElement}
          />
          <ExportDialog
            isOpen={showExportDialog}
            onClose={() => setShowExportDialog(false)}
            onExportHTML={() => {
              if (currentProjectId) {
                const project = getProject(currentProjectId);
                if (project && project.pages.length > 0) {
                  exportAsHTML(project.pages, project.name, resolvedTheme === 'dark');
                  return;
                }
              }

              if (canvasRef.current) {
                exportAsHTML(
                  [
                    {
                      id: 'draft',
                      name: 'Home',
                      path: '/index',
                      html: canvasRef.current.innerHTML,
                    },
                  ],
                  'draft-project',
                  resolvedTheme === 'dark',
                );
              }
            }}
            onExportReact={() => {
              if (currentProjectId) {
                const project = getProject(currentProjectId);
                if (project && project.pages.length > 0) {
                  exportAsReactProject(project.pages, project.name, resolvedTheme === 'dark');
                  return;
                }
              }

              if (canvasRef.current) {
                exportAsReactProject(
                  [
                    {
                      id: 'draft',
                      name: 'Home',
                      path: '/index',
                      html: canvasRef.current.innerHTML,
                    },
                  ],
                  'draft-project',
                  resolvedTheme === 'dark',
                );
              }
            }}
          />
          <PublishDialog
            isOpen={showPublishDialog}
            onClose={() => setShowPublishDialog(false)}
            project={
              currentProjectId ? getProject(currentProjectId) : undefined
            }
            currentHtml={canvasRef.current?.innerHTML}
          />
          <SaveProjectModal
            isOpen={showSaveDialog}
            onClose={() => setShowSaveDialog(false)}
            getHtmlContent={() => canvasRef.current?.innerHTML || ''}
          />
          <GitHubPushDialog
            isOpen={showGitHubPushDialog}
            onClose={() => setShowGitHubPushDialog(false)}
          />
          <SetIdDialog
            isOpen={showSetIdDialog}
            onClose={() => setShowSetIdDialog(false)}
            currentId={activeComponentForId?.id || ''}
            onSave={handleSaveId}
          />

          {!isPreview && (
            <div
              ref={popoverElementRef}
              className="absolute z-[100] rounded-md bg-gray-800 shadow-lg"
              style={{ display: hoveredElement ? 'block' : 'none' }}
            >
              <div className="flex flex-row p-1">
                <CursorArrowRaysIcon
                  ref={optionsRef}
                  onClick={() => {
                    setSelectedElement(hoveredElement);
                    if (hoveredElement?.tagName === 'BUTTON') {
                      setShowButtonDialog(true);
                    } else if (hoveredElement?.tagName === 'A') {
                      setShowLinkDialog(true);
                    }
                  }}
                  className="h-6 w-6 cursor-pointer p-1 text-white hover:text-blue-400"
                />
              </div>
            </div>
          )}

          {!isPreview && (
            <div
              ref={popoverRef}
              onMouseLeave={(e: any) => {
                if (!canvasRef.current?.isSameNode(e.target)) {
                  setHoveredComponent(null);
                }
              }}
              className="absolute z-[100] rounded-md bg-gray-800 shadow-lg"
              style={{ display: hoveredComponent ? 'block' : 'none' }}
            >
              <div className={`grid grid-cols-2 gap-2 p-2 ${useBuilderStore.getState().canvasTheme === 'dark' ? 'bg-[#1f2937]' : ''}`}>
                {canMoveDown && (
                  <ArrowDownIcon
                    ref={moveDownRef}
                    onClick={onComponentMoveDown}
                    className="h-6 w-6 cursor-pointer p-1 text-white hover:text-blue-400"
                  />
                )}
                {canMoveUp && (
                  <ArrowUpIcon
                    ref={moveUpRef}
                    onClick={onComponentMoveUp}
                    className="h-6 w-6 cursor-pointer p-1 text-white hover:text-blue-400"
                  />
                )}
                <HashtagIcon
                  ref={hashtagRef}
                  onClick={onComponentSetId}
                  className="h-6 w-6 cursor-pointer p-1 text-white hover:text-blue-400"
                  title="Set ID"
                />
                <TrashIcon
                  id="delete"
                  ref={deleteRef}
                  onClick={onComponentDelete}
                  className="h-6 w-6 cursor-pointer p-1 text-white hover:text-red-400"
                />
              </div>
            </div>
          )}

          <div
            id="editor"
            ref={canvasRef}
            className={`ease-animation flex-1 transition-all duration-300 ${isPreview ? 'min-h-full' : 'min-h-full'} bg-transparent ${isMobile ? 'touch-pan-y [&_img]:select-none [&_img]:[-webkit-user-drag:none]' : ''} ${!hasContent && !isPreview ? 'bg-[radial-gradient(circle_at_center,_var(--d-admin-surface-border)_1px,_transparent_1px)] [background-size:24px_24px] [background-position:center]' : ''} [&_img]:cursor-pointer`}
            onMouseOver={onCanvasMouseOver}
            onMouseLeave={onCanvasMouseLeave}
            onMouseOut={onCanvasMouseOut}
            onDrop={onCanvasDrop}
            onDragOver={onCanvasDragOver}
            onDragLeave={onCanvasDragLeave}
            onClickCapture={onCanvasClickCapture}
            style={{
              width: isPreview ? '100%' : '100%',
              maxWidth: isPreview ? '100%' : '1024px',
              outline: 'none',
            }}
            contentEditable={!isPreview && hasContent}
          />
        </div>
      </div>
    </div>
  );
}
