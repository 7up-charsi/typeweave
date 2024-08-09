import React from 'react';
import { createContextScope } from '../context';
import { PopperRoot } from '../popper';
import { useControlled } from '../use-controlled';
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
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

interface TooltipCtxProps {
  showTooltip: (immediate?: boolean) => void;
  hideTooltip: (immediate?: boolean) => void;
  trigger?: Trigger;
  open: boolean;
}

const displayName = 'TooltipRoot';

const [TooltipCtx, useTooltipCtx] =
  createContextScope<TooltipCtxProps>(displayName);

export { useTooltipCtx };

const tooltips: Record<string, (a: boolean) => void> = {};

export const TooltipRoot = (props: TooltipRootProps) => {
  const {
    children,
    showDelay = 100,
    hideDelay = 300,
    trigger,
    open: openProp,
    onOpenChange,
    defaultOpen,
    disabled,
  } = props;

  const [open, setOpen] = useControlled({
    default: defaultOpen ?? false,
    controlled: openProp,
    name: displayName,
    state: 'open',
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
    if (disabled) return;

    clearTimeout(hideTimeout.current);
    hideTimeout.current = undefined;

    closeOpenTooltips();
    addOpenTooltip();

    if (open) return;

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
    if (!open || disabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hideTooltip(true);
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [hideTooltip, open, disabled]);

  React.useEffect(() => {
    hideTooltip(true);
    delete tooltips[identifier];
  }, [identifier, disabled]);

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
      open={open}
    >
      <PopperRoot>{children}</PopperRoot>
    </TooltipCtx>
  );
};

TooltipRoot.displayName = displayName;
