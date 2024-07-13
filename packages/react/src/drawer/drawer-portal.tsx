import { createPortal } from 'react-dom';
import { useDrawerCtx } from './drawer-root';

export interface DrawerPortalProps {
  children?: React.ReactNode;
  container?: HTMLElement;
}

const displayName = 'DrawerPortal';

export const DrawerPortal = (props: DrawerPortalProps) => {
  const { children, container = globalThis?.document?.body } = props;

  const drawerCtx = useDrawerCtx(displayName);

  if (drawerCtx.keepMounted) {
    return createPortal(
      <div style={{ visibility: drawerCtx.open ? 'visible' : 'hidden' }}>
        {children}
      </div>,
      container,
    );
  }

  return drawerCtx.open ? createPortal(children, container) : null;
};

DrawerPortal.displayName = displayName;
