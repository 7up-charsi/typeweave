import { tv, VariantProps } from 'tailwind-variants';
import { groupDataFocusVisible } from '../classes';
import { ClassNames } from '../types';

const _switch = tv({
  slots: {
    base: 'inline-flex gap-2 group',
    switch: [
      'rounded-full relative flex items-center transition-colors cursor-pointer isolate bg-muted-5 dark:bg-mutedDark-5',
      ...groupDataFocusVisible,
    ],
    indicator:
      'absolute z-10 bg-white shadow-md rounded-full left-[2px] translate-x-0 group-data-[checked=true]:left-[calc(100%-2px)] group-data-[checked=true]:-translate-x-full transition-[left,transform]',
    nativeInput:
      'absolute z-50 outline-none w-full h-full border-test opacity-0 absolute inset-0 cursor-pointer',
    label:
      'cursor-pointer select-none text-muted-11 dark:text-mutedDark-11 first-letter:uppercase',
  },
  variants: {
    color: {
      primary: {
        switch:
          'group-data-[checked=true]:text-primary-11 group-data-[checked=true]:bg-primary-9 dark:group-data-[checked=true]:text-primaryDark-11 dark:group-data-[checked=true]:bg-primaryDark-9',
      },
      secondary: {
        switch:
          'group-data-[checked=true]:text-secondary-11 group-data-[checked=true]:bg-secondary-9 dark:group-data-[checked=true]:text-secondaryDark-11 dark:group-data-[checked=true]:bg-secondaryDark-9',
      },
      success: {
        switch:
          'group-data-[checked=true]:text-success-11 group-data-[checked=true]:bg-success-9 dark:group-data-[checked=true]:text-successDark-11 dark:group-data-[checked=true]:bg-successDark-9',
      },
      info: {
        switch:
          'group-data-[checked=true]:text-info-11 group-data-[checked=true]:bg-info-9 dark:group-data-[checked=true]:text-infoDark-11 dark:group-data-[checked=true]:bg-infoDark-9',
      },
      warning: {
        switch:
          'group-data-[checked=true]:text-warning-11 group-data-[checked=true]:bg-warning-9 dark:group-data-[checked=true]:text-warningDark-11 dark:group-data-[checked=true]:bg-warningDark-9',
      },
      danger: {
        switch:
          'group-data-[checked=true]:text-danger-11 group-data-[checked=true]:bg-danger-9 dark:group-data-[checked=true]:text-dangerDark-11 dark:group-data-[checked=true]:bg-dangerDark-9',
      },
    },
    size: {
      sm: {
        switch: 'w-9 h-5',
        indicator: 'w-4 h-4 group-data-[pressed=true]:w-5',
      },
      md: {
        switch: 'w-11 h-6',
        indicator: 'w-5 h-5 group-data-[pressed=true]:w-6',
      },
    },
    isDisabled: {
      true: {
        switch: 'disabled',
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
