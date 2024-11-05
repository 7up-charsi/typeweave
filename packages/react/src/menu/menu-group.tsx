import React from 'react';
import { useMenuStyles } from './menu-content';

export interface MenuGroupProps extends React.HTMLAttributes<HTMLUListElement> {
  label: string;
  hideLabel?: boolean;
  classNames?: {
    label?: string;
    group?: string;
  };
}

const displayName = 'MenuGroup';

export const MenuGroup = React.forwardRef<HTMLUListElement, MenuGroupProps>(
  (props, ref) => {
    const { className, classNames, label, hideLabel, ...restProps } = props;

    const styles = useMenuStyles(displayName);

    React.useEffect(() => {
      if (process.env.NODE_ENV !== 'production') {
        if (!label)
          console.warn(
            'Typeweave: For accessible MenuGroup, provide `label` prop for screen readers to describe its purpose. If you want to hide the label visually, use the `hideLabel` prop',
          );
      }
    }, [label]);

    return (
      <li role="none">
        {hideLabel
          ? null
          : !!label && (
              <div
                role="presentation"
                className={styles.label({ className: classNames?.label })}
              >
                {label}
              </div>
            )}

        <ul
          {...restProps}
          aria-label={label ?? 'List group'}
          ref={ref}
          role="group"
          className={styles.group({
            className: classNames?.group ?? className,
          })}
        />
      </li>
    );
  },
);

MenuGroup.displayName = displayName;
