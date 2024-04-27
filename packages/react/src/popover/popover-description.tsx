import React from 'react';
import { usePopoverCtx } from './popover-root';
import { usePopoverStyles } from './popover-content';

export interface PopoverDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const displayName = 'PopoverDescription';

export const PopoverDescription = React.forwardRef<
  HTMLDivElement,
  PopoverDescriptionProps
>((props, ref) => {
  const { className, ...restProps } = props;

  const popoverCtx = usePopoverCtx(displayName);
  const styles = usePopoverStyles(displayName);

  return (
    <div
      {...restProps}
      ref={ref}
      id={popoverCtx.descriptionId}
      className={styles.description({ className })}
    />
  );
});

PopoverDescription.displayName = displayName;
