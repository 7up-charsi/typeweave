import React from 'react';
import { useAlertDialogCtx } from './alert-dialog-root';
import { Overlay, OverlayProps } from '../overlay';

export interface AlertDialogOverlayProps extends OverlayProps {}

const displayName = 'AlertDialogOverlay';

export const AlertDialogOverlay = React.forwardRef<
  HTMLDivElement,
  AlertDialogOverlayProps
>((props, ref) => {
  const { ...restProps } = props;

  const dialogCtx = useAlertDialogCtx(displayName);

  return (
    <Overlay
      {...restProps}
      ref={ref}
      onClick={() => {
        dialogCtx.handleClose();
      }}
    />
  );
});

AlertDialogOverlay.displayName = displayName;
