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
    color: {
      control: { type: 'select' },
      options: Object.keys(input.variants.color),
      if: { arg: 'color', exists: true },
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
    startContent={
      args.startContent && <p className="text-neutral">{args.startContent}</p>
    }
    endContent={
      args.endContent && <p className="text-neutral">{args.endContent}</p>
    }
    placeholder="very nice placeholder"
  />
);

export const Input = {
  render: InputTemplate,
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

const MultilineTemplate = (args: InputProps) => (
  <InputComp
    type="multiline"
    {...args}
    startContent={
      args.startContent && <p className="text-neutral">{args.startContent}</p>
    }
    endContent={
      args.endContent && <p className="text-neutral">{args.endContent}</p>
    }
    placeholder="very nice placeholder"
  />
);

export const Multiline = {
  render: MultilineTemplate,
};
