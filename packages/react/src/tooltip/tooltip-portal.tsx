import { createPortal } from 'react-dom';
import { useTooltipCtx } from './tooltip-root';

export interface TooltipPortalProps {
  children?: React.ReactNode;
  container?: Element;
}

const Comp_Name = 'TooltipPortal';

export const TooltipPortal = ({
  children,
  container = globalThis?.document?.body,
}: TooltipPortalProps) => {
  const context = useTooltipCtx(Comp_Name);

  return <>{context.isOpen && createPortal(children, container)}</>;
};

TooltipPortal.displayName = 'TooltipPortal';
