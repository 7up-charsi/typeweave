import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { radio } from '@gist-ui/theme';

import * as Radio from '../src';

const meta: Meta = {
  title: 'Components/Radio',
  args: radio.defaultVariants,
  argTypes: {
    labelPlacement: {
      control: 'select',
      options: Object.keys(radio.variants.labelPlacement),
    },
    color: {
      control: 'select',
      options: Object.keys(radio.variants.color),
    },
    size: {
      control: 'select',
      options: Object.keys(radio.variants.size),
    },
  },
};

export default meta;

const Template = (args) => (
  <div className="flex flex-col ">
    <div className="text-neutral-700 font-medium">Select Gender</div>

    <Radio.Group name="gender">
      <Radio.Radio {...args} value="Male" label="Male" />
      <Radio.Radio {...args} value="Female" label="Female" />
      <Radio.Radio {...args} value="Other" label="Other" />
    </Radio.Group>
  </div>
);

export const Default: StoryObj = {
  render: Template,
};
