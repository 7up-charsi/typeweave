import { VariantProps, tv } from 'tailwind-variants';

export const inputStyles = tv({
  slots: {
    base: 'flex flex-col w-64 group space-y-1',
    label:
      'first-letter:uppercase cursor-pointer self-start px-1 text-sm font-semibold',
    inputWrapper:
      'h-10 w-full relative flex items-center gap-x-2 gap-y-1 rounded px-3 cursor-text bg-transparent border border-muted-7 hover:border-muted-8 focus-within:hover:border-transparent focus-within:border-transparent overflow-hidden focus-within:ring-2 focus-within:ring-focus dynamic-icon',
    input:
      'h-full appearance-none bg-transparent outline-none grow w-0 placeholder:text-current placeholder:opacity-75 text-sm',
    helperText: 'first-letter:uppercase px-1 text-xs h-5',
    textarea:
      'appearance-none bg-transparent outline-none grow w-0 placeholder:text-current placeholder:opacity-75 text-sm resize-none',
    required: 'text-danger-11 ml-2',
  },
  variants: {
    error: {
      true: {
        helperText: 'text-danger-11 ',
        inputWrapper: 'border-danger-7 focus-within:ring-danger-8',
      },
    },
    fullWidth: { true: { base: 'w-full' } },
    disabled: { true: { base: 'disabled' } },
    multiline: {
      true: {
        inputWrapper: 'p-0 h-auto',
        textarea: 'p-3',
      },
    },
  },
});

export type InputVariantProps = VariantProps<typeof inputStyles>;

export const numberInputStyles = tv({
  slots: {
    wrapper: '',
    increase: '',
    decrease: '',
  },
});

export type NumberInputVariantProps = VariantProps<typeof numberInputStyles>;

export const passwordInputStyles = tv({
  slots: {
    button: '',
  },
});

export type PasswordInputVariantProps = VariantProps<
  typeof passwordInputStyles
>;
