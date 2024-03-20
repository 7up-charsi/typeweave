import { tv, VariantProps } from 'tailwind-variants';
import { focusVisible } from '../classes';
import { ClassNames } from '../types';

const _switch = tv({
  slots: {
    base: 'inline-flex gap-2',
    switch: 'relative',
    input: [
      'peer/input rounded-full appearance-none cursor-pointer transition-colors bg-muted-9 disabled:disabled absolute inset-0',
      focusVisible,
    ],
    indicator:
      'pointer-events-none border border-muted-9 bg-white text-muted-11 absolute z-10 rounded-full left-0 top-1/2 -translate-y-1/2 translate-x-0 peer-checked/input:left-full peer-checked/input:-translate-x-full transition-[left,transform] [&_svg:first-of-type]:inline-block peer-checked/input:[&_svg:first-of-type]:hidden [&_svg:last-of-type]:hidden peer-checked/input:[&_svg:last-of-type]:inline-block flex items-center justify-center',
    label: 'cursor-pointer select-none text-muted-11 first-letter:uppercase',
  },
  variants: {
    color: {
      primary: {
        input: 'checked:bg-primary-9',
        indicator:
          'peer-checked/input:border-primary-9 peer-checked/input:text-primary-11',
      },
      secondary: {
        input: 'checked:bg-secondary-9 checked:border-secondary-9',
        indicator:
          'peer-checked/input:border-secondary-9 peer-checked/input:text-secondary-11',
      },
      success: {
        input: 'checked:bg-success-9 checked:border-success-9',
        indicator:
          'peer-checked/input:border-success-9 peer-checked/input:text-success-11',
      },
      info: {
        input: 'checked:bg-info-9 checked:border-info-9',
        indicator:
          'peer-checked/input:border-info-9 peer-checked/input:text-info-11',
      },
      warning: {
        input: 'checked:bg-warning-9 checked:border-warning-9',
        indicator:
          'peer-checked/input:border-warning-9 peer-checked/input:text-warning-11',
      },
      danger: {
        input: 'checked:bg-danger-9 checked:border-danger-9',
        indicator:
          'peer-checked/input:border-danger-9 peer-checked/input:text-danger-11',
      },
    },
    size: {
      sm: {
        switch: 'w-8 h-3',
        indicator: 'w-5 h-5 text-xs',
      },
      md: {
        switch: 'w-10 h-4',
        indicator: 'w-6 h-6 text-base',
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
