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
      ref={ref}
      role="button"
      data-open={dialogCtx.open}
      aria-haspopup="dialog"
      aria-expanded={dialogCtx.open}
      aria-controls={dialogCtx.open ? dialogCtx.contentId : undefined}
      onClick={dialogCtx.handleOpen}
    />
  );
});

DialogTrigger.displayName = displayName;
