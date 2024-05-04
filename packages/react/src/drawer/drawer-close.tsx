import React from 'react';
import { Slot } from '../slot';
import { useDrawerCtx } from './drawer-root';
import { usePointerEvents } from '../use-pointer-events';

export interface DrawerCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const displayName = 'DrawerClose';

export const DrawerClose = React.forwardRef<
  HTMLButtonElement,
  DrawerCloseProps
>((props, ref) => {
  const { ...restProps } = props;

  const { handleClose } = useDrawerCtx(displayName);

  const pointerEvents = usePointerEvents({
    onPress: () => {
      handleClose('pointer');
    },
  });

  return <Slot {...restProps} ref={ref} {...pointerEvents} />;
});

DrawerClose.displayName = displayName;
