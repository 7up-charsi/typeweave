import React from 'react';
import {
  SwitchClassNames,
  SwitchVariantProps,
  switch as switchStyles,
} from '@webbo-ui/theme';
import { Icon } from '../icon';
import { checked_icon, cross_icon } from './icons';

export interface SwitchProps
  extends SwitchVariantProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'color' | 'size'> {
  classNames?: SwitchClassNames;
  label?: string;
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
}

const displayName = 'Switch';

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (props, ref) => {
    const {
      classNames,
      className,
      label,
      id: idProp,
      icon = <Icon>{cross_icon}</Icon>,
      checkedIcon = <Icon>{checked_icon}</Icon>,
      size = 'md',
      color = 'primary',
      labelPlacement = 'right',
      ...restProps
    } = props;

    const autoId = React.useId();
    const id = idProp ?? autoId;

    const styles = switchStyles({ size, labelPlacement, color });

    return (
      <div
        className={styles.base({ className: classNames?.base ?? className })}
      >
        <div className={styles.switch({ className: classNames?.switch })}>
          <input
            {...restProps}
            id={id}
            ref={ref}
            type="checkbox"
            className={styles.input({ className: classNames?.input })}
          />

          <div
            className={styles.indicator({ className: classNames?.indicator })}
          >
            {icon}
            {checkedIcon}
          </div>
        </div>

        {label && (
          <label
            htmlFor={id}
            className={styles.label({ className: classNames?.label })}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

Switch.displayName = displayName;
