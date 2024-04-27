import React from 'react';
import { useDialogCtx } from './dialog-root';
import { useDialogStyles } from './dialog-content';

export interface DialogTitleProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const displayName = 'DialogTitle';

export const DialogTitle = React.forwardRef<HTMLDivElement, DialogTitleProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    const dialogCtx = useDialogCtx(displayName);
    const styles = useDialogStyles(displayName);

    return (
      <div
        {...restProps}
        ref={ref}
        id={dialogCtx.titleId}
        className={styles.title({ className })}
      />
    );
  },
);

DialogTitle.displayName = displayName;
