import React from 'react';
import { Slot } from '../slot';
import { usePointerEvents } from '../use-pointer-events';
import { useDrawerCtx } from './drawer-root';

export interface DrawerTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  virtual?: boolean;
  virtualElement?: HTMLElement | null;
}

const displayName = 'DrawerTrigger';

export const DrawerTrigger = React.forwardRef<
  HTMLButtonElement,
  DrawerTriggerProps
>((props, ref) => {
  const { children, virtual, virtualElement, ...restProps } = props;

  const drawerCtx = useDrawerCtx(displayName);

  const pointerEvents = usePointerEvents({
    onPress: drawerCtx.handleOpen,
  });

  const ariaExpanded = drawerCtx.open;
  const ariaControls = drawerCtx.open ? drawerCtx.contentId : undefined;
  const open = drawerCtx.open + '';

  React.useEffect(() => {
    if (!virtual || !virtualElement) return;

    virtualElement.ariaExpanded = ariaExpanded + '';
    virtualElement.dataset.open = open;

    drawerCtx.triggerRef.current = virtualElement;

    // @ts-expect-error ----
    virtualElement.onpointerdown = pointerEvents.onPointerDown;

    // @ts-expect-error ----
    virtualElement.onpointerup = pointerEvents.onPointerUp;
  }, [
    ariaExpanded,
    open,
    pointerEvents.onPointerDown,
    pointerEvents.onPointerUp,
    drawerCtx.triggerRef,
    virtual,
    virtualElement,
  ]);

  if (virtual) return null;

  return (
    <Slot
      {...restProps}
      ref={ref}
      data-open={open}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      {...pointerEvents}
    >
      {children}
    </Slot>
  );
});

DrawerTrigger.displayName = displayName;
