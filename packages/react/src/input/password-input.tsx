import React from 'react';
import { InputProps, Input } from './input';
import { Button } from '../button';
import { EyeIcon, EyeOff } from 'lucide-react';
import { UsePointerEventsProps } from '../use-pointer-events';
import { passwordInputStyles } from './input.styles';

export type PasswordInputRenderToggleButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'color'
> &
  Pick<UsePointerEventsProps<HTMLButtonElement>, 'onPress'>;

export type PasswordInputRenderToggleButtonState = {
  isPassword: boolean;
};

export interface PasswordInputProps extends Omit<InputProps<false>, 'type'> {
  /**
   * This prop value is used in `aria-label` of ToggleButton when type is password
   */
  showAriaLabel?: string;
  /**
   * This prop value is used in `aria-label` of ToggleButton when type is text
   */
  hideAriaLabel?: string;
  showIcon?: React.ReactNode;
  hideIcon?: React.ReactNode;
  renderToggleButton?: (
    props: PasswordInputRenderToggleButtonProps,
    state: PasswordInputRenderToggleButtonState,
  ) => React.ReactNode;
}

const displayName = 'PasswordInput';

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>((props, ref) => {
  const {
    showIcon,
    hideIcon,
    label,
    endContent,
    hideAriaLabel = `hide ${label}`,
    showAriaLabel = `show ${label}`,
    renderToggleButton: renderToggleButtonProp,
    ...rest
  } = props;

  const [isPassword, setIsPassword] = React.useState(true);

  const styles = React.useMemo(() => passwordInputStyles(), []);

  const defaultRenderToggleButton = (
    props: PasswordInputRenderToggleButtonProps,
  ) => {
    return (
      // @ts-expect-error Type 'PointerEventHandler<HTMLButtonElement>' is not assignable to type ButtonPressEvent
      <Button {...props} isIconOnly size="sm" variant="text">
        {isPassword ? showIcon ?? <EyeIcon /> : hideIcon ?? <EyeOff />}
      </Button>
    );
  };

  const renderToggleButton =
    renderToggleButtonProp ?? defaultRenderToggleButton;

  return (
    <Input
      ref={ref}
      {...rest}
      label={label}
      type={isPassword ? 'password' : 'text'}
      endContent={
        <>
          {renderToggleButton(
            {
              className: styles.button(),
              role: 'button',
              type: 'button',
              'aria-label': isPassword ? showAriaLabel : hideAriaLabel,
              'aria-pressed': isPassword,
              onPress: () => {
                setIsPassword((p) => !p);
              },
            },
            { isPassword },
          )}

          {endContent}
        </>
      }
    />
  );
});

PasswordInput.displayName = displayName;
