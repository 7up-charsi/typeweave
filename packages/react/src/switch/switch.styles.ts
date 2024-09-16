import { tv, VariantProps } from 'tailwind-variants';

export const switchStyles = tv({
  slots: {
    base: 'inline-flex gap-2 shrink-0 has-[input:disabled]:disabled',
    switch: 'relative flex items-center p-1',
    input:
      'peer rounded-full appearance-none cursor-pointer transition-colors border border-muted-8 disabled:disabled absolute inset-0 outline-none focus-visible:ring-2 focus-visible:ring-focus',
    indicator:
      'pointer-events-none peer-checked:disabled:disabled grow h-full relative text-muted-9 before:bg-current before:absolute before:left-0 before:z-10 before:rounded-full before:h-full before:aspect-square before:translate-x-0 peer-checked:before:left-full peer-checked:before:-translate-x-full before:transition-[left,transform]',
    label: 'cursor-pointer select-none first-letter:uppercase',
  },
  variants: {
    color: {
      primary: {
        input: 'checked:bg-primary-9 checked:border-primary-9',
        indicator: 'peer-checked:text-white',
      },
      secondary: {
        input: 'checked:bg-secondary-9 checked:border-secondary-9',
        indicator: 'peer-checked:text-white',
      },
      success: {
        input: 'checked:bg-success-9 checked:border-success-9',
        indicator: 'peer-checked:text-white',
      },
      info: {
        input: 'checked:bg-info-9 checked:border-info-9',
        indicator: 'peer-checked:text-white',
      },
      warning: {
        input: 'checked:bg-warning-9 checked:border-warning-9',
        indicator: 'peer-checked:text-white',
      },
      danger: {
        input: 'checked:bg-danger-9 checked:border-danger-9',
        indicator: 'peer-checked:text-white',
      },
    },
    size: {
      sm: {
        switch: 'w-[35px] h-[19px]',
        indicator: 'text-xs',
      },
      md: {
        switch: 'w-[40px] h-[22px]',
        indicator: 'text-base',
      },
    },
    labelPlacement: {
      top: { base: 'flex-col items-center', label: '-order-1' },
      bottom: { base: 'flex-col items-center', label: 'order-1' },
      left: { base: 'items-center', label: '-order-1' },
      right: { base: 'items-center', label: 'order-1' },
    },
  },
});

export type SwitchVariantProps = VariantProps<typeof switchStyles>;
