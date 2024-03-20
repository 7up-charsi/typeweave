import React from 'react';
import { chip } from '@webbo-ui/theme';

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
  <div className="p-5 flex flex-col gap-6 items-center">
    {(
      Object.keys(chip.variants.variant) as [keyof typeof chip.variants.variant]
    ).map((variant, idx) => (
      <div key={idx} className="flex flex-col gap-4">
        <span className="text-muted-11 pl-3 uppercase font-bold place-self-start text-sm border-l-2 border-muted-9">
          {variant}
        </span>

        <div className="flex flex-wrap gap-4">
          {(
            Object.keys(chip.variants.color) as [
              keyof typeof chip.variants.color,
            ]
          ).map((color, i) => (
            <Chip
              key={i}
              color={color}
              variant={variant}
              label="Chip Comp"
              onDelete={() => {}}
              size={args.size}
            />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const Default = {
  render: Template,
  args: {
    deleteable: true,
  },
};
