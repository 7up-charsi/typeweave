import {
  ClassValue,
  SlotsClassValue,
  tv,
  VariantProps,
} from 'tailwind-variants';
import { dataFocusVisible } from '../classes';

const pagination = tv({
  slots: {
    base: 'flex gap-1 group',
    ellipsis: 'inline-flex items-center justify-center text-neutral',
    item: [
      'inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent transition-colors outline-none data-[hovered=true]:data-[selected=false]:bg-neutral-100 data-[selected=false]:text-neutral-700',
      ...dataFocusVisible,
    ],
  },
  variants: {
    variant: {
      border: {
        item: 'border bg-transparent data-[selected=false]:border-neutral-400',
      },
      text: { item: 'bg-transparent border-0' },
    },
    shape: {
      circular: { item: 'rounded-full' },
      rounded: { item: 'rounded' },
    },
    color: {
      neutral: {
        item: 'data-[selected=true]:bg-neutral-200 data-[hovered=true]:data-[selected=true]:bg-neutral-300 data-[selected=true]:border-neutral',
      },
      primary: {
        item: 'data-[selected=true]:bg-primary-200 data-[hovered=true]:data-[selected=true]:bg-primary-300 data-[selected=true]:border-primary',
      },
      secondary: {
        item: 'data-[selected=true]:bg-secondary-200 data-[hovered=true]:data-[selected=true]:bg-secondary-300 data-[selected=true]:border-secondary',
      },
      success: {
        item: 'data-[selected=true]:bg-success-200 data-[hovered=true]:data-[selected=true]:bg-success-300 data-[selected=true]:border-success',
      },
      info: {
        item: 'data-[selected=true]:bg-info-200 data-[hovered=true]:data-[selected=true]:bg-info-300 data-[selected=true]:border-info',
      },
      warning: {
        item: 'data-[selected=true]:bg-warning-200 data-[hovered=true]:data-[selected=true]:bg-warning-300 data-[selected=true]:border-warning',
      },
      danger: {
        item: 'data-[selected=true]:bg-danger-200 data-[hovered=true]:data-[selected=true]:bg-danger-300 data-[selected=true]:border-danger',
      },
    },
    size: {
      sm: { item: 'w-6 h-6 text-base', ellipsis: 'w-6 h-6' },
      md: { item: 'w-8 h-8 text-base', ellipsis: 'w-8 h-8' },
      lg: { item: 'w-10 h-10 text-base', ellipsis: 'w-10 h-10' },
    },
    isDisabled: {
      true: { base: 'disabled', item: 'disabled' },
    },
  },
  defaultVariants: {
    color: 'neutral',
    isDisabled: false,
    size: 'md',
    variant: 'text',
    shape: 'circular',
  },
});

export type PaginationVariantProps = VariantProps<typeof pagination>;
export type PaginationClassNames = SlotsClassValue<
  typeof pagination.slots,
  ClassValue
>;

export { pagination };
