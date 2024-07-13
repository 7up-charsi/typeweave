import { Button } from '../button';
import React from 'react';
import {
  X as XIcon,
  Check,
  Info,
  CircleAlert,
  TriangleAlert,
} from 'lucide-react';
import { AlertVariantProps, alertStyles } from './alert.styles';

const icons = {
  success: <Check />,
  info: <Info />,
  warning: <TriangleAlert />,
  danger: <CircleAlert />,
};

export interface AlertProps
  extends AlertVariantProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'title'> {
  icon?: false | React.ReactNode;
  action?: false | React.ReactNode;
  title?: React.ReactNode;
  onClose?: () => void;
  classNames?: Partial<{
    base: string;
    icon: string;
    content: string;
    title: string;
    action: string;
  }>;
}

const displayName = 'Alert';

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (props, ref) => {
    const {
      variant = 'flat',
      color = 'danger',
      children,
      title,
      onClose,
      action,
      fullWidth = true,
      classNames,
      className,
      icon = icons[color || 'danger'],
      ...restProps
    } = props;

    const styles = React.useMemo(
      () => alertStyles({ color, fullWidth, variant }),
      [color, fullWidth, variant],
    );

    return (
      <div
        {...restProps}
        ref={ref}
        role="alert"
        className={styles.base({ className: classNames?.base ?? className })}
      >
        {icon === false ? null : (
          <div className={styles.icon({ className: classNames?.icon })}>
            {icon}
          </div>
        )}

        <div className={styles.content({ className: classNames?.content })}>
          {title && (
            <div className={styles.title({ className: classNames?.title })}>
              {title}
            </div>
          )}
          {children}
        </div>

        {action === false || !onClose ? null : (
          <div className={styles.action({ className: classNames?.action })}>
            {action || (
              <Button
                isIconOnly
                size="sm"
                color={color}
                aria-label="remove alert"
              >
                <XIcon />
              </Button>
            )}
          </div>
        )}
      </div>
    );
  },
);

Alert.displayName = displayName;
