import React from 'react';
import { useDialogStyles } from './dialog-content';

export interface DialogHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const displayName = 'DialogHeader';

export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  (props: DialogHeaderProps, forwardedRef) => {
    const { children, className, ...restProps } = props;

    const styles = useDialogStyles(displayName);

    return (
      <div
        {...restProps}
        ref={forwardedRef}
        className={styles.header({ className })}
      >
        {children}
      </div>
    );
  },
);

DialogHeader.displayName = displayName;
