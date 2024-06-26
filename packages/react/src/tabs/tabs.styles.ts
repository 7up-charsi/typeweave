import { tv, VariantProps } from 'tailwind-variants';

export const tabsStyles = tv({
  slots: {
    wrapper: 'flex gap-2',
    list: 'flex',
    trigger:
      'data-[orientation=horizontal]:rounded-b-none data-[orientation=horizontal]:border-t-2 data-[orientation=horizontal]:border-t-transparent data-[orientation=horizontal]:border-b-2 data-[orientation=horizontal]:border-b-transparent data-[orientation=horizontal]:data-[selected=true]:border-b-info-9 data-[orientation=vertical]:rounded-r-none data-[orientation=vertical]:border-l-2 data-[orientation=vertical]:border-l-transparent data-[orientation=vertical]:border-r-2 data-[orientation=vertical]:border-r-transparent data-[orientation=vertical]:data-[selected=true]:border-r-info-9 data-[selected=true]:focus-visible:border-transparent',
    content: 'outline-none focus-visible:ring-2 focus-visible:ring-focus',
  },
  variants: {
    orientation: {
      horizontal: {
        wrapper: 'flex-col',
        list: '',
      },
      vertical: {
        wrapper: '',
        list: 'flex-col',
      },
    },
  },
});

export type TabsVariantProps = VariantProps<typeof tabsStyles>;
