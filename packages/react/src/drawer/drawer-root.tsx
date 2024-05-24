import React from 'react';
import { createContextScope } from '../context';
import { useControlled } from '../use-controlled';
import { useCallbackRef } from '../use-callback-ref';
import { StackItem, createStackManager } from '../stack-manager';

type Reason = 'pointer' | 'escape' | 'outside' | 'virtual' | 'imperative';

type CloseEvent = { preventDefault(): void };

export interface DrawerRootProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: (event: CloseEvent, reason: Reason) => void;
  defaultOpen?: boolean;
  keepMounted?: boolean;
}

const displayName = 'DrawerRoot';

interface DrawerCtxProps {
  contentId: string;
  open: boolean;
  handleOpen: () => void;
  handleClose: (reason: Reason) => void;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  keepMounted?: boolean;
}

export interface DrawerRootMethods {
  close: () => void;
  open: () => void;
  forceClose: () => void;
}

const [DrawerCtx, useDrawerCtx] =
  createContextScope<DrawerCtxProps>(displayName);

export { useDrawerCtx };

const drawerStack = createStackManager();

export const DrawerRoot = React.forwardRef<DrawerRootMethods, DrawerRootProps>(
  (props, ref) => {
    const {
      children,
      defaultOpen,
      open: openProp,
      onOpenChange,
      keepMounted,
      onClose,
    } = props;

    const stackItem = React.useRef<StackItem>({
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      },
    }).current;

    const contentId = React.useId();
    const triggerRef = React.useRef<HTMLElement | null>(null);

    const [open, setOpen] = useControlled({
      default: defaultOpen ?? false,
      controlled: openProp,
      name: displayName,
      state: 'open',
      onChange: onOpenChange,
    });

    const handleOpen = useCallbackRef(() => {
      setOpen(true);
      drawerStack.add(stackItem);
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
        drawerStack.remove(stackItem);
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
      drawerStack.remove(stackItem);
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
      <DrawerCtx
        contentId={contentId}
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        triggerRef={triggerRef}
        keepMounted={keepMounted}
      >
        {children}
      </DrawerCtx>
    );
  },
);

DrawerRoot.displayName = displayName;
