import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';
import { focusVisible } from '../classes';

export const disclosure = tv({
  slots: {
    base: '',
    item: ['group/item first:mt-0 last:mb-0 my-1'],
    trigger: [
      'text-primary-11 bg-primary-3 hover:bg-primary-4 group-data-[state=expanded]/item:bg-primary-5 rounded overflow-hidden flex items-center w-full text-left px-3 py-2 first-letter:uppercase outline-none disabled:disabled',
      ...focusVisible,
    ],
    content: 'px-3 py-2',
  },
  variants: {},
});

export type DisclosureVariantProps = VariantProps<typeof disclosure>;
export type DisclosureClassNames = ClassNames<typeof disclosure.slots>;
