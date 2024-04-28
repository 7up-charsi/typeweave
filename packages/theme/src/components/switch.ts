import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

const _switch = tv({
  slots: {
    base: 'inline-flex gap-2',
    switch: 'relative flex items-center',
    input:
      'peer rounded-full appearance-none cursor-pointer transition-colors bg-muted-9 disabled:disabled absolute inset-0 outline-none',
    indicator:
      'pointer-events-none bg-white text-muted-11 absolute z-10 rounded-full left-[2px] translate-x-0 peer-checked:left-[calc(100%-2px)] peer-checked:-translate-x-full transition-[left,transform] [&_svg:first-of-type]:inline-block peer-checked:[&_svg:first-of-type]:hidden [&_svg:last-of-type]:hidden peer-checked:[&_svg:last-of-type]:inline-block flex items-center justify-center peer-focus-visible:outline-2 peer-focus-visible:outline-focus',
    label: 'cursor-pointer select-none text-muted-11 first-letter:uppercase',
  },
  variants: {
    color: {
      primary: {
        input: 'checked:bg-primary-9',
        indicator: 'peer-checked:text-primary-11',
      },
      secondary: {
        input: 'checked:bg-secondary-9',
        indicator: 'peer-checked:text-secondary-11',
      },
      success: {
        input: 'checked:bg-success-9',
        indicator: 'peer-checked:text-success-11',
      },
      info: {
        input: 'checked:bg-info-9',
        indicator: 'peer-checked:text-info-11',
      },
      warning: {
        input: 'checked:bg-warning-9',
        indicator: 'peer-checked:text-warning-11',
      },
      danger: {
        input: 'checked:bg-danger-9',
        indicator: 'peer-checked:text-danger-11',
      },
    },
    size: {
      sm: {
        switch: 'w-[35px] h-[19px]',
        indicator: 'size-[15px] text-xs',
      },
      md: {
        switch: 'w-[40px] h-[22px]',
        indicator: 'size-[18px] text-base',
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
