import React from 'react';
import { radio } from '@webbo-ui/theme';

import * as Radio from '../src';

const meta = {
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
    <div className="text-muted-11 font-medium">Select Gender</div>

    <Radio.Group name="gender">
      <Radio.Radio {...args} value="Male" label="Male" />
      <Radio.Radio {...args} value="Female" label="Female" />
      <Radio.Radio {...args} value="Other" label="Other" />
    </Radio.Group>
  </div>
);

export const Default = {
  render: Template,
};
