import { mergeProps } from '@gist-ui/react-utils';
import { useFocusRing } from '@react-aria/focus';
import { useHover, usePress } from '@react-aria/interactions';
import { forwardRef } from 'react';

export interface PaginationItemProps {
  className: string;
  a11yLabel: string;
  selected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
  isDisabled: boolean;
}

const PaginationItem = forwardRef<HTMLButtonElement, PaginationItemProps>(
  (props, ref) => {
    const { a11yLabel, className, onSelect, selected, children, isDisabled } =
      props;

    const { pressProps, isPressed } = usePress({ onPress: onSelect });

    const { hoverProps, isHovered } = useHover({});

    const { focusProps, isFocusVisible, isFocused } = useFocusRing({});

    return (
      <button
        {...mergeProps(pressProps, hoverProps, focusProps)}
        ref={ref}
        className={className}
        aria-label={a11yLabel}
        data-selected={selected}
        data-pressed={isPressed}
        data-hovered={isHovered}
        data-focus-visible={isFocusVisible && isFocused}
        disabled={isDisabled}
      >
        {children}
      </button>
    );
  },
);

PaginationItem.displayName = 'gist-ui.PaginationItem';

export default PaginationItem;
