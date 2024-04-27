import React from 'react';
import { createContextScope } from '../context';
import { PopperRoot } from '../popper';
import { useCallbackRef } from '../use-callback-ref';
import { useControllableState } from '../use-controllable-state';

export interface PopoverRootProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  defaultOpen?: boolean;
  keepMounted?: boolean;
}

interface PopoverCtxProps {
  isOpen: boolean;
  handleOpen(): void;
  handleClose(): void;
  keepMounted: boolean;
  contentId: string;
  titleId: string;
  descriptionId: string;
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
    isOpen: openProp,
    onOpenChange,
    keepMounted = false,
  } = props;

  const [isOpen, setOpen] = useControllableState({
    defaultValue: defaultOpen ?? false,
    onChange: onOpenChange,
    value: openProp,
  });

  const contentId = React.useId();
  const titleId = React.useId();
  const descriptionId = React.useId();
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const handleOpen = useCallbackRef(() => {
    setOpen(true);
  });

  const handleClose = useCallbackRef(() => {
    setOpen(false);
  });

  React.useEffect(() => {
    if (!isOpen) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;

      handleClose();
    };

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [handleClose, isOpen]);

  return (
    <PopoverCtx
      handleOpen={handleOpen}
      handleClose={handleClose}
      isOpen={isOpen}
      keepMounted={keepMounted}
      contentId={contentId}
      titleId={titleId}
      descriptionId={descriptionId}
      triggerRef={triggerRef}
    >
      <PopperRoot>{children}</PopperRoot>
    </PopoverCtx>
  );
};

PopoverRoot.displayName = displayName;
