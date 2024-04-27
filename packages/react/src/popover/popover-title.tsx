import React from 'react';
import { usePopoverCtx } from './popover-root';
import { usePopoverStyles } from './popover-content';

export interface PopoverTitleProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const Comp_Name = 'PopoverTitle';

export const PopoverTitle = React.forwardRef<HTMLDivElement, PopoverTitleProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    const popoverCtx = usePopoverCtx(Comp_Name);
    const styles = usePopoverStyles(Comp_Name);

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

PopoverTitle.displayName = 'PopoverTitle';
