import {
  ClassValue,
  SlotsClassValue,
  tv,
  VariantProps,
} from 'tailwind-variants';
import { groupDataFocusVisible } from '../classes';

const _switch = tv({
  slots: {
    base: 'inline-flex gap-2 group',
    switch: [
      'rounded-full relative flex items-center transition-colors cursor-pointer group-data-[checked=false]:bg-neutral-200 isolate',
      ...groupDataFocusVisible,
    ],
    indicator:
      'absolute z-10 bg-white shadow-md flex items-center justify-center rounded-full left-[2px] translate-x-0 group-data-[checked=true]:left-[calc(100%-2px)] group-data-[checked=true]:-translate-x-full transition-[left,transform]',
    nativeInput:
      'absolute z-50 outline-none w-full h-full border-test opacity-0 absolute inset-0 cursor-pointer',
    label: 'cursor-pointer select-none text-neutral-700 first-letter:uppercase',
  },
  variants: {
    color: {
      primary: {
        switch:
          'group-data-[checked=true]:[--rippleBg:theme(colors.primary-800/20%)] group-data-[checked=true]:text-primary-700 group-data-[checked=true]:bg-primary-400',
      },
      secondary: {
        switch:
          'group-data-[checked=true]:[--rippleBg:theme(colors.secondary-800/20%)] group-data-[checked=true]:text-secondary-700 group-data-[checked=true]:bg-secondary-400',
      },
      success: {
        switch:
          'group-data-[checked=true]:[--rippleBg:theme(colors.success-800/20%)] group-data-[checked=true]:text-success-700 group-data-[checked=true]:bg-success-400',
      },
      info: {
        switch:
          'group-data-[checked=true]:[--rippleBg:theme(colors.info-800/20%)] group-data-[checked=true]:text-info-700 group-data-[checked=true]:bg-info-400',
      },
      warning: {
        switch:
          'group-data-[checked=true]:[--rippleBg:theme(colors.warning-800/20%)] group-data-[checked=true]:text-warning-700 group-data-[checked=true]:bg-warning-400',
      },
      danger: {
        switch:
          'group-data-[checked=true]:[--rippleBg:theme(colors.danger-800/20%)] group-data-[checked=true]:text-danger-700 group-data-[checked=true]:bg-danger-400',
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
  defaultVariants: {
    size: 'sm',
    labelPlacement: 'right',
    isDisabled: false,
    color: 'primary',
  },
});

export type SwitchVariantProps = VariantProps<typeof _switch>;
export type SwitchClassNames = SlotsClassValue<
  typeof _switch.slots,
  ClassValue
>;

export { _switch as switch };
