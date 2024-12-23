import { Slot } from '../slot';
import React from 'react';
import { GroupCtx } from './button-group';
import { ButtonVariantProps, buttonStyles } from './button.styles';
import { mergeRefs } from '@typeweave/react-utils/merge-refs';

export interface ButtonProps
  extends Omit<ButtonVariantProps, 'isInGroup'>,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  children?: React.ReactNode;
  asChild?: boolean;
  excludeFromTabOrder?: boolean;
  classNames?: Partial<{
    base: string;
    content: string;
    startContent: string;
    endContent: string;
  }>;
}

const displayName = 'Button';

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
    const role = props.role;

    React.useEffect(() => {
      if (process.env.NODE_ENV !== 'production') {
        if (
          isIconOnly &&
          !ariaLabel &&
          !ariaLabelledby &&
          role !== 'presentation' &&
          role !== 'none'
        )
          console.warn(
            'Typeweave: For accessible icon-only buttons, provide `aria-label` prop for screen readers to describe its purpose.',
          );
      }
    }, [ariaLabel, ariaLabelledby, isIconOnly, role]);

    const styles = React.useMemo(
      () =>
        buttonStyles({
          isIconOnly,
          size: size ?? groupContext?.size ?? 'md',
          variant: variant ?? groupContext?.variant ?? 'flat',
          color: color ?? groupContext?.color ?? 'default',
          fullWidth: fullWidth ?? false,
          isInGroup: !!groupContext,
        }),
      [color, fullWidth, groupContext, isIconOnly, size, variant],
    );

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
        disabled={!!disabled}
        ref={mergeRefs(ref, innerRef)}
        className={styles.base({ className: classNames?.base ?? className })}
        tabIndex={excludeFromTabOrder ? -1 : (tabIndex ?? 0)}
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

Button.displayName = displayName;
