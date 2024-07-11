import React from 'react';
import { useDrawerCtx } from './drawer-root';
import { useScrollLock } from '../use-scroll-lock';
import { createContextScope } from '../context';
import { VisuallyHidden } from '../visually-hidden';
import { DrawerVariantProps, drawerStyles } from './drawer.styles';

export interface DrawerContentProps
  extends DrawerVariantProps,
    React.HTMLAttributes<HTMLDivElement> {}

const displayName = 'DrawerContent';

const [DrawerStyles, useDrawerStyles] =
  createContextScope<ReturnType<typeof drawerStyles>>(displayName);

export { useDrawerStyles };

export const DrawerContent = React.forwardRef<
  HTMLDivElement,
  DrawerContentProps
>((props, ref) => {
  const { children, className, placement = 'left', ...restProps } = props;

  const drawerCtx = useDrawerCtx(displayName);

  useScrollLock({ disabled: drawerCtx.keepMounted && !drawerCtx.open });

  const styles = React.useMemo(() => drawerStyles({ placement }), [placement]);

  return (
    <DrawerStyles {...styles}>
      <div
        {...restProps}
        ref={ref}
        role="presentation"
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
