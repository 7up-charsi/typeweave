import React from 'react';
import { chip } from '@gist-ui/theme';

import { Chip } from '../src';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  args: chip.defaultVariants,
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(chip.variants.variant),
    },
    color: {
      control: 'select',
      options: Object.keys(chip.variants.color),
    },
    size: {
      control: 'select',
      options: Object.keys(chip.variants.size),
    },
  },
};

export default meta;

const Template = (args) => (
  <Chip
    {...args}
    label="Chip Comp"
    onDelete={args.deleteable ? () => {} : undefined}
  />
);

export const Default = {
  render: Template,
  args: {
    deleteable: true,
  },
};
