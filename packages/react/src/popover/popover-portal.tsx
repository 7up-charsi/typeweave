import { createPortal } from 'react-dom';
import { usePopoverCtx } from './popover-root';

export interface PopoverPortalProps {
  children?: React.ReactNode;
  container?: Element;
}

const displayName = 'PopoverPortal';

export const PopoverPortal = ({
  children,
  container = globalThis?.document?.body,
}: PopoverPortalProps) => {
  const popoverCtx = usePopoverCtx(displayName);

  return <>{popoverCtx.open && createPortal(children, container)}</>;
};

PopoverPortal.displayName = displayName;
