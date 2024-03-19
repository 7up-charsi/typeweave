import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';
import { focusWithIn } from '../classes';

export const accordion = tv({
  slots: {
    base: 'space-y-2',
    item: ['group/item', focusWithIn],
    header:
      'text-primary-11 bg-primary-3 hover:bg-primary-4 group-data-[state=expanded]/item:bg-primary-5 rounded overflow-hidden',
    trigger:
      'flex items-center w-full text-left px-3 py-2 first-letter:uppercase outline-none disabled:disabled',
    content: 'px-3 py-2',
  },
  variants: {},
});

export type AccordionVariantProps = VariantProps<typeof accordion>;
export type AccordionClassNames = ClassNames<typeof accordion.slots>;
