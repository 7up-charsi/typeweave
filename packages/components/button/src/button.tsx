'use client';

import { useRipple, UseRippleProps } from '@gist-ui/use-ripple';
import { mergeProps, mergeRefs } from '@gist-ui/react-utils';
import { useFocusRing } from '@react-aria/focus';
import { usePress, useHover, PressProps } from '@react-aria/interactions';
import {
  button,
  buttonGroup,
  ButtonGroupVariantProps,
  ButtonVariantProps,
  ClassValue,
} from '@gist-ui/theme';
import {
  ButtonHTMLAttributes,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { Slot } from '@gist-ui/slot';

interface GroupContext extends ButtonVariantProps {}

// *-*-*-*-* ButtonGroup *-*-*-*-*

const Context = createContext<GroupContext | null>(null);

export interface ButtonGroupProps
  extends Omit<ButtonVariantProps, 'fullWidth'>,
    ButtonGroupVariantProps {
  children?: React.ReactNode;
  className?: ClassValue;
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (props, ref) => {
    const {
      children,
      isDisabled = false,
      isIconOnly = false,
      direction = 'horizontal',
      className,
      size = 'md',
      variant = 'flat',
      color = 'neutral',
    } = props;

    const styles = buttonGroup({ direction, className });

    return (
      <Context.Provider
        value={{
          isDisabled,
          color,
          isIconOnly,
          size,
          variant,
        }}
      >
        <div ref={ref} className={styles}>
          {children}
        </div>
      </Context.Provider>
    );
  },
);

ButtonGroup.displayName = 'gist-ui.ButtonGroup';

// *-*-*-*-* Button *-*-*-*-*

export interface ButtonProps
  extends ButtonVariantProps,
    Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'color' | 'className' | 'disabled'
    >,
    Omit<PressProps, 'isPressed' | 'ref'> {
  startContent?: ReactNode;
  endContent?: ReactNode;
  className?: ClassValue;
  children?: ReactNode;
  rippleDuration?: UseRippleProps['duration'];
  rippleTimingFunction?: UseRippleProps['timingFunction'];
  rippleCompletedFactor?: UseRippleProps['completedFactor'];
  disableRipple?: boolean;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
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
      isDisabled: _isDisabled = false,
      allowTextSelectionOnPress,
      preventFocusOnPress,
      shouldCancelOnPointerExit,
      asChild,
      disableRipple,
      size,
      variant,
      color,
      fullWidth,
      ...buttonProps
    } = props;

    const groupContext = useContext(Context);

    const innerRef = useRef<HTMLButtonElement | null>(null);

    const isDisabled = _isDisabled ?? groupContext?.isDisabled;

    const { rippleKeyboardProps, ripplePointerProps } = useRipple({
      containerRef: innerRef,
      isDisabled: isDisabled ?? disableRipple,
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
      if (
        process.env.NODE_ENV !== 'production' &&
        isIconOnly &&
        !ariaLabel &&
        !ariaLabelledby
      )
        console.warn(
          'Gist-ui button: icon button must provide "aria-label" or "aria-labelledby"',
        );
    }, [ariaLabel, ariaLabelledby, isIconOnly]);

    const styles = button(
      groupContext
        ? {
            className,
            isDisabled: isDisabled ?? groupContext.isDisabled,
            color: color ?? groupContext.color,
            isIconOnly: isIconOnly ?? groupContext.isIconOnly,
            size: size ?? groupContext.size,
            variant: variant ?? groupContext.variant,
          }
        : {
            isDisabled,
            isIconOnly,
            className,
            size: size ?? 'md',
            variant: variant ?? 'flat',
            color: color ?? 'neutral',
            fullWidth: fullWidth ?? false,
          },
    );

    return (
      <Slot<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>
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
        disabled={!!isDisabled}
        ref={mergeRefs(ref, innerRef)}
        className={styles}
      >
        {asChild ? (
          isValidElement(children) &&
          cloneElement(children, {
            children: (
              <>
                {!isIconOnly && startContent}
                {children.props.children}
                {!isIconOnly && endContent}
              </>
            ),
          } as Partial<unknown>)
        ) : (
          <button>
            {!isIconOnly && startContent}
            {children}
            {!isIconOnly && endContent}
          </button>
        )}
      </Slot>
    );
  },
);

Button.displayName = 'gist-ui.Button';
