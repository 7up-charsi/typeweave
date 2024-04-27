import React from 'react';
import { InputProps, Input } from './input';
import { Button } from '../button';
import { passwordInput } from '@webbo-ui/theme';
import { EyeIcon, EyeOff } from 'lucide-react';

export interface PasswordInputProps extends Omit<InputProps<false>, 'type'> {
  /**
   * This prop value is used in `aria-label` of ToggleButton when it is not in pressed state
   */
  showAriaLabel?: string;
  /**
   * This prop value is used in `aria-label` of ToggleButton when it is in pressed state
   */
  hideAriaLabel?: string;
  showIcon?: React.ReactNode;
  hideIcon?: React.ReactNode;
}

const displayName = 'PasswordInput';

export const PasswordInput = React.forwardRef<
  HTMLDivElement,
  PasswordInputProps
>((props, ref) => {
  const {
    showIcon,
    hideIcon,
    label,
    endContent,
    hideAriaLabel = `hide ${label}`,
    showAriaLabel = `show ${label}`,
    ...rest
  } = props;

  const [isPassword, setIsPassword] = React.useState(true);

  const styles = React.useMemo(() => passwordInput(), []);

  const toggleButton = (
    <Button
      className={styles.button()}
      type="button"
      isIconOnly
      size="sm"
      variant="text"
      aria-label={isPassword ? showAriaLabel : hideAriaLabel}
      aria-pressed={isPassword}
      onPress={() => {
        setIsPassword((p) => !p);
      }}
    >
      {isPassword ? showIcon || <EyeIcon /> : hideIcon || <EyeOff />}
    </Button>
  );

  return (
    <Input
      ref={ref}
      {...rest}
      label={label}
      type={isPassword ? 'password' : 'text'}
      endContent={
        <>
          {toggleButton}
          {endContent}
        </>
      }
    />
  );
});

PasswordInput.displayName = displayName;
