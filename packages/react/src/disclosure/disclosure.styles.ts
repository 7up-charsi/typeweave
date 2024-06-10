import { tv, VariantProps } from 'tailwind-variants';

export const disclosureStyles = tv({
  slots: {
    base: 'space-y-2',
    item: '',
    trigger: '',
    content: 'px-3 py-2',
  },
  variants: {},
});

export type DisclosureVariantProps = VariantProps<typeof disclosureStyles>;
