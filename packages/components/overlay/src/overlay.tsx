'use server';

import { OverlayVariantProps, overlay } from '@gist-ui/theme';
import { forwardRef } from 'react';

export interface OverlayProps extends OverlayVariantProps {
  children?: React.ReactNode;
}

const Overlay = forwardRef<HTMLDivElement, OverlayProps>((props, ref) => {
  const { children, variant = 'opaque' } = props;

  const styles = overlay({ variant });

  return (
    <div ref={ref} className={styles}>
      {children}
    </div>
  );
});

Overlay.displayName = 'gist-ui.Overlay';

export default Overlay;
