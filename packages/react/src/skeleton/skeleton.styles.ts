import { tv, VariantProps } from 'tailwind-variants';

export const skeletonStyles = tv({
  base: 'bg-muted-5 overflow-hidden',
  variants: {
    variant: {
      text: 'h-auto w-full before:content-["_"] before:whitespace-pre',
      circular: 'size-10 rounded-full',
      rectangular: 'h-20 w-full rounded-none',
      rounded: 'h-20 w-full rounded',
    },
    animation: {
      none: '',
      pulse: 'animate-pulse',
      wave: 'relative after:absolute after:inset-0 after:-translate-x-full after:content-["_"] after:bg-[linear-gradient(90deg,transparent,theme(colors.muted-7),transparent)] after:animate-skeletonWave',
    },
  },
});

export type SkeletonVariantProps = VariantProps<typeof skeletonStyles>;
