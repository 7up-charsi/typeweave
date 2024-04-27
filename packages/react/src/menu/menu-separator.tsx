import React from 'react';
import { useMenuStyles } from './menu-content';

export interface MenuSeparatorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {}

const Comp_Name = 'MenuSeparator';

export const MenuSeparator = React.forwardRef<
  HTMLDivElement,
  MenuSeparatorProps
>((props, ref) => {
  const { className, ...restProps } = props;

  const styles = useMenuStyles(Comp_Name);

  return (
    <div
      {...restProps}
      ref={ref}
      role="separator"
      className={styles.separator({ className })}
    />
  );
});

MenuSeparator.displayName = 'MenuSeparator';
