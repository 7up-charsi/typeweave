import React from 'react';
import { Slot } from '../slot';
import { useAlertDialogCtx } from './alert-dialog-root';
import { usePointerEvents } from '../use-pointer-events';

export interface AlertDialogCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const displayName = 'AlertDialogClose';

export const AlertDialogClose = React.forwardRef<
  HTMLButtonElement,
  AlertDialogCloseProps
>((props, ref) => {
  const { ...restProps } = props;

  const { handleClose } = useAlertDialogCtx(displayName);

  const pointerEvents = usePointerEvents({
    onPress: () => {
      handleClose('pointer');
    },
  });

  return <Slot {...restProps} ref={ref} {...pointerEvents} />;
});

AlertDialogClose.displayName = displayName;
