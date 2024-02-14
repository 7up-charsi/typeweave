import { tv, VariantProps } from 'tailwind-variants';
import { groupDataFocusVisible } from '../classes';
import { ClassNames } from '../types';

export const checkbox = tv({
  slots: {
    base: 'inline-flex group',
    checkbox: [
      'rounded-full relative inline-flex items-center justify-center overflow-hidden transition-colors group-data-[checked=false]:text-neutral-400 group-data-[checked=false]:[--rippleBg:theme(colors.neutral.700/20%)] group-data-[checked=false]:group-data-[hovered=true]:bg-neutral-200 dark:group-data-[checked=false]:text-neutral-300 dark:group-data-[checked=false]:[--rippleBg:theme(colors.neutral.300/20%)] dark:group-data-[checked=false]:group-data-[hovered=true]:bg-neutral-700',
      ...groupDataFocusVisible,
    ],
    nativeInput:
      'outline-none w-full h-full border-test opacity-0 absolute inset-0 cursor-pointer',
    label: 'cursor-pointer select-none',
  },
  variants: {
    color: {
      primary: {
        checkbox:
          'group-data-[checked=true]:[--rippleBg:theme(colors.primary.700/20%)] group-data-[checked=true]:text-primary-700 group-data-[checked=true]:group-data-[hovered=true]:bg-primary-200 dark:group-data-[checked=true]:[--rippleBg:theme(colors.primary.300/20%)] dark:group-data-[checked=true]:text-primary-300 dark:group-data-[checked=true]:group-data-[hovered=true]:bg-primary-800',
      },
      secondary: {
        checkbox:
          'group-data-[checked=true]:[--rippleBg:theme(colors.secondary.700/20%)] group-data-[checked=true]:text-secondary-700 group-data-[checked=true]:group-data-[hovered=true]:bg-secondary-200 dark:group-data-[checked=true]:[--rippleBg:theme(colors.secondary.300/20%)] dark:group-data-[checked=true]:text-secondary-300 dark:group-data-[checked=true]:group-data-[hovered=true]:bg-secondary-800',
      },
      success: {
        checkbox:
          'group-data-[checked=true]:[--rippleBg:theme(colors.success.700/20%)] group-data-[checked=true]:text-success-700 group-data-[checked=true]:group-data-[hovered=true]:bg-success-200 dark:group-data-[checked=true]:[--rippleBg:theme(colors.success.300/20%)] dark:group-data-[checked=true]:text-success-300 dark:group-data-[checked=true]:group-data-[hovered=true]:bg-success-800',
      },
      info: {
        checkbox:
          'group-data-[checked=true]:[--rippleBg:theme(colors.info.700/20%)] group-data-[checked=true]:text-info-700 group-data-[checked=true]:group-data-[hovered=true]:bg-info-200 dark:group-data-[checked=true]:[--rippleBg:theme(colors.info.300/20%)] dark:group-data-[checked=true]:text-info-300 dark:group-data-[checked=true]:group-data-[hovered=true]:bg-info-800',
      },
      warning: {
        checkbox:
          'group-data-[checked=true]:[--rippleBg:theme(colors.warning.700/20%)] group-data-[checked=true]:text-warning-700 group-data-[checked=true]:group-data-[hovered=true]:bg-warning-200 dark:group-data-[checked=true]:[--rippleBg:theme(colors.warning.300/20%)] dark:group-data-[checked=true]:text-warning-300 dark:group-data-[checked=true]:group-data-[hovered=true]:bg-warning-800',
      },
      danger: {
        checkbox:
          'group-data-[checked=true]:[--rippleBg:theme(colors.danger.700/20%)] group-data-[checked=true]:text-danger-700 group-data-[checked=true]:group-data-[hovered=true]:bg-danger-200 dark:group-data-[checked=true]:[--rippleBg:theme(colors.danger.300/20%)] dark:group-data-[checked=true]:text-danger-300 dark:group-data-[checked=true]:group-data-[hovered=true]:bg-danger-800',
      },
    },
    size: {
      sm: { checkbox: 'min-w-[32px] min-h-[32px] w-8 h-8' },
      md: { checkbox: 'min-w-[40px] min-h-[40px] w-10 h-10' },
      lg: { checkbox: 'min-w-[48px] min-h-[48px] w-12 h-12' },
    },
    isDisabled: {
      true: {
        checkbox: 'disabled',
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

export type CheckboxVariantProps = VariantProps<typeof checkbox>;
export type CheckboxClassNames = ClassNames<typeof checkbox.slots>;

export const checkboxStyles = [
  './node_modules/@gist-ui/theme/src/components/checkbox.ts',
  './node_modules/@gist-ui/theme/src/classes.ts',
];
