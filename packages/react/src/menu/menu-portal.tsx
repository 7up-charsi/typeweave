import { createPortal } from 'react-dom';
import { useMenuCtx } from './menu-root';

export interface MenuPortalProps {
  children?: React.ReactNode;
  container?: Element;
}

const Comp_Name = 'MenuPortal';

export const MenuPortal = ({
  children,
  container = globalThis?.document?.body,
}: MenuPortalProps) => {
  const menuCtx = useMenuCtx(Comp_Name);

  return <>{menuCtx.isOpen && createPortal(children, container)}</>;
};

MenuPortal.displayName = 'MenuPortal';
