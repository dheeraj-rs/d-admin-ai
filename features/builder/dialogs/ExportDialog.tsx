import Modal from '../components/ui/Modal';
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon';
import CodeBracketIcon from '@heroicons/react/24/outline/CodeBracketIcon';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onExportHTML: () => void;
  onExportReact: () => void;
}

export function ExportDialog({
  isOpen,
  onClose,
  onExportHTML,
  onExportReact,
}: ExportDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Choose Export Format"
      size="md"
    >
      <div className="space-y-4">
        <button
          onClick={() => {
            onExportHTML();
            onClose();
          }}
          className="flex w-full items-start gap-4 rounded-lg border-2 border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] p-4 transition-all duration-200 hover:border-[var(--d-admin-blue-600)] hover:bg-[var(--d-admin-surface-section)] group text-left"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--d-admin-surface-section)] transition-colors group-hover:bg-[var(--d-admin-blue-100)]">
            <DocumentIcon className="h-6 w-6 text-[var(--d-admin-text-color-secondary)] transition-colors group-hover:text-[var(--d-admin-blue-600)]" />
          </div>
          <div className="flex-1 pt-1">
            <div className="mb-1 font-semibold text-[var(--d-admin-text-color)] transition-colors group-hover:text-[var(--d-admin-blue-600)]">
              HTML File
            </div>
            <div className="text-sm leading-relaxed text-[var(--d-admin-text-color-secondary)]">
              Export as a standalone HTML file with inline Tailwind CSS
            </div>
          </div>
        </button>

        <button
          onClick={() => {
            onExportReact();
            onClose();
          }}
          className="flex w-full items-start gap-4 rounded-lg border-2 border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] p-4 transition-all duration-200 hover:border-[var(--d-admin-primary-600)] hover:bg-[var(--d-admin-surface-section)] group text-left"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--d-admin-surface-section)] transition-colors group-hover:bg-[var(--d-admin-primary-100)]">
            <CodeBracketIcon className="h-6 w-6 text-[var(--d-admin-text-color-secondary)] transition-colors group-hover:text-[var(--d-admin-primary-600)]" />
          </div>
          <div className="flex-1 pt-1">
            <div className="mb-1 font-semibold text-[var(--d-admin-text-color)] transition-colors group-hover:text-[var(--d-admin-primary-600)]">
              React Project (Vite)
            </div>
            <div className="text-sm leading-relaxed text-[var(--d-admin-text-color-secondary)]">
              Export as a complete React + Vite + Tailwind CSS project
            </div>
          </div>
        </button>
      </div>
    </Modal>
  );
}
