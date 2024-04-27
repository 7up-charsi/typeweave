import React from 'react';
import { useMenuStyles } from './menu-content';
import { useMenuCtx } from './menu-root';
import { useMenuRadioGroupCtx } from './menu-radio-group';
import { MenuItemImpl } from './menu-item-impl';

export interface MenuRadioItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  disabled?: boolean;
  value: string;
  classNames?: {
    item?: string;
    itemIcon?: string;
    itemContent?: string;
  };
  asChild?: boolean;
  icon?: React.ReactNode;
  disableCloseOnChange?: boolean;
}

const dotIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-dot"
  >
    <circle cx="12.1" cy="12.1" r="4" fill="currentColor" />
  </svg>
);

const displayName = 'MenuRadioItem';

export const MenuRadioItem = React.forwardRef<
  HTMLLIElement,
  MenuRadioItemProps
>((props, ref) => {
  const {
    children,
    disabled,
    classNames,
    className,
    value,
    icon,
    disableCloseOnChange = true,
    ...restProps
  } = props;

  const styles = useMenuStyles(displayName);
  const menuCtx = useMenuCtx(displayName);
  const menuRadioGroupCtx = useMenuRadioGroupCtx(displayName);

  const checked = value === menuRadioGroupCtx.value;

  return (
    <MenuItemImpl
      {...restProps}
      ref={ref}
      role="menuitemradio"
      data-checked={checked}
      aria-checked={checked}
      className={styles.item({
        className: classNames?.item ?? className,
      })}
      disabled={disabled}
      onPress={() => {
        if (!disableCloseOnChange) menuCtx.handleClose();
        menuRadioGroupCtx.onChange?.(value);
      }}
    >
      <span
        className={styles.itemIcon({
          className: classNames?.itemIcon,
        })}
      >
        {!checked ? null : icon ?? dotIcon}
      </span>

      <span
        className={styles.itemContent({
          className: classNames?.itemContent,
        })}
      >
        {children}
      </span>
    </MenuItemImpl>
  );
});

MenuRadioItem.displayName = displayName;
