import { VariantProps, tv } from 'tailwind-variants';

export const inputStyles = tv({
  slots: {
    base: 'flex flex-col w-64 group gap-1 data-[disabled=true]:disabled',
    label:
      'first-letter:uppercase cursor-pointer self-start px-1 text-sm font-semibold',
    inputWrapper:
      'relative flex h-10 w-full cursor-text items-center gap-x-2 gap-y-1 overflow-hidden rounded border border-muted-7 bg-transparent px-3 dynamic-icon hover:border-muted-8 has-[input:focus-visible]:border-transparent has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-focus has-[input:focus-visible]:hover:border-transparent data-[multiline=true]:h-auto data-[error=true]:border-danger-7 data-[multiline=true]:p-0 data-[error=true]:hover:border-danger-8 data-[error=true]:has-[input:focus-visible]:border-transparent data-[error=true]:has-[input:focus-visible]:ring-danger-8 data-[error=true]:has-[input:focus-visible]:hover:border-transparent has-[textarea:focus-visible]:border-transparent has-[textarea:focus-visible]:ring-2 has-[textarea:focus-visible]:ring-focus has-[textarea:focus-visible]:hover:border-transparent data-[error=true]:has-[textarea:focus-visible]:border-transparent data-[error=true]:has-[textarea:focus-visible]:ring-danger-8 data-[error=true]:has-[textarea:focus-visible]:hover:border-transparent',
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
