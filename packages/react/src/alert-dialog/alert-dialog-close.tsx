import React from 'react';
import { Slot } from '../slot';
import { useAlertDialogCtx } from './alert-dialog-root';

export interface AlertDialogCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const displayName = 'AlertDialogClose';

export const AlertDialogClose = React.forwardRef<
  HTMLButtonElement,
  AlertDialogCloseProps
>((props, ref) => {
  const { ...restProps } = props;

  const { handleClose } = useAlertDialogCtx(displayName);

  return (
    <Slot
      {...restProps}
      ref={ref}
      onPress={() => {
        handleClose('pointer');
      }}
    />
  );
});

AlertDialogClose.displayName = displayName;
