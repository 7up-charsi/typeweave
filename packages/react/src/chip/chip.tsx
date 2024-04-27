import { ChipClassNames, ChipVariantProps, chip } from '@webbo-ui/theme';
import { usePointerEvents } from '../use-pointer-events';
import { accessibilityWarning } from '../custom-error';
import React from 'react';
import { XIcon } from 'lucide-react';

export interface ChipProps
  extends ChipVariantProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  label?: string;
  avatar?: React.ReactNode;
  deleteIcon?: React.ReactNode;
  onDelete?: () => void;
  deleteIconA11yLabel?: string;
  classNames?: ChipClassNames;
  excludeFromTabOrder?: boolean;
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
      excludeFromTabOrder,
      deleteIcon,
      deleteIconA11yLabel = 'delete',
      ...restProps
    } = props;

    const pointerEvents = usePointerEvents({
      onPress: onDelete,
      onPointerDown,
      onPointerUp,
    });

    const handleKeyUp = (e: React.KeyboardEvent) => {
      const Backspace = e.key === 'Backspace';
      const Delete = e.key === 'Delete';

      if (Backspace || Delete) {
        onDelete?.();
        return;
      }
    };

    const styles = React.useMemo(
      () => chip({ color, size, variant }),
      [color, size, variant],
    );

    const ariaLabel = props['aria-label'];
    const ariaLabelledby = props['aria-labelledby'];

    const onDeleteProvided = !!onDelete;

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      React.useEffect(() => {
        if (onDeleteProvided && !deleteIconA11yLabel)
          accessibilityWarning(
            'Chip',
            'You must provide `deleteIconA11yLabel` when `onDelete` is provided',
          );

        if (!ariaLabel && !ariaLabelledby)
          accessibilityWarning(
            'Chip',
            'You must provide `aria-label` or `aria-labelledby`',
          );
      }, [ariaLabel, ariaLabelledby, deleteIconA11yLabel, onDeleteProvided]);
    }

    return (
      <div
        {...restProps}
        ref={ref}
        className={styles.base({ className: classNames?.base ?? className })}
      >
        {avatar}
        <span className={styles.content({ className: classNames?.content })}>
          {label}
        </span>

        {onDelete ? (
          <span
            onKeyUp={handleKeyUp}
            {...pointerEvents}
            tabIndex={excludeFromTabOrder ? -1 : 0}
            role="button"
            className={styles.deleteIcon({ className: classNames?.deleteIcon })}
            aria-label={deleteIconA11yLabel}
          >
            {deleteIcon ?? <XIcon />}
          </span>
        ) : null}
      </div>
    );
  },
);

Chip.displayName = displayName;
