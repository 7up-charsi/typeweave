import React from 'react';
import { SkeletonVariantProps, skeletonStyles } from './skeleton.styles';

export interface SkeletonProps
  extends SkeletonVariantProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {}

const displayName = 'Skeleton';

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (props, ref) => {
    const {
      className,
      variant = 'text',
      animation = 'pulse',
      ...restProps
    } = props;

    const styles = React.useMemo(
      () => skeletonStyles({ variant, className, animation }),
      [animation, className, variant],
    );

    return <div {...restProps} ref={ref} className={styles} />;
  },
);

Skeleton.displayName = displayName;
