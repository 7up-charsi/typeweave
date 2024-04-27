import React from 'react';
import { MenuCollection } from './menu-root';
import { usePointerEvents } from '../use-pointer-events';
import { useMenuContentCtx } from './menu-content';

export interface MenuItemImplProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  disabled?: boolean;
  classNames?: {
    item?: string;
    itemIcon?: string;
    itemContent?: string;
  };
  onPress?: () => void;
  icon?: React.ReactNode;
}

const Comp_Name = 'MenuItemImpl';

export const MenuItemImpl = React.forwardRef<
  HTMLLIElement,
  MenuItemImplProps & { className?: string }
>((props, ref) => {
  const { onPointerDown, onPointerUp, disabled, onPress, ...restProps } = props;

  const id = React.useId();

  const menuContentCtx = useMenuContentCtx(Comp_Name);

  const isFocused = menuContentCtx.focused === id;

  const pointerEvents = usePointerEvents({
    onPress: () => onPress?.(),
    onPointerDown,
    onPointerUp,
  });

  return (
    <MenuCollection.Item disabled={!!disabled} isFocused={isFocused} id={id}>
      <li
        {...restProps}
        ref={ref}
        data-disabled={!!disabled}
        aria-disabled={disabled}
        data-focused={isFocused}
        tabIndex={isFocused ? 0 : -1}
        onPointerEnter={(e) => {
          restProps.onPointerEnter?.(e);
          if (disabled) return;
          menuContentCtx.setFocused(id);
        }}
        onPointerLeave={(e) => {
          restProps.onPointerLeave?.(e);
          menuContentCtx.setFocused('');
        }}
        {...pointerEvents}
        onKeyDown={(e) => {
          restProps.onKeyDown?.(e);

          const key = e.key;

          if (![' ', 'Tab'].includes(key)) return;
          e.preventDefault();
          onPress?.();
        }}
      />
    </MenuCollection.Item>
  );
});

MenuItemImpl.displayName = 'MenuItemImpl';
