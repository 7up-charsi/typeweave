import React from 'react';
import { Slot } from '../slot';
import { useAlertDialogCtx } from './alert-dialog-root';

export interface AlertDialogTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const displayName = 'AlertDialogTrigger';

export const AlertDialogTrigger = React.forwardRef<
  HTMLButtonElement,
  AlertDialogTriggerProps
>((props, ref) => {
  const { ...restProps } = props;

  const alertDialogCtx = useAlertDialogCtx(displayName);

  return (
    <Slot
      {...restProps}
      ref={ref}
      role="button"
      data-open={alertDialogCtx.open}
      aria-haspopup="dialog"
      aria-expanded={alertDialogCtx.open}
      aria-controls={alertDialogCtx.open ? alertDialogCtx.contentId : undefined}
      onPress={alertDialogCtx.handleOpen}
    />
  );
});

AlertDialogTrigger.displayName = displayName;
