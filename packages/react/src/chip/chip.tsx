import { ChipClassNames, ChipVariantProps, chip } from '@typeweave/theme';
import { usePointerEvents } from '../use-pointer-events';
import React from 'react';
import { XCircleIcon } from 'lucide-react';

export interface ChipProps
  extends ChipVariantProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  label?: string;
  avatar?: React.ReactNode;
  icon?: React.ReactNode;
  deleteIcon?: React.ReactNode;
  onDelete?: () => void;
  onPress?: (e: React.PointerEvent<HTMLDivElement>) => void;
  classNames?: ChipClassNames;
}

const displayName = 'Chip';

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (props, ref) => {
    const {
      label,
      avatar,
      onDelete,
      onPointerDown,
      onPointerUp,
      size = 'md',
      variant = 'solid',
      color = 'primary',
      classNames,
      className,
      icon,
      deleteIcon,
      tabIndex,
      role,
      onPress,
      onKeyUp,
      ...restProps
    } = props;

    const pressPointerEvents = usePointerEvents({
      onPress,
      onPointerDown,
      onPointerUp,
    });

    const deletePointerEvents = usePointerEvents({
      onPress: onDelete,
    });

    const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyUp?.(e);

      if (['Backspace', 'Delete'].includes(e.key)) onDelete?.();
    };

    const styles = React.useMemo(
      () => chip({ color, size, variant }),
      [color, size, variant],
    );

    return (
      <div
        {...restProps}
        ref={ref}
        className={styles.base({ className: classNames?.base ?? className })}
        tabIndex={tabIndex ?? (onPress || onDelete ? 0 : undefined)}
        role={role ?? (onPress || onDelete ? 'button' : undefined)}
        onKeyUp={handleKeyUp}
        {...pressPointerEvents}
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
            {...deletePointerEvents}
            className={styles.deleteIcon({ className: classNames?.deleteIcon })}
          >
            {deleteIcon ?? <XCircleIcon />}
          </span>
        ) : null}
      </div>
    );
  },
);

Chip.displayName = displayName;
