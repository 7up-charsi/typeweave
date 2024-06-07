import React from 'react';
import { BadgeVariantProps, badgeStyles } from './badge-styles';

export interface BadgeProps
  extends BadgeVariantProps,
    Omit<React.HTMLAttributes<HTMLSpanElement>, 'color' | 'content'> {
  content?: number;
  max?: number;
  showZero?: boolean;
  classNames?: Partial<{
    base: string;
    content: string;
  }>;
}

const displayName = 'Badge';

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (props, ref) => {
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
      shadow = true,
      ...restProps
    } = props;

    const styles = React.useMemo(
      () => badgeStyles({ color, variant, placement, shadow, invisible }),
      [color, invisible, placement, shadow, variant],
    );

    return (
      <span
        {...restProps}
        ref={ref}
        className={styles.base({ className: classNames?.base ?? className })}
      >
        {children}
        {((showZero && content === 0) || !!content) &&
          variant === 'standard' && (
            <span
              className={styles.content({ className: classNames?.content })}
            >
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
  },
);

Badge.displayName = displayName;
