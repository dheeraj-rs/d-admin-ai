import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useBuilderStore } from '../store/builder-store';
import { useProjectsStore } from '../store/projects-store';
import { CreateProjectDialog } from '../dialogs/CreateProjectDialog';
import { DeleteConfirmationDialog } from '../dialogs/DeleteConfirmationDialog';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  'All',
  'Portfolio',
  'Landing Pages',
  'E-commerce',
  'Business',
  'Events',
];

export function TemplatesList() {
  const { setProjectsGalleryTab, setShowProjectsGallery } = useBuilderStore();
  const {
    templates,
    saveProject,
    setCurrentProject,
    deleteTemplate,
    toggleTemplateLike,
    incrementTemplateUsage,
    likedTemplateIds,
  } = useProjectsStore();
  const router = useRouter();
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTemplates = (
    activeCategory === 'All'
      ? templates
      : templates.filter((t) => t.category === activeCategory)
  )
    .slice()
    .reverse();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    templateId: string | null;
    templateName: string;
  }>({
    isOpen: false,
    templateId: null,
    templateName: '',
  });

  const handleUseTemplate = (template: any) => {
    incrementTemplateUsage(template.id);
    setCurrentProject(null);
    useBuilderStore.getState().setCurrentPage('/index');
    useBuilderStore.getState().addToHistory(template.html || '');
    setShowProjectsGallery(false);
    router.push('/drag-drop-builder');
  };

  const handleDeleteTemplate = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const template = templates.find((t) => t.id === id);
    setDeleteDialog({
      isOpen: true,
      templateId: id,
      templateName: template?.title || 'this template',
    });
  };

  const confirmDelete = () => {
    if (deleteDialog.templateId) {
      deleteTemplate(deleteDialog.templateId);
    }
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  React.useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex flex-col h-full w-full relative">
      <div className="flex items-center justify-between mb-8 gap-4 shrink-0 px-1 relative z-30">
        <div className="flex items-center min-w-0 relative group/scroll flex-1 max-w-[70%] gap-3">
          <button
            onClick={() => setProjectsGalleryTab('projects')}
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-md bg-[var(--d-admin-surface-section)] border border-[var(--d-admin-surface-border)] text-[var(--d-admin-text-color-secondary)] hover:text-[var(--d-admin-text-color)] hover:bg-[var(--d-admin-surface-hover)] transition-all shrink-0"
            title="View Saved Projects"
          >
            <Icon icon="lucide:folder" className="size-4" />
            <span className="hidden lg:inline">Saved Projects</span>
          </button>

          <div className="hidden sm:flex items-center gap-3 min-w-0 flex-1 relative">
            <div className="w-px h-6 bg-[var(--d-admin-surface-border)] shrink-0" />
            <div
              className={`absolute left-[20px] z-10 flex items-center h-full bg-gradient-to-r from-[var(--d-admin-surface-ground)] via-[var(--d-admin-surface-ground)] to-transparent pr-8 pl-0 ${showLeftArrow ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-opacity duration-200`}
            >
              <button
                onClick={() => scroll('left')}
                className="flex size-7 items-center justify-center rounded-full bg-[var(--d-admin-surface-ground)] border border-[var(--d-admin-surface-border)] shadow-sm text-[var(--d-admin-text-color)] hover:bg-[var(--d-admin-surface-hover)] transition-colors"
              >
                <Icon icon="ph:caret-left-bold" className="size-3" />
              </button>
            </div>

            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth px-1"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    activeCategory === cat
                      ? 'text-[var(--d-admin-text-color)] bg-[var(--d-admin-surface-section)]'
                      : 'text-[var(--d-admin-text-color-secondary)] hover:text-[var(--d-admin-text-color)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div
              className={`absolute right-0 z-10 flex items-center h-full bg-gradient-to-l from-[var(--d-admin-surface-ground)] via-[var(--d-admin-surface-ground)] to-transparent pl-8 pr-0 ${showRightArrow ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-opacity duration-200`}
            >
              <button
                onClick={() => scroll('right')}
                className="flex size-7 items-center justify-center rounded-full bg-[var(--d-admin-surface-ground)] border border-[var(--d-admin-surface-border)] shadow-sm text-[var(--d-admin-text-color)] hover:bg-[var(--d-admin-surface-hover)] transition-colors"
              >
                <Icon icon="ph:caret-right-bold" className="size-3" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="relative sm:hidden">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-[var(--d-admin-surface-border)] text-[var(--d-admin-text-color)] transition-colors shadow-sm shrink-0 ${showFilterDropdown ? 'bg-[var(--d-admin-surface-hover)]' : 'bg-[var(--d-admin-surface-section)] hover:bg-[var(--d-admin-surface-hover)]'}`}
            >
              <Icon icon="ph:sliders-horizontal" className="size-4" />
            </button>

            {showFilterDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowFilterDropdown(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] p-1 shadow-xl z-50 animate-in fade-in zoom-in-95 origin-top-right">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setShowFilterDropdown(false);
                      }}
                      className={`flex w-full items-center px-3 py-2 text-sm rounded-md transition-colors ${
                        activeCategory === cat
                          ? 'bg-[var(--d-admin-surface-hover)] text-[var(--d-admin-text-color)]'
                          : 'text-[var(--d-admin-text-color-secondary)] hover:bg-[var(--d-admin-surface-hover)] hover:text-[var(--d-admin-text-color)]'
                      }`}
                    >
                      {cat}
                      {activeCategory === cat && (
                        <Icon
                          icon="ph:check-bold"
                          className="ml-auto size-3.5"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <button
            onClick={() => setShowProjectsGallery(false)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-[var(--d-admin-surface-section)] border border-[var(--d-admin-surface-border)] text-[var(--d-admin-text-color)] hover:bg-[var(--d-admin-surface-hover)] transition-colors shadow-sm shrink-0"
          >
            <Icon icon="lucide:arrow-left" className="size-4" />
            <span className="hidden sm:inline">Back to Edit</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-x-9 sm:gap-y-9 pb-10">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="group flex flex-col gap-2 cursor-pointer"
            onClick={() => handleUseTemplate(template)}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)]">
              <div className="absolute inset-0 bg-[radial-gradient(var(--d-admin-surface-border)_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={template.thumbnail}
                  alt={template.title}
                  className="h-full w-full object-cover object-top transition-opacity duration-300"
                />
              </div>
              {template.video && (
                <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                </div>
              )}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-white font-medium text-sm truncate flex-1 drop-shadow-md">
                    {template.title}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUseTemplate(template);
                    }}
                    className="px-3 py-1.5 rounded-md bg-white text-black text-xs font-bold hover:bg-gray-100 transition-colors shadow-sm whitespace-nowrap"
                  >
                    Use Template
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between px-0.5 mt-1">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <img
                  src={template.authorAvatar}
                  alt={template.author}
                  className="size-6 rounded-full object-cover border border-[var(--d-admin-surface-border)]"
                />
                <span className="text-xs sm:text-sm font-medium text-[var(--d-admin-text-color)] truncate hover:underline">
                  {template.author}
                </span>
                {template.isTeam && (
                  <span className="px-1 py-[1px] rounded bg-[#CCC] text-white text-[9px] font-bold uppercase">
                    Team
                  </span>
                )}
                {template.deploymentUrl && (
                  <a
                    href={template.deploymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[var(--d-admin-blue-600)]/10 text-[var(--d-admin-blue-600)] hover:bg-[var(--d-admin-blue-600)]/20 transition-colors"
                    title="Visit Live Site"
                  >
                    <Icon icon="lucide:link" className="size-3" />
                    <span className="text-[10px] font-bold uppercase">
                      Live
                    </span>
                  </a>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs font-medium text-[var(--d-admin-text-color-secondary)] shrink-0">
                <button
                  className={`flex items-center gap-1 transition-colors ${likedTemplateIds?.includes(template.id) ? 'text-pink-500' : 'hover:text-pink-500'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTemplateLike(template.id);
                  }}
                  title="Like Template"
                >
                  <Icon
                    icon={
                      likedTemplateIds?.includes(template.id)
                        ? 'ph:heart-fill'
                        : 'ph:heart'
                    }
                    className="size-3.5"
                  />
                  <span>{template.likes}</span>
                </button>
                <div
                  className="flex items-center gap-1 hover:text-[var(--d-admin-text-color)] transition-colors"
                  title="Usage Count"
                >
                  <Icon icon="lucide:users" className="size-3.5" />
                  <span>{template.usageCount || 0}</span>
                </div>
                {template.author === 'You' && (
                  <button
                    className="p-1 rounded-md hover:bg-red-500/10 hover:text-red-500 transition-colors"
                    onClick={(e) => handleDeleteTemplate(e, template.id)}
                    title="Delete Template"
                  >
                    <Icon icon="lucide:trash-2" className="size-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <CreateProjectDialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
      />

      <DeleteConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={() =>
          setDeleteDialog({ isOpen: false, templateId: null, templateName: '' })
        }
        onConfirm={confirmDelete}
        title="Delete Template"
        message="Are you sure you want to delete this template? This action cannot be undone."
        itemName={deleteDialog.templateName}
      />
    </div>
  );
}
