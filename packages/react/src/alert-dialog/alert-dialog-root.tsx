import { createContextScope } from '../context';
import React from 'react';
import { useCallbackRef } from '../use-callback-ref';
import { useControlled } from '../use-controlled';
import { StackItem, createStackManager } from '../stack-manager';
import { createPortal } from 'react-dom';

type Reason = 'pointer' | 'escape' | 'outside' | 'imperative';

type CloseEvent = { preventDefault(): void };

export interface AlertDialogRootProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  onClose?: (event: CloseEvent, reason: Reason) => void;
  /** container for createPortal
   * @default document.body
   */
  container?: HTMLElement;
}

interface AlertDialogCtxProps {
  handleOpen: () => void;
  handleClose: (reason: Reason) => void;
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
    onClose,
    container = document.body,
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

  const handleClose = useCallbackRef((reason: Reason) => {
    if (stackItem.paused) return;
    if (!open) return;

    const eventObj = { defaultPrevented: false };

    const preventDefault = () => {
      eventObj.defaultPrevented = true;
    };

    onClose?.({ preventDefault }, reason);

    if (!eventObj.defaultPrevented) {
      dialogStack.remove(stackItem);
      setOpen(false);
    }
  });

  const imperativeClose = useCallbackRef(() => {
    handleClose('imperative');
  });

  const imperativeOpen = useCallbackRef(() => {
    handleOpen();
  });

  const imperativeForceClose = useCallbackRef(() => {
    if (!open) return;

    onClose?.({ preventDefault: () => {} }, 'imperative');

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
        handleClose('escape');
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
