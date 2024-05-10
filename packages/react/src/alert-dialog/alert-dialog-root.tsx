import React from 'react';
import { createContextScope } from '../context';
import { useControllableState } from '../use-controllable-state';
import { useCallbackRef } from '../use-callback-ref';
import { StackItem, createStackManager } from '../stack-manager';

type Reason = 'pointer' | 'escape';

type CloseEvent = { preventDefault(): void };

export interface AlertDialogRootProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: (event: CloseEvent, reason: Reason | null) => void;
  defaultOpen?: boolean;
}

interface AlertDialogCtxProps {
  handleOpen: () => void;
  handleClose: (reason: Reason) => void;
  open: boolean;
  contentId: string;
  titleId: string;
  descriptionId: string;
}

const displayName = 'AlertDialogRoot';

const [AlertDialogCtx, useAlertDialogCtx] =
  createContextScope<AlertDialogCtxProps>(displayName);

export { useAlertDialogCtx };

export interface AlertDialogRootMethods {
  close: () => void;
  open: () => void;
  forceClose: () => void;
}

const alertDialogStack = createStackManager();

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
  } = props;

  const contentId = React.useId();
  const titleId = React.useId();
  const descriptionId = React.useId();

  const stackItem = React.useRef<StackItem>({
    paused: false,
    pause() {
      this.paused = true;
    },
    resume() {
      this.paused = false;
    },
  }).current;

  const [open, setOpen] = useControllableState({
    defaultValue: defaultOpen ?? false,
    value: openProp,
    onChange: onOpenChange,
  });

  const handleOpen = useCallbackRef(() => {
    setOpen(true);
    alertDialogStack.add(stackItem);
  });

  const handleClose = useCallbackRef((reason: Reason | null) => {
    if (stackItem.paused) return;
    if (!open) return;

    const eventObj = { defaultPrevented: false };

    const preventDefault = () => {
      eventObj.defaultPrevented = true;
    };

    onClose?.({ preventDefault }, reason);

    if (!eventObj.defaultPrevented) {
      setOpen(false);
      alertDialogStack.remove(stackItem);
    }
  });

  const imperativeClose = useCallbackRef(() => {
    handleClose(null);
  });

  const imperativeOpen = useCallbackRef(() => {
    handleOpen();
  });

  const imperativeForceClose = useCallbackRef(() => {
    if (!open) return;

    onClose?.({ preventDefault: () => {} }, null);

    setOpen(false);
    alertDialogStack.remove(stackItem);
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
      titleId={titleId}
      descriptionId={descriptionId}
    >
      {children}
    </AlertDialogCtx>
  );
});

AlertDialogRoot.displayName = displayName;
