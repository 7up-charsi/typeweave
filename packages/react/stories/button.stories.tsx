import React from 'react';
import { button } from '@typeweave/theme';
import { Button, ButtonGroup, ButtonProps } from '../src';
import { ChevronDown, SmileIcon } from 'lucide-react';

const meta = {
  title: 'Components/Button',
  component: Button,
};

export default meta;

const ColorsTemplate = () => (
  <div className="p-5 flex flex-col gap-6 items-center">
    {(
      Object.keys(button.variants.variant) as [
        keyof typeof button.variants.variant,
      ]
    ).map((variant, idx) => (
      <div key={idx} className="flex flex-col gap-4">
        <span className="text-muted-11 pl-3 uppercase font-bold place-self-start text-sm border-l-2 border-muted-9">
          {variant}
        </span>

        <div className="flex flex-wrap gap-4">
          {(
            Object.keys(button.variants.color) as [
              keyof typeof button.variants.color,
            ]
          ).map((color, i) => (
            <Button key={i} variant={variant} color={color}>
              {color}
            </Button>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const Colors = {
  render: ColorsTemplate,
  args: {
    variant: undefined,
    color: undefined,
  },
};

const SizesTemplate = () => (
  <div className="p-5 flex flex-col gap-6 items-center">
    {(
      Object.keys(button.variants.variant) as [
        keyof typeof button.variants.variant,
      ]
    ).map((variant, idx) => (
      <div key={idx} className="flex flex-col gap-4">
        <span className="text-muted-11 pl-3 uppercase font-bold place-self-start text-sm border-l-2 border-muted-9">
          {variant}
        </span>

        <div className="flex flex-wrap gap-4">
          {(['lg', 'md', 'sm'] as const).map((size, i) => (
            <Button key={i} variant={variant} color="primary" size={size}>
              {size}
            </Button>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const Sizes = {
  render: SizesTemplate,
};

const IconOnlyTemplate = () => (
  <div className="p-5 flex flex-col gap-6 items-center data-[theme=dark]:bg-background">
    {(
      Object.keys(button.variants.variant) as [
        keyof typeof button.variants.variant,
      ]
    ).map((variant, idx) => (
      <div key={idx} className="flex flex-col gap-4">
        <span className="text-foreground pl-3 uppercase text-sm font-medium">
          {variant}
        </span>

        <div className="flex flex-wrap gap-4">
          {(['lg', 'md', 'sm'] as const).map((size, i) => (
            <Button
              key={i}
              aria-label="icon"
              isIconOnly
              variant={variant}
              color="primary"
              size={size}
            >
              <SmileIcon />
            </Button>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const IconOnly = {
  render: IconOnlyTemplate,
};

const WithConentTemplate = (args: ButtonProps) => (
  <div className="p-5 flex flex-col gap-6 items-center data-[theme=dark]:bg-background">
    {(
      Object.keys(button.variants.variant) as [
        keyof typeof button.variants.variant,
      ]
    ).map((variant, idx) => (
      <div key={idx} className="flex flex-col gap-4">
        <span className="text-foreground pl-3 uppercase font-medium place-self-start text-sm border-l-2 border-muted-9">
          {variant}
        </span>

        {['start', 'end', 'start / end'].map((position, i) => (
          <div key={i} className="pl-5 flex flex-col gap-3">
            <span className="text-foreground pl-3 uppercase font-medium place-self-start text-sm border-l-2 border-muted-9">
              {position} content
            </span>

            <div className="flex flex-wrap gap-4 pl-5">
              {(
                Object.keys(button.variants.color) as [
                  keyof typeof button.variants.color,
                ]
              ).map((color, i) => (
                <Button
                  key={i}
                  {...args}
                  variant={variant}
                  color={color}
                  startContent={position !== 'end' && <SmileIcon />}
                  endContent={position !== 'start' && <SmileIcon />}
                >
                  {color[0].toUpperCase() + color.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
);

export const WithContent = {
  render: WithConentTemplate,
  args: {
    variant: undefined,
    color: undefined,
  },
};

const GroupTemplate = (args) => (
  <div className="flex flex-col items-start gap-4">
    <ButtonGroup {...args} variant="flat" size="lg">
      <Button>Select</Button>
      <Button color="danger">Delete</Button>
      <Button color="info" isIconOnly aria-label="spinner">
        <ChevronDown />
      </Button>
    </ButtonGroup>

    <ButtonGroup {...args} variant="flat" size="md">
      <Button>Select</Button>
      <Button color="danger">Delete</Button>
      <Button color="info" isIconOnly aria-label="spinner">
        <ChevronDown />
      </Button>
    </ButtonGroup>

    <ButtonGroup {...args} variant="flat" size="sm">
      <Button>Select</Button>
      <Button color="danger">Delete</Button>
      <Button color="info" isIconOnly aria-label="spinner">
        <ChevronDown />
      </Button>
    </ButtonGroup>
  </div>
);

const HorizontalGroupTemplate = () => <GroupTemplate direction="horizontal" />;

export const HorizontalGroup = {
  render: HorizontalGroupTemplate,
};

const VerticalGroupTemplate = () => <GroupTemplate direction="vertical" />;

export const VerticalGroup = {
  render: VerticalGroupTemplate,
};
