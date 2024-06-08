import React from 'react';
import { useAvatarCtx, useAvatarStyles } from './avatar-root';

export interface AvatarFallbackProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  delay?: number;
}

const displayName = 'AvatarFallback';

export const AvatarFallback = React.forwardRef<
  HTMLSpanElement,
  AvatarFallbackProps
>((props: AvatarFallbackProps, forwardedRef) => {
  const { delay, className, ...restProps } = props;

  const [renderChildren, setRenderChildren] = React.useState(
    delay === undefined,
  );

  const { status } = useAvatarCtx(displayName);

  const avatarStyles = useAvatarStyles(displayName);

  React.useEffect(() => {
    if (delay !== undefined) {
      const timerId = window.setTimeout(() => setRenderChildren(true), delay);
      return () => window.clearTimeout(timerId);
    }
  }, [delay]);

  return status !== 'loaded' && renderChildren ? (
    <span
      {...restProps}
      ref={forwardedRef}
      className={avatarStyles.fallback({ className })}
    />
  ) : null;
});

AvatarFallback.displayName = displayName;
