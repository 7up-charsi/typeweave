import { createPortal } from 'react-dom';
import { useDialogCtx } from './dialog-root';

export interface DialogPortalProps {
  children?: React.ReactNode;
  container?: HTMLElement;
}

const Comp_Name = 'DialogPortal';

export const DialogPortal = (props: DialogPortalProps) => {
  const { children, container = globalThis?.document?.body } = props;

  const dialogCtx = useDialogCtx(Comp_Name);

  if (dialogCtx.keepMounted) {
    return createPortal(
      <div style={{ visibility: dialogCtx.isOpen ? 'visible' : 'hidden' }}>
        {children}
      </div>,
      container,
    );
  }

  return dialogCtx.isOpen ? createPortal(children, container) : null;
};

DialogPortal.displayName = Comp_Name;
