import React from 'react';
import { RadioClassNames, RadioVariantProps, radio } from '@webbo-ui/theme';
import { Icon } from '../icon';
import { checked_icon, circle_icon } from './icons';

export interface RadioProps
  extends RadioVariantProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'color' | 'size'> {
  classNames?: RadioClassNames;
  label?: string;
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
}

const displayName = 'Radio';

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (props, ref) => {
    const {
      classNames,
      className,
      label,
      id: idProp,
      checked,
      icon = <Icon>{circle_icon}</Icon>,
      checkedIcon = <Icon>{checked_icon}</Icon>,
      size = 'md',
      color = 'primary',
      labelPlacement = 'right',
      ...inpuProps
    } = props;

    const autoId = React.useId();
    const id = idProp ?? autoId;

    const styles = radio({ labelPlacement, color, size });

    return (
      <div
        className={styles.base({ className: classNames?.base ?? className })}
      >
        <div className={styles.radio({ className: classNames?.radio })}>
          <input
            {...inpuProps}
            checked={checked}
            id={id}
            ref={ref}
            type="radio"
            className={styles.input({ className: classNames?.input })}
          />

          <div className={styles.icon({ className: classNames?.icon })}>
            {icon}
          </div>
          <div
            className={styles.checkedIcon({
              className: classNames?.checkedIcon,
            })}
          >
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

Radio.displayName = displayName;
