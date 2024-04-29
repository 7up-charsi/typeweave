import { VariantProps, tv } from 'tailwind-variants';
import { ClassNames } from '../types';

export const input = tv({
  slots: {
    base: 'flex flex-col w-64 group space-y-1',
    label:
      'first-letter:uppercase cursor-pointer self-start px-1 text-sm font-semibold text-muted-11',
    inputWrapper:
      'w-full relative flex items-center gap-x-2 rounded px-3 cursor-text bg-transparent border border-muted-7 hover:border-muted-8 focus-within:hover:border-transparent focus-within:border-transparent overflow-hidden focus-within:outline-2 focus-within:outline-focus',
    input:
      'appearance-none bg-transparent outline-none grow w-0 text-muted-11 placeholder:text-muted-11/90 h-[30px] text-sm',
    helperText: 'first-letter:uppercase px-1 text-xs text-muted-11/90',
    errorMessage:
      'first-letter:uppercase px-1 text-xs font-semibold text-danger-11',
    startContent: 'flex gap-1 items-center text-base',
    endContent: 'flex gap-1 items-center text-base',
    textarea:
      'appearance-none bg-transparent outline-none grow w-0 text-muted-11 placeholder:text-muted-11/90 text-sm resize-none',
  },
  variants: {
    fullWidth: { true: { base: 'w-full' } },
    disabled: { true: { base: 'disabled' } },
    required: {
      true: {
        label:
          "relative after:absolute after:content-['*'] after:text-danger-11 after:ml-2",
      },
    },
    multiline: {
      true: {
        inputWrapper: 'p-0',
        textarea: 'p-3',
        startContent: 'hidden',
        endContent: 'hidden',
      },
    },
  },
});

export type InputVariantProps = VariantProps<typeof input>;
export type InputClassNames = ClassNames<typeof input.slots>;

export const numberInput = tv({
  slots: {
    button: 'h-6 w-6 text-base',
  },
});

export type NumberInputVariantProps = VariantProps<typeof numberInput>;
export type NumberInputClassNames = ClassNames<typeof numberInput.slots>;

export const passwordInput = tv({
  slots: {
    button: 'h-6 w-6 text-base',
  },
});

export type PasswordInputVariantProps = VariantProps<typeof passwordInput>;
export type PasswordInputClassNames = ClassNames<typeof passwordInput.slots>;
