import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const accordion = tv({
  slots: {
    base: 'space-y-2',
    item: 'focus-within:outline-2 focus-within:outline-focus',
    header: '',
    trigger:
      'group w-full flex items-center overflow-hidden rounded bg-primary-3 px-3 py-2 text-left text-primary-11 outline-none first-letter:uppercase hover:bg-primary-4 disabled:disabled data-[expanded=true]:bg-primary-5',
    content: 'w-full px-3 py-2',
  },
  variants: {},
});

export type AccordionVariantProps = VariantProps<typeof accordion>;
export type AccordionClassNames = ClassNames<typeof accordion.slots>;
