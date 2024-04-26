import React from 'react';
import { useDialogCtx } from './dialog-root';
import { useDialogStyles } from './dialog-content';

export interface DialogDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const Comp_Name = 'DialogDescription';

export const DialogDescription = React.forwardRef<
  HTMLDivElement,
  DialogDescriptionProps
>((props, ref) => {
  const { className, ...restProps } = props;

  const dialogCtx = useDialogCtx(Comp_Name);
  const styles = useDialogStyles(Comp_Name);

  return (
    <div
      {...restProps}
      ref={ref}
      id={dialogCtx.descriptionId}
      className={styles.description({ className })}
    />
  );
});

DialogDescription.displayName = 'DialogDescription';
