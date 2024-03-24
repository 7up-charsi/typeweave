'use client';

import { ChangeEvent, forwardRef, useRef } from 'react';
import Input, { InputProps } from './input';
import { mergeRefs } from '@webbo-ui/react-utils';
import { NumberInputClassNames, numberInput } from '@webbo-ui/theme';
import { Button } from '@webbo-ui/button';
import { CustomError } from '@webbo-ui/error';
import { Icon } from '@webbo-ui/icon';
import { useControllableState } from '@webbo-ui/use-controllable-state';

export interface NumberInputProps extends Omit<InputProps, 'type'> {
  classNames?: InputProps['classNames'] & { stepButton: NumberInputClassNames };
  inputMode?: 'decimal' | 'numeric';
  min?: number;
  max?: number;
  step?: number;
  largeStep?: number;
  repeatRate?: number;
  threshold?: number;
}

const NumberInput = forwardRef<HTMLDivElement, NumberInputProps>(
  (props, ref) => {
    const {
      classNames,
      inputMode = 'numeric',
      min,
      max,
      step = 1,
      largeStep = 5,
      repeatRate = 100,
      threshold = 500,
      endContent,
      onChange,
      defaultValue,
      value: valueProp,
      ...rest
    } = props;

    const innerRef = useRef<HTMLInputElement>(null);

    const [value, setValue] = useControllableState({
      defaultValue: defaultValue ?? '',
      value: valueProp,
      onChange: (value) => {
        onChange?.({ target: { value } } as ChangeEvent<HTMLInputElement>);
      },
    });

    const keyDownInterval = useRef<NodeJS.Timeout | undefined>(undefined);
    const longPressTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

    const increase = (toAdd: number) => {
      setValue((prev) => {
        const val = +prev;

        if (val === max) return prev;
        if (max && val > max) return max + '';
        if (min && val < min) return min + '';

        return max && val + toAdd > max ? max + '' : `${val + toAdd}`;
      });
    };

    const decrease = (toAdd: number) => {
      setValue((prev) => {
        const val = +prev;

        if (val === min) return prev;
        if (max && val > max) return max + '';
        if (min && val < min) return min + '';

        return min && +prev - toAdd < min ? min + '' : `${+prev - toAdd}`;
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
        setValue(min + '');
        return;
      }

      if (Home && !min) {
        setValue('0');
        return;
      }

      if (End && max) {
        setValue(max + '');
        return;
      }

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

    const onLongPress = (action: string) => (e: React.PointerEvent) => {
      if (e.button !== 0) return;

      e.preventDefault();
      innerRef.current?.focus();

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

    const styles = numberInput();

    if (process.env.NODE_ENV !== 'production' && min && max && min > max)
      throw new CustomError('NumberInput', '"min" must be lower than "max"');

    if (process.env.NODE_ENV !== 'production' && step > largeStep)
      throw new CustomError(
        'NumberInput',
        '"step" must be lower than "largeStep"',
      );

    return (
      <Input
        {...rest}
        classNames={classNames}
        inputRef={mergeRefs(rest.inputRef, innerRef)}
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        inputProps={{
          onKeyDown,
          onKeyUp,
          inputMode,
          max: max,
          min: min,
          step: step,
        }}
        endContent={
          <>
            {endContent}

            <div
              ref={ref}
              className={styles.base({
                className: classNames?.stepButton.base,
              })}
            >
              {/* increase */}
              <Button
                aria-label="increase value"
                aria-description="long press to increase speedly"
                tabIndex={-1}
                isIconOnly
                size="sm"
                variant="text"
                classNames={{
                  base: styles.button({
                    className: classNames?.stepButton.button,
                  }),
                  content: styles.icon({
                    className: classNames?.stepButton.button,
                  }),
                }}
                onPointerDown={onLongPress('increase')}
              >
                <Icon>
                  <svg viewBox="0 0 16 10" fill="currentColor">
                    <path d="M9.207 1A2 2 0 0 0 6.38 1L.793 6.586A2 2 0 0 0 2.207 10H13.38a2 2 0 0 0 1.414-3.414L9.207 1Z" />
                  </svg>
                </Icon>
              </Button>

              {/* decrease */}
              <Button
                aria-label="decrease value"
                aria-description="long press to decrease speedly"
                tabIndex={-1}
                isIconOnly
                size="sm"
                variant="text"
                classNames={{
                  base: styles.button({
                    className: classNames?.stepButton.button,
                  }),
                  content: styles.icon({
                    className: classNames?.stepButton.button,
                  }),
                }}
                onPointerDown={onLongPress('decrease')}
              >
                <Icon>
                  <svg viewBox="0 0 16 10" fill="currentColor">
                    <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
                  </svg>
                </Icon>
              </Button>
            </div>
          </>
        }
      />
    );
  },
);

NumberInput.displayName = 'webbo-ui.NumberInput';

export default NumberInput;
