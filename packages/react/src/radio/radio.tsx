import React from 'react';
import { Circle } from 'lucide-react';
import { RadioVariantProps, radioStyles } from './radio.styles';

export interface RadioProps
  extends RadioVariantProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'color' | 'size'> {
  classNames?: Partial<{
    base: string;
    radio: string;
    input: string;
    icon: string;
    checkedIcon: string;
    label: string;
  }>;
  label?: string;
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
}

const displayName = 'Radio';

const circleDot = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-circle-dot"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" fill="currentColor" r="4" />
  </svg>
);

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (props, ref) => {
    const {
      classNames,
      className,
      label,
      id: idProp,
      checked,
      icon = <Circle />,
      checkedIcon = circleDot,
      size = 'md',
      color = 'primary',
      labelPlacement = 'right',
      ...inpuProps
    } = props;

    const autoId = React.useId();
    const id = idProp ?? autoId;

    const styles = React.useMemo(
      () => radioStyles({ labelPlacement, color, size }),
      [color, labelPlacement, size],
    );

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
