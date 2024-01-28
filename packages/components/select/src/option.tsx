import { useEffect, useRef } from 'react';
import { mergeProps } from '@gist-ui/react-utils';
import { Slot } from '@gist-ui/slot';
import { useHover, usePress } from '@react-aria/interactions';

export interface OptionProps<V> {
  option: V;
  label: string;
  state: { isSelected: boolean; isDisabled: boolean; isFocused: boolean };
  onSelect: () => void;
  onHover: () => void;
  props: React.LiHTMLAttributes<HTMLLIElement>;
}

export const Option = (
  _props: OptionProps<object> & {
    asChild?: boolean;
    children?: React.ReactNode;
  },
) => {
  const {
    label,
    props,
    onSelect,
    onHover,
    state: { isDisabled, isFocused, isSelected },
    asChild,
    children,
  } = _props;

  const ref = useRef<HTMLLIElement>(null);

  const { pressProps } = usePress({
    onPress: () => {
      if (isDisabled) return;
      onSelect();
    },
  });

  const { hoverProps, isHovered } = useHover({
    isDisabled: isDisabled,
    onHoverStart: () => onHover(),
  });

  useEffect(() => {
    if (isSelected)
      ref.current?.scrollIntoView({ behavior: 'instant', block: 'center' });
  }, [isSelected]);

  useEffect(() => {
    if (isFocused && !isHovered)
      ref.current?.scrollIntoView({ behavior: 'instant', block: 'nearest' });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const Component = asChild ? Slot : 'li';

  return (
    <Component ref={ref} {...mergeProps(pressProps, hoverProps)} {...props}>
      {asChild ? children : label}
    </Component>
  );
};

Option.displayName = 'gist-ui.Select';
