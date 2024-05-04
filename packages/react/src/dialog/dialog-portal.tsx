import { createPortal } from 'react-dom';
import { useDialogCtx } from './dialog-root';

export interface DialogPortalProps {
  children?: React.ReactNode;
  container?: HTMLElement;
}

const displayName = 'DialogPortal';

export const DialogPortal = (props: DialogPortalProps) => {
  const { children, container = globalThis?.document?.body } = props;

  const dialogCtx = useDialogCtx(displayName);

  if (dialogCtx.keepMounted) {
    return createPortal(
      <div style={{ visibility: dialogCtx.open ? 'visible' : 'hidden' }}>
        {children}
      </div>,
      container,
    );
  }

  return dialogCtx.open ? createPortal(children, container) : null;
};

DialogPortal.displayName = displayName;
