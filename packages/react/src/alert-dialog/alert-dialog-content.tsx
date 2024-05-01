import { AlertDialogVariantProps, alertDialog } from '@typeweave/theme';
import React from 'react';
import { useScrollLock } from '../use-scroll-lock';
import { useAlertDialogCtx } from './alert-dialog-root';
import { FocusTrap } from '../focus-trap';
import { createContextScope } from '../context';

export interface AlertDialogContentProps
  extends AlertDialogVariantProps,
    React.HTMLAttributes<HTMLDivElement> {
  noA11yTitle?: boolean;
  noA11yDescription?: boolean;
}

const displayName = 'AlertDialogContent';

const [AlertDialogStyles, useAlertDialogStyles] =
  createContextScope<ReturnType<typeof alertDialog>>(displayName);

export { useAlertDialogStyles };

export const AlertDialogContent = React.forwardRef<
  HTMLDivElement,
  AlertDialogContentProps
>((props, ref) => {
  const { className, noA11yDescription, noA11yTitle, ...restProps } = props;

  const alertDialogCtx = useAlertDialogCtx(displayName);

  useScrollLock();

  const styles = React.useMemo(() => alertDialog(), []);

  return (
    <AlertDialogStyles {...styles}>
      <FocusTrap
        loop
        trapped
        focusScope={alertDialogCtx.focusScope}
        disabled={!alertDialogCtx.isOpen}
        asChild
      >
        <div
          {...restProps}
          ref={ref}
          role="alertdialog"
          aria-labelledby={noA11yTitle ? undefined : alertDialogCtx.titleId}
          aria-describedby={
            noA11yDescription ? undefined : alertDialogCtx.descriptionId
          }
          aria-modal={true}
          id={alertDialogCtx.contentId}
          className={styles.content({ className })}
        />
      </FocusTrap>
    </AlertDialogStyles>
  );
});

AlertDialogContent.displayName = displayName;
