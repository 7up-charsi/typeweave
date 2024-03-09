import React from 'react';
import { checkbox } from '@webbo-ui/theme';

import { Checkbox, CheckboxProps } from '../src';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: checkbox.defaultVariants,
};

export default meta;

const Template = (args: CheckboxProps) => (
  <Checkbox {...args} label="i agree... Lorem ipsum dolor sit" />
);

export const Default = {
  render: Template,
};
