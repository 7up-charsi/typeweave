import { mergeRefs } from '@typeweave/react-utils';
import React from 'react';
import { Check, Minus } from 'lucide-react';
import { CheckboxVariantProps, checkboxStyles } from './checkbox.styles';

export interface CheckboxProps
  extends CheckboxVariantProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'color' | 'size'> {
  label?: string;
  indeterminate?: boolean;
  indeterminateIcon?: React.ReactNode;
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
  classNames?: Partial<{
    base: string;
    checkbox: string;
    input: string;
    icon: string;
    checkedIcon: string;
    indeterminateIcon: string;
    label: string;
  }>;
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
      checkedIcon = <Check />,
      indeterminateIcon = <Minus />,
      size = 'md',
      color = 'primary',
      labelPlacement = 'right',
      ...inpuProps
    } = props;

    const innerRef = React.useRef<HTMLInputElement>(null);

    const autoId = React.useId();
    const id = idProp ?? autoId;

    const styles = React.useMemo(
      () => checkboxStyles({ size, labelPlacement, color }),
      [color, labelPlacement, size],
    );

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
