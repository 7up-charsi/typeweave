import React from 'react';
import { useDrawerCtx } from './drawer-root';
import { usePointerEvents } from '../use-pointer-events';
import { Overlay, OverlayProps } from '../overlay';

export interface DrawerOverlayProps extends OverlayProps {}

const displayName = 'DrawerOverlay';

export const DrawerOverlay = React.forwardRef<
  HTMLDivElement,
  DrawerOverlayProps
>((props, ref) => {
  const { ...restProps } = props;

  const drawerCtx = useDrawerCtx(displayName);

  const pointerEvents = usePointerEvents({
    onPress: () => {
      drawerCtx.handleClose();
    },
  });

  return <Overlay {...restProps} ref={ref} {...pointerEvents} />;
});

DrawerOverlay.displayName = displayName;
