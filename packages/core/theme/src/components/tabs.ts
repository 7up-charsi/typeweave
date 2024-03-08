import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const tabs = tv({
  slots: {
    wrapper: 'flex flex-col gap-2',
    list: 'flex',
    trigger: '',
    content: '',
  },
  variants: {},
});

export type TabsVariantProps = VariantProps<typeof tabs>;
export type TabsClassNames = ClassNames<typeof tabs.slots>;
