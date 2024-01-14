import React, { Fragment } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { alert } from '@gist-ui/theme';

import { Alert, AlertProps } from '../src';

const meta: Meta<AlertProps> = {
  title: 'Components/Alert',
  component: Alert,
  args: { ...alert.defaultVariants, color: undefined },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.keys(alert.variants.variant),
      if: { arg: 'variant', exists: true },
    },
  },
};

export default meta;

const Template = (args) => (
  <>
    {Object.keys(alert.variants.color).map((color) => (
      <Fragment key={color}>
        <Alert {...args} color={color}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim ab
          fugiat commodi
        </Alert>

        <div className="h-5" />
      </Fragment>
    ))}
  </>
);

export const Default: StoryObj = {
  render: Template,
};
