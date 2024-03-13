import React from 'react';
import { badge } from '@webbo-ui/theme';
import { Button } from '@webbo-ui/button';

import { Badge } from '../src';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: { ...badge.defaultVariants, overlap: undefined },
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(badge.variants.variant),
    },
    placement: {
      control: 'select',
      options: Object.keys(badge.variants.placement),
    },
    color: {
      control: 'select',
      options: Object.keys(badge.variants.color),
    },
    shadow: {
      control: 'select',
      options: Object.keys(badge.variants.shadow),
    },
  },
};

export default meta;

const Template = (args) => (
  <div className="flex flex-col gap-10 items-center">
    <div className="flex gap-10 items-center">
      <Badge {...args} content={100} max={99}>
        <Button variant="flat">Notifications</Button>
      </Badge>

      <Badge {...args} content={100} max={99} overlap="circular">
        <Button variant="flat" isIconOnly aria-label="mail">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 48 48"
            width={23}
            height={23}
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.47 10.71a2 2 0 00-2 2v22.61a2 2 0 002 2h35.06a2 2 0 002-2V12.68a2 2 0 00-2-2H6.47zm33.21 3.82L24 26.07 8.32 14.53"
            ></path>
          </svg>
        </Button>
      </Badge>
    </div>

    <div className="flex gap-10 items-center">
      <Badge {...args} content={100} max={99} variant="dot">
        <Button variant="flat">Notifications</Button>
      </Badge>

      <Badge {...args} content={100} max={99} overlap="circular" variant="dot">
        <Button variant="flat" isIconOnly aria-label="mail">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 48 48"
            width={23}
            height={23}
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.47 10.71a2 2 0 00-2 2v22.61a2 2 0 002 2h35.06a2 2 0 002-2V12.68a2 2 0 00-2-2H6.47zm33.21 3.82L24 26.07 8.32 14.53"
            ></path>
          </svg>
        </Button>
      </Badge>
    </div>
  </div>
);

export const Default = {
  render: Template,
};
