import { tv, VariantProps } from 'tailwind-variants';
import { groupDataFocusVisible } from '../classes';
import { ClassNames } from '../types';

export const checkbox = tv({
  slots: {
    base: 'inline-flex group',
    checkbox: [
      'rounded-full relative inline-flex items-center justify-center overflow-hidden transition-colors group-data-[checked=false]:text-neutral11 group-data-[indeterminate=true]:text-neutral11 group-data-[checked=false]:[--rippleBg:theme(colors.neutral11/20%)] group-data-[checked=false]:group-data-[hovered=true]:bg-neutral4',
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
          'group-data-[checked=true]:[--rippleBg:theme(colors.primary11/20%)] group-data-[checked=true]:text-primary11 group-data-[checked=true]:group-data-[hovered=true]:bg-primary4',
      },
      secondary: {
        checkbox:
          'group-data-[checked=true]:[--rippleBg:theme(colors.secondary11/20%)] group-data-[checked=true]:text-secondary11 group-data-[checked=true]:group-data-[hovered=true]:bg-secondary4',
      },
      success: {
        checkbox:
          'group-data-[checked=true]:[--rippleBg:theme(colors.success11/20%)] group-data-[checked=true]:text-success11 group-data-[checked=true]:group-data-[hovered=true]:bg-success4',
      },
      info: {
        checkbox:
          'group-data-[checked=true]:[--rippleBg:theme(colors.info11/20%)] group-data-[checked=true]:text-info11 group-data-[checked=true]:group-data-[hovered=true]:bg-info4',
      },
      warning: {
        checkbox:
          'group-data-[checked=true]:[--rippleBg:theme(colors.warning11/20%)] group-data-[checked=true]:text-warning11 group-data-[checked=true]:group-data-[hovered=true]:bg-warning4',
      },
      danger: {
        checkbox:
          'group-data-[checked=true]:[--rippleBg:theme(colors.danger11/20%)] group-data-[checked=true]:text-danger11 group-data-[checked=true]:group-data-[hovered=true]:bg-danger4',
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
