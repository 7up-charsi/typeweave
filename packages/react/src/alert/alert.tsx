import { AlertVariantProps, alert as alertStyles } from '@typeweave/theme';
import { Button } from '../button';
import React from 'react';
import {
  X as XIcon,
  Check,
  Info,
  CircleAlert,
  TriangleAlert,
} from 'lucide-react';

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
      icon = icons[color || 'danger'],
      ...restProps
    } = props;

    const styles = React.useMemo(
      () => alertStyles({ color, fullWidth, variant }),
      [color, fullWidth, variant],
    );

    return (
      <div {...restProps} ref={ref} role="alert" className={styles.base()}>
        {icon === false ? null : <div className={styles.icon()}>{icon}</div>}

        <div className={styles.content()}>
          {title && <div className={styles.title()}>{title}</div>}
          {children}
        </div>

        {action === false || !onClose ? null : (
          <div className={styles.action()}>
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
