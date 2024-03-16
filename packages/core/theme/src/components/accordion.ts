import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';
import { focusWithIn } from '../classes';

export const accordion = tv({
  slots: {
    base: '',
    item: ['group/item', ...focusWithIn],
    header: '',
    trigger:
      'group/trigger flex items-center w-full text-left px-3 py-2 first-letter:uppercase text-muted-11 hover:text-primary-11 data-[state=expanded]:text-primary-11 outline-none',
    content: 'px-3 py-2',
  },
  variants: {},
});

export type AccordionVariantProps = VariantProps<typeof accordion>;
export type AccordionClassNames = ClassNames<typeof accordion.slots>;
