import { VariantProps, tv } from 'tailwind-variants';
import { ClassNames } from '../types';

export const input = tv({
  slots: {
    base: 'flex flex-col w-64 group',
    label:
      'first-letter:uppercase cursor-pointer self-start px-1 pb-1 text-base leading-none text-muted-11/70 group-data-[focused=true]:text-muted-11',
    inputWrapper:
      'w-full relative flex items-center gap-x-2 rounded px-3 cursor-text',
    input:
      'appearance-none bg-transparent outline-none grow w-0 text-muted-11 placeholder:text-muted-11/80',
    helperText:
      'first-letter:uppercase px-1 pt-1 text-sm leading-none text-muted-10',
    startContent: 'flex gap-1 items-center',
    endContent: 'flex gap-1 items-center',
  },
  variants: {
    variant: {
      filled: {
        inputWrapper:
          'bg-muted-3 group-hover:group-data-[focused=false]:bg-muted-4 border border-transparent group-data-[focused=true]:border-muted-8',
      },
      border: {
        inputWrapper:
          'bg-transparent border border-muted-7 group-hover:border-muted-8 group-data-[focused=true]:border-muted-8',
      },
    },
    size: {
      sm: {
        input: 'h-10',
        startContent: 'text-lg',
        endContent: 'text-lg',
      },
      md: {
        input: 'h-12',
        startContent: 'text-xl',
        endContent: 'text-xl',
      },
    },
    fullWidth: { true: { base: 'w-full' } },
    disabled: { true: { base: 'disabled' } },
    required: {
      true: {
        label:
          "relative after:absolute after:content-['*'] after:text-danger-11 after:ml-2",
      },
    },
    error: {
      true: {
        label: 'text-danger-10 group-data-[focused=true]:text-danger-11',
        helperText: 'text-danger-11',
      },
    },
  },
});

export type InputVariantProps = VariantProps<typeof input>;
export type InputClassNames = ClassNames<typeof input.slots>;
