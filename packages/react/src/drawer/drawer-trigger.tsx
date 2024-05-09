import React from 'react';
import { Slot } from '../slot';
import { useDrawerCtx } from './drawer-root';

export interface DrawerTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const displayName = 'DrawerTrigger';

export const DrawerTrigger = React.forwardRef<
  HTMLButtonElement,
  DrawerTriggerProps
>((props, ref) => {
  const { children, ...restProps } = props;

  const drawerCtx = useDrawerCtx(displayName);

  return (
    <Slot
      {...restProps}
      ref={ref}
      data-open={drawerCtx.open}
      aria-expanded={drawerCtx.open}
      aria-controls={drawerCtx.open ? drawerCtx.contentId : undefined}
      onPress={drawerCtx.handleOpen}
    >
      {children}
    </Slot>
  );
});

DrawerTrigger.displayName = displayName;
