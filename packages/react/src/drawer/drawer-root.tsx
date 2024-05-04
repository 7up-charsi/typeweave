import React from 'react';
import { createContextScope } from '../context';
import { useControllableState } from '../use-controllable-state';
import { useCallbackRef } from '../use-callback-ref';
import { StackItem, createStackManager } from '../stack-manager';

type Reason = 'pointer' | 'escape' | 'outside' | 'virtual';

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
  titleId: string;
  descriptionId: string;
}

export interface DrawerRootMethods {
  onClose: DrawerCtxProps['handleClose'];
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
      open: isOpenProp,
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
    const titleId = React.useId();
    const descriptionId = React.useId();
    const triggerRef = React.useRef<HTMLElement | null>(null);

    const [open, setOpen] = useControllableState({
      defaultValue: defaultOpen,
      value: isOpenProp,
      onChange: onOpenChange,
    });

    const handleOpen = useCallbackRef(() => {
      setOpen(true);
      drawerStack.add(stackItem);
    });

    const handleClose = useCallbackRef((reason: Reason) => {
      if (stackItem.paused) return;

      drawerStack.remove(stackItem);

      const eventObj = { defaultPrevented: false };

      const preventDefault = () => {
        eventObj.defaultPrevented = true;
      };

      onClose?.({ preventDefault }, reason);

      if (!eventObj.defaultPrevented) setOpen(false);
    });

    React.useImperativeHandle(
      ref,
      () => ({
        onClose: handleClose,
      }),
      [handleClose],
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
        titleId={titleId}
        descriptionId={descriptionId}
      >
        {children}
      </DrawerCtx>
    );
  },
);

DrawerRoot.displayName = displayName;
