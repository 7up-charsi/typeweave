import React from 'react';
import { useDialogCtx } from './dialog-root';
import { useDialogStyles } from './dialog-content';

export interface DialogTitleProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const Comp_Name = 'DialogTitle';

export const DialogTitle = React.forwardRef<HTMLDivElement, DialogTitleProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    const dialogCtx = useDialogCtx(Comp_Name);
    const styles = useDialogStyles(Comp_Name);

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

DialogTitle.displayName = Comp_Name;
