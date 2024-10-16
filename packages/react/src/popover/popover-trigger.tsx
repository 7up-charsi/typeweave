import React from 'react';
import { usePopoverCtx } from './popover-root';
import { Slot } from '../slot';
import { mergeRefs } from '@typeweave/react-utils/merge-refs';

export interface PopoverTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const displayName = 'PopoverTrigger';

export const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>((props, ref) => {
  const { ...restProps } = props;

  const popoverCtx = usePopoverCtx(displayName);

  return (
    <Slot<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>
      {...restProps}
      ref={mergeRefs(ref, popoverCtx.setTrigger)}
      data-open={popoverCtx.open}
      aria-expanded={popoverCtx.open}
      aria-controls={popoverCtx.open ? popoverCtx.contentId : undefined}
      onClick={popoverCtx.handleOpen}
    />
  );
});

PopoverTrigger.displayName = displayName;
