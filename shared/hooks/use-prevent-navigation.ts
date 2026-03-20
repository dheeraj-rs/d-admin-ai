import { useEffect, useCallback } from 'react';

/**
 * Hook to prevent accidental navigation when there are unsaved changes.
 *
 * @param isDirty - Boolean indicating if there are unsaved changes.
 * @param onTrigger - Optional callback to trigger a custom modal instead of window.confirm.
 * @param message - Optional custom message for native dialogs.
 * @returns Object containing confirmExit function to be called by custom modal.
 */
export function usePreventNavigation(
  isDirty: boolean,
  onTrigger?: () => void,
  message: string = 'You have unsaved changes. Are you sure you want to leave?',
) {
  // Function for the custom modal to call when the user confirms they want to leave
  const confirmExit = useCallback(() => {
    // We need to unwind the history trap.
    // The trap is 2 levels deep:
    // 1. The state we pushed when we entered the dirty state (or mount)
    // 2. The state we pushed again in popstate to re-trap
    // But since we are calling this from a modal (which might be after a popstate or just a button click),
    // we need to be careful.

    // If this is called after a popstate event (back button), we are at [Prev, Page].
    // Wait, let's trace:
    // 1. User is at Page.
    // 2. We push state -> [Prev, Page, Trap].
    // 3. User hits Back -> [Prev, Page]. popstate fires.
    // 4. We push state to re-trap -> [Prev, Page, Trap2].
    // 5. Modal shows.
    // 6. User clicks Leave -> confirmExit().
    // We want to go to [Prev].
    // So we need to go back 2 steps: Trap2 -> Page -> Prev.
    window.history.go(-2);
  }, []);

  useEffect(() => {
    // Only attach listener if dirty
    if (!isDirty) return;

    // 1. Handle browser refresh / close tab
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    // 2. Handle back button (mobile/desktop)
    // Push a "trap" state
    window.history.pushState(null, '', window.location.href);

    const handlePopState = (e: PopStateEvent) => {
      // Re-establish the trap immediately
      window.history.pushState(null, '', window.location.href);

      if (onTrigger) {
        // Use custom modal
        onTrigger();
      } else {
        // Fallback to native confirm
        if (window.confirm(message)) {
          // Unwind
          window.removeEventListener('popstate', handlePopState);
          window.removeEventListener('beforeunload', handleBeforeUnload);
          window.history.go(-2);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isDirty, message, onTrigger]);

  return { confirmExit };
}
