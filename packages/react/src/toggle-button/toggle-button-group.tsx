import { createContextScope } from '../context';
import { ButtonGroup, ButtonGroupProps } from '../button';
import React from 'react';
import { useControlled } from '../use-controlled';
import {
  ToggleButtonVariantProps,
  toggleButtonStyles,
} from './toggle-button.styles';

export type ToggleButtonGroupProps<Exclusive> = ToggleButtonVariantProps &
  Omit<ButtonGroupProps, 'variant'> &
  (Exclusive extends true
    ? {
        exclusive: Exclusive;
        value?: string | null;
        defaultValue?: string;
        onChange?: (value: string | null) => void;
      }
    : {
        exclusive?: Exclusive;
        value?: string[];
        defaultValue?: string[];
        onChange?: (value: string[]) => void;
      });

interface GroupCtxProps {
  value: string | null | string[];
  setValue: (
    next: React.SetStateAction<string | null | string[]>,
    payload?: unknown,
  ) => void;
  exclusive: boolean;
}

const displayName = 'ToggleButtonGroup';

const [ToggleButtonCtx, useToggleButtonCtx] =
  createContextScope<GroupCtxProps>(displayName);

const [ToggleButtonStyles, useToggleButtonStyles] =
  createContextScope<ReturnType<typeof toggleButtonStyles>>(displayName);

export { useToggleButtonCtx, useToggleButtonStyles };

export const ToggleButtonGroupImpl = (props: ToggleButtonGroupProps<false>) => {
  const {
    exclusive,
    value: valueProp,
    onChange,
    color = 'default',
    defaultValue,
    ...restProps
  } = props;

  const [value, setValue] = useControlled<string | null | string[]>({
    default: exclusive ? (defaultValue ?? null) : (defaultValue ?? []),
    controlled: valueProp,
    name: displayName,
    state: 'value',
    onChange: (value) => {
      onChange?.(value as never);
    },
  });

  if (exclusive && Array.isArray(value))
    throw new Error(
      `${displayName}, \`value\` must be \`string\`, when \`exclusive\` is true`,
    );

  if (!exclusive && !Array.isArray(value))
    throw new Error(
      `${displayName}, \`value\` must be \`string[]\`, when \`exclusive\` is false`,
    );

  const styles = React.useMemo(() => toggleButtonStyles({ color }), [color]);

  return (
    <ToggleButtonCtx value={value} setValue={setValue} exclusive={!!exclusive}>
      <ToggleButtonStyles {...styles}>
        <ButtonGroup {...restProps} color={color} variant="border" />
      </ToggleButtonStyles>
    </ToggleButtonCtx>
  );
};

ToggleButtonGroupImpl.displayName = displayName;

export const ToggleButtonGroup = ToggleButtonGroupImpl as <
  Exclusive extends boolean = false,
>(
  props: ToggleButtonGroupProps<Exclusive>,
) => React.ReactNode;
