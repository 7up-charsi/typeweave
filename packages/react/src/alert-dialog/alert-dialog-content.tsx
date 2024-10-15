import React from 'react';
import { useAlertDialogCtx } from './alert-dialog-root';
import { useScrollLock } from '../use-scroll-lock';
import { FocusTrap, FocusTrapProps } from '../focus-trap';
import {
  alertDialogStyles,
  AlertDialogVariantProps,
} from './alert-dialog.styles';
import { createContextScope } from '../context';

export interface AlertDialogContentProps
  extends AlertDialogVariantProps,
    Omit<
      React.HTMLAttributes<HTMLDivElement>,
      'aria-labelledby' | 'aria-describedby'
    >,
    Pick<FocusTrapProps, 'loop' | 'onUnmountAutoFocus' | 'onMountAutoFocus'> {
  title: string;
  description: string;
  classNames?: Partial<{
    content: string;
    title: string;
    description: string;
    actions: string;
  }>;
}

const displayName = 'AlertDialogContent';

const [AlertDialogStylesCtx, useAlertDialogStylesCtx] =
  createContextScope<ReturnType<typeof alertDialogStyles>>(displayName);

export { useAlertDialogStylesCtx };

export const AlertDialogContent = React.forwardRef<
  HTMLDivElement,
  AlertDialogContentProps
>((props, ref) => {
  const {
    children,
    className,
    classNames,
    onMountAutoFocus,
    onUnmountAutoFocus,
    loop = true,
    title,
    description,
    id,
    ...restProps
  } = props;

  const titleId = React.useId();
  const descId = React.useId();

  const dialogCtx = useAlertDialogCtx(displayName);

  const contentId = id ?? dialogCtx.contentId;

  useScrollLock({ isLocked: dialogCtx.open });

  const styles = React.useMemo(() => alertDialogStyles(), []);

  return (
    <AlertDialogStylesCtx {...styles}>
      <FocusTrap
        asChild
        trapped
        loop={loop}
        onMountAutoFocus={onMountAutoFocus}
        onUnmountAutoFocus={onUnmountAutoFocus}
      >
        <div
          {...restProps}
          ref={ref}
          role="alertdialog"
          aria-modal={true}
          id={contentId}
          aria-labelledby={titleId}
          aria-describedby={descId}
          className={styles.content({
            className: classNames?.content ?? className,
          })}
        >
          <div
            id={titleId}
            className={styles.title({ className: classNames?.title })}
          >
            {title}
          </div>

          <div
            id={descId}
            className={styles.description({
              className: classNames?.description,
            })}
          >
            {description}
          </div>

          <div
            className={styles.actions({
              className: classNames?.actions,
            })}
          >
            {children}
          </div>
        </div>
      </FocusTrap>
    </AlertDialogStylesCtx>
  );
});

AlertDialogContent.displayName = displayName;
