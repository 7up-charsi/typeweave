import React from 'react';
import { useDrawerCtx } from './drawer-root';
import { useDrawerStyles } from './drawer-content';

export interface DrawerDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const displayName = 'DrawerDescription';

export const DrawerDescription = React.forwardRef<
  HTMLDivElement,
  DrawerDescriptionProps
>((props, ref) => {
  const { className, ...restProps } = props;

  const drawerCtx = useDrawerCtx(displayName);
  const styles = useDrawerStyles(displayName);

  return (
    <div
      {...restProps}
      ref={ref}
      id={drawerCtx.descriptionId}
      className={styles.description({ className })}
    />
  );
});

DrawerDescription.displayName = displayName;
