import React from 'react';

import { NumberInput, PasswordInput, Input as InputComp } from '../src';

const meta = {
  title: 'Components/Input',
};

export default meta;

const InputTemplate = (args) => (
  <div className="flex flex-col gap-5">
    <InputComp
      startContent={
        args.startContent && <p className="text-muted-11 text-base">kg</p>
      }
      endContent={
        args.endContent && <p className="text-muted-11 text-base">$$$</p>
      }
      required
      placeholder="placeholder"
      size="sm"
    />

    <InputComp
      startContent={
        args.startContent && <p className="text-muted-11 text-base">kg</p>
      }
      endContent={
        args.endContent && <p className="text-muted-11 text-base">$$$</p>
      }
      required
      placeholder="placeholder"
    />
  </div>
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
  <div className="flex flex-col gap-5">
    <PasswordInput required placeholder="placeholder" size="sm" />
    <PasswordInput required placeholder="placeholder" />
  </div>
);

export const Password = {
  render: PasswordTemplate,
};

const NumberTemplate = () => (
  <div className="flex flex-col gap-5">
    <NumberInput required placeholder="placeholder" size="sm" />
    <NumberInput required placeholder="placeholder" />
  </div>
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
