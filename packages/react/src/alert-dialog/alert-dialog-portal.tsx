import { createPortal } from 'react-dom';
import { useAlertDialogCtx } from './alert-dialog-root';

export interface AlertDialogPortalProps {
  children?: React.ReactNode;
  container?: HTMLElement;
}

const displayName = 'AlertDialogPortal';

export const AlertDialogPortal = (props: AlertDialogPortalProps) => {
  const { children, container = globalThis?.document?.body } = props;

  const alertDialogCtx = useAlertDialogCtx(displayName);

  return alertDialogCtx.open ? createPortal(children, container) : null;
};

AlertDialogPortal.displayName = displayName;
