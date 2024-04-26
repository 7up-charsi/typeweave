import React from 'react';
import { createContextScope } from '../context';
import { FocusScope } from '../focus-trap';
import { useControllableState } from '../use-controllable-state';
import { useCallbackRef } from '../use-callback-ref';

export interface AlertDialogRootProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  defaultOpen?: boolean;
}

interface AlertDialogCtxProps {
  handleOpen: () => void;
  handleClose: () => void;
  isOpen: boolean;
  focusScope: FocusScope;
  contentId: string;
  titleId: string;
  descriptionId: string;
}

const Comp_Name = 'AlertDialogRoot';

const [AlertDialogCtx, useAlertDialogCtx] =
  createContextScope<AlertDialogCtxProps>(Comp_Name);

export { useAlertDialogCtx };

export interface AlertDialogRootMethods {
  onClose: AlertDialogCtxProps['handleClose'];
}

export const AlertDialogRoot = React.forwardRef<
  AlertDialogRootMethods,
  AlertDialogRootProps
>((props, ref) => {
  const { children, isOpen: isOpenProp, defaultOpen, onOpenChange } = props;

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

  const [isOpen, setOpen] = useControllableState({
    defaultValue: defaultOpen ?? false,
    value: isOpenProp,
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
    if (!isOpen) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [handleClose, isOpen]);

  return (
    <AlertDialogCtx
      handleClose={handleClose}
      handleOpen={handleOpen}
      isOpen={isOpen}
      focusScope={focusScope}
      contentId={contentId}
      titleId={titleId}
      descriptionId={descriptionId}
    >
      {children}
    </AlertDialogCtx>
  );
});

AlertDialogRoot.displayName = 'AlertDialogRoot';
