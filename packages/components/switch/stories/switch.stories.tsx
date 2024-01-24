import React from 'react';
import { switch as _switch } from '@gist-ui/theme';

import { Switch, SwitchProps } from '../src';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  args: _switch.defaultVariants,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: Object.keys(_switch.variants.size),
    },
    color: {
      control: { type: 'select' },
      options: Object.keys(_switch.variants.color),
    },
    labelPlacement: {
      control: { type: 'select' },
      options: Object.keys(_switch.variants.labelPlacement),
    },
  },
};

export default meta;

const Template = (args: SwitchProps) => (
  <Switch {...args} label="switch label" />
);

export const Default = {
  render: Template,
};
