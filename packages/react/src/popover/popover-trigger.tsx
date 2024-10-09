import React from 'react';
import { usePopoverCtx } from './popover-root';
import { PopperReference } from '../popper';
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
    <PopperReference>
      <Slot<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>
        {...restProps}
        ref={mergeRefs(ref, popoverCtx.triggerRef)}
        data-open={popoverCtx.open}
        aria-expanded={popoverCtx.open}
        aria-controls={popoverCtx.open ? popoverCtx.contentId : undefined}
        // @ts-expect-error Property 'onPress' does not exist
        onPress={popoverCtx.handleOpen}
      />
    </PopperReference>
  );
});

PopoverTrigger.displayName = displayName;
