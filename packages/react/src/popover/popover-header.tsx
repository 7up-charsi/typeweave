import React from 'react';
import { usePopoverStyles } from './popover-content';

export interface PopoverHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const displayName = 'PopoverHeader';

export const PopoverHeader = React.forwardRef<
  HTMLDivElement,
  PopoverHeaderProps
>((props: PopoverHeaderProps, forwardedRef) => {
  const { children, className, ...restProps } = props;

  const styles = usePopoverStyles(displayName);

  return (
    <div
      {...restProps}
      ref={forwardedRef}
      className={styles.header({ className })}
    >
      {children}
    </div>
  );
});

PopoverHeader.displayName = displayName;
