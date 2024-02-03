import { forwardRef } from 'react';
import { SkeletonVariantProps, skeleton, ClassValue } from '@gist-ui/theme';

export interface SkeletonProps extends SkeletonVariantProps {
  className?: ClassValue;
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>((props, ref) => {
  const { className, variant = 'text', animation = 'pulse' } = props;

  const styles = skeleton({ variant, className, animation });

  return <div ref={ref} className={styles} />;
});

Skeleton.displayName = 'gist-ui.Skeleton';

export default Skeleton;
