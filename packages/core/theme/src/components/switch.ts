import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';
import { peerFocusVisible } from '../classes';

const _switch = tv({
  slots: {
    base: 'inline-flex gap-2',
    switch: 'relative',
    input:
      'peer rounded-full appearance-none cursor-pointer transition-colors bg-muted-9 disabled:disabled absolute inset-0 outline-none',
    indicator: [
      'pointer-events-none border border-muted-9 bg-white text-muted-11 absolute z-10 rounded-full left-0 top-1/2 -translate-y-1/2 translate-x-0 peer-checked:left-full peer-checked:-translate-x-full transition-[left,transform] [&_svg:first-of-type]:inline-block peer-checked:[&_svg:first-of-type]:hidden [&_svg:last-of-type]:hidden peer-checked:[&_svg:last-of-type]:inline-block flex items-center justify-center',
      peerFocusVisible,
    ],
    label: 'cursor-pointer select-none text-muted-11 first-letter:uppercase',
  },
  variants: {
    color: {
      primary: {
        input: 'checked:bg-primary-9',
        indicator: 'peer-checked:border-primary-9 peer-checked:text-primary-11',
      },
      secondary: {
        input: 'checked:bg-secondary-9 checked:border-secondary-9',
        indicator:
          'peer-checked:border-secondary-9 peer-checked:text-secondary-11',
      },
      success: {
        input: 'checked:bg-success-9 checked:border-success-9',
        indicator: 'peer-checked:border-success-9 peer-checked:text-success-11',
      },
      info: {
        input: 'checked:bg-info-9 checked:border-info-9',
        indicator: 'peer-checked:border-info-9 peer-checked:text-info-11',
      },
      warning: {
        input: 'checked:bg-warning-9 checked:border-warning-9',
        indicator: 'peer-checked:border-warning-9 peer-checked:text-warning-11',
      },
      danger: {
        input: 'checked:bg-danger-9 checked:border-danger-9',
        indicator: 'peer-checked:border-danger-9 peer-checked:text-danger-11',
      },
    },
    size: {
      sm: {
        switch: 'w-[27px] h-[10px]',
        indicator: 'w-4 h-4 text-xs',
      },
      md: {
        switch: 'w-[35px] h-[14px]',
        indicator: 'w-5 h-5 text-base',
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
