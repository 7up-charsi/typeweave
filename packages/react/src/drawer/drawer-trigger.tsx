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

export const DrawerTrigger = (props: DrawerTriggerProps) => {
  const { children, virtual, virtualElement, ...restProps } = props;

  const drawerCtx = useDrawerCtx(displayName);

  const pointerEvents = usePointerEvents({
    onPress: drawerCtx.handleOpen,
  });

  const ariaExpanded = drawerCtx.isOpen;
  const ariaControls = drawerCtx.isOpen ? drawerCtx.contentId : undefined;
  const isOpen = drawerCtx.isOpen + '';

  React.useEffect(() => {
    if (!virtual || !virtualElement) return;

    virtualElement.ariaExpanded = ariaExpanded + '';
    virtualElement.dataset.open = isOpen;

    drawerCtx.triggerRef.current = virtualElement;

    // @ts-expect-error ----
    virtualElement.onpointerdown = pointerEvents.onPointerDown;

    // @ts-expect-error ----
    virtualElement.onpointerup = pointerEvents.onPointerUp;
  }, [
    ariaExpanded,
    isOpen,
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
      data-open={isOpen}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      {...pointerEvents}
    >
      {children}
    </Slot>
  );
};

DrawerTrigger.displayName = displayName;
