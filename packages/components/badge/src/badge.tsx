'use client';

import { BadgeClassNames, BadgeVariantProps, badge } from '@webbo-ui/theme';
import { forwardRef } from 'react';

export interface BadgeProps
  extends BadgeVariantProps,
    Omit<
      React.HTMLAttributes<HTMLSpanElement>,
      'color' | 'className' | 'content'
    > {
  content?: number;
  max?: number;
  classNames?: BadgeClassNames;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const {
    children,
    content,
    max,
    classNames,
    variant = 'standard',
    color = 'info',
    placement = 'top-right',
    shadow = 'md',
    ...restProps
  } = props;

  const styles = badge({ color, variant, placement, shadow });

  return (
    <span
      {...restProps}
      ref={ref}
      className={styles.base({ className: classNames?.base })}
    >
      {children}
      {content && variant === 'standard' && (
        <span className={styles.content({ className: classNames?.content })}>
          {max && content > max ? `${max}+` : content}
        </span>
      )}
      {variant === 'dot' && (
        <span
          className={styles.content({ className: classNames?.content })}
        ></span>
      )}
    </span>
  );
});

Badge.displayName = 'webbo-ui.Badge';

export default Badge;
