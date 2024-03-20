import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const toggleButton = tv({
  slots: { button: '' },
  variants: {
    color: {
      default: { button: 'data-[selected=true]:bg-muted-4' },
      primary: { button: 'data-[selected=true]:bg-primary-4' },
      secondary: { button: 'data-[selected=true]:bg-secondary-4' },
      success: { button: 'data-[selected=true]:bg-success-4' },
      info: { button: 'data-[selected=true]:bg-warning-4' },
      warning: { button: 'data-[selected=true]:bg-info-4' },
      danger: { button: 'data-[selected=true]:bg-danger-4' },
    },
  },
});

export type ToggleButtonVariantProps = VariantProps<typeof toggleButton>;
export type ToggleButtonClassNames = ClassNames<typeof toggleButton.slots>;
