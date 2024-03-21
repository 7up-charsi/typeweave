'use client';

import { forwardRef, useEffect, useId, useRef } from 'react';
import {
  CheckboxClassNames,
  CheckboxVariantProps,
  checkbox,
} from '@webbo-ui/theme';
import { mergeRefs } from '@webbo-ui/react-utils';

const checked_svg = (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m5 12 4.7 4.5 9.3-9"
    />
  </svg>
);

const indeterminate_svg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width="1em"
    height="1em"
    fill="currentColor"
  >
    <path d="M2 8a1 1 0 011-1h10a1 1 0 110 2H3a1 1 0 01-1-1z"></path>
  </svg>
);

export interface CheckboxProps
  extends CheckboxVariantProps,
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'color' | 'size' | 'className'
    > {
  classNames?: CheckboxClassNames;
  label?: string;
  indeterminate?: boolean;
  indeterminateIcon?: React.ReactNode;
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    classNames,
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

  const innerRef = useRef<HTMLInputElement>(null);

  const autoId = useId();
  const id = idProp ?? autoId;

  const styles = checkbox({ size, labelPlacement, color });

  useEffect(() => {
    if (!innerRef.current) return;

    innerRef.current.indeterminate = !!indeterminate;
  }, [indeterminate]);

  return (
    <div className={styles.base({ className: classNames?.base })}>
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
          className={styles.checkedIcon({ className: classNames?.checkedIcon })}
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
});

Checkbox.displayName = 'webbo-ui.Checkbox';

export default Checkbox;
