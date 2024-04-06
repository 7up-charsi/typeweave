'use server';

import React from 'react';
import { SkeletonVariantProps, skeleton } from '@webbo-ui/theme';

export interface SkeletonProps
  extends SkeletonVariantProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (props, ref) => {
    const {
      className,
      variant = 'text',
      animation = 'pulse',
      ...restProps
    } = props;

    const styles = skeleton({ variant, className, animation });

    return <div {...restProps} ref={ref} className={styles} />;
  },
);

Skeleton.displayName = 'webbo-ui.Skeleton';

export default Skeleton;
