import { createContextScope } from '../context';
import React from 'react';
import { useCallbackRef } from '../use-callback-ref';
import { useControlled } from '../use-controlled';
import { StackItem, createStackManager } from '../stack-manager';

type Reason = 'close-button' | 'escape' | 'outside' | 'imperative';

type CloseEvent = { preventDefault(): void };

export interface DialogRootProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  onClose?: (event: CloseEvent, reason: Reason) => void;
  keepMounted?: boolean;
}

interface DialogCtxProps {
  handleOpen: () => void;
  handleClose: (reason: Reason) => void;
  open: boolean;
  contentId: string;
  keepMounted: boolean;
}

export interface DialogRootMethods {
  close: () => void;
  open: () => void;
  forceClose: () => void;
}

const displayName = 'DialogRoot';

const [DialogCtx, useDialogCtx] =
  createContextScope<DialogCtxProps>(displayName);

export { useDialogCtx };

const dialogStack = createStackManager();

export const DialogRoot = React.forwardRef<DialogRootMethods, DialogRootProps>(
  (props, ref) => {
    const {
      children,
      open: openProp,
      defaultOpen,
      onOpenChange,
      onClose,
      keepMounted = false,
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
      <DialogCtx
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
        contentId={contentId}
        keepMounted={keepMounted}
      >
        {children}
      </DialogCtx>
    );
  },
);

DialogRoot.displayName = displayName;
