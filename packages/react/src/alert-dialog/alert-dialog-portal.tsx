import { createPortal } from 'react-dom';
import { useAlertDialogCtx } from './alert-dialog-root';

export interface AlertDialogPortalProps {
  children?: React.ReactNode;
  container?: HTMLElement;
}

const Comp_Name = 'AlertDialogPortal';

export const AlertDialogPortal = (props: AlertDialogPortalProps) => {
  const { children, container = globalThis?.document?.body } = props;

  const alertDialogCtx = useAlertDialogCtx(Comp_Name);

  return alertDialogCtx.isOpen ? createPortal(children, container) : null;
};

AlertDialogPortal.displayName = Comp_Name;
