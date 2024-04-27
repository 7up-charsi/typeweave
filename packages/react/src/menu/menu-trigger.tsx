import { mergeRefs } from '@webbo-ui/react-utils';
import { PopperReference } from '../popper';
import { Slot } from '../slot';
import { usePointerEvents } from '../use-pointer-events';
import { useMenuCtx } from './menu-root';
import React from 'react';

export interface MenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const displayName = 'MenuTrigger';

export const MenuTrigger = React.forwardRef<
  HTMLButtonElement,
  MenuTriggerProps
>((props, ref) => {
  const { ...restProps } = props;

  const menuCtx = useMenuCtx(displayName);

  const pointerEvents = usePointerEvents({ onPress: menuCtx.handleOpen });

  return (
    <PopperReference>
      <Slot<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>
        {...restProps}
        ref={mergeRefs(ref, menuCtx.triggerRef)}
        role="button"
        aria-haspopup="menu"
        data-open={menuCtx.isOpen}
        aria-expanded={menuCtx.isOpen}
        aria-controls={menuCtx.isOpen ? menuCtx.id : undefined}
        {...pointerEvents}
        onKeyDown={(e: React.KeyboardEvent) => {
          const key = e.key;

          if (![' ', 'Enter'].includes(key)) return;

          e.preventDefault();
          menuCtx.handleOpen();
        }}
      />
    </PopperReference>
  );
});

MenuTrigger.displayName = displayName;
