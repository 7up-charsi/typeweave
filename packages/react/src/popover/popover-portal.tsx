import { createPortal } from 'react-dom';
import { usePopoverCtx } from './popover-root';

export interface PopoverPortalProps {
  children?: React.ReactNode;
  container?: Element;
}

const Comp_Name = 'PopoverPortal';

export const PopoverPortal = ({
  children,
  container = globalThis?.document?.body,
}: PopoverPortalProps) => {
  const popoverCtx = usePopoverCtx(Comp_Name);

  return <>{popoverCtx.isOpen && createPortal(children, container)}</>;
};

PopoverPortal.displayName = 'PopoverPortal';
