import React from 'react';
import { InputProps, Input } from './input';
import { mergeRefs } from '@typeweave/react-utils/merge-refs';
import { Button } from '../button';
import { useControlled } from '../use-controlled';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { numberInputStyles } from './input.styles';

export type NumberInputRenderSpinButtonsProps = {
  wrapperProps: React.HTMLAttributes<HTMLDivElement>;
  increaseProps: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>;
  decreaseProps: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>;
};

export interface NumberInputProps
  extends Omit<InputProps<false>, 'type' | 'onChange'> {
  classNames?: InputProps<false>['classNames'] & {
    spinButtons?: {
      wrapper?: string;
      increase?: string;
      decrease?: string;
    };
  };
  onChange?: (newValue: string) => void;
  inputMode?: 'decimal' | 'numeric';
  min?: number;
  max?: number;
  step?: number;
  largeStep?: number;
  repeatRate?: number;
  /**
   * should foucs input on spin button interaction
   * @default true
   */
  shouldFocusInput?: boolean;
  threshold?: number;
  renderSpinButtons?: (
    props: NumberInputRenderSpinButtonsProps,
  ) => React.ReactNode;
}

const displayName = 'NumberInput';

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (props, ref) => {
    const {
      classNames,
      inputMode = 'numeric',
      min,
      max,
      step = 1,
      largeStep = 5,
      shouldFocusInput = true,
      repeatRate = 100,
      threshold = 500,
      endContent,
      onChange,
      defaultValue,
      value: valueProp,
      renderSpinButtons: renderSpinButtonsProps,
      ...rest
    } = props;

    const innerRef = React.useRef<HTMLInputElement>(null);

    const [value, setValue] = useControlled({
      default: defaultValue ?? '',
      controlled: valueProp,
      name: displayName,
      state: 'value',
      onChange,
    });

    const keyDownInterval = React.useRef<NodeJS.Timeout | undefined>(undefined);
    const longPressTimeout = React.useRef<NodeJS.Timeout | undefined>(
      undefined,
    );

    const increase = (toIncrase: number) => {
      setValue((prev) => {
        if (isNaN(+prev)) prev = '0';

        let newValue = +prev;

        if (newValue === max) return newValue + '';

        if (max && newValue > max) newValue = max;
        else if (min && newValue < min) newValue = min;
        else newValue = Math.min(newValue + toIncrase, max ? max : Infinity);

        return newValue + '';
      });
    };

    const decrease = (toDecrease: number) => {
      setValue((prev) => {
        if (isNaN(+prev)) prev = '0';

        let newValue = +prev;

        if (newValue === min) return newValue + '';

        if (max && newValue > max) newValue = max;
        else if (min && newValue < min) newValue = min;
        else newValue = Math.max(newValue - toDecrease, min ? min : -Infinity);

        return newValue + '';
      });
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
      const ArrowUp = e.key === 'ArrowUp';
      const ArrowDown = e.key === 'ArrowDown';
      const PageUp = e.key === 'PageUp';
      const PageDown = e.key === 'PageDown';
      const Home = e.key === 'Home';
      const End = e.key === 'End';
      const repeatEvent = e.repeat;

      if (ArrowUp || ArrowDown || PageUp || PageDown || Home || End)
        e.preventDefault();

      if (!repeatEvent) {
        if (ArrowUp) {
          increase(step);
          return;
        }

        if (ArrowDown) {
          decrease(step);
          return;
        }

        if (PageUp) {
          increase(largeStep);
          return;
        }

        if (PageDown) {
          decrease(largeStep);
          return;
        }
      }

      if (repeatEvent && !keyDownInterval.current) {
        longPressTimeout.current = undefined;

        ['pointerdown', 'keyup'].forEach((event) =>
          document.addEventListener(
            event,
            () => {
              clearInterval(keyDownInterval.current);
              keyDownInterval.current = undefined;
            },
            { once: true },
          ),
        );

        if (ArrowUp) {
          keyDownInterval.current = setInterval(
            () => increase(step),
            repeatRate,
          );
          return;
        }

        if (ArrowDown) {
          keyDownInterval.current = setInterval(
            () => decrease(step),
            repeatRate,
          );
          return;
        }

        if (PageUp) {
          keyDownInterval.current = setInterval(() => {
            increase(largeStep);
          }, repeatRate);

          return;
        }

        if (PageDown) {
          keyDownInterval.current = setInterval(() => {
            decrease(largeStep);
          }, repeatRate);

          return;
        }
      }

      if (Home && min) {
        const newValue = min + '';

        setValue(newValue);
        return;
      }

      if (Home && !min) {
        const newValue = '0';

        setValue(newValue);
        return;
      }

      if (End && max) {
        const newValue = max + '';

        setValue(newValue);
        return;
      }
    };

    const onKeyUp = (e: React.KeyboardEvent) => {
      const ArrowUp = e.key === 'ArrowUp';
      const ArrowDown = e.key === 'ArrowDown';
      const PageUp = e.key === 'PageUp';
      const PageDown = e.key === 'PageDown';
      const Home = e.key === 'Home';
      const End = e.key === 'End';

      if (ArrowUp || ArrowDown || PageUp || PageDown || Home || End)
        e.preventDefault();
    };

    const onLongPress = (action: string) => (e: React.MouseEvent) => {
      if (e.button !== 0) return;

      keyDownInterval.current = undefined;

      if (shouldFocusInput) {
        e.preventDefault();
        innerRef.current?.focus();
      }

      if (action === 'decrease') {
        decrease(step);
      }

      if (action === 'increase') {
        increase(step);
      }

      ['pointerup', 'keydown'].forEach((event) =>
        document.addEventListener(
          event,
          () => {
            clearTimeout(longPressTimeout.current);
            longPressTimeout.current = undefined;
          },
          { once: true },
        ),
      );

      longPressTimeout.current = setTimeout(() => {
        ['pointerup', 'keydown'].forEach((event) =>
          document.addEventListener(
            event,
            () => {
              clearInterval(keyDownInterval.current);
              keyDownInterval.current = undefined;
            },
            { once: true },
          ),
        );

        if (action === 'increase') {
          keyDownInterval.current = setInterval(
            () => increase(step),
            repeatRate,
          );
        }

        if (action === 'decrease') {
          keyDownInterval.current = setInterval(
            () => decrease(step),
            repeatRate,
          );
        }
      }, threshold);
    };

    const styles = React.useMemo(() => numberInputStyles(), []);

    const defaultRenderSpinButtons = ({
      decreaseProps,
      increaseProps,
      wrapperProps,
    }: NumberInputRenderSpinButtonsProps) => {
      return (
        <div {...wrapperProps}>
          {/* decrease */}
          <Button isIconOnly size="sm" variant="text" {...decreaseProps}>
            <MinusIcon />
          </Button>

          {/* increase */}
          <Button isIconOnly size="sm" variant="text" {...increaseProps}>
            <PlusIcon />
          </Button>
        </div>
      );
    };

    const renderSpinButtons =
      renderSpinButtonsProps ?? defaultRenderSpinButtons;

    if (process.env.NODE_ENV !== 'production' && min && max && min > max)
      throw new Error(`${displayName}, \`min\` must be lower than \`max\``);

    if (process.env.NODE_ENV !== 'production' && step > largeStep)
      throw new Error(
        `${displayName}, \`step\` must be lower than \`largeStep\``,
      );

    return (
      <Input
        {...rest}
        classNames={classNames}
        ref={mergeRefs(ref, innerRef)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        inputMode={inputMode}
        max={max}
        min={min}
        step={step}
        endContent={
          <>
            {renderSpinButtons({
              decreaseProps: {
                role: 'button',
                type: 'button',
                'aria-label': 'decrease value',
                'aria-description': 'long press to decrease speedly',
                tabIndex: -1,
                onMouseDown: onLongPress('decrease'),
                className: styles.decrease({
                  className: classNames?.spinButtons?.decrease,
                }),
              },
              increaseProps: {
                role: 'button',
                type: 'button',
                'aria-label': 'increase value',
                'aria-description': 'long press to increase speedly',
                tabIndex: -1,
                onMouseDown: onLongPress('increase'),
                className: styles.increase({
                  className: classNames?.spinButtons?.increase,
                }),
              },
              wrapperProps: {
                className: styles.wrapper({
                  className: classNames?.spinButtons?.wrapper,
                }),
              },
            })}

            {endContent}
          </>
        }
      />
    );
  },
);

NumberInput.displayName = displayName;
