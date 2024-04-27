import React from 'react';
import { useMenuStyles } from './menu-content';
import { MenuItemImpl } from './menu-item-impl';
import { useMenuCtx } from './menu-root';
import { Icon } from '../icon';

export interface MenuCheckboxItemProps
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'onChange'> {
  disabled?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  classNames?: {
    item?: string;
    itemIcon?: string;
    itemContent?: string;
  };
  disableCloseOnChange?: boolean;
  icon?: React.ReactNode;
}

const displayName = 'MenuCheckboxItem';

export const MenuCheckboxItem = React.forwardRef<
  HTMLLIElement,
  MenuCheckboxItemProps
>((props, ref) => {
  const {
    children,
    classNames,
    className,
    checked,
    onChange,
    disabled,
    icon,
    disableCloseOnChange = true,
    ...restProps
  } = props;

  const menuCtx = useMenuCtx(displayName);
  const styles = useMenuStyles(displayName);

  return (
    <MenuItemImpl
      {...restProps}
      ref={ref}
      role="menuitemcheckbox"
      data-checked={checked}
      aria-checked={checked}
      className={styles.item({
        className: classNames?.item ?? className,
      })}
      disabled={disabled}
      onPress={() => {
        if (!disableCloseOnChange) menuCtx.handleClose();
        onChange?.(!checked);
      }}
    >
      <span
        className={styles.itemIcon({
          className: classNames?.itemIcon,
        })}
      >
        {!checked
          ? null
          : icon ?? (
              <Icon>
                <svg fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 11.917 9.724 16.5 19 7.5"
                  />
                </svg>
              </Icon>
            )}
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

MenuCheckboxItem.displayName = displayName;
