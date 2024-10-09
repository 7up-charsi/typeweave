import { mergeRefs } from '@typeweave/react-utils/merge-refs';
import { PopperReference } from '../popper';
import { Slot } from '../slot';
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

  return (
    <PopperReference>
      <Slot<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>
        {...restProps}
        ref={mergeRefs(ref, menuCtx.triggerRef)}
        role="button"
        aria-haspopup="menu"
        data-open={menuCtx.open}
        aria-expanded={menuCtx.open}
        aria-controls={menuCtx.open ? menuCtx.id : undefined}
        // @ts-expect-error Property 'onPress' does not exist
        onPress={menuCtx.handleOpen}
      />
    </PopperReference>
  );
});

MenuTrigger.displayName = displayName;
