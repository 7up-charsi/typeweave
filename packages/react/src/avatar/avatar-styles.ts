import { VariantProps, tv } from 'tailwind-variants';

export const avatarStyles = tv({
  slots: {
    base: 'bg-muted-3 text-foreground inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle',
    image: 'h-full w-full rounded-inherit object-cover',
    fallback: 'flex h-full w-full items-center justify-center font-medium',
  },
  variants: {
    size: {
      sm: { base: 'size-6' },
      md: { base: 'size-10' },
      lg: { base: 'size-14' },
    },
  },
});

export type AvatarVariantProps = VariantProps<typeof avatarStyles>;
