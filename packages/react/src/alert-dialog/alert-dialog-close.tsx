import React from 'react';
import { Slot } from '../slot';
import { useAlertDialogCtx } from './alert-dialog-root';

export interface AlertDialogCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Comp_Name = 'AlertDialogClose';

export const AlertDialogClose = React.forwardRef<
  HTMLButtonElement,
  AlertDialogCloseProps
>((props, ref) => {
  const { ...restProps } = props;

  const alertDialogCtx = useAlertDialogCtx(Comp_Name);

  return <Slot {...restProps} onPress={alertDialogCtx.handleClose} ref={ref} />;
});

AlertDialogClose.displayName = 'AlertDialogClose';
