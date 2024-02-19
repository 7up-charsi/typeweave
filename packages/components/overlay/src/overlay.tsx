'use client';

import { OverlayVariantProps, overlay } from '@webbo-ui/theme';

export interface OverlayProps extends OverlayVariantProps {
  children?: React.ReactNode;
  className?: string;
}

const Overlay = (props: OverlayProps) => {
  const { children, className } = props;

  const styles = overlay({ className });

  return <div className={styles}>{children}</div>;
};

Overlay.displayName = 'webbo-ui.Overlay';

export default Overlay;
