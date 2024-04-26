import React from 'react';
import { useAlertDialogCtx } from './alert-dialog-root';
import { useAlertDialogStyles } from './alert-dialog-content';

export interface AlertDialogTitleProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const Comp_Name = 'AlertDialogTitle';

export const AlertDialogTitle = React.forwardRef<
  HTMLDivElement,
  AlertDialogTitleProps
>((props, ref) => {
  const { className, ...restProps } = props;

  const alertDialogCtx = useAlertDialogCtx(Comp_Name);
  const styles = useAlertDialogStyles(Comp_Name);

  return (
    <div
      {...restProps}
      ref={ref}
      id={alertDialogCtx.titleId}
      className={styles.title({ className })}
    />
  );
});

AlertDialogTitle.displayName = 'AlertDialogTitle';
