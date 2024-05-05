import React from 'react';
import { usePopoverCtx } from './popover-root';
import { Slot } from '../slot';

export interface PopoverCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const displayName = 'PopoverClose';

export const PopoverClose = React.forwardRef<
  HTMLButtonElement,
  PopoverCloseProps
>((props, ref) => {
  const { ...restProps } = props;

  const popoverCtx = usePopoverCtx(displayName);

  return <Slot {...restProps} ref={ref} onPress={popoverCtx.handleClose} />;
});

PopoverClose.displayName = displayName;
