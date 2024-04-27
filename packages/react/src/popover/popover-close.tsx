import React from 'react';
import { usePopoverCtx } from './popover-root';
import { usePointerEvents } from '../use-pointer-events';
import { Slot } from '../slot';

export interface PopoverCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Comp_Name = 'PopoverClose';

export const PopoverClose = React.forwardRef<
  HTMLButtonElement,
  PopoverCloseProps
>((props, ref) => {
  const { ...restProps } = props;

  const popoverCtx = usePopoverCtx(Comp_Name);

  const pointerEvents = usePointerEvents({
    onPress: popoverCtx.handleClose,
  });

  return <Slot {...restProps} ref={ref} {...pointerEvents} />;
});

PopoverClose.displayName = 'PopoverClose';
