'use client';

import { forwardRef, useId } from 'react';
import {
  SwitchClassNames,
  SwitchVariantProps,
  switch as switchStyles,
} from '@webbo-ui/theme';
import { Icon } from '@webbo-ui/icon';

const icon_svg = (
  <Icon>
    <svg fill="none" viewBox="0 0 24 24">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18 18 6m0 12L6 6"
      />
    </svg>
  </Icon>
);

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

export interface SwitchProps
  extends SwitchVariantProps,
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'color' | 'size' | 'className'
    > {
  classNames?: SwitchClassNames;
  label?: string;
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
  const {
    classNames,
    label,
    id: idProp,
    icon = icon_svg,
    checkedIcon = checked_svg,
    size = 'md',
    color = 'primary',
    labelPlacement = 'right',
    ...restProps
  } = props;

  const autoId = useId();
  const id = idProp ?? autoId;

  const styles = switchStyles({ size, labelPlacement, color });

  return (
    <div className={styles.base({ className: classNames?.base })}>
      <div className={styles.switch({ className: classNames?.switch })}>
        <input
          {...restProps}
          id={id}
          ref={ref}
          type="checkbox"
          className={styles.input({ className: classNames?.input })}
        />

        <div className={styles.indicator({ className: classNames?.indicator })}>
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
});

Switch.displayName = 'webbo-ui.Switch';

export default Switch;
