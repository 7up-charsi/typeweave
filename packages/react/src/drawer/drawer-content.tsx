import { DrawerVariantProps, drawer } from '@typeweave/theme';
import React from 'react';
import { useDrawerCtx } from './drawer-root';
import { useScrollLock } from '../use-scroll-lock';
import { createContextScope } from '../context';
import { VisuallyHidden } from '../visually-hidden';

export interface DrawerContentProps
  extends DrawerVariantProps,
    React.HTMLAttributes<HTMLDivElement> {
  noA11yTitle?: boolean;
  noA11yDescription?: boolean;
}

const displayName = 'DrawerContent';

const [DrawerStyles, useDrawerStyles] =
  createContextScope<ReturnType<typeof drawer>>(displayName);

export { useDrawerStyles };

export const DrawerContent = React.forwardRef<
  HTMLDivElement,
  DrawerContentProps
>((props, ref) => {
  const {
    children,
    className,
    noA11yDescription,
    noA11yTitle,
    placement = 'left',
    ...restProps
  } = props;

  const drawerCtx = useDrawerCtx(displayName);

  useScrollLock();

  const styles = React.useMemo(() => drawer({ placement }), [placement]);

  return (
    <DrawerStyles {...styles}>
      <div
        {...restProps}
        ref={ref}
        role="presentation"
        aria-labelledby={noA11yTitle ? undefined : drawerCtx.titleId}
        aria-describedby={
          noA11yDescription ? undefined : drawerCtx.descriptionId
        }
        id={drawerCtx.contentId}
        className={styles.content({ className })}
      >
        <VisuallyHidden>
          <button onPointerUp={() => drawerCtx.handleClose('virtual')}>
            close
          </button>
        </VisuallyHidden>

        {children}

        <VisuallyHidden>
          <button onPointerUp={() => drawerCtx.handleClose('virtual')}>
            close
          </button>
        </VisuallyHidden>
      </div>
    </DrawerStyles>
  );
});

DrawerContent.displayName = displayName;
