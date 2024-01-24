import { tv, VariantProps } from 'tailwind-variants';
import { groupDataFocusVisible } from '../classes';
import { ClassNames } from '../types';

const radio = tv({
  slots: {
    base: 'inline-flex group',
    radio: [
      'rounded-full relative inline-flex items-center justify-center overflow-hidden transition-colors group-data-[selected=false]:text-neutral-300 group-data-[selected=false]:[--rippleBg:theme(colors.neutral-800/20%)] group-data-[selected=false]:group-data-[hovered=true]:bg-neutral-200',
      ...groupDataFocusVisible,
    ],
    nativeInput:
      'outline-none w-full h-full border-test opacity-0 absolute inset-0 cursor-pointer',
    label: 'cursor-pointer select-none',
  },
  variants: {
    color: {
      primary: {
        radio:
          'group-data-[selected=true]:[--rippleBg:theme(colors.primary-800/20%)] group-data-[selected=true]:text-primary-700 group-data-[selected=true]:group-data-[hovered=true]:bg-primary-100',
      },
      secondary: {
        radio:
          'group-data-[selected=true]:[--rippleBg:theme(colors.secondary-800/20%)] group-data-[selected=true]:text-secondary-700 group-data-[selected=true]:group-data-[hovered=true]:bg-secondary-100',
      },
      success: {
        radio:
          'group-data-[selected=true]:[--rippleBg:theme(colors.success-800/20%)] group-data-[selected=true]:text-success-700 group-data-[selected=true]:group-data-[hovered=true]:bg-success-100',
      },
      info: {
        radio:
          'group-data-[selected=true]:[--rippleBg:theme(colors.info-800/20%)] group-data-[selected=true]:text-info-700 group-data-[selected=true]:group-data-[hovered=true]:bg-info-100',
      },
      warning: {
        radio:
          'group-data-[selected=true]:[--rippleBg:theme(colors.warning-800/20%)] group-data-[selected=true]:text-warning-700 group-data-[selected=true]:group-data-[hovered=true]:bg-warning-100',
      },
      danger: {
        radio:
          'group-data-[selected=true]:[--rippleBg:theme(colors.danger-800/20%)] group-data-[selected=true]:text-danger-700 group-data-[selected=true]:group-data-[hovered=true]:bg-danger-100',
      },
    },
    size: {
      sm: { radio: 'min-w-[32px] min-h-[32px] w-8 h-8' },
      md: { radio: 'min-w-[40px] min-h-[40px] w-10 h-10' },
      lg: { radio: 'min-w-[48px] min-h-[48px] w-12 h-12' },
    },
    isDisabled: {
      true: {
        radio: 'disabled',
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
    size: 'md',
    labelPlacement: 'right',
    isDisabled: false,
    color: 'primary',
  },
});

export type RadioVariantProps = VariantProps<typeof radio>;
export type RadioClassNames = ClassNames<typeof radio.slots>;

export { radio };
