'use client';

import { mergeRefs } from '@webbo-ui/react-utils';
import {
  button,
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
  className?: string;
  children?: ReactNode;
  asChild?: boolean;
  onPress?: (e: React.PointerEvent) => void;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      startContent,
      endContent,
      className,
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
      className,
      size: size ?? groupContext?.size ?? 'md',
      variant: variant ?? groupContext?.variant ?? 'flat',
      color: color ?? groupContext?.color ?? 'default',
      fullWidth: fullWidth ?? false,
      isInGroup: !!groupContext,
    });

    return (
      <Slot<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>
        {...buttonProps}
        {...pointerEvents}
        disabled={!!disabled}
        ref={mergeRefs(ref, innerRef)}
        className={styles}
      >
        {asChild ? (
          isValidElement(children) &&
          cloneElement(children, {
            children: (
              <>
                {!isIconOnly && startContent}
                <span>{children.props.children}</span>
                {!isIconOnly && endContent}
              </>
            ),
          } as Partial<unknown>)
        ) : (
          <button>
            {!isIconOnly && startContent}
            <span>{children}</span>
            {!isIconOnly && endContent}
          </button>
        )}
      </Slot>
    );
  },
);

Button.displayName = 'webbo-ui.Button';
