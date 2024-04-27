import React from 'react';
import { useMenuStyles } from './menu-content';
import { useMenuCtx } from './menu-root';
import { useMenuRadioGroupCtx } from './menu-radio-group';
import { MenuItemImpl } from './menu-item-impl';
import { Icon } from '../icon';

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

const Comp_Name = 'MenuRadioItem';

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

  const styles = useMenuStyles(Comp_Name);
  const menuCtx = useMenuCtx(Comp_Name);
  const menuRadioGroupCtx = useMenuRadioGroupCtx(Comp_Name);

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
        {!checked
          ? null
          : icon ?? (
              <Icon>
                <svg fill="none" viewBox="0 0 48 48">
                  <g>
                    <path
                      fill="#fff"
                      fillOpacity="0.01"
                      d="M0 0H48V48H0z"
                    ></path>
                    <path
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="4"
                      d="M24 33a9 9 0 100-18 9 9 0 000 18z"
                    ></path>
                  </g>
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

MenuRadioItem.displayName = 'MenuRadioItem';
