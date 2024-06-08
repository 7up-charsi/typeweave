import React from 'react';
import { Status, useAvatarCtx, useAvatarStyles } from './avatar-root';

export interface AvatarImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {}

const displayName = 'AvatarImage';

export const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  (props: AvatarImageProps, forwardedRef) => {
    const { src, className, ...restProps } = props;

    const { setStatus, onLoadingStatusChange, status } =
      useAvatarCtx(displayName);

    const avatarStyles = useAvatarStyles(displayName);

    React.useLayoutEffect(() => {
      if (!src) {
        setStatus('error');
        return;
      }

      let isMounted = true;

      const img = new Image();

      setStatus('loading');

      const handleStatus = (status: Status) => () => {
        if (!isMounted) return;

        onLoadingStatusChange(status);
        setStatus(status);
      };

      img.onload = handleStatus('loaded');
      img.onerror = handleStatus('error');
      img.src = src;

      return () => {
        isMounted = false;
      };
    }, [onLoadingStatusChange, setStatus, src]);

    return status === 'loaded' ? (
      <img
        {...restProps}
        src={src}
        ref={forwardedRef}
        className={avatarStyles.image({ className })}
      />
    ) : null;
  },
);

AvatarImage.displayName = displayName;
