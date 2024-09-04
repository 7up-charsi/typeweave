import React from 'react';
import { OverlayVariantProps, overlayStyles } from './overlay.styles';

export interface OverlayProps
  extends OverlayVariantProps,
    React.HTMLAttributes<HTMLDivElement> {}

const displayName = 'Overlay';

export const Overlay = React.forwardRef<HTMLDivElement, OverlayProps>(
  (props, ref) => {
    const { className, variant = 'blur', ...restProps } = props;

    const styles = React.useMemo(
      () => overlayStyles({ variant, className }),
      [className, variant],
    );

    return <div {...restProps} ref={ref} className={styles} />;
  },
);

Overlay.displayName = displayName;
