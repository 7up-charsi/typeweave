import React from 'react';
import { Slot } from '../slot';
import { useDialogCtx } from './dialog-root';

export interface DialogCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const displayName = 'DialogClose';

export const DialogClose = React.forwardRef<
  HTMLButtonElement,
  DialogCloseProps
>((props, ref) => {
  const { ...restProps } = props;

  const { handleClose } = useDialogCtx(displayName);

  return (
    <Slot
      {...restProps}
      ref={ref}
      onClick={() => {
        handleClose('close-button');
      }}
    />
  );
});

DialogClose.displayName = displayName;
