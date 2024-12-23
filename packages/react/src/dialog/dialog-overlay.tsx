import React from 'react';
import { useDialogCtx } from './dialog-root';
import { Overlay, OverlayProps } from '../overlay';

export interface DialogOverlayProps extends OverlayProps {}

const displayName = 'DialogOverlay';

export const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  DialogOverlayProps
>((props, ref) => {
  const { ...restProps } = props;

  const dialogCtx = useDialogCtx(displayName);

  return (
    <Overlay
      {...restProps}
      ref={ref}
      onClick={() => {
        dialogCtx.handleClose('outside');
      }}
    />
  );
});

DialogOverlay.displayName = displayName;
