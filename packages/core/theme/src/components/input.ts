import { VariantProps, tv } from 'tailwind-variants';
import { ClassNames } from '../types';

export const input = tv({
  slots: {
    base: 'flex flex-col w-64 group',
    label:
      'first-letter:uppercase cursor-pointer self-start px-1 pb-1 text-base leading-none text-muted-500 dark:text-muted-400 group-data-[focused=true]:text-muted-700 dark:group-data-[focused=true]:text-muted-200',
    inputWrapper:
      'w-full relative flex items-center gap-2 rounded px-3 cursor-text',
    input:
      'appearance-none bg-transparent outline-none grow w-0 text-muted-700 dark:text-muted-200 placeholder:text-muted-500 dark:placeholder:text-muted-400',
    helperText:
      'first-letter:uppercase px-1 pt-1 text-sm leading-none text-muted-600 dark:text-muted-300',
  },
  variants: {
    variant: {
      filled: {
        inputWrapper:
          'bg-muted-100 dark:bg-muted-700 group-data-[hovered=true]:group-data-[focused=false]:bg-muted-200 dark:group-data-[hovered=true]:group-data-[focused=false]:bg-muted-600 border border-transparent group-data-[focused=true]:border-muted-400',
      },
      border: {
        inputWrapper:
          'bg-transparent border border-muted-300 dark:border-muted-500 group-data-[hovered=true]:border-muted-400 group-data-[focused=true]:border-muted-400',
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
          "relative after:absolute after:content-['*'] after:text-danger-700 dark:after:text-danger-300 after:ml-2",
      },
    },
    error: {
      true: {
        label:
          'text-danger-700 dark:text-danger-300 group-data-[focused=true]:text-danger-700 dark:group-data-[focused=true]:text-danger-300',
        helperText: 'text-danger-700 dark:text-danger-300',
      },
    },
  },
});

export type InputVariantProps = VariantProps<typeof input>;
export type InputClassNames = ClassNames<typeof input.slots>;

export const inputStyles = [
  './node_modules/@gist-ui/theme/src/components/input.ts',
  './node_modules/@gist-ui/theme/src/classes.ts',
];
