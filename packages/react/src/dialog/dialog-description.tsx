import React from 'react';
import { useDialogCtx } from './dialog-root';
import { useDialogStyles } from './dialog-content';

export interface DialogDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const displayName = 'DialogDescription';

export const DialogDescription = React.forwardRef<
  HTMLDivElement,
  DialogDescriptionProps
>((props, ref) => {
  const { className, ...restProps } = props;

  const dialogCtx = useDialogCtx(displayName);
  const styles = useDialogStyles(displayName);

  return (
    <div
      {...restProps}
      ref={ref}
      id={dialogCtx.descriptionId}
      className={styles.description({ className })}
    />
  );
});

DialogDescription.displayName = displayName;
