import React from 'react';
import { useMenuStyles } from './menu-content';

export interface MenuGroupProps extends React.HTMLAttributes<HTMLUListElement> {
  label: React.ReactNode;
  classNames?: {
    label?: string;
    group?: string;
  };
}

const displayName = 'MenuGroup';

export const MenuGroup = React.forwardRef<HTMLUListElement, MenuGroupProps>(
  (props, ref) => {
    const { className, classNames, label, ...restProps } = props;

    const styles = useMenuStyles(displayName);

    return (
      <li role="none">
        <div
          role="presentation"
          className={styles.label({ className: classNames?.label })}
        >
          {label}
        </div>

        <ul
          {...restProps}
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
