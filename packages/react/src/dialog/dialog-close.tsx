import React from 'react';
import { Slot } from '../slot';
import { useDialogCtx } from './dialog-root';
import { usePointerEvents } from '../use-pointer-events';

export interface DialogCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Comp_Name = 'DialogClose';

export const DialogClose = React.forwardRef<
  HTMLButtonElement,
  DialogCloseProps
>((props, ref) => {
  const { ...restProps } = props;

  const { handleClose } = useDialogCtx(Comp_Name);

  const pointerEvents = usePointerEvents({
    onPress: () => {
      handleClose('pointer');
    },
  });

  return <Slot {...restProps} ref={ref} {...pointerEvents} />;
});

DialogClose.displayName = Comp_Name;
