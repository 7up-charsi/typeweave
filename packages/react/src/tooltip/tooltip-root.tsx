import React from 'react';
import { createContextScope } from '../context';
import { PopperRoot } from '../popper';
import { useControllableState } from '../use-controllable-state';
import { useCallbackRef } from '../use-callback-ref';

type Trigger = 'hover' | 'focus';

export interface TooltipRootProps {
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

interface TooltipCtxProps {
  showTooltip: (immediate?: boolean) => void;
  hideTooltip: (immediate?: boolean) => void;
  trigger?: Trigger;
  isOpen: boolean;
}

const Comp_Name = 'TooltipRoot';

const [TooltipCtx, useTooltipCtx] =
  createContextScope<TooltipCtxProps>(Comp_Name);

export { useTooltipCtx };

const tooltips: Record<string, (a: boolean) => void> = {};

export const TooltipRoot = (props: TooltipRootProps) => {
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

  const identifier = React.useId();

  const showTimeout = React.useRef<NodeJS.Timeout>();
  const hideTimeout = React.useRef<NodeJS.Timeout>();

  const addOpenTooltip = () => {
    tooltips[identifier] = hideTooltip;
  };

  const closeOpenTooltips = () => {
    Object.entries(tooltips).forEach(([toHideIdentifier, hideTooltip]) => {
      if (toHideIdentifier === identifier) return;

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

  React.useEffect(() => {
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

  React.useEffect(() => {
    return () => {
      clearTimeout(showTimeout.current);
      clearTimeout(hideTimeout.current);
      delete tooltips[identifier];
    };
  }, [identifier]);

  return (
    <TooltipCtx
      showTooltip={showTooltip}
      hideTooltip={hideTooltip}
      trigger={trigger}
      isOpen={isOpen}
    >
      <PopperRoot>{children}</PopperRoot>
    </TooltipCtx>
  );
};

TooltipRoot.displayName = 'TooltipRoot';
