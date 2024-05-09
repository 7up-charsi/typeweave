import { mergeRefs } from '@typeweave/react-utils';
import { Slot } from '../slot';
import React from 'react';
import { useDialogCtx } from './dialog-root';

export interface DialogTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const displayName = 'DialogTrigger';

export const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  DialogTriggerProps
>((props, ref) => {
  const { ...restProps } = props;

  const dialogCtx = useDialogCtx(displayName);

  return (
    <Slot<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>
      {...restProps}
      ref={mergeRefs(
        ref,
        dialogCtx.triggerRef as React.MutableRefObject<HTMLButtonElement | null>,
      )}
      role="button"
      data-open={dialogCtx.open}
      aria-haspopup="dialog"
      aria-expanded={dialogCtx.open}
      aria-controls={dialogCtx.open ? dialogCtx.contentId : undefined}
      // @ts-expect-error Property 'onPress' does not exist
      onPress={dialogCtx.handleOpen}
    />
  );
});

DialogTrigger.displayName = displayName;
