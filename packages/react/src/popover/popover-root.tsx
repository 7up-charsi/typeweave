import React from 'react';
import { createContextScope } from '../context';
import { PopperRoot } from '../popper';
import { useCallbackRef } from '../use-callback-ref';
import { useControlled } from '../use-controlled';

export interface PopoverRootProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  keepMounted?: boolean;
}

interface PopoverCtxProps {
  open: boolean;
  handleOpen(): void;
  handleClose(): void;
  keepMounted: boolean;
  contentId: string;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const displayName = 'PopoverRoot';

const [PopoverCtx, usePopoverCtx] =
  createContextScope<PopoverCtxProps>(displayName);

export { usePopoverCtx };

export const PopoverRoot = (props: PopoverRootProps) => {
  const {
    children,
    defaultOpen,
    open: openProp,
    onOpenChange,
    keepMounted = false,
  } = props;

  const [open, setOpen] = useControlled({
    default: defaultOpen ?? false,
    controlled: openProp,
    name: displayName,
    state: 'open',
    onChange: onOpenChange,
  });

  const contentId = React.useId();
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const handleOpen = useCallbackRef(() => {
    setOpen(true);
  });

  const handleClose = useCallbackRef(() => {
    if (!open) return;

    setOpen(false);
  });

  React.useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;

      handleClose();
    };

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [handleClose, open]);

  return (
    <PopoverCtx
      handleOpen={handleOpen}
      handleClose={handleClose}
      open={open}
      keepMounted={keepMounted}
      contentId={contentId}
      triggerRef={triggerRef}
    >
      <PopperRoot>{children}</PopperRoot>
    </PopoverCtx>
  );
};

PopoverRoot.displayName = displayName;
