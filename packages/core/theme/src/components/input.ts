import { VariantProps, tv } from 'tailwind-variants';
import { ClassNames } from '../types';
import { groupDataFocusVisible } from '../classes';

export const input = tv({
  slots: {
    base: 'flex flex-col w-64 group',
    label:
      'first-letter:uppercase cursor-pointer self-start px-1 pb-1 text-base text-neutral leading-none group-data-[focused=true]:text-neutral-700',
    inputWrapper: [
      'w-full relative flex items-center gap-2 rounded px-3 cursor-text',
      ...groupDataFocusVisible,
    ],
    input:
      'appearance-none bg-transparent outline-none grow w-0 text-neutral-700 placeholder:text-neutral',

    helperText:
      'first-letter:uppercase px-1 pt-1 text-sm leading-none text-neutral',
  },
  variants: {
    variant: {
      filled: {
        inputWrapper:
          'bg-neutral-200/60 group-data-[hovered=true]:group-data-[focused=false]:bg-neutral-200/80 border border-transparent group-data-[focused=true]:border-neutral-400',
      },
      border: {
        inputWrapper:
          'bg-transparent border border-neutral-300 group-data-[hovered=true]:border-neutral-400 group-data-[focused=true]:border-neutral-400',
      },
    },

    size: {
      sm: { inputWrapper: 'h-10' },
      md: { inputWrapper: 'h-12' },
    },
    fullWidth: { true: { base: 'w-full' } },
    isDisabled: { true: { base: 'disabled' } },
    required: {
      true: {
        label:
          "relative after:absolute after:content-['*'] after:text-danger after:ml-2",
      },
    },
    error: {
      true: {
        label: 'text-danger-700',
        inputWrapper: 'border-danger',
        helperText: 'text-danger',
      },
    },
  },
  compoundVariants: [],
});

export type InputVariantProps = VariantProps<typeof input>;
export type InputClassNames = ClassNames<typeof input.slots>;

export const inputStyles = [
  './node_modules/@gist-ui/theme/src/components/input.ts',
  './node_modules/@gist-ui/theme/src/classes.ts',
];
