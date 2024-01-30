import React from 'react';
import { input } from '@gist-ui/theme';

import {
  NumberInput,
  NumberInputProps,
  PasswordInput,
  PasswordInputProps,
  Input as InputComp,
  InputProps,
} from '../src';

const meta = {
  title: 'Components/Input',
  args: {
    ...input.defaultVariants,
    placeholder: '',
    helperText: 'helper text',
    errorMessage: 'error message',
    label: 'label',
    error: false,
    hideLabel: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(input.variants.variant),
    },
    size: {
      control: { type: 'select' },
      options: Object.keys(input.variants.size),
      if: { arg: 'size', exists: true },
    },
    fullWidth: {
      control: { type: 'boolean' },
      if: { arg: 'fullWidth', exists: true },
      name: 'full width',
    },
  },
};

export default meta;

const InputTemplate = (args: InputProps) => (
  <InputComp
    {...args}
    startContent={args.startContent && <p className="text-neutral">kg</p>}
    endContent={args.endContent && <p className="text-neutral">$$$</p>}
    required
  />
);

export const Input = {
  render: InputTemplate,
  args: {
    placeholder: 'Placeholder',
  },
};

export const StartEndContent = {
  name: 'Start / End content',
  render: InputTemplate,
  args: {
    startContent: 'kg',
    endContent: '$$$',
  },
};

const PasswordTemplate = (args: PasswordInputProps) => (
  <PasswordInput {...args} />
);

export const Password = {
  render: PasswordTemplate,
};

const NumberTemplate = (args: NumberInputProps) => <NumberInput {...args} />;

export const Number = {
  render: NumberTemplate,
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
  },
  args: {
    step: 1,
    largeStep: 5,
  },
};
