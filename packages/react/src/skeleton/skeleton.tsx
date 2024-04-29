'use server';

import React from 'react';
import { SkeletonVariantProps, skeleton } from '@typeweave/theme';

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
      () => skeleton({ variant, className, animation }),
      [animation, className, variant],
    );

    return <div {...restProps} ref={ref} className={styles} />;
  },
);

Skeleton.displayName = displayName;
