import React from 'react';
import { MenuItemImpl, MenuItemImplProps } from './menu-item-impl';
import { useMenuCtx } from './menu-root';
import { useMenuStyles } from './menu-content';

export interface MenuItemProps extends MenuItemImplProps {
  disableCloseOnPress?: boolean;
}

const Comp_Name = 'MenuItem';

export const MenuItem = React.forwardRef<HTMLLIElement, MenuItemProps>(
  (props, ref) => {
    const {
      children,
      onPress,
      disableCloseOnPress,
      classNames,
      className,
      disabled,
      icon,
      ...restProps
    } = props;

    const menuCtx = useMenuCtx(Comp_Name);
    const styles = useMenuStyles(Comp_Name);

    return (
      <MenuItemImpl
        {...restProps}
        ref={ref}
        role="menuitem"
        className={styles.item({
          className: classNames?.item ?? className,
        })}
        disabled={disabled}
        onPress={() => {
          if (!disableCloseOnPress) menuCtx.handleClose();
          onPress?.();
        }}
      >
        {!!icon && (
          <span
            className={styles.itemIcon({
              className: classNames?.itemIcon,
            })}
          >
            {icon}
          </span>
        )}

        <span
          className={styles.itemContent({
            className: classNames?.itemContent,
          })}
        >
          {children}
        </span>
      </MenuItemImpl>
    );
  },
);

MenuItem.displayName = 'MenuItem';
