import { tv, VariantProps } from 'tailwind-variants';

export const disclosureStyles = tv({
  slots: {
    base: '',
    item: '',
    trigger: '',
    content: '',
  },
  variants: {},
});

export type DisclosureVariantProps = VariantProps<typeof disclosureStyles>;
