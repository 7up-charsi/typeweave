import React from 'react';
import { Radio, RadioProps } from '../src';
import { RadioVariantProps, radio } from '@typeweave/theme';

const meta = {
  title: 'Components/Radio',
  component: Radio,
};

export default meta;

const Template = (args: RadioProps) => {
  return (
    <div className="flex flex-wrap gap-5">
      {(Object.keys(radio.variants.color) as RadioVariantProps['color'][]).map(
        (color) => (
          <div
            key={color}
            className="w-44 border border-muted-6 p-4 rounded flex flex-col gap-3"
          >
            <h2>Your gender</h2>
            <div className="flex flex-col gap-2">
              <Radio
                {...args}
                color={color}
                name={`${color}-gender`}
                label="male"
                defaultChecked
              />
              <Radio
                {...args}
                color={color}
                name={`${color}-gender`}
                label="female"
              />
              <Radio
                {...args}
                color={color}
                name={`${color}-gender`}
                label="other"
              />
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export const Default = {
  render: Template,
};
