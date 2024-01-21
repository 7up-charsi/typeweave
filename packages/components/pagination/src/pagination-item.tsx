import { mergeProps } from '@gist-ui/react-utils';
import { useFocusRing } from '@react-aria/focus';
import { useHover, usePress } from '@react-aria/interactions';
import { forwardRef } from 'react';

export interface PaginationItemProps {
  className: string;
  a11yLabel: string;
  children: React.ReactNode;
  isDisabled: boolean;
  selected?: boolean;
  onPress?: () => void;
}

const PaginationItem = forwardRef<HTMLButtonElement, PaginationItemProps>(
  (props, ref) => {
    const { a11yLabel, className, onPress, selected, children, isDisabled } =
      props;

    const { pressProps, isPressed } = usePress({
      isDisabled,
      onPress,
    });

    const { hoverProps, isHovered } = useHover({ isDisabled });

    const { focusProps, isFocusVisible, isFocused } = useFocusRing({});

    return (
      <button
        {...mergeProps(pressProps, hoverProps, focusProps)}
        ref={ref}
        className={className}
        aria-label={a11yLabel}
        disabled={isDisabled}
        data-selected={!!selected}
        data-pressed={isPressed}
        data-hovered={isHovered}
        data-focus-visible={isFocusVisible && isFocused}
      >
        {children}
      </button>
    );
  },
);

PaginationItem.displayName = 'gist-ui.PaginationItem';

export default PaginationItem;
