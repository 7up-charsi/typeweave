import { Button, ButtonGroup, ButtonGroupProps, ButtonProps } from '../button';
import { createContextScope } from '../context';
import { CustomError } from '../error';
import { ToggleButtonVariantProps, toggleButton } from '@webbo-ui/theme';
import { useControllableState } from '../use-controllable-state';
import React from 'react';

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

export const ToggleButtonGroupImp = (props: ToggleButtonGroupProps<false>) => {
  const {
    exclusive,
    value: valueProp,
    onChange,
    color = 'default',
    defaultValue,
    ...restProps
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

  const styles = React.useMemo(() => toggleButton({ color }), [color]);

  return (
    <RootProvider value={value} setValue={setValue} exclusive={!!exclusive}>
      <StylesProvider {...styles}>
        <ButtonGroup {...restProps} color={color} variant="border" />
      </StylesProvider>
    </RootProvider>
  );
};

ToggleButtonGroupImp.displayName = 'webbo-ui.' + Group_Name;

export const ToggleButtonGroup = ToggleButtonGroupImp as <
  Exclusive extends boolean = false,
>(
  props: ToggleButtonGroupProps<Exclusive>,
) => React.ReactNode;

// *-*-*-*-* ToggleButton *-*-*-*-*

const Button_Name = 'ToggleButton';

export interface ToggleButtonProps extends ButtonProps {
  value: string;
}

export const ToggleButton = React.forwardRef<
  HTMLButtonElement,
  ToggleButtonProps
>((props, ref) => {
  const { value: valueProp, onPress, classNames, ...restProps } = props;

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
      ref={ref}
      {...restProps}
      classNames={{
        ...classNames,
        base: styles.button({ className: classNames?.base }),
      }}
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
});

ToggleButton.displayName = 'webbo-ui.' + Button_Name;
