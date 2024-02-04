'use server';

import { BadgeClassNames, BadgeVariantProps, badge } from '@gist-ui/theme';
import { forwardRef } from 'react';

export interface BadgeProps extends BadgeVariantProps {
  children?: React.ReactNode;
  content?: number;
  max?: number;
  classNames?: BadgeClassNames;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
  const {
    children,
    content,
    max,
    classNames,
    variant = 'standard',
    color = 'info',
    placement = 'top-right',
    shadow = 'md',
    overlap = 'rectangular',
  } = props;

  const styles = badge({ color, variant, placement, shadow, overlap });

  return (
    <div ref={ref} className={styles.base({ className: classNames?.base })}>
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
    </div>
  );
});

Badge.displayName = 'gist-ui.Badge';

export default Badge;
