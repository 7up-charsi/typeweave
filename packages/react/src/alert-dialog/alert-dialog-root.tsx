import React from 'react';
import { createContextScope } from '../context';
import { FocusScope } from '../focus-trap';
import { useControllableState } from '../use-controllable-state';
import { useCallbackRef } from '../use-callback-ref';

export interface AlertDialogRootProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

interface AlertDialogCtxProps {
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
  focusScope: FocusScope;
  contentId: string;
  titleId: string;
  descriptionId: string;
}

const displayName = 'AlertDialogRoot';

const [AlertDialogCtx, useAlertDialogCtx] =
  createContextScope<AlertDialogCtxProps>(displayName);

export { useAlertDialogCtx };

export interface AlertDialogRootMethods {
  onClose: AlertDialogCtxProps['handleClose'];
}

export const AlertDialogRoot = React.forwardRef<
  AlertDialogRootMethods,
  AlertDialogRootProps
>((props, ref) => {
  const { children, open: openProp, defaultOpen, onOpenChange } = props;

  const contentId = React.useId();
  const titleId = React.useId();
  const descriptionId = React.useId();

  const focusScope = React.useRef<FocusScope>({
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
  });

  const handleClose = useCallbackRef(() => {
    if (focusScope.paused) return;
    setOpen(false);
  });

  React.useImperativeHandle(ref, () => ({ onClose: handleClose }), [
    handleClose,
  ]);

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
      focusScope={focusScope}
      contentId={contentId}
      titleId={titleId}
      descriptionId={descriptionId}
    >
      {children}
    </AlertDialogCtx>
  );
});

AlertDialogRoot.displayName = displayName;
