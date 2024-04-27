import React from 'react';
import { useDialogCtx } from './dialog-root';
import { usePointerEvents } from '../use-pointer-events';
import { Slot } from '../slot';

export interface DialogOverlayProps {}

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

  return <Slot {...restProps} ref={ref} {...pointerEvents} />;
});

DialogOverlay.displayName = Comp_Name;
