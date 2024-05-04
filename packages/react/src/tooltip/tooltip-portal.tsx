import { createPortal } from 'react-dom';
import { useTooltipCtx } from './tooltip-root';

export interface TooltipPortalProps {
  children?: React.ReactNode;
  container?: Element;
}

const displayName = 'TooltipPortal';

export const TooltipPortal = ({
  children,
  container = globalThis?.document?.body,
}: TooltipPortalProps) => {
  const context = useTooltipCtx(displayName);

  return <>{context.open && createPortal(children, container)}</>;
};

TooltipPortal.displayName = displayName;
