import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const badge = tv({
  slots: {
    base: 'inline-block relative isolate',
    content: 'absolute z-50 rounded-full -translate-x-1/2 -translate-y-1/2',
  },
  variants: {
    variant: {
      dot: { content: 'w-3 h-3' },
      standard: {
        content:
          'text-xs min-w-[20px] h-[20px] flex items-center justify-center px-1',
      },
    },
    color: {
      primary: { content: 'bg-primary-500 text-white' },
      secondary: { content: 'bg-secondary-500 text-white' },
      success: { content: 'bg-success-500 text-black' },
      info: { content: 'bg-info-500 text-white' },
      warning: { content: 'bg-warning-500 text-black' },
      danger: { content: 'bg-danger-500 text-white' },
    },
    placement: {
      'top-left': { content: 'top-0 left-0' },
      'top-center': { content: 'top-0 left-1/2' },
      'top-right': { content: 'top-0 right-0 translate-x-1/2' },
      'center-left': { content: 'top-1/2 left-0' },
      'center-right': { content: 'top-1/2 right-0 translate-x-1/2' },
      'bottom-left': { content: 'bottom-0 left-0 translate-y-1/2' },
      'bottom-center': { content: 'bottom-0 left-1/2 translate-y-1/2' },
      'bottom-right': {
        content: 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
      },
    },
    shadow: {
      sm: { content: 'shadow-sm' },
      md: { content: 'shadow-md' },
      lg: { content: 'shadow-lg' },
    },
    overlap: {
      circular: '',
      rectangular: '',
    },
  },
  compoundVariants: [
    {
      overlap: 'circular',
      placement: ['top-left', 'top-right'],
      className: { content: 'top-2' },
    },
    {
      overlap: 'circular',
      placement: ['bottom-left', 'bottom-right'],
      className: { content: 'bottom-2' },
    },
    {
      overlap: 'circular',
      placement: ['top-left', 'bottom-left'],
      className: { content: 'left-2' },
    },
    {
      overlap: 'circular',
      placement: ['top-right', 'bottom-right'],
      className: { content: 'right-2' },
    },
  ],
});

export type BadgeVariantProps = VariantProps<typeof badge>;
export type BadgeClassNames = ClassNames<typeof badge.slots>;

export const badgeStyles = [
  './node_modules/@gist-ui/theme/src/components/badge.ts',
];
