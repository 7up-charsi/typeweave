import { VariantProps, tv } from 'tailwind-variants';

export const inputStyles = tv({
  slots: {
    base: 'flex flex-col w-64 group gap-1 data-[disabled=true]:disabled',
    label:
      'first-letter:uppercase cursor-pointer self-start px-1 text-sm font-semibold',
    inputWrapper:
      'h-10 w-full relative flex items-center gap-x-2 gap-y-1 rounded px-3 cursor-text bg-transparent border border-muted-7 hover:border-muted-8 focus-within:hover:border-transparent focus-within:border-transparent overflow-hidden focus-within:ring-2 focus-within:ring-focus dynamic-icon data-[error=true]:border-danger-7 data-[error=true]:focus-within:ring-danger-8 data-[multiline=true]:p-0 data-[multiline=true]:h-auto',
    input:
      'h-full appearance-none bg-transparent outline-none grow w-0 placeholder:text-current placeholder:opacity-75 text-sm',
    helperText:
      'first-letter:uppercase px-1 text-xs h-5 data-[error=true]:text-danger-11',
    textarea:
      'appearance-none bg-transparent outline-none grow w-0 placeholder:text-current placeholder:opacity-75 text-sm resize-none data-[multiline=true]:p-3',
    required: 'text-danger-11 ml-2',
  },
  variants: {
    fullWidth: { true: { base: 'w-full' } },
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
