import React from 'react';
import { useDialogCtx } from './dialog-root';
import { usePointerEvents } from '../use-pointer-events';
import { Overlay, OverlayProps } from '../overlay';

export interface DialogOverlayProps extends OverlayProps {}

const Comp_Name = 'DialogOverlay';

export const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  DialogOverlayProps
>((props, ref) => {
  const { ...restProps } = props;

  const dialogCtx = useDialogCtx(Comp_Name);

  const pointerEvents = usePointerEvents({
    onPress: () => {
      dialogCtx.handleClose('outside');
    },
  });

  return <Overlay {...restProps} ref={ref} {...pointerEvents} />;
});

DialogOverlay.displayName = Comp_Name;
