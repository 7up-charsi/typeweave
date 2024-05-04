import React from 'react';
import { Slot } from '../slot';
import { useAlertDialogCtx } from './alert-dialog-root';
import { usePointerEvents } from '../use-pointer-events';

export interface AlertDialogTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  virtual?: boolean;
  virtualElement?: HTMLElement | null;
}

const displayName = 'AlertDialogTrigger';

export const AlertDialogTrigger = React.forwardRef<
  HTMLButtonElement,
  AlertDialogTriggerProps
>((props, ref) => {
  const { virtualElement, virtual, ...restProps } = props;

  const alertDialogCtx = useAlertDialogCtx(displayName);

  const pointerEvents = usePointerEvents({
    onPress: alertDialogCtx.handleOpen,
  });

  const ariaHaspopup = 'dialog';
  const ariaExpanded = alertDialogCtx.open;
  const ariaControls = alertDialogCtx.open
    ? alertDialogCtx.contentId
    : undefined;
  const open = alertDialogCtx.open + '';

  React.useEffect(() => {
    if (!virtual || !virtualElement) return;

    virtualElement.ariaExpanded = ariaExpanded + '';
    virtualElement.ariaHasPopup = ariaHaspopup;
    virtualElement.dataset.open = open;

    // @ts-expect-error ----
    virtualElement.onpointerdown = pointerEvents.onPointerDown;

    // @ts-expect-error ----
    virtualElement.onpointerup = pointerEvents.onPointerUp;
  }, [
    ariaExpanded,
    open,
    pointerEvents.onPointerDown,
    pointerEvents.onPointerUp,
    virtual,
    virtualElement,
  ]);

  if (virtual) return null;

  return (
    <Slot<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>
      {...restProps}
      {...pointerEvents}
      ref={ref}
      role="button"
      data-open={open}
      aria-haspopup={ariaHaspopup}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
    />
  );
});

AlertDialogTrigger.displayName = displayName;
