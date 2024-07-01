import React from 'react';
import { createContextScope } from '../context';
import { useCallbackRef } from '../use-callback-ref';
import { AvatarVariantProps, avatarStyles } from './avatar.styles';

export type Status = 'idle' | 'loaded' | 'loading' | 'error';

export interface AvatarRootProps
  extends AvatarVariantProps,
    React.HTMLAttributes<HTMLSpanElement> {
  onLoadingStatusChange?: (status: Status) => void;
}

const displayName = 'AvatarRoot';

interface AvatarCtxProps {
  status: Status;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  onLoadingStatusChange: (status: Status) => void;
}

const [AvatarCtx, useAvatarCtx] =
  createContextScope<AvatarCtxProps>(displayName);

const [AvatarStyles, useAvatarStyles] =
  createContextScope<ReturnType<typeof avatarStyles>>(displayName);

export { useAvatarStyles, useAvatarCtx };

export const AvatarRoot = React.forwardRef<HTMLSpanElement, AvatarRootProps>(
  (props, forwardedRef) => {
    const {
      onLoadingStatusChange: onLoadingStatusChangeProp,
      className,
      size = 'md',
      ...restProps
    } = props;

    const [status, setStatus] = React.useState<Status>('idle');

    const onLoadingStatusChange = useCallbackRef(onLoadingStatusChangeProp);

    const styles = React.useMemo(() => avatarStyles({ size }), [size]);

    return (
      <AvatarStyles {...styles}>
        <AvatarCtx
          status={status}
          setStatus={setStatus}
          onLoadingStatusChange={onLoadingStatusChange}
        >
          <span
            ref={forwardedRef}
            {...restProps}
            className={styles.base({ className })}
          />
        </AvatarCtx>
      </AvatarStyles>
    );
  },
);

AvatarRoot.displayName = displayName;
