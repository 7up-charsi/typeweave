'use client';

import { mergeRefs } from '@webbo-ui/react-utils';
import {
  button,
  buttonGroup,
  ButtonGroupVariantProps,
  ButtonVariantProps,
  ClassValue,
} from '@webbo-ui/theme';
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
import { Slot } from '@webbo-ui/slot';

interface GroupContext extends ButtonVariantProps {}

// *-*-*-*-* ButtonGroup *-*-*-*-*

const Context = createContext<GroupContext | null>(null);

export interface ButtonGroupProps
  extends Pick<ButtonVariantProps, 'isDisabled' | 'color' | 'size' | 'variant'>,
    Omit<
      React.HTMLAttributes<HTMLDivElement>,
      'color' | 'size' | 'className' | 'onChange'
    >,
    ButtonGroupVariantProps {
  className?: ClassValue;
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (props, ref) => {
    const {
      children,
      isDisabled = false,
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
          isDisabled,
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
    Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'color' | 'className' | 'disabled'
    > {
  startContent?: ReactNode;
  endContent?: ReactNode;
  className?: ClassValue;
  children?: ReactNode;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      startContent,
      endContent,
      className,
      children,
      isIconOnly = false,
      isDisabled: _isDisabled,
      asChild,
      size,
      variant,
      color,
      fullWidth,
      ...buttonProps
    } = props;

    const groupContext = useContext(Context);

    const innerRef = useRef<HTMLButtonElement | null>(null);

    const isDisabled = _isDisabled ?? groupContext?.isDisabled;

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
          'webbo-ui button: icon button must provide "aria-label" or "aria-labelledby"',
        );
    }, [ariaLabel, ariaLabelledby, isIconOnly]);

    const styles = button({
      isDisabled: isDisabled ?? groupContext?.isDisabled ?? false,
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
