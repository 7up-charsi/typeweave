import React from 'react';
import { useDrawerCtx } from './drawer-root';
import { useDrawerStyles } from './drawer-content';

export interface DrawerTitleProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const displayName = 'DrawerTitle';

export const DrawerTitle = React.forwardRef<HTMLDivElement, DrawerTitleProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    const drawerCtx = useDrawerCtx(displayName);
    const styles = useDrawerStyles(displayName);

    return (
      <div
        {...restProps}
        ref={ref}
        id={drawerCtx.titleId}
        className={styles.title({ className })}
      />
    );
  },
);

DrawerTitle.displayName = displayName;
