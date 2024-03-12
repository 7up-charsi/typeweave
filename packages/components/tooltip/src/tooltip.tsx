'use client';

import { createPortal } from 'react-dom';
import { useControllableState } from '@webbo-ui/use-controllable-state';
import { useCallbackRef } from '@webbo-ui/use-callback-ref';
import { Slot } from '@webbo-ui/slot';
import { TooltipVariantProps, tooltip } from '@webbo-ui/theme';
import { createContextScope } from '@webbo-ui/context';
import * as Popper from '@webbo-ui/popper';
import { forwardRef, useEffect, useId, useRef } from 'react';

type Trigger = 'hover' | 'focus';

interface TooltipContext {
  showTooltip: (immediate?: boolean) => void;
  hideTooltip: (immediate?: boolean) => void;
  trigger?: Trigger;
  isOpen: boolean;
}

const Tooltip_Name = 'Tooltip.Root';

const [RootProvider, useRootContext] =
  createContextScope<TooltipContext>(Tooltip_Name);

const tooltips: Record<string, (a: boolean) => void> = {};

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

  const identifier = useId();

  const showTimeout = useRef<NodeJS.Timeout>();
  const hideTimeout = useRef<NodeJS.Timeout>();

  const addOpenTooltip = () => {
    tooltips[identifier] = hideTooltip;
  };

  const closeOpenTooltips = () => {
    Object.entries(tooltips).forEach(([toHideIdentifier, hideTooltip]) => {
      if (toHideIdentifier !== identifier) return;

      hideTooltip(true);
      delete tooltips[toHideIdentifier];
    });
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
    clearTimeout(showTimeout.current);
    showTimeout.current = undefined;

    if (immediate || hideDelay <= 0) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = undefined;
      setOpen(false);
    } else {
      hideTimeout.current = setTimeout(() => {
        hideTimeout.current = undefined;
        setOpen(false);
      }, hideDelay);
    }
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
      delete tooltips[identifier];
    };
  }, [identifier]);

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

  const isMouseRef = useRef(false);

  return (
    <Popper.Reference>
      <Slot<HTMLElement, React.HTMLAttributes<HTMLElement>>
        tabIndex={0}
        onMouseDown={() => {
          isMouseRef.current = true;
          context.hideTooltip(true);
        }}
        onMouseEnter={() => {
          if (context.trigger === 'focus') return;

          context.showTooltip(false);
        }}
        onMouseLeave={() => {
          isMouseRef.current = false;

          if (context.trigger === 'focus') return;

          context.hideTooltip(false);
        }}
        onKeyDown={(e) => {
          const key = e.key;

          if (key === 'Tab' || (key === 'Tab' && e.shiftKey))
            isMouseRef.current = false;
        }}
        onFocus={() => {
          if (context.trigger === 'hover' || isMouseRef.current) return;

          context.showTooltip(true);
        }}
        onBlur={() => {
          if (context.trigger === 'hover' || isMouseRef.current) return;

          context.hideTooltip(true);
        }}
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

    const styles = tooltip({ className });

    const Component = asChild ? Slot : 'div';

    return (
      <Popper.Floating {...popperProps}>
        <Component
          ref={ref}
          role="tooltip"
          className={styles}
          onMouseEnter={() => {
            if (disableInteractive) return;

            context.showTooltip(true);
          }}
          onMouseLeave={() => {
            if (disableInteractive) return;
            context.hideTooltip();
          }}
        >
          {children}
        </Component>
      </Popper.Floating>
    );
  },
);

Content.displayName = 'webbo-ui.' + Content_Name;
