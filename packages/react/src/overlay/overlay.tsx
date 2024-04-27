import { OverlayVariantProps, overlay } from '@webbo-ui/theme';
import React from 'react';

export interface OverlayProps
  extends OverlayVariantProps,
    React.HTMLAttributes<HTMLDivElement> {}

const displayName = 'Overlay';

export const Overlay = React.forwardRef<HTMLDivElement, OverlayProps>(
  (props, ref) => {
    const { className, variant = 'opaque', ...restProps } = props;

    const styles = React.useMemo(
      () => overlay({ variant, className }),
      [className, variant],
    );

    return <div {...restProps} ref={ref} className={styles} />;
  },
);

Overlay.displayName = displayName;
