import React from 'react';
import { ChipVariantProps, chipStyles } from './chip.styles';

export interface ChipProps
  extends Omit<ChipVariantProps, 'pressable'>,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  label?: string;
  avatar?: React.ReactNode;
  icon?: React.ReactNode;
  deleteIcon?: React.ReactNode;
  onDelete?: () => void;
  classNames?: Partial<{
    base: string;
    content: string;
    avatar: string;
    icon: string;
    deleteIcon: string;
  }>;
}

const displayName = 'Chip';

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (props, ref) => {
    const {
      label,
      avatar,
      onDelete,
      size = 'md',
      variant = 'flat',
      color = 'primary',
      classNames,
      className,
      icon,
      deleteIcon,
      tabIndex,
      role,
      onClick,
      onKeyUp,
      ...restProps
    } = props;

    const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyUp?.(e);

      if (['Backspace', 'Delete'].includes(e.key)) onDelete?.();
    };

    const pressable = !!onClick;

    const styles = React.useMemo(
      () => chipStyles({ color, size, variant, pressable }),
      [color, size, variant, pressable],
    );

    return (
      <div
        {...restProps}
        ref={ref}
        className={styles.base({ className: classNames?.base ?? className })}
        tabIndex={tabIndex ?? (onClick || onDelete ? 0 : undefined)}
        role={role ?? (onClick || onDelete ? 'button' : undefined)}
        onKeyUp={handleKeyUp}
      >
        {avatar && (
          <span className={styles.avatar({ className: classNames?.avatar })}>
            {avatar}
          </span>
        )}

        {!avatar && icon && (
          <span className={styles.icon({ className: classNames?.icon })}>
            {icon}
          </span>
        )}

        <span className={styles.content({ className: classNames?.content })}>
          {label}
        </span>

        {onDelete ? (
          <span
            onClick={onDelete}
            className={styles.deleteIcon({ className: classNames?.deleteIcon })}
          >
            {deleteIcon ?? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
                ></path>
              </svg>
            )}
          </span>
        ) : null}
      </div>
    );
  },
);

Chip.displayName = displayName;
