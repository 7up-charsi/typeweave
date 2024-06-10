import React from 'react';
import {
  ButtonGroupVariantProps,
  ButtonVariantProps,
  buttonGroupStyles,
} from './button.styles';

export interface ButtonGroupProps
  extends Pick<ButtonVariantProps, 'color' | 'size' | 'variant'>,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'size' | 'onChange'>,
    ButtonGroupVariantProps {
  disabled?: boolean;
}

interface GroupContextProps extends ButtonVariantProps {
  disabled?: boolean;
}

export const GroupCtx = React.createContext<GroupContextProps | null>(null);

const displayName = 'ButtonGroup';

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
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

    const styles = React.useMemo(
      () => buttonGroupStyles({ direction, className }),
      [className, direction],
    );

    return (
      <GroupCtx.Provider
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
      </GroupCtx.Provider>
    );
  },
);

ButtonGroup.displayName = displayName;
