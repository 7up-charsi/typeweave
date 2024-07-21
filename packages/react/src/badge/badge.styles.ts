import { tv, VariantProps } from 'tailwind-variants';

export const badgeStyles = tv({
  slots: {
    base: 'inline-block relative isolate',
    content:
      'absolute z-50 rounded-full -translate-x-1/2 -translate-y-1/2 select-none',
  },
  variants: {
    variant: {
      dot: { content: 'size-3' },
      standard: {
        content:
          'text-xs h-5 min-w-5 w-auto flex items-center justify-center px-1',
      },
    },
    color: {
      primary: { content: 'bg-primary-9 text-white' },
      secondary: {
        content: 'bg-secondary-9 text-white',
      },
      success: { content: 'bg-success-9 text-white' },
      info: { content: 'bg-info-9 text-white' },
      warning: { content: 'bg-warning-9 text-white' },
      danger: { content: 'bg-danger-9 text-white' },
    },
    invisible: {
      true: { content: 'hidden' },
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
      true: { content: 'shadow-md' },
      false: { content: 'shadow-none' },
    },
  },
});

export type BadgeVariantProps = VariantProps<typeof badgeStyles>;
