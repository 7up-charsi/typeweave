import { forwardRef, LegacyRef, ReactNode, useRef } from "react";
import { button, ButtonVariantProps } from "@gist-ui/theme";
import { useRipple, UseRippleProps } from "@gist-ui/use-ripple";
import { mergeRefs } from "@gist-ui/react-utils";
import { AriaButtonOptions, mergeProps, useButton, useFocusRing, useHover } from "react-aria";

export interface ButtonProps extends ButtonVariantProps, AriaButtonOptions<"button"> {
  startContent?: ReactNode;
  endContent?: ReactNode;
  rippleProps?: UseRippleProps;
  className?: string;
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    startContent,
    endContent,
    rippleProps,
    className,
    color,
    fullWidth,
    isDisabled,
    rounded,
    size,
    variant,
    isIconOnly,
  } = props;

  const { base } = button({
    color,
    fullWidth,
    isDisabled,
    rounded,
    size,
    variant,
    isIconOnly,
  });

  const innerRef = useRef<HTMLButtonElement>(null);

  const [rippleRef, rippleEvent] = useRipple<HTMLButtonElement>({
    ...rippleProps,
    pointerCenter: !isIconOnly,
    duration: isIconOnly ? 450 : 500,
  });

  const { buttonProps, isPressed } = useButton(props, innerRef);

  const { focusProps, isFocusVisible, isFocused } = useFocusRing();

  const { hoverProps, isHovered } = useHover(props);

  return (
    <button
      data-pressed={isPressed}
      data-key-pressed={isPressed && isFocusVisible && isFocused}
      data-hovered={isHovered}
      data-focused={isFocused}
      data-focus-visible={isFocusVisible && isFocused}
      {...buttonProps}
      ref={mergeRefs(ref, rippleRef, innerRef) as LegacyRef<HTMLButtonElement>}
      {...mergeProps({ onPointerDown: rippleEvent }, buttonProps, focusProps, hoverProps)}
      className={base({ className })}
    >
      {!isIconOnly && startContent}
      {props.children}
      {!isIconOnly && endContent}
    </button>
  );
});

Button.displayName = "gist-ui.Button";

export default Button;
