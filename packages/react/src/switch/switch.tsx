import React from 'react';
import { SwitchVariantProps, switchStyles } from './switch-styles';

export interface SwitchProps
  extends SwitchVariantProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'color' | 'size'> {
  classNames?: Partial<{
    base: string;
    switch: string;
    input: string;
    indicator: string;
    label: string;
  }>;
  label?: string;
}

const displayName = 'Switch';

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (props, ref) => {
    const {
      classNames,
      className,
      label,
      id: idProp,
      size = 'md',
      color = 'primary',
      labelPlacement = 'right',
      ...restProps
    } = props;

    const autoId = React.useId();
    const id = idProp ?? autoId;

    const styles = React.useMemo(
      () => switchStyles({ size, labelPlacement, color }),
      [color, labelPlacement, size],
    );

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
          />
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
