import React from 'react';
import { checkbox } from '@gist-ui/theme';

import { Checkbox, CheckboxProps } from '../src';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    ...checkbox.defaultVariants,
    label: 'very sexy label',
  },
  argTypes: {
    labelPlacement: {
      control: 'select',
      options: Object.keys(checkbox.variants.labelPlacement),
    },
    color: {
      control: 'select',
      options: Object.keys(checkbox.variants.color),
    },
    size: {
      control: 'select',
      options: Object.keys(checkbox.variants.size),
    },
  },
};

export default meta;

const Template = (args: CheckboxProps) => <Checkbox {...args} />;

export const Default = {
  render: Template,
};
