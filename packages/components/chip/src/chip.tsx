'use client';

import { forwardRef } from 'react';
import { ChipClassNames, ChipVariantProps, chip } from '@webbo-ui/theme';
import { usePointerEvents } from '@webbo-ui/use-pointer-events';

const delete_svg = (
  <svg
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    width={15}
    height={15}
  >
    <g strokeWidth="0"></g>
    <g strokeLinecap="round" strokeLinejoin="round"></g>
    <g>
      <path
        fill="currentColor"
        d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Zm4.707,12.293a1,1,0,1,1-1.414,1.414L9,10.414,5.707,13.707a1,1,0,0,1-1.414-1.414L7.586,9,4.293,5.707A1,1,0,0,1,5.707,4.293L9,7.586l3.293-3.293a1,1,0,0,1,1.414,1.414L10.414,9Z"
      ></path>
    </g>
  </svg>
);

export interface ChipProps extends ChipVariantProps {
  label?: string;
  avatar?: React.ReactNode;
  deleteIcon?: React.ReactNode;
  onDelete?: () => void;
  deleteIconA11yLabel?: string;
  classNames?: ChipClassNames;
  excludeFromTabOrder?: boolean;
}

const Chip = forwardRef<HTMLDivElement, ChipProps>((props, ref) => {
  const {
    label,
    avatar,
    onDelete,
    size = 'md',
    variant = 'solid',
    color = 'primary',
    classNames,
    excludeFromTabOrder,
    deleteIcon = delete_svg,
    deleteIconA11yLabel = 'delete',
  } = props;

  const pointerEvents = usePointerEvents({ onPress: onDelete });

  const handleKeyUp = (e: React.KeyboardEvent) => {
    const Backspace = e.key === 'Backspace';
    const Delete = e.key === 'Delete';

    if (Backspace || Delete) {
      onDelete?.();
      return;
    }
  };

  const styles = chip({ color, size, variant });

  return (
    <div ref={ref} className={styles.base({ className: classNames?.base })}>
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
          {deleteIcon}
        </span>
      ) : null}
    </div>
  );
});

Chip.displayName = 'webbo-ui.Chip';

export default Chip;
