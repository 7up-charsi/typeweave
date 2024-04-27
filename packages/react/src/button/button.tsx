import { mergeRefs } from '@webbo-ui/react-utils';
import { button, ButtonClassNames, ButtonVariantProps } from '@webbo-ui/theme';
import { Slot } from '../slot';
import { usePointerEvents } from '../use-pointer-events';
import { accessibilityWarning } from '../custom-error';
import React from 'react';
import { GroupCtx } from './button-group';

export interface ButtonProps
  extends Omit<ButtonVariantProps, 'isInGroup'>,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  classNames?: ButtonClassNames;
  children?: React.ReactNode;
  asChild?: boolean;
  onPress?: (e: React.PointerEvent<HTMLButtonElement>) => void;
  excludeFromTabOrder?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      startContent,
      endContent,
      classNames,
      className,
      children,
      disabled: _disabled,
      asChild,
      size,
      variant,
      color,
      fullWidth,
      onPointerDown,
      onPointerUp,
      onPress,
      tabIndex,
      excludeFromTabOrder = false,
      isIconOnly = false,
      ...buttonProps
    } = props;

    const groupContext = React.useContext(GroupCtx);

    const innerRef = React.useRef<HTMLButtonElement | null>(null);

    const disabled = _disabled ?? groupContext?.disabled;

    const ariaLabel = props['aria-label'];
    const ariaLabelledby = props['aria-labelledby'];

    const pointerEvents = usePointerEvents({
      onPointerDown,
      onPointerUp,
      onPress,
    });

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      React.useEffect(() => {
        if (isIconOnly && !ariaLabel && !ariaLabelledby)
          accessibilityWarning(
            'Button',
            'You must provide `aria-label` or `aria-labelledby` when `isIconOnly` is true',
          );
      }, [ariaLabel, ariaLabelledby, isIconOnly]);
    }

    const styles = button({
      isIconOnly,
      size: size ?? groupContext?.size ?? 'md',
      variant: variant ?? groupContext?.variant ?? 'flat',
      color: color ?? groupContext?.color ?? 'default',
      fullWidth: fullWidth ?? false,
      isInGroup: !!groupContext,
    });

    const __startContent = !isIconOnly && !!startContent && (
      <span
        className={styles.startContent({
          className: classNames?.startContent,
        })}
      >
        {startContent}
      </span>
    );

    const __endContent = !isIconOnly && !!endContent && (
      <span
        className={styles.endContent({
          className: classNames?.endContent,
        })}
      >
        {endContent}
      </span>
    );

    return (
      <Slot<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>
        {...buttonProps}
        {...pointerEvents}
        disabled={!!disabled}
        ref={mergeRefs(ref, innerRef)}
        className={styles.base({ className: classNames?.base ?? className })}
        tabIndex={excludeFromTabOrder ? -1 : tabIndex ?? 0}
        onKeyDown={(e) => {
          buttonProps.onKeyDown?.(e);

          const key = e.key;

          if (![' ', 'Enter'].includes(key)) return;

          e.preventDefault();
          onPress?.(e as never);
        }}
      >
        {asChild ? (
          React.isValidElement(children) &&
          React.cloneElement(children, {
            children: (
              <>
                {__startContent}
                {isIconOnly ? (
                  children.props.children
                ) : (
                  <span
                    className={styles.content({
                      className: classNames?.content,
                    })}
                  >
                    {children.props.children}
                  </span>
                )}
                {__endContent}
              </>
            ),
          } as Partial<unknown>)
        ) : (
          <button>
            {__startContent}
            {isIconOnly ? (
              children
            ) : (
              <span
                className={styles.content({
                  className: classNames?.content,
                })}
              >
                {children}
              </span>
            )}
            {__endContent}
          </button>
        )}
      </Slot>
    );
  },
);

Button.displayName = 'Button';
