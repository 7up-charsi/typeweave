import React from 'react';
import { createContextScope } from '../context';
import { useControllableState } from '../use-controllable-state';
import { useCallbackRef } from '../use-callback-ref';
import { createCollection } from '../use-collection';
import { PopperRoot } from '../popper';

export interface MenuRootProps {
  children?: React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  loop?: boolean;
  disableCloseOnEscape?: boolean;
}

interface MenuCtxProps {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  id: string;
  triggerRef: React.RefObject<HTMLButtonElement>;
  loop?: boolean;
}

const Comp_Name = 'MenuRoot';

const [MenuCtx, useMenuCtx] = createContextScope<MenuCtxProps>(Comp_Name);

interface CollectionItemProps {
  disabled: boolean;
  isFocused: boolean;
  id: string;
}

export { useMenuCtx };

export const [MenuCollection, useMenuCollection] = createCollection<
  HTMLLIElement,
  CollectionItemProps
>(Comp_Name);

export const MenuRoot = (props: MenuRootProps) => {
  const {
    children,
    defaultOpen,
    isOpen: isOpenProp,
    onOpenChange,
    loop,
    disableCloseOnEscape,
  } = props;

  const [isOpen, setIsOpen] = useControllableState({
    defaultValue: defaultOpen ?? false,
    value: isOpenProp,
    onChange: onOpenChange,
  });

  const id = React.useId();
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const handleOpen = useCallbackRef(() => {
    setIsOpen(true);
  });

  const handleClose = useCallbackRef(() => {
    if (!isOpen) return;

    setIsOpen(false);
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
      isOpen={isOpen}
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

MenuRoot.displayName = 'MenuRoot';
