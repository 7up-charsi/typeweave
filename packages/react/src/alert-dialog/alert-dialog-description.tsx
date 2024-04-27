import React from 'react';
import { useAlertDialogCtx } from './alert-dialog-root';
import { useAlertDialogStyles } from './alert-dialog-content';

export interface AlertDialogDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const displayName = 'AlertDialogDescription';

export const AlertDialogDescription = React.forwardRef<
  HTMLDivElement,
  AlertDialogDescriptionProps
>((props, ref) => {
  const { className, ...restProps } = props;

  const alertDialogCtx = useAlertDialogCtx(displayName);
  const styles = useAlertDialogStyles(displayName);

  return (
    <div
      {...restProps}
      ref={ref}
      id={alertDialogCtx.descriptionId}
      className={styles.description({ className })}
    />
  );
});

AlertDialogDescription.displayName = displayName;
