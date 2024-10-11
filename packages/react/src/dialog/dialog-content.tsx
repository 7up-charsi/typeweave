import React from 'react';
import { useDialogCtx } from './dialog-root';
import { useScrollLock } from '../use-scroll-lock';
import { FocusTrap, FocusTrapProps } from '../focus-trap';
import { DialogVariantProps, dialogStyles } from './dialog.styles';

export interface DialogContentProps
  extends DialogVariantProps,
    React.HTMLAttributes<HTMLDivElement>,
    Pick<FocusTrapProps, 'loop' | 'onUnmountAutoFocus' | 'onMountAutoFocus'> {
  modal?: boolean;
}

const displayName = 'DialogContent';

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>((props, ref) => {
  const {
    children,
    className,
    onMountAutoFocus,
    onUnmountAutoFocus,
    loop = true,
    modal = true,
    ...restProps
  } = props;

  const dialogCtx = useDialogCtx(displayName);

  useScrollLock({ isLocked: dialogCtx.open });

  const styles = React.useMemo(() => dialogStyles(), []);

  const content = (
    <div
      {...restProps}
      ref={ref}
      role="dialog"
      aria-modal={modal}
      id={dialogCtx.contentId}
      className={styles.content({ className })}
    >
      {children}
    </div>
  );

  return modal ? (
    <FocusTrap
      asChild
      trapped
      loop={loop}
      onMountAutoFocus={onMountAutoFocus}
      onUnmountAutoFocus={onUnmountAutoFocus}
    >
      {content}
    </FocusTrap>
  ) : (
    content
  );
});

DialogContent.displayName = displayName;
