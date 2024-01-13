import { button, ButtonVariantProps } from '@gist-ui/theme';
import { __DEV__ } from '@gist-ui/shared-utils';
import { useRipple, UseRippleProps } from '@gist-ui/use-ripple';
import { mergeProps, mergeRefs } from '@gist-ui/react-utils';
import { useFocusRing } from '@react-aria/focus';
import { ClassValue } from 'tailwind-variants';
import {
  usePress,
  useHover,
  HoverEvents,
  PressProps,
} from '@react-aria/interactions';
import {
  ButtonHTMLAttributes,
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
} from 'react';

export interface ButtonProps
  extends ButtonVariantProps,
    Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'color' | 'className' | 'disabled'
    >,
    Omit<PressProps, 'isPressed' | 'ref'>,
    HoverEvents {
  startContent?: ReactNode;
  endContent?: ReactNode;
  className?: ClassValue;
  children?: ReactNode;
  rippleDuration?: UseRippleProps['duration'];
  rippleTimingFunction?: UseRippleProps['timingFunction'];
  rippleCompletedFactor?: UseRippleProps['completedFactor'];
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    startContent,
    endContent,
    className,
    children,
    onPress,
    onPressEnd,
    onPressStart,
    onPressUp,
    onPressChange,
    isIconOnly = false,
    rippleDuration = isIconOnly ? 450 : 500,
    rippleTimingFunction,
    rippleCompletedFactor,
    color,
    fullWidth,
    isDisabled,
    size,
    variant,
    allowTextSelectionOnPress,
    preventFocusOnPress,
    shouldCancelOnPointerExit,
    ...buttonProps
  } = props;

  const innerRef = useRef(null);

  const { rippleKeyboardProps, ripplePointerProps } = useRipple({
    containerRef: innerRef,
    isDisabled,
    duration: rippleDuration,
    timingFunction: rippleTimingFunction,
    completedFactor: rippleCompletedFactor,
  });

  const { focusProps, isFocusVisible, isFocused } = useFocusRing();
  const { hoverProps, isHovered } = useHover({ isDisabled });
  const { pressProps, isPressed } = usePress({
    isDisabled,
    onPress,
    onPressEnd,
    onPressStart,
    onPressUp,
    onPressChange,
    allowTextSelectionOnPress,
    preventFocusOnPress,
    shouldCancelOnPointerExit,
  });

  const ariaLabel = props['aria-label'];
  const ariaLabelledby = props['aria-labelledby'];

  useEffect(() => {
    if (__DEV__ && isIconOnly && !ariaLabel && !ariaLabelledby)
      console.warn(
        'Gist-ui button: icon button must provide "aria-label" or "aria-labelledby"',
      );
  }, [ariaLabel, ariaLabelledby, isIconOnly]);

  const styles = button({
    color,
    fullWidth,
    isDisabled,
    isIconOnly,
    size,
    variant,
    className,
  });

  return (
    <button
      {...mergeProps(
        pressProps,
        focusProps,
        hoverProps,
        buttonProps,
        rippleKeyboardProps,
        {
          onPointerDown: (e: React.PointerEvent) =>
            ripplePointerProps.onPointerDown(isIconOnly ? undefined : e),
        },
      )}
      data-pressed={isPressed}
      data-hovered={isHovered}
      data-focused={isFocused}
      data-focus-visible={isFocusVisible && isFocused}
      disabled={isDisabled}
      ref={mergeRefs(ref, innerRef)}
      className={styles}
    >
      {!isIconOnly && startContent}
      {children}
      {!isIconOnly && endContent}
    </button>
  );
});

Button.displayName = 'gist-ui.Button';

export default Button;
