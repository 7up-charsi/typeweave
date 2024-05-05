import React from 'react';
import { Slot } from '../slot';
import { useDrawerCtx } from './drawer-root';

export interface DrawerCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const displayName = 'DrawerClose';

export const DrawerClose = React.forwardRef<
  HTMLButtonElement,
  DrawerCloseProps
>((props, ref) => {
  const { ...restProps } = props;

  const { handleClose } = useDrawerCtx(displayName);

  return (
    <Slot
      {...restProps}
      ref={ref}
      onPress={() => {
        handleClose('pointer');
      }}
    />
  );
});

DrawerClose.displayName = displayName;
