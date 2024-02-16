import { VariantProps, tv } from 'tailwind-variants';
import { ClassNames } from '../types';

export const input = tv({
  slots: {
    base: 'flex flex-col w-64 group',
    label:
      'first-letter:uppercase cursor-pointer self-start px-1 pb-1 text-base leading-none text-muted-11/70 dark:text-mutedDark-11/70 group-data-[focused=true]:text-muted-11 dark:group-data-[focused=true]:text-mutedDark-11',
    inputWrapper:
      'w-full relative flex items-center gap-2 rounded px-3 cursor-text',
    input:
      'appearance-none bg-transparent outline-none grow w-0 text-muted-11 dark:text-mutedDark-11 placeholder:text-muted-11/80 dark:placeholder:text-mutedDark-11/80',
    helperText:
      'first-letter:uppercase px-1 pt-1 text-sm leading-none text-muted-10 dark:text-mutedDark-10',
  },
  variants: {
    variant: {
      filled: {
        inputWrapper:
          'bg-muted-3 dark:bg-mutedDark-3 group-data-[hovered=true]:group-data-[focused=false]:bg-muted-4 dark:group-data-[hovered=true]:group-data-[focused=false]:bg-mutedDark-4 border border-transparent group-data-[focused=true]:border-muted-8 dark:group-data-[focused=true]:border-mutedDark-8',
      },
      border: {
        inputWrapper:
          'bg-transparent border border-muted-7 dark:border-mutedDark-7 group-data-[hovered=true]:border-muted-8 group-data-[focused=true]:border-muted-8 dark:group-data-[hovered=true]:border-mutedDark-8 dark:group-data-[focused=true]:border-mutedDark-8',
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
          "relative after:absolute after:content-['*'] after:text-danger-11 dark:after:text-dangerDark-11 after:ml-2",
      },
    },
    error: {
      true: {
        label:
          'text-danger-10 dark:text-dangerDark-10 group-data-[focused=true]:text-danger-11 dark:group-data-[focused=true]:text-dangerDark-11',
        helperText: 'text-danger-11 dark:text-dangerDanger-11',
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
