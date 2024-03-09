import { tv, VariantProps } from 'tailwind-variants';
import { focusVisible } from '../classes';
import { ClassNames } from '../types';

const _switch = tv({
  slots: {
    base: 'inline-flex gap-2',
    input: [
      'outline-none rounded-full appearance-none cursor-pointer transition-colors bg-muted-5 relative before:absolute before:z-10 before:bg-white before:rounded-full before:left-[2px] before:top-1/2 before:-translate-y-1/2 before:translate-x-0 checked:before:left-[calc(100%-2px)] checked:before:-translate-x-full before:transition-[left,transform]',
      ...focusVisible,
    ],
    label: 'cursor-pointer select-none text-muted-11 first-letter:uppercase',
  },
  variants: {
    color: {
      primary: {
        input: 'checked:text-primary-11 checked:bg-primary-9',
      },
      secondary: {
        input: 'checked:text-secondary-11 checked:bg-secondary-9',
      },
      success: {
        input: 'checked:text-success-11 checked:bg-success-9',
      },
      info: {
        input: 'checked:text-info-11 checked:bg-info-9',
      },
      warning: {
        input: 'checked:text-warning-11 checked:bg-warning-9',
      },
      danger: {
        input: 'checked:text-danger-11 checked:bg-danger-9',
      },
    },
    size: {
      sm: {
        input: 'w-9 h-5 before:w-4 before:h-4',
      },
      md: {
        input: 'w-11 h-6 before:w-5 before:h-5',
      },
    },
    isDisabled: {
      true: {
        input: 'disabled',
      },
    },
    labelPlacement: {
      top: { base: 'flex-col items-center', label: '-order-1' },
      bottom: { base: 'flex-col items-center', label: 'order-1' },
      left: { base: 'items-center', label: '-order-1' },
      right: { base: 'items-center', label: 'order-1' },
    },
  },
});

export type SwitchVariantProps = VariantProps<typeof _switch>;
export type SwitchClassNames = ClassNames<typeof _switch.slots>;

export { _switch as switch };
