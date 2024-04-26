import React from 'react';
import { Overlay, OverlayProps } from '../overlay';
import { useAlertDialogCtx } from './alert-dialog-root';

export interface AlertDialogOverlayProps extends OverlayProps {}

const Comp_Name = 'AlertDialogOverlay';

export const AlertDialogOverlay = React.forwardRef<
  HTMLDivElement,
  AlertDialogOverlayProps
>((props, ref) => {
  const { ...restProps } = props;

  const alertDialogCtx = useAlertDialogCtx(Comp_Name);

  return alertDialogCtx.isOpen ? <Overlay {...restProps} ref={ref} /> : null;
});

AlertDialogOverlay.displayName = Comp_Name;
