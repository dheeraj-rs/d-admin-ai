import { useBuilderStore } from '../store/builder-store';
import { Sidebar } from './Sidebar';

export function Interface() {
  const { isPreview } = useBuilderStore();

  if (isPreview) return null;

  return (
    <div className="h-full w-full overflow-hidden border-r border-t border-[var(--d-admin-surface-border)]">
      <Sidebar />
    </div>
  );
}
