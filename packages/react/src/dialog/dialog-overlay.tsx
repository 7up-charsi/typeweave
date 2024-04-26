import React from 'react';
import { Overlay, OverlayProps } from '../overlay';
import { useDialogCtx } from './dialog-root';
import { usePointerEvents } from '../use-pointer-events';

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

  return dialogCtx.isOpen ? (
    <Overlay {...restProps} ref={ref} {...pointerEvents} />
  ) : null;
});

DialogOverlay.displayName = Comp_Name;
