import { mergeRefs } from '@typeweave/react-utils';
import { Slot } from '../slot';
import React from 'react';
import { useDialogCtx } from './dialog-root';
import { usePointerEvents } from '../use-pointer-events';

export interface DialogTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  virtual?: boolean;
  virtualElement?: HTMLElement | null;
}

const displayName = 'DialogTrigger';

export const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  DialogTriggerProps
>((props, ref) => {
  const { virtualElement, virtual, ...restProps } = props;

  const dialogCtx = useDialogCtx(displayName);

  const pointerEvents = usePointerEvents({ onPress: dialogCtx.handleOpen });

  const ariaHaspopup = 'dialog';
  const ariaExpanded = dialogCtx.open;
  const ariaControls = dialogCtx.open ? dialogCtx.contentId : undefined;
  const open = dialogCtx.open + '';

  React.useEffect(() => {
    if (!virtual || !virtualElement) return;

    virtualElement.ariaExpanded = ariaExpanded + '';
    virtualElement.ariaHasPopup = ariaHaspopup;
    virtualElement.dataset.open = open;

    dialogCtx.triggerRef.current = virtualElement;

    // @ts-expect-error ----
    virtualElement.onpointerdown = pointerEvents.onPointerDown;

    // @ts-expect-error ----
    virtualElement.onpointerup = pointerEvents.onPointerUp;
  }, [
    ariaExpanded,
    open,
    pointerEvents.onPointerDown,
    pointerEvents.onPointerUp,
    dialogCtx.triggerRef,
    virtual,
    virtualElement,
  ]);

  if (virtual) return null;

  return (
    <Slot<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>
      {...restProps}
      ref={mergeRefs(
        ref,
        dialogCtx.triggerRef as React.MutableRefObject<HTMLButtonElement | null>,
      )}
      role="button"
      data-open={open}
      aria-haspopup={ariaHaspopup}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      // @ts-expect-error Property 'onPress' does not exist
      onPress={dialogCtx.handleOpen}
    />
  );
});

DialogTrigger.displayName = displayName;
