import React from 'react';

import { ThemeSwitcher, ThemeSwitcherProps } from '../src';

const meta = {
  title: 'Components/ThemeSwitcher',
  component: ThemeSwitcher,
};

export default meta;

const Template = (args: ThemeSwitcherProps) => <ThemeSwitcher {...args} />;

export const Default = {
  render: Template,
};
