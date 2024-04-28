import React from 'react';
import { NumberInput, PasswordInput, Input as InputComp } from '../src';

const meta = {
  title: 'Components/Input',
};

export default meta;

const InputTemplate = () => (
  <div className="flex flex-col gap-5">
    <InputComp
      label="input label"
      placeholder="Placeholder"
      helperText="this input is optional"
    />

    <InputComp
      required
      label="input label"
      placeholder="Placeholder"
      error
      errorMessage="this input is required"
    />
  </div>
);

export const Input = {
  render: InputTemplate,
};

const ContentTemplate = () => (
  <InputComp
    label="input label"
    placeholder="Placeholder"
    helperText="this input is optional"
    startContent={<p className="text-sm">kg</p>}
    endContent={<p className="text-sm">$$$</p>}
  />
);

export const StartEndContent = {
  name: 'Start / End content',
  render: ContentTemplate,
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

const MultilineTemplate = () => (
  <InputComp required label="multiline input" multiline />
);

export const Multiline = {
  render: MultilineTemplate,
};

const HideLabelTemplate = () => (
  <div className="flex flex-col gap-5">
    <InputComp
      required
      label="multiline input"
      hideLabel
      placeholder="Placeholder"
      helperText="this input is optional"
      startContent={<p className="text-sm">kg</p>}
      endContent={<p className="text-sm">$$$</p>}
    />

    <InputComp
      required
      label="multiline input"
      multiline
      hideLabel
      placeholder="Placeholder"
      helperText="this input is optional"
    />
  </div>
);

export const HideLabel = {
  render: HideLabelTemplate,
};
