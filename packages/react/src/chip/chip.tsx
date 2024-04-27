import { ChipClassNames, ChipVariantProps, chip } from '@webbo-ui/theme';
import { usePointerEvents } from '../use-pointer-events';
import { accessibilityWarning } from '../custom-error';
import { Icon } from '../icon';
import React from 'react';

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

    const styles = chip({ color, size, variant });

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
            {deleteIcon ?? (
              <Icon>
                <svg viewBox="0 0 18 18" fill="currentColor">
                  <g strokeWidth="0"></g>
                  <g strokeLinecap="round" strokeLinejoin="round"></g>
                  <g>
                    <path
                      fill="currentColor"
                      d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Zm4.707,12.293a1,1,0,1,1-1.414,1.414L9,10.414,5.707,13.707a1,1,0,0,1-1.414-1.414L7.586,9,4.293,5.707A1,1,0,0,1,5.707,4.293L9,7.586l3.293-3.293a1,1,0,0,1,1.414,1.414L10.414,9Z"
                    ></path>
                  </g>
                </svg>
              </Icon>
            )}
          </span>
        ) : null}
      </div>
    );
  },
);

Chip.displayName = 'Chip';
