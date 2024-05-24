import React from 'react';
import { createContextScope } from '../context';
import { useControlled } from '../use-controlled';
import { useCallbackRef } from '../use-callback-ref';
import { createCollection } from '../use-collection';
import { PopperRoot } from '../popper';

export interface MenuRootProps {
  children?: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  loop?: boolean;
  disableCloseOnEscape?: boolean;
}

interface MenuCtxProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  id: string;
  triggerRef: React.RefObject<HTMLButtonElement>;
  loop?: boolean;
}

const displayName = 'MenuRoot';

const [MenuCtx, useMenuCtx] = createContextScope<MenuCtxProps>(displayName);

interface CollectionItemProps {
  disabled: boolean;
  isFocused: boolean;
  id: string;
}

export { useMenuCtx };

export const [MenuCollection, useMenuCollection] = createCollection<
  HTMLLIElement,
  CollectionItemProps
>(displayName);

export const MenuRoot = (props: MenuRootProps) => {
  const {
    children,
    defaultOpen,
    open: openProp,
    onOpenChange,
    loop,
    disableCloseOnEscape,
  } = props;

  const [open, setOpen] = useControlled({
    default: defaultOpen ?? false,
    controlled: openProp,
    name: displayName,
    state: 'open',
    onChange: onOpenChange,
  });

  const id = React.useId();
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const handleOpen = useCallbackRef(() => {
    setOpen(true);
  });

  const handleClose = useCallbackRef(() => {
    if (!open) return;

    setOpen(false);
    triggerRef.current?.focus();
  });

  React.useEffect(() => {
    if (disableCloseOnEscape) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [disableCloseOnEscape, handleClose]);

  return (
    <MenuCtx
      handleOpen={handleOpen}
      handleClose={handleClose}
      open={open}
      id={id}
      triggerRef={triggerRef}
      loop={loop}
    >
      <MenuCollection.Provider>
        <PopperRoot>{children}</PopperRoot>
      </MenuCollection.Provider>
    </MenuCtx>
  );
};

MenuRoot.displayName = displayName;
