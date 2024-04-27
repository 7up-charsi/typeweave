import {
  CheckboxClassNames,
  CheckboxVariantProps,
  checkbox,
} from '@webbo-ui/theme';
import { mergeRefs } from '@webbo-ui/react-utils';
import { Icon } from '../icon';
import React from 'react';
import { checked_icon, indeterminate_icon } from './icons';

export interface CheckboxProps
  extends CheckboxVariantProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'color' | 'size'> {
  classNames?: CheckboxClassNames;
  label?: string;
  indeterminate?: boolean;
  indeterminateIcon?: React.ReactNode;
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
}

const displayName = 'Checkbox';

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const {
      classNames,
      className,
      label,
      id: idProp,
      checked,
      indeterminate,
      icon,
      checkedIcon = <Icon>{checked_icon}</Icon>,
      indeterminateIcon = <Icon>{indeterminate_icon}</Icon>,
      size = 'md',
      color = 'primary',
      labelPlacement = 'right',
      ...inpuProps
    } = props;

    const innerRef = React.useRef<HTMLInputElement>(null);

    const autoId = React.useId();
    const id = idProp ?? autoId;

    const styles = checkbox({ size, labelPlacement, color });

    React.useEffect(() => {
      if (!innerRef.current) return;

      innerRef.current.indeterminate = !!indeterminate;
    }, [indeterminate]);

    return (
      <div
        className={styles.base({ className: classNames?.base ?? className })}
      >
        <div className={styles.checkbox({ className: classNames?.checkbox })}>
          <input
            {...inpuProps}
            checked={checked}
            id={id}
            ref={mergeRefs(ref, innerRef)}
            type="checkbox"
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
          <div
            className={styles.indeterminateIcon({
              className: classNames?.indeterminateIcon,
            })}
          >
            {indeterminateIcon}
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

Checkbox.displayName = displayName;
