import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';
import { focusVisible } from '../classes';

export const disclosure = tv({
  slots: {
    base: '',
    item: 'group/item',
    trigger: [
      'flex items-center w-full text-left px-3 py-2 text-muted-11 first-letter:uppercase',
      ...focusVisible,
    ],
    content: 'px-3 py-2',
  },
  variants: {},
});

export type DisclosureVariantProps = VariantProps<typeof disclosure>;
export type DisclosureClassNames = ClassNames<typeof disclosure.slots>;
