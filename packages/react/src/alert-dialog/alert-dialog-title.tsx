import React from 'react';
import { useAlertDialogCtx } from './alert-dialog-root';
import { useAlertDialogStyles } from './alert-dialog-content';

export interface AlertDialogTitleProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const displayName = 'AlertDialogTitle';

export const AlertDialogTitle = React.forwardRef<
  HTMLDivElement,
  AlertDialogTitleProps
>((props, ref) => {
  const { className, ...restProps } = props;

  const alertDialogCtx = useAlertDialogCtx(displayName);
  const styles = useAlertDialogStyles(displayName);

  return (
    <div
      {...restProps}
      ref={ref}
      id={alertDialogCtx.titleId}
      className={styles.title({ className })}
    />
  );
});

AlertDialogTitle.displayName = displayName;
