import { BadgeClassNames, BadgeVariantProps, badge } from '@webbo-ui/theme';
import React from 'react';

export interface BadgeProps
  extends BadgeVariantProps,
    Omit<React.HTMLAttributes<HTMLSpanElement>, 'color' | 'content'> {
  content?: number;
  max?: number;
  classNames?: BadgeClassNames;
  showZero?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const {
    children,
    content,
    max,
    classNames,
    className,
    showZero = false,
    invisible = false,
    variant = 'standard',
    color = 'info',
    placement = 'top-right',
    shadow = 'md',
    ...restProps
  } = props;

  const styles = badge({ color, variant, placement, shadow, invisible });

  return (
    <span
      {...restProps}
      ref={ref}
      className={styles.base({ className: classNames?.base ?? className })}
    >
      {children}
      {((showZero && content === 0) || !!content) && variant === 'standard' && (
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
