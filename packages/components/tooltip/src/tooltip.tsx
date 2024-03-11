'use client';

import { createPortal } from 'react-dom';
import { useHover, useFocus, useFocusVisible } from '@react-aria/interactions';
import { mergeProps } from '@webbo-ui/react-utils';
import { useControllableState } from '@webbo-ui/use-controllable-state';
import { useCallbackRef } from '@webbo-ui/use-callback-ref';
import { Slot } from '@webbo-ui/slot';
import { TooltipVariantProps, tooltip } from '@webbo-ui/theme';
import { useIsDisabled } from '@webbo-ui/use-is-disabled';
import { createContextScope } from '@webbo-ui/context';
import * as Popper from '@webbo-ui/popper';
import { forwardRef, useEffect, useMemo, useRef } from 'react';

type Trigger = 'hover' | 'focus';

interface TooltipContext {
  showTooltip: (a?: boolean) => void;
  hideTooltip: (a?: boolean) => void;
  trigger?: Trigger;
  isOpen: boolean;
}

const Tooltip_Name = 'Tooltip.Root';

const [RootProvider, useRootContext] =
  createContextScope<TooltipContext>(Tooltip_Name);

const tooltips: Record<string, (a: boolean) => void> = {};
let tooltipId = 0;

// *-*-*-*-* Root *-*-*-*-*

export interface RootProps {
  children?: React.ReactNode;
  showDelay?: number;
  hideDelay?: number;
  /**
   * On which action tooltip shows. undefined means show tooltip on both 'hover' and 'keyboard focus'
   * @default undefined
   */
  trigger?: Trigger;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export const Root = (props: RootProps) => {
  const {
    children,
    showDelay = 100,
    hideDelay = 300,
    trigger,
    isOpen: isOpenProp,
    onOpenChange,
    defaultOpen,
  } = props;

  const [isOpen, setOpen] = useControllableState({
    defaultValue: defaultOpen ?? false,
    value: isOpenProp,
    onChange: onOpenChange,
  });

  const tooltipIdentifier = useMemo(() => `${++tooltipId}`, []);

  const showTimeout = useRef<NodeJS.Timeout>();
  const hideTimeout = useRef<NodeJS.Timeout>();

  const addOpenTooltip = () => {
    tooltips[tooltipIdentifier] = hideTooltip;
  };

  const closeOpenTooltips = () => {
    for (const hideId in tooltips) {
      if (hideId !== tooltipIdentifier) {
        if (Object.prototype.hasOwnProperty.call(tooltips, hideId)) {
          tooltips[hideId](true);
          delete tooltips[hideId];
        }
      }
    }
  };

  const showTooltip = useCallbackRef((immediate?: boolean) => {
    clearTimeout(hideTimeout.current);
    hideTimeout.current = undefined;

    closeOpenTooltips();
    addOpenTooltip();

    if (isOpen) return;

    if (!immediate && showDelay > 0) {
      showTimeout.current = setTimeout(() => {
        setOpen(true);
      }, showDelay);
    } else {
      setOpen(true);
    }
  });

  const hideTooltip = useCallbackRef((immediate?: boolean) => {
    if (immediate || hideDelay <= 0) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = undefined;
      setOpen(false);
    } else {
      hideTimeout.current = setTimeout(() => {
        setOpen(false);
      }, hideDelay);
    }

    clearTimeout(showTimeout.current);
    showTimeout.current = undefined;
  });

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hideTooltip(true);
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [hideTooltip, isOpen]);

  useEffect(() => {
    return () => {
      clearTimeout(showTimeout.current);
      clearTimeout(hideTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (!isOpen && hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = undefined;
    }
  }, [isOpen]);

  return (
    <RootProvider
      showTooltip={showTooltip}
      hideTooltip={hideTooltip}
      trigger={trigger}
      isOpen={isOpen}
    >
      <Popper.Root>{children}</Popper.Root>
    </RootProvider>
  );
};

Root.displayName = 'webbo-ui.' + Tooltip_Name;

// *-*-*-*-* Trigger *-*-*-*-*

const Trigger_Name = 'Tooltip.Trigger';

export interface TriggerProps {
  children?: React.ReactNode;
}

export const Trigger = ({ children }: TriggerProps) => {
  const context = useRootContext(Trigger_Name);

  const { setElement, isDisabled } = useIsDisabled();

  const { hoverProps } = useHover({
    isDisabled,
    onHoverStart: () => {
      if (context.trigger === 'focus') return;

      context.showTooltip(false);
    },
    onHoverEnd: () => {
      if (context.trigger === 'focus') return;

      context.hideTooltip(false);
    },
  });

  const handlePointerDown = () => {
    context.hideTooltip(true);
  };

  const { isFocusVisible } = useFocusVisible();

  const { focusProps } = useFocus({
    onFocus: () => {
      if (context.trigger === 'hover') return;

      if (isFocusVisible) {
        context.showTooltip(true);
      }
    },
    onBlur: () => {
      if (context.trigger === 'hover') return;

      context.hideTooltip(true);
    },
  });

  return (
    <Popper.Reference>
      <Slot
        ref={setElement}
        {...mergeProps(
          hoverProps,
          focusProps,
          { onPointerDown: handlePointerDown },
          { tabIndex: 0 },
        )}
      >
        {children}
      </Slot>
    </Popper.Reference>
  );
};

Trigger.displayName = 'webbo-ui.' + Trigger_Name;

// *-*-*-*-* Portal *-*-*-*-*

const Portal_Name = 'Tooltip.Portal';

export interface PortalProps {
  children?: React.ReactNode;
  container?: Element;
}

export const Portal = ({
  children,
  container = globalThis?.document?.body,
}: PortalProps) => {
  const context = useRootContext(Portal_Name);

  return <>{context.isOpen && createPortal(children, container)}</>;
};

Portal.displayName = 'webbo-ui.' + Portal_Name;

// *-*-*-*-* Content *-*-*-*-*

const Content_Name = 'Tooltip.Content';

export interface ContentProps
  extends TooltipVariantProps,
    Popper.FloatingProps {
  children?: React.ReactNode;
  asChild?: boolean;
  className?: string;
  disableInteractive?: boolean;
}

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  (props, ref) => {
    const { children, asChild, disableInteractive, className, ...popperProps } =
      props;

    const context = useRootContext(Content_Name);

    const { hoverProps: tooltipHoverProps } = useHover({
      isDisabled: disableInteractive,
      onHoverStart: () => {
        context.showTooltip(true);
      },
      onHoverEnd: () => {
        context.hideTooltip();
      },
    });

    const styles = tooltip({ className });

    const Component = asChild ? Slot : 'div';

    return (
      <Popper.Floating {...popperProps}>
        <Component
          ref={ref}
          role="tooltip"
          className={styles}
          {...tooltipHoverProps}
        >
          {children}
        </Component>
      </Popper.Floating>
    );
  },
);

Content.displayName = 'webbo-ui.' + Content_Name;
