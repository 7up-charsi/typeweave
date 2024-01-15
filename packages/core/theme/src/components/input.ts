import {
  ClassValue,
  SlotsClassValue,
  VariantProps,
  tv,
} from 'tailwind-variants';

const input = tv({
  slots: {
    base: 'flex flex-col gap-1 w-64 relative group',
    label: 'first-letter:uppercase',
    inputWrapper: 'relative',
    input:
      'appearance-none bg-transparent outline-none grow w-0 text-neutral-700 placeholder:opacity-0 placeholder:text-neutral-400 group-data-[shrink=true]:placeholder:opacity-100',
    helperText: 'px-2 text-sm text-neutral',
    startContent: 'h-[0.01px] flex items-center mr-2',
    endContent: 'h-[0.01px] flex items-center ml-2',
    fieldset: '',
    legend: '',
    textarea:
      'appearance-none bg-transparent outline-none grow w-0 text-neutral-700 placeholder:opacity-0 placeholder:text-neutral-400 group-data-[shrink=true]:placeholder:opacity-100 resize-none',
  },
  variants: {
    variant: {
      filled: {
        inputWrapper: [
          'w-full flex items-center cursor-text transition-colors bg-neutral-200/50 group-data-[hovered=true]:group-data-[focused=false]:bg-neutral-200/70 rounded-t group-data-[start=true]:pl-3 group-data-[end=true]:pr-3',

          'before:absolute before:left-0 before:bottom-0 before:w-full before:border-b before:border-b-neutral',

          'after:absolute after:left-1/2 after:bottom-0 after:border-b-2 after:w-full after:scale-x-0 after:-translate-x-1/2 group-data-[focused=true]:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center',
        ],
        input: 'px-3 group-data-[start=true]:pl-0 group-data-[end=true]:pr-0',
        label:
          'absolute top-0 left-0 translate-x-3 scale-100 text-base group-data-[shrink=true]:scale-75 transition-transform z-50 text-neutral-600 origin-top-left pointer-events-none',
        startContent: 'mt-[16px]',
      },
      border: {
        inputWrapper:
          'w-full flex items-center cursor-text transition-colors group-data-[start=true]:pl-[14px] group-data-[end=true]:pr-[14px]',
        fieldset:
          'absolute left-0 right-0 bottom-0 -top-[10px] px-2 m-0 pointer-events-none rounded border border-neutral-300 group-data-[focused=true]:border-2 group-data-[focused=false]:group-data-[hovered=true]:border-neutral',
        legend:
          'invisible w-0 group-data-[shrink=true]:w-auto text-base scale-75 first-letter:uppercase whitespace-nowrap',
        label:
          'absolute top-0 left-0 translate-x-[14px] scale-100 text-base group-data-[shrink=true]:scale-75 group-data-[shrink=true]:translate-y-[-9px] transition-transform z-50  text-neutral-600 origin-top-left pointer-events-none',
        input:
          'px-[14px] group-data-[start=true]:pl-0 group-data-[end=true]:pr-0',
      },
    },
    color: {
      primary: {},
      secondary: {},
      success: {},
      info: {},
      warning: {},
      danger: {},
    },
    size: {
      sm: {},
      md: {},
    },
    fullWidth: {
      true: { base: 'w-full' },
    },
    isDisabled: {
      true: { base: 'disabled' },
    },
    error: {
      true: {},
    },
    hideLabel: {
      true: {},
    },
    multiline: {
      true: {},
    },
  },
  defaultVariants: {
    color: 'primary',
    fullWidth: false,
    isDisabled: false,
    size: 'md',
    variant: 'filled',
    hideLabel: false,
    error: false,
  },
  compoundVariants: [
    {
      variant: 'filled',
      size: 'sm',
      hideLabel: false,
      class: {
        input: 'pt-[21px] pb-1',
        label: 'translate-y-[13px] group-data-[shrink=true]:translate-y-1',
      },
    },
    {
      variant: 'filled',
      size: 'md',
      hideLabel: false,
      class: {
        input: 'pt-[25px] pb-2',
        label: 'translate-y-[16px] group-data-[shrink=true]:translate-y-[7px]',
      },
    },

    {
      variant: 'border',
      size: 'sm',
      class: {
        input: 'py-[8.5px]',
        label: 'translate-y-[9px]',
      },
    },
    {
      variant: 'border',
      size: 'md',
      class: {
        input: 'py-[16.5px]',
        label: 'translate-y-[16px]',
      },
    },

    {
      variant: 'border',
      hideLabel: true,
      class: {
        fieldset: 'inset-0',
      },
    },

    // border / multiline
    {
      variant: 'border',
      size: 'sm',
      multiline: true,
      class: {
        inputWrapper: 'py-[8.5px] px-[14px]',
      },
    },
    {
      variant: 'border',
      size: 'md',
      multiline: true,
      class: {
        inputWrapper: 'py-[16.5px] px-[14px]',
      },
    },

    // filled / multiline
    {
      variant: 'filled',
      size: 'sm',
      multiline: true,
      class: {
        inputWrapper: 'pt-[21px] pb-1 px-3',
      },
    },
    {
      variant: 'filled',
      size: 'md',
      multiline: true,
      class: {
        inputWrapper: 'pt-[25px] pb-2 px-3',
      },
    },

    // filled
    {
      variant: 'filled',
      color: 'primary',
      error: false,
      class: {
        inputWrapper: 'after:border-b-primary',
        label: 'group-data-[focused=true]:text-primary-600',
      },
    },
    {
      variant: 'filled',
      color: 'secondary',
      error: false,
      class: {
        inputWrapper: 'after:border-b-secondary',
        label: 'group-data-[focused=true]:text-secondary-600',
      },
    },
    {
      variant: 'filled',
      color: 'success',
      error: false,
      class: {
        inputWrapper: 'after:border-b-success',
        label: 'group-data-[focused=true]:text-success-600',
      },
    },
    {
      variant: 'filled',
      color: 'info',
      error: false,
      class: {
        inputWrapper: 'after:border-b-info',
        label: 'group-data-[focused=true]:text-info-600',
      },
    },
    {
      variant: 'filled',
      color: 'warning',
      error: false,
      class: {
        inputWrapper: 'after:border-b-warning',
        label: 'group-data-[focused=true]:text-warning-600',
      },
    },
    {
      variant: 'filled',
      color: 'danger',
      error: false,
      class: {
        inputWrapper: 'after:border-b-danger',
        label: 'group-data-[focused=true]:text-danger-600',
      },
    },

    // border
    {
      variant: 'border',
      color: 'primary',
      error: false,
      class: {
        fieldset: 'group-data-[focused=true]:border-primary',
        label: 'group-data-[focused=true]:text-primary-600',
      },
    },
    {
      variant: 'border',
      color: 'secondary',
      error: false,
      class: {
        fieldset: 'group-data-[focused=true]:border-secondary',
        label: 'group-data-[focused=true]:text-secondary-600',
      },
    },
    {
      variant: 'border',
      color: 'success',
      error: false,
      class: {
        fieldset: 'group-data-[focused=true]:border-success',
        label: 'group-data-[focused=true]:text-success-600',
      },
    },
    {
      variant: 'border',
      color: 'info',
      error: false,
      class: {
        fieldset: 'group-data-[focused=true]:border-info',
        label: 'group-data-[focused=true]:text-info-600',
      },
    },
    {
      variant: 'border',
      color: 'warning',
      error: false,
      class: {
        fieldset: 'group-data-[focused=true]:border-warning',
        label: 'group-data-[focused=true]:text-warning-600',
      },
    },
    {
      variant: 'border',
      color: 'danger',
      error: false,
      class: {
        fieldset: 'group-data-[focused=true]:border-danger',
        label: 'group-data-[focused=true]:text-danger-600',
      },
    },

    // error
    {
      variant: 'filled',
      error: true,
      class: {
        inputWrapper: ['before:border-b-danger', 'after:border-b-danger'],
        label: 'text-danger',
        helperText: 'text-danger',
      },
    },
    {
      variant: 'border',
      error: true,
      class: {
        fieldset:
          'border-danger group-data-[focused=false]:group-data-[hovered=true]:border-danger',
        label: 'text-danger',
        helperText: 'text-danger',
      },
    },
  ],
});

export type InputVariantProps = VariantProps<typeof input>;
export type InputClassNames = SlotsClassValue<typeof input.slots, ClassValue>;

export { input };
