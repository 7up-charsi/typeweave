import { DialogVariantProps, dialog } from '@typeweave/theme';
import React from 'react';
import { useDialogCtx } from './dialog-root';
import { useScrollLock } from '../use-scroll-lock';
import { createContextScope } from '../context';
import { FocusTrap } from '../focus-trap';
import { VisuallyHidden } from '../visually-hidden';

export interface DialogContentProps
  extends DialogVariantProps,
    React.HTMLAttributes<HTMLDivElement> {
  noA11yTitle?: boolean;
  noA11yDescription?: boolean;
}

const displayName = 'DialogContent';

const [DialogStyles, useDialogStyles] =
  createContextScope<ReturnType<typeof dialog>>(displayName);

export { useDialogStyles };

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>((props, ref) => {
  const { children, className, noA11yDescription, noA11yTitle, ...restProps } =
    props;

  const dialogCtx = useDialogCtx(displayName);

  useScrollLock();

  const styles = React.useMemo(() => dialog(), []);

  const content = (
    <div
      {...restProps}
      ref={ref}
      role="dialog"
      aria-labelledby={noA11yTitle ? undefined : dialogCtx.titleId}
      aria-describedby={noA11yDescription ? undefined : dialogCtx.descriptionId}
      aria-modal={dialogCtx.modal}
      id={dialogCtx.contentId}
      className={styles.content({ className })}
    >
      <VisuallyHidden>
        <button onPointerUp={() => dialogCtx.handleClose('virtual')}>
          close
        </button>
      </VisuallyHidden>

      {children}

      <VisuallyHidden>
        <button onPointerUp={() => dialogCtx.handleClose('virtual')}>
          close
        </button>
      </VisuallyHidden>
    </div>
  );

  return (
    <DialogStyles {...styles}>
      {dialogCtx.modal ? (
        <FocusTrap
          asChild
          trapped
          loop={dialogCtx.loop}
          onMountAutoFocus={dialogCtx.onMountAutoFocus}
          onUnmountAutoFocus={dialogCtx.onUnmountAutoFocus}
          focusScope={dialogCtx.focusScope}
        >
          {content}
        </FocusTrap>
      ) : (
        content
      )}
    </DialogStyles>
  );
});

DialogContent.displayName = displayName;
