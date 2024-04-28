import React from 'react';
import { toggleButton } from '@ux-weaver/theme';
import { ToggleButton, ToggleButtonGroup } from '../src';

const meta = {
  title: 'Components/ToggleButton',
  args: toggleButton.defaultVariants,
};

export default meta;

const Template = () => {
  return (
    <div className="flex flex-col gap-5">
      <ToggleButtonGroup exclusive defaultValue="update">
        <ToggleButton value="select">select</ToggleButton>
        <ToggleButton value="update">update</ToggleButton>
        <ToggleButton value="delete">delete</ToggleButton>
      </ToggleButtonGroup>

      <ToggleButtonGroup defaultValue={['update']}>
        <ToggleButton value="select">select</ToggleButton>
        <ToggleButton value="update">update</ToggleButton>
        <ToggleButton value="delete">delete</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export const Default = {
  render: Template,
};
