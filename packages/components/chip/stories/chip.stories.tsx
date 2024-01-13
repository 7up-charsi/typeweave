import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { chip } from '@gist-ui/theme';

import { Chip, ChipProps } from '../src';

const meta: Meta<ChipProps> = {
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

export const Default: StoryObj = {
  render: Template,
  args: {
    deleteable: true,
  },
};
