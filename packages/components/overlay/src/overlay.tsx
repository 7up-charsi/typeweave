'use server';

import { OverlayVariantProps, overlay } from '@gist-ui/theme';
import { forwardRef } from 'react';

export interface OverlayProps extends OverlayVariantProps {
  children?: React.ReactNode;
  className?: string;
}

const Overlay = forwardRef<HTMLDivElement, OverlayProps>((props, ref) => {
  const { children, className } = props;

  const styles = overlay({ className });

  return (
    <div ref={ref} className={styles}>
      {children}
    </div>
  );
});

Overlay.displayName = 'gist-ui.Overlay';

export default Overlay;
