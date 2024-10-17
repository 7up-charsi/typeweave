import { createContextScope } from '../context';
import React from 'react';
import { useCallbackRef } from '../use-callback-ref';
import { useControlled } from '../use-controlled';
import { StackItem, createStackManager } from '../stack-manager';
import { createPortal } from 'react-dom';

export interface AlertDialogRootProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  /** container for createPortal
   * @default document.body
   */
  container?: HTMLElement;
}

interface AlertDialogCtxProps {
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
  contentId: string;
}

export interface AlertDialogRootMethods {
  close: () => void;
  open: () => void;
  forceClose: () => void;
}

const displayName = 'AlertDialogRoot';

const [AlertDialogCtx, useAlertDialogCtx] =
  createContextScope<AlertDialogCtxProps>(displayName);

export { useAlertDialogCtx };

const dialogStack = createStackManager();

export const AlertDialogRoot = React.forwardRef<
  AlertDialogRootMethods,
  AlertDialogRootProps
>((props, ref) => {
  const {
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    container = globalThis?.document?.body,
  } = props;

  const contentId = React.useId();

  const stackItem = React.useRef<StackItem>({
    paused: false,
    pause() {
      this.paused = true;
    },
    resume() {
      this.paused = false;
    },
  }).current;

  const [open, setOpen] = useControlled({
    default: defaultOpen ?? false,
    controlled: openProp,
    name: displayName,
    state: 'open',
    onChange: onOpenChange,
  });

  const handleOpen = useCallbackRef(() => {
    setOpen(true);
    dialogStack.add(stackItem);
  });

  const handleClose = useCallbackRef(() => {
    if (stackItem.paused) return;
    if (!open) return;

    dialogStack.remove(stackItem);
    setOpen(false);
  });

  const imperativeClose = useCallbackRef(() => {
    handleClose();
  });

  const imperativeOpen = useCallbackRef(() => {
    handleOpen();
  });

  const imperativeForceClose = useCallbackRef(() => {
    if (!open) return;

    setOpen(false);
    dialogStack.remove(stackItem);
  });

  React.useImperativeHandle(
    ref,
    () => ({
      close: imperativeClose,
      open: imperativeOpen,
      forceClose: imperativeForceClose,
    }),
    [imperativeClose, imperativeForceClose, imperativeOpen],
  );

  React.useEffect(() => {
    if (!open) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [handleClose, open]);

  return (
    <AlertDialogCtx
      handleClose={handleClose}
      handleOpen={handleOpen}
      open={open}
      contentId={contentId}
    >
      {open ? createPortal(children, container) : null}
    </AlertDialogCtx>
  );
});

AlertDialogRoot.displayName = displayName;
