import React from 'react';
import { usePopoverCtx } from './popover-root';
import { usePopoverStyles } from './popover-content';

export interface PopoverTitleProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const displayName = 'PopoverTitle';

export const PopoverTitle = React.forwardRef<HTMLDivElement, PopoverTitleProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    const popoverCtx = usePopoverCtx(displayName);
    const styles = usePopoverStyles(displayName);

    return (
      <div
        {...restProps}
        ref={ref}
        id={popoverCtx.titleId}
        className={styles.title({ className })}
      />
    );
  },
);

PopoverTitle.displayName = displayName;
