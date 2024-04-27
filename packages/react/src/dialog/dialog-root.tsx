import { FocusScope } from '../focus-trap';
import { createContextScope } from '../context';
import React from 'react';
import { useCallbackRef } from '../use-callback-ref';
import { useControllableState } from '../use-controllable-state';

export interface DialogRootProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  defaultOpen?: boolean;
  onClose?: (event: CloseEvent, reason: Reason) => void;
  keepMounted?: boolean;
}

type Reason = 'pointer' | 'escape' | 'outside' | 'virtual';

type CloseEvent = { preventDefault(): void };

interface DialogCtxProps {
  handleOpen: () => void;
  handleClose: (reason: Reason) => void;
  isOpen: boolean;
  focusScope: FocusScope;
  keepMounted: boolean;
  contentId: string;
  titleId: string;
  descriptionId: string;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
}

export interface DialogRootMethods {
  onClose: DialogCtxProps['handleClose'];
}

const displayName = 'DialogRoot';

const [DialogCtx, useDialogCtx] =
  createContextScope<DialogCtxProps>(displayName);

export { useDialogCtx };

export const DialogRoot = React.forwardRef<DialogRootMethods, DialogRootProps>(
  (props, ref) => {
    const {
      children,
      isOpen: isOpenProp,
      defaultOpen,
      onOpenChange,
      onClose,
      keepMounted = false,
    } = props;

    const contentId = React.useId();
    const titleId = React.useId();
    const descriptionId = React.useId();
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);

    const focusScope = React.useRef<FocusScope>({
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      },
    }).current;

    const [isOpen, setOpen] = useControllableState({
      defaultValue: defaultOpen ?? false,
      value: isOpenProp,
      onChange: onOpenChange,
    });

    const handleOpen = useCallbackRef(() => {
      setOpen(true);
    });

    const handleClose = useCallbackRef((reason: Reason) => {
      if (focusScope.paused) return;

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
      if (!isOpen) return;

      const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose('escape');
        }
      };

      document.addEventListener('keydown', handleKeydown);

      return () => {
        document.removeEventListener('keydown', handleKeydown);
      };
    }, [handleClose, isOpen]);

    return (
      <DialogCtx
        handleClose={handleClose}
        handleOpen={handleOpen}
        isOpen={isOpen}
        focusScope={focusScope}
        keepMounted={keepMounted}
        contentId={contentId}
        titleId={titleId}
        descriptionId={descriptionId}
        triggerRef={triggerRef}
      >
        {children}
      </DialogCtx>
    );
  },
);

DialogRoot.displayName = displayName;
