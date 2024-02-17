'use client';

import {
  Button,
  ButtonGroup,
  ButtonGroupProps,
  ButtonProps,
} from '@webbo-ui/button';
import { createContextScope } from '@webbo-ui/context';
import { CustomError } from '@webbo-ui/error';
import { ToggleButtonVariantProps, toggleButton } from '@webbo-ui/theme';
import { useControllableState } from '@webbo-ui/use-controllable-state';
import { useMemo } from 'react';

// *-*-*-*-* ToggleButtonGroup *-*-*-*-*

const Group_Name = 'ToggleButtonGroup';

interface GroupContext {
  value: string | null | string[];
  setValue: (
    next: React.SetStateAction<string | null | string[]>,
    payload?: unknown,
  ) => void;
  exclusive: boolean;
}

const [RootProvider, useRootContext] =
  createContextScope<GroupContext>(Group_Name);

const [StylesProvider, useStylesContext] =
  createContextScope<ReturnType<typeof toggleButton>>(Group_Name);

export type ToggleButtonGroupProps<Exclusive> = ToggleButtonVariantProps &
  Omit<ButtonGroupProps, 'variant'> &
  (Exclusive extends true
    ? {
        exclusive: Exclusive;
        value?: string | null;
        defaultValue?: string;
        onChange?: (
          event: { target: { value: string | null } },
          value: string | null,
        ) => void;
      }
    : {
        exclusive?: Exclusive;
        value?: string[];
        defaultValue?: string[];
        onChange?: (
          event: { target: { value: string[] } },
          value: string[],
        ) => void;
      });

export const _ToggleButtonGroup = (props: ToggleButtonGroupProps<false>) => {
  const {
    exclusive,
    value: valueProp,
    onChange,
    variant = 'flat',
    color = 'default',
    defaultValue,
    ...rest
  } = props;

  const [value, setValue] = useControllableState<string | null | string[]>({
    defaultValue: exclusive ? defaultValue ?? null : defaultValue ?? [],
    value: valueProp,
    onChange: (value) => {
      onChange?.({ target: { value } } as never, value as never);
    },
  });

  if (exclusive && Array.isArray(value))
    throw new CustomError(
      Group_Name,
      '`value` must be `string`, when `exclusive` is true',
    );

  if (!exclusive && !Array.isArray(value))
    throw new CustomError(
      Group_Name,
      '`value` must be `string[]`, when `exclusive` is false',
    );

  const styles = useMemo(
    () => toggleButton({ color, variant }),
    [color, variant],
  );

  return (
    <RootProvider value={value} setValue={setValue} exclusive={!!exclusive}>
      <StylesProvider {...styles}>
        <ButtonGroup
          {...rest}
          color={color}
          variant={
            ({ border: 'border', flat: 'flat' }[variant] ?? 'flat') as never
          }
        />
      </StylesProvider>
    </RootProvider>
  );
};

_ToggleButtonGroup.displayName = 'webbo-ui.' + Group_Name;

export const ToggleButtonGroup = _ToggleButtonGroup as <
  Exclusive extends boolean = false,
>(
  props: ToggleButtonGroupProps<Exclusive>,
) => React.ReactNode;

// *-*-*-*-* ToggleButton *-*-*-*-*

const Button_Name = 'ToggleButton';

export interface ToggleButtonProps extends ButtonProps {
  value: string;
}

export const ToggleButton = (props: ToggleButtonProps) => {
  const { value: valueProp, onPress, className, ...rest } = props;

  const { setValue, value, exclusive } = useRootContext(Button_Name);
  const styles = useStylesContext(Button_Name);

  let selected: boolean | undefined = undefined;

  if (exclusive) {
    selected = valueProp === value;
  }

  if (!exclusive && Array.isArray(value)) {
    selected = valueProp ? value.includes(valueProp) : false;
  }

  return (
    <Button
      {...rest}
      className={styles.button({ className })}
      data-selected={selected}
      aria-pressed={selected}
      onPress={(e) => {
        onPress?.(e);

        if (!valueProp) return;

        if (!exclusive) {
          setValue((prev) => {
            if (!Array.isArray(prev)) return null;

            return selected
              ? prev.filter((ele) => ele !== valueProp)
              : [...prev, valueProp];
          });

          return;
        }

        if (exclusive) {
          setValue(selected ? null : valueProp);

          return;
        }
      }}
    />
  );
};

ToggleButton.displayName = 'webbo-ui.' + Button_Name;
