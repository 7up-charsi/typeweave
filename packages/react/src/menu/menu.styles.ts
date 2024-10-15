import { tv, VariantProps } from 'tailwind-variants';

export const menuStyles = tv({
  slots: {
    content:
      'relative min-w-[160px] data-[hide=true]:invisible bg-paper rounded py-2 outline-none [--arrowFill:theme(colors.muted-9)]',
    item: 'px-2 py-[6px] mx-2 cursor-pointer text-sm select-none flex items-center outline-none data-[disabled=true]:cursor-default data-[disabled=true]:disabled data-[focused=true]:bg-muted-3 rounded relative overflow-hidden first:mt-0 mt-1',
    itemIcon:
      'size-5 mr-2 overflow-hidden flex items-center justify-center text-base dynamic-icon',
    itemContent: 'grow first-letter:uppercase',
    label: 'px-4 py-[6px] text-xs font-semibold first-letter:uppercase',
    group: '',
    separator: 'h-px bg-muted-6 my-2',
    arrow:
      'border-[length:var(--arrow-size)] border-transparent border-b-muted-9 data-[hide=true]:hidden',
  },
  variants: {
    shadow: {
      true: { content: 'shadow-depth-elevation' },
      false: { content: 'shadow-none' },
    },
  },
});

export type MenuVariantProps = VariantProps<typeof menuStyles>;
