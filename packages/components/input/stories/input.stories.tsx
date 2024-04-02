import React from 'react';
import { NumberInput, PasswordInput, Input as InputComp } from '../src';

const meta = {
  title: 'Components/Input',
};

export default meta;

const InputTemplate = (args) => (
  <InputComp
    required
    label="input label"
    placeholder="Placeholder"
    startContent={
      args.startContent && <p className="text-muted-11 text-base">kg</p>
    }
    endContent={
      args.endContent && <p className="text-muted-11 text-base">$$$</p>
    }
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

const PasswordTemplate = () => (
  <PasswordInput required label="input label" placeholder="placeholder" />
);

export const Password = {
  render: PasswordTemplate,
};

const NumberTemplate = () => (
  <NumberInput required label="input label" placeholder="placeholder" />
);

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
