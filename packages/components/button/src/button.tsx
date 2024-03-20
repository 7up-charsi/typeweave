'use client';

import { mergeRefs } from '@webbo-ui/react-utils';
import {
  button,
  ButtonClassNames,
  buttonGroup,
  ButtonGroupVariantProps,
  ButtonVariantProps,
} from '@webbo-ui/theme';
import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { Slot } from '@webbo-ui/slot';
import { usePointerEvents } from '@webbo-ui/use-pointer-events';

interface GroupContext extends ButtonVariantProps {
  disabled?: boolean;
}

// *-*-*-*-* ButtonGroup *-*-*-*-*

const Context = createContext<GroupContext | null>(null);

export interface ButtonGroupProps
  extends Pick<ButtonVariantProps, 'color' | 'size' | 'variant'>,
    Omit<
      React.HTMLAttributes<HTMLDivElement>,
      'color' | 'size' | 'className' | 'onChange'
    >,
    ButtonGroupVariantProps {
  className?: string;
  disabled?: boolean;
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (props, ref) => {
    const {
      children,
      disabled,
      direction = 'horizontal',
      className,
      size = 'md',
      variant = 'flat',
      color = 'default',
      ...rest
    } = props;

    const styles = buttonGroup({ direction, className });

    return (
      <Context.Provider
        value={{
          disabled,
          color,
          size,
          variant,
        }}
      >
        <div ref={ref} {...rest} className={styles}>
          {children}
        </div>
      </Context.Provider>
    );
  },
);

ButtonGroup.displayName = 'webbo-ui.ButtonGroup';

// *-*-*-*-* Button *-*-*-*-*

export interface ButtonProps
  extends Omit<ButtonVariantProps, 'isInGroup'>,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'className'> {
  startContent?: ReactNode;
  endContent?: ReactNode;
  classNames?: ButtonClassNames;
  children?: ReactNode;
  asChild?: boolean;
  onPress?: (e: React.PointerEvent) => void;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      startContent,
      endContent,
      classNames,
      children,
      isIconOnly = false,
      disabled: _disabled,
      asChild,
      size,
      variant,
      color,
      fullWidth,
      onPointerDown,
      onPointerUp,
      onPress,
      ...buttonProps
    } = props;

    const groupContext = useContext(Context);

    const innerRef = useRef<HTMLButtonElement | null>(null);

    const disabled = _disabled ?? groupContext?.disabled;

    const ariaLabel = props['aria-label'];
    const ariaLabelledby = props['aria-labelledby'];

    const pointerEvents = usePointerEvents({
      onPointerDown,
      onPointerUp,
      onPress,
    });

    useEffect(() => {
      if (
        process.env.NODE_ENV !== 'production' &&
        isIconOnly &&
        !ariaLabel &&
        !ariaLabelledby
      )
        console.warn(
          'webbo-ui button: icon button must provide "aria-label" or "aria-labelledby"',
        );
    }, [ariaLabel, ariaLabelledby, isIconOnly]);

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
        className={styles.base({ className: classNames?.base })}
        onKeyDown={(e) => {
          buttonProps.onKeyDown?.(e);

          const key = e.key;

          if (![' ', 'Enter'].includes(key)) return;

          onPress?.(e as never);
        }}
      >
        {asChild ? (
          isValidElement(children) &&
          cloneElement(children, {
            children: (
              <>
                {__startContent}
                <span
                  className={styles.content({
                    className: classNames?.content,
                  })}
                >
                  {children.props.children}
                </span>
                {__endContent}
              </>
            ),
          } as Partial<unknown>)
        ) : (
          <button>
            {__startContent}

            <span
              className={styles.content({
                className: classNames?.content,
              })}
            >
              {children}
            </span>

            {__endContent}
          </button>
        )}
      </Slot>
    );
  },
);

Button.displayName = 'webbo-ui.Button';
