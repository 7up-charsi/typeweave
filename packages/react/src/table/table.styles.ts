import { tv, VariantProps } from 'tailwind-variants';

export const tableStyles = tv({
  slots: {
    table: '',
    thead: '',
    tbody: '',
    tr: 'h-10',
    th: 'px-3 first-letter:uppercase font-semibold',
    td: 'text-center',
  },
  variants: {
    variant: {
      strip: {
        tr: 'even:bg-muted-3 [thead>&]:bg-muted-3',
      },
      grid: {
        th: 'border border-muted-7',
        td: 'border border-muted-7',
      },
    },
  },
});

export type TableVariantProps = VariantProps<typeof tableStyles>;
