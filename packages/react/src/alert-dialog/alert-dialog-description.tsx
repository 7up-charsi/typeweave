import React from 'react';
import { useAlertDialogCtx } from './alert-dialog-root';
import { useAlertDialogStyles } from './alert-dialog-content';

export interface AlertDialogDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const Comp_Name = 'AlertDialogDescription';

export const AlertDialogDescription = React.forwardRef<
  HTMLDivElement,
  AlertDialogDescriptionProps
>((props, ref) => {
  const { className, ...restProps } = props;

  const alertDialogCtx = useAlertDialogCtx(Comp_Name);
  const styles = useAlertDialogStyles(Comp_Name);

  return (
    <div
      {...restProps}
      ref={ref}
      id={alertDialogCtx.descriptionId}
      className={styles.description({ className })}
    />
  );
});

AlertDialogDescription.displayName = 'AlertDialogDescription';
