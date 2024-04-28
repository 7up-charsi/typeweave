import React from 'react';
import { Radio, RadioProps } from './';

const meta = {
  title: 'Components/Radio',
  component: Radio,
};

export default meta;

const Template = (args: RadioProps) => {
  return (
    <div className="w-44 border border-muted-6 p-4 rounded flex flex-col gap-3">
      <h2>Your gender</h2>
      <div className="flex flex-col gap-2">
        <Radio {...args} name="gender" label="male" defaultChecked />
        <Radio {...args} name="gender" label="female" />
        <Radio {...args} name="gender" label="other" />
      </div>
    </div>
  );
};

export const Default = {
  render: Template,
};