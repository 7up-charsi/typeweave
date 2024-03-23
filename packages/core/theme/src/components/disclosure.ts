import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const disclosure = tv({
  slots: {
    base: 'space-y-2',
    item: ['group/item'],
    trigger: '',
    content: 'px-3 py-2',
  },
  variants: {},
});

export type DisclosureVariantProps = VariantProps<typeof disclosure>;
export type DisclosureClassNames = ClassNames<typeof disclosure.slots>;
