import React from 'react';
import { MenuCollection } from './menu-root';
import { useMenuContentCtx } from './menu-content';

export interface MenuItemImplProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  disabled?: boolean;
  classNames?: {
    item?: string;
    itemIcon?: string;
    itemContent?: string;
  };
  icon?: React.ReactNode;
}

const displayName = 'MenuItemImpl';

export const MenuItemImpl = React.forwardRef<
  HTMLLIElement,
  MenuItemImplProps & { className?: string }
>((props, ref) => {
  const { disabled, onClick, ...restProps } = props;

  const id = React.useId();

  const menuContentCtx = useMenuContentCtx(displayName);

  const isFocused = menuContentCtx.focused === id;

  return (
    <MenuCollection.Item disabled={!!disabled} isFocused={isFocused} id={id}>
      <li
        {...restProps}
        onClick={onClick}
        ref={ref}
        data-disabled={!!disabled}
        aria-disabled={disabled}
        data-focused={isFocused}
        tabIndex={isFocused ? 0 : -1}
        onMouseEnter={(e) => {
          restProps.onMouseEnter?.(e);

          if (disabled) return;
          menuContentCtx.setFocused(id);
        }}
        onMouseLeave={(e) => {
          restProps.onMouseLeave?.(e);

          if (disabled) return;
          menuContentCtx.setFocused('');
        }}
        onKeyDown={(e) => {
          restProps.onKeyDown?.(e);

          const key = e.key;

          if (![' ', 'Tab'].includes(key)) return;

          e.preventDefault();
          onClick?.(e as unknown as React.MouseEvent<HTMLLIElement>);
        }}
      />
    </MenuCollection.Item>
  );
});

MenuItemImpl.displayName = displayName;
