'use client';

import { AlertVariantProps, alert as alertStyles } from '@webbo-ui/theme';
import { Button } from '../button';
import { Icon } from '../icon';
import React from 'react';
import {
  alert_success_icon,
  alert_close_icon,
  alert_danger_icon,
  alert_info_icon,
  alert_warning_icon,
} from './icons';

const icons = {
  success: alert_success_icon,
  info: alert_info_icon,
  warning: alert_warning_icon,
  danger: alert_danger_icon,
};

export interface AlertProps
  extends AlertVariantProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'title'> {
  icon?: false | React.ReactNode;
  action?: false | React.ReactNode;
  title?: React.ReactNode;
  onClose?: () => void;
}

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
      icon = <Icon>{icons[color || 'danger']}</Icon>,
      ...restProps
    } = props;

    const styles = alertStyles({ color, fullWidth, variant });

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
                {alert_close_icon}
              </Button>
            )}
          </div>
        )}
      </div>
    );
  },
);

Alert.displayName = 'Alert';
