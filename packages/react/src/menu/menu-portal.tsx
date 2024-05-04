import { createPortal } from 'react-dom';
import { useMenuCtx } from './menu-root';

export interface MenuPortalProps {
  children?: React.ReactNode;
  container?: Element;
}

const displayName = 'MenuPortal';

export const MenuPortal = ({
  children,
  container = globalThis?.document?.body,
}: MenuPortalProps) => {
  const menuCtx = useMenuCtx(displayName);

  return <>{menuCtx.open && createPortal(children, container)}</>;
};

MenuPortal.displayName = displayName;
