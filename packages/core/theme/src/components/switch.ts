import { tv, VariantProps } from 'tailwind-variants';
import { focusVisible } from '../classes';
import { ClassNames } from '../types';

const _switch = tv({
  slots: {
    base: 'inline-flex gap-2',
    switch: 'relative',
    input: [
      'peer/input rounded-full appearance-none cursor-pointer transition-colors border border-muted-8 disabled:disabled absolute inset-0',
      ...focusVisible,
    ],
    indicator:
      'pointer-events-none bg-muted-9 text-white absolute z-10 rounded-full left-[4px] top-1/2 -translate-y-1/2 translate-x-0 peer-checked/input:left-[calc(100%-4px)] peer-checked/input:-translate-x-full transition-[left,transform] [&_svg:first-of-type]:inline-block peer-checked/input:[&_svg:first-of-type]:hidden [&_svg:last-of-type]:hidden peer-checked/input:[&_svg:last-of-type]:inline-block flex items-center justify-center',
    label: 'cursor-pointer select-none text-muted-11 first-letter:uppercase',
  },
  variants: {
    color: {
      default: {
        input: 'checked:bg-muted-9 checked:border-muted-9',
        indicator:
          'peer-checked/input:bg-white peer-checked/input:text-muted-11',
      },
      primary: {
        input: 'checked:bg-primary-9 checked:border-primary-9',
        indicator:
          'peer-checked/input:bg-white peer-checked/input:text-muted-11',
      },
      secondary: {
        input: 'checked:bg-secondary-9 checked:border-secondary-9',
        indicator:
          'peer-checked/input:bg-white peer-checked/input:text-muted-11',
      },
      success: {
        input: 'checked:bg-success-9 checked:border-success-9',
        indicator:
          'peer-checked/input:bg-white peer-checked/input:text-muted-11',
      },
      info: {
        input: 'checked:bg-info-9 checked:border-info-9',
        indicator:
          'peer-checked/input:bg-white peer-checked/input:text-muted-11',
      },
      warning: {
        input: 'checked:bg-warning-9 checked:border-warning-9',
        indicator:
          'peer-checked/input:bg-white peer-checked/input:text-muted-11',
      },
      danger: {
        input: 'checked:bg-danger-9 checked:border-danger-9',
        indicator:
          'peer-checked/input:bg-white peer-checked/input:text-muted-11',
      },
    },
    size: {
      sm: {
        switch: 'w-9 h-5',
        indicator: 'w-3 h-3',
      },
      md: {
        switch: 'w-11 h-6',
        indicator: 'w-4 h-4',
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
