import React from 'react';
import { usePointerEvents } from '../use-pointer-events';
import { usePopoverCtx } from './popover-root';
import { PopperReference } from '../popper';
import { Slot } from '../slot';
import { mergeRefs } from '@typeweave/react-utils';

export interface PopoverTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const displayName = 'PopoverTrigger';

export const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>((props, ref) => {
  const { ...restProps } = props;

  const popoverCtx = usePopoverCtx(displayName);

  const pointerEvents = usePointerEvents({ onPress: popoverCtx.handleOpen });

  return (
    <PopperReference>
      <Slot<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>
        {...restProps}
        ref={mergeRefs(ref, popoverCtx.triggerRef)}
        aria-expanded={popoverCtx.isOpen}
        aria-controls={popoverCtx.isOpen ? popoverCtx.contentId : undefined}
        {...pointerEvents}
      />
    </PopperReference>
  );
});

PopoverTrigger.displayName = displayName;
