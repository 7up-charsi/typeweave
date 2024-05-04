import React from 'react';
import { createContextScope } from '../context';
import { useControllableState } from '../use-controllable-state';
import { useCallbackRef } from '../use-callback-ref';

export interface DrawerRootProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  defaultOpen?: boolean;
  keepMounted?: boolean;
}

const displayName = 'DrawerRoot';

interface DrawerCtxProps {
  contentId: string;
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  keepMounted?: boolean;
  titleId: string;
  descriptionId: string;
}

const [DrawerCtx, useDrawerCtx] =
  createContextScope<DrawerCtxProps>(displayName);

export { useDrawerCtx };

export const DrawerRoot = (props: DrawerRootProps) => {
  const {
    children,
    defaultOpen,
    isOpen: isOpenProp,
    onOpenChange,
    keepMounted,
  } = props;

  const contentId = React.useId();
  const titleId = React.useId();
  const descriptionId = React.useId();
  const triggerRef = React.useRef<HTMLElement | null>(null);

  const [isOpen, setIsOpen] = useControllableState({
    defaultValue: defaultOpen,
    value: isOpenProp,
    onChange: onOpenChange,
  });

  const handleOpen = useCallbackRef(() => {
    setIsOpen(true);
  });

  const handleClose = useCallbackRef(() => {
    setIsOpen(false);
  });

  return (
    <DrawerCtx
      contentId={contentId}
      isOpen={isOpen}
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
};

DrawerRoot.displayName = displayName;
