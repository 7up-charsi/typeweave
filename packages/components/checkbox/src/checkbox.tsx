import {
  CheckboxClassNames,
  CheckboxVariantProps,
  checkbox,
} from '@webbo-ui/theme';
import { mergeRefs } from '@webbo-ui/react-utils';
import { Icon } from '@webbo-ui/icon';
import React from 'react';

const checked_svg = (
  <Icon>
    <svg fill="none" viewBox="0 0 24 24">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m5 12 4.7 4.5 9.3-9"
      />
    </svg>
  </Icon>
);

const indeterminate_svg = (
  <Icon>
    <svg viewBox="0 0 16 16" fill="currentColor">
      <path d="M2 8a1 1 0 011-1h10a1 1 0 110 2H3a1 1 0 01-1-1z"></path>
    </svg>
  </Icon>
);

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

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const {
      classNames,
      className,
      label,
      id: idProp,
      checked,
      indeterminate,
      icon,
      checkedIcon = checked_svg,
      indeterminateIcon = indeterminate_svg,
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

Checkbox.displayName = 'webbo-ui.Checkbox';

export default Checkbox;
