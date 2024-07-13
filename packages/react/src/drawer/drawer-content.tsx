import React from 'react';
import { useDrawerCtx } from './drawer-root';
import { useScrollLock } from '../use-scroll-lock';
import { createContextScope } from '../context';
import { DrawerVariantProps, drawerStyles } from './drawer.styles';
import { FocusTrap } from '../focus-trap';

export interface DrawerContentProps
  extends DrawerVariantProps,
    React.HTMLAttributes<HTMLDivElement> {
  loop?: boolean;
}

const displayName = 'DrawerContent';

const [DrawerStyles, useDrawerStyles] =
  createContextScope<ReturnType<typeof drawerStyles>>(displayName);

export { useDrawerStyles };

export const DrawerContent = React.forwardRef<
  HTMLDivElement,
  DrawerContentProps
>((props, ref) => {
  const {
    children,
    className,
    placement = 'left',
    loop = true,
    ...restProps
  } = props;

  const drawerCtx = useDrawerCtx(displayName);

  useScrollLock({ disabled: !drawerCtx.open });

  const styles = React.useMemo(() => drawerStyles({ placement }), [placement]);

  return (
    <DrawerStyles {...styles}>
      <FocusTrap trapped loop={loop} asChild>
        <div
          {...restProps}
          ref={ref}
          role="presentation"
          id={drawerCtx.contentId}
          className={styles.content({ className })}
        >
          {children}
        </div>
      </FocusTrap>
    </DrawerStyles>
  );
});

DrawerContent.displayName = displayName;
