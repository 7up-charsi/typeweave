import React from 'react';
import { useMenuStyles } from './menu-content';

export interface MenuSeparatorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {}

const displayName = 'MenuSeparator';

export const MenuSeparator = React.forwardRef<
  HTMLDivElement,
  MenuSeparatorProps
>((props, ref) => {
  const { className, ...restProps } = props;

  const styles = useMenuStyles(displayName);

  return (
    <div
      {...restProps}
      ref={ref}
      role="separator"
      className={styles.separator({ className })}
    />
  );
});

MenuSeparator.displayName = displayName;
