import { VariantProps, tv } from 'tailwind-variants';
import { ClassNames } from '../types';
import { focusWithIn } from '../classes';

export const input = tv({
  slots: {
    base: 'flex flex-col w-64 group',
    label:
      'first-letter:uppercase cursor-pointer self-start px-1 text-sm font-semibold leading-none text-muted-11 mb-2',
    inputWrapper: [
      'w-full relative flex items-center gap-x-2 rounded px-3 cursor-text bg-transparent border border-muted-7 hover:border-muted-8 focus-within:hover:border-transparent focus-within:border-transparent',
      focusWithIn,
    ],
    input:
      'appearance-none bg-transparent outline-none grow w-0 text-muted-11 placeholder:text-muted-11/80 h-[30px] text-sm',
    helperText:
      'first-letter:uppercase px-1 pt-1 text-sm leading-none text-muted-10',
    startContent: 'flex gap-1 items-center text-base',
    endContent: 'flex gap-1 items-center text-base',
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
    error: {
      true: {
        label: 'text-danger-11',
        helperText: 'text-danger-11',
      },
    },
  },
});

export type InputVariantProps = VariantProps<typeof input>;
export type InputClassNames = ClassNames<typeof input.slots>;

export const numberInput = tv({
  slots: {
    base: 'h-7 w-6 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity',
    buttonBase: 'px-0 w-full grow cursor-pointer',
  },
});

export type NumberInputVariantProps = VariantProps<typeof numberInput>;
export type NumberInputClassNames = ClassNames<typeof numberInput.slots>;

export const passwordInput = tv({
  slots: {
    button: 'h-[28px] w-[28px]',
  },
});

export type PasswordInputVariantProps = VariantProps<typeof passwordInput>;
export type PasswordInputClassNames = ClassNames<typeof passwordInput.slots>;
