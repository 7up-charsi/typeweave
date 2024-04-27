import React from 'react';
import { useAlertDialogStyles } from './alert-dialog-content';

export interface AlertDialogActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const displayName = 'AlertDialogActions';

export const AlertDialogActions = React.forwardRef<
  HTMLDivElement,
  AlertDialogActionsProps
>((props, ref) => {
  const { className, ...restProps } = props;

  const styles = useAlertDialogStyles(displayName);

  return (
    <div {...restProps} ref={ref} className={styles.actions({ className })} />
  );
});

AlertDialogActions.displayName = displayName;
