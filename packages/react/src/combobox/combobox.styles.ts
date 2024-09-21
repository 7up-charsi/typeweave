import { tv, VariantProps } from 'tailwind-variants';

export const comboboxStyles = tv({
  slots: {
    listboxWrapper:
      'w-[var(--reference-width)] bg-paper border border-muted-7 rounded z-50 overflow-hidden',
    listbox: 'max-h-[300px] w-full overflow-y-auto py-2 relative',
    option:
      'min-h-auto px-4 py-[6px] lg:min-h-9 flex items-center select-none cursor-pointer data-[disabled=true]:disabled data-[selected=true]:bg-info-3 data-[focused=true]:data-[selected=true]:bg-info-4 data-[focused=true]:data-[selected=false]:bg-muted-3 dark:data-[selected=true]:bg-info-6 dark:data-[focused=true]:data-[selected=true]:bg-info-7 dark:data-[focused=true]:data-[selected=false]:bg-muted-6',
    noOptions: 'h-10 w-full flex items-center justify-center capitalize',
    loading: 'h-10 w-full flex items-center justify-center capitalize',
    group: '',
    groupHeader:
      'sticky -top-2 bg-paper h-12 px-4 z-50 text-sm font-medium content-center',
    groupItems: '[&>li]:pl-6',
    startContent: '',
    endContent: 'flex items-center',
    inputWrapper: '',
    input: 'truncate',
    clearIndicator: 'size-6',
    openIndicator: 'size-6 data-[open=true]:rotate-180',
  },
  variants: {
    shadow: {
      true: { listboxWrapper: 'shadow-md' },
      false: { listboxWrapper: 'shadow-none' },
    },
    editable: { true: {} },
    multiple: { true: {} },
    hasClearButton: { true: {} },
    hasOpenIndicator: { true: {} },
  },
  compoundVariants: [
    {
      multiple: true,
      editable: true,
      className: {
        endContent: 'absolute right-0 top-1/2 -translate-y-1/2 mr-3',
        inputWrapper: 'flex-wrap min-h-10 h-auto py-2',
        input: 'min-w-12 grow min-h-auto h-auto',
      },
    },
    {
      editable: true,
      hasClearButton: true,
      hasOpenIndicator: true,
      multiple: true,
      className: { inputWrapper: 'pr-[64px]' },
    },
    {
      editable: true,
      hasClearButton: false,
      hasOpenIndicator: true,
      multiple: true,
      className: { inputWrapper: 'pr-[40px]' },
    },
    {
      editable: true,
      hasClearButton: true,
      hasOpenIndicator: false,
      multiple: true,
      className: { inputWrapper: 'pr-[40px]' },
    },
  ],
});

export type ComboboxVariantProps = VariantProps<typeof comboboxStyles>;
