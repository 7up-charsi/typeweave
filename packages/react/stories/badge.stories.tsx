import React from 'react';
import { Badge, BadgeProps, Button } from '../src';
import { MailIcon } from 'lucide-react';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

const Template = (args: BadgeProps) => (
  <div className="flex flex-col gap-10 items-center">
    <div className="flex gap-10 items-center">
      <Badge {...args} content={100} max={99}>
        <Button variant="flat">Notifications</Button>
      </Badge>

      <Badge {...args} content={100} max={99} showZero>
        <Button variant="flat" isIconOnly aria-label="mail">
          <MailIcon />
        </Button>
      </Badge>
    </div>

    <div className="flex gap-10 items-center">
      <Badge {...args} variant="dot">
        <Button variant="flat">Notifications</Button>
      </Badge>

      <Badge {...args} variant="dot">
        <Button variant="flat" isIconOnly aria-label="mail">
          <MailIcon />
        </Button>
      </Badge>
    </div>
  </div>
);

export const Default = {
  render: Template,
};
