import React from 'react';
import { Switch, SwitchProps } from './';

const meta = {
  title: 'Components/Switch',
  component: Switch,
};

export default meta;

const Template = (args: SwitchProps) => (
  <div className="flex flex-col gap-4">
    <Switch {...args} label="switch md" />
    <Switch {...args} label="switch sm" size="sm" />
  </div>
);

export const Default = {
  render: Template,
};
