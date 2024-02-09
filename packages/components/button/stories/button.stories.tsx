import React from 'react';
import { button } from '@gist-ui/theme';
import { Button, ButtonGroup, ButtonProps } from '../src';
import { Bars, Circles } from 'react-loader-spinner';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: button.defaultVariants,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.keys(button.variants.variant),
      if: { arg: 'variant', exists: true },
    },
    color: {
      control: { type: 'select' },
      options: Object.keys(button.variants.color),
      if: { arg: 'color', exists: true },
    },
    size: {
      control: { type: 'select' },
      options: Object.keys(button.variants.size),
      if: { arg: 'size', exists: true },
    },
    fullWidth: {
      control: { type: 'boolean' },
      if: { arg: 'fullWidth', exists: true },
      name: 'full width',
    },
  },
};

export default meta;

const Template = (args: ButtonProps) => <Button {...args} />;

const reactIcon = (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor">
    <path d="M12.001 13.5001C11.1725 13.5001 10.501 12.8285 10.501 12.0001C10.501 11.1716 11.1725 10.5001 12.001 10.5001C12.8294 10.5001 13.501 11.1716 13.501 12.0001C13.501 12.8285 12.8294 13.5001 12.001 13.5001ZM11.4733 16.4945C11.6479 16.705 11.8239 16.908 12.001 17.103C12.178 16.908 12.3541 16.705 12.5286 16.4945C12.3538 16.4982 12.1779 16.5001 12.001 16.5001C11.824 16.5001 11.6481 16.4982 11.4733 16.4945ZM9.47837 16.3694C8.6762 16.2846 7.91035 16.1603 7.19268 16.0016C7.11832 16.3512 7.06134 16.6904 7.02243 17.0166C6.83358 18.6 7.09805 19.5617 7.50098 19.7943C7.9039 20.0269 8.86893 19.7751 10.1458 18.8199C10.4088 18.6231 10.6741 18.4042 10.9397 18.1649C10.4434 17.6228 9.95287 17.0217 9.47837 16.3694ZM16.8093 16.0016C16.0916 16.1603 15.3257 16.2846 14.5236 16.3694C14.0491 17.0217 13.5585 17.6228 13.0622 18.1649C13.3279 18.4042 13.5931 18.6231 13.8562 18.8199C15.133 19.7751 16.0981 20.0269 16.501 19.7943C16.9039 19.5617 17.1684 18.6 16.9795 17.0166C16.9406 16.6904 16.8836 16.3512 16.8093 16.0016ZM18.2598 15.6136C18.8364 18.2526 18.5328 20.3533 17.251 21.0933C15.9691 21.8334 13.9981 21.046 12.001 19.2271C10.0038 21.046 8.03282 21.8334 6.75098 21.0933C5.46913 20.3533 5.16555 18.2526 5.74217 15.6136C3.16842 14.7935 1.50098 13.4802 1.50098 12.0001C1.50098 10.5199 3.16842 9.20668 5.74217 8.38654C5.16555 5.74754 5.46913 3.64687 6.75098 2.9068C8.03282 2.16673 10.0038 2.95415 12.001 4.77302C13.9981 2.95415 15.9691 2.16673 17.251 2.9068C18.5328 3.64687 18.8364 5.74754 18.2598 8.38654C20.8335 9.20668 22.501 10.5199 22.501 12.0001C22.501 13.4802 20.8335 14.7935 18.2598 15.6136ZM10.9397 5.83521C10.6741 5.59597 10.4088 5.37703 10.1458 5.18024C8.86893 4.22499 7.9039 3.97321 7.50098 4.20584C7.09805 4.43847 6.83358 5.4001 7.02243 6.9835C7.06134 7.30969 7.11832 7.6489 7.19268 7.99857C7.91035 7.83985 8.6762 7.71556 9.47837 7.63078C9.95287 6.97848 10.4434 6.37737 10.9397 5.83521ZM14.5236 7.63078C15.3257 7.71556 16.0916 7.83985 16.8093 7.99857C16.8836 7.6489 16.9406 7.30969 16.9795 6.9835C17.1684 5.4001 16.9039 4.43847 16.501 4.20584C16.0981 3.97321 15.133 4.22499 13.8562 5.18024C13.5931 5.37703 13.3279 5.59597 13.0622 5.83521C13.5585 6.37737 14.0491 6.97848 14.5236 7.63078ZM12.5286 7.50565C12.3541 7.29515 12.178 7.09211 12.001 6.89711C11.8239 7.09211 11.6479 7.29515 11.4733 7.50565C11.6481 7.50194 11.824 7.50007 12.001 7.50007C12.1779 7.50007 12.3538 7.50194 12.5286 7.50565ZM8.37252 14.7042C8.28191 14.5547 8.19233 14.4033 8.10386 14.2501C8.01539 14.0968 7.92906 13.9435 7.84488 13.7903C7.74985 14.0467 7.66205 14.3007 7.58169 14.5515C7.83908 14.6074 8.10295 14.6583 8.37252 14.7042ZM10.3049 14.9377C10.8579 14.9788 11.4251 15.0001 12.001 15.0001C12.5769 15.0001 13.144 14.9788 13.697 14.9377C14.0091 14.4793 14.3111 13.9988 14.5991 13.5001C14.887 13.0013 15.1522 12.4995 15.393 12.0001C15.1522 11.5006 14.887 10.9988 14.5991 10.5001C14.3111 10.0013 14.0091 9.52081 13.697 9.06246C13.144 9.02133 12.5769 9.00007 12.001 9.00007C11.4251 9.00007 10.8579 9.02133 10.3049 9.06246C9.99283 9.52081 9.69086 10.0013 9.4029 10.5001C9.11494 10.9988 8.8498 11.5006 8.60892 12.0001C8.8498 12.4995 9.11494 13.0013 9.4029 13.5001C9.69086 13.9988 9.99283 14.4793 10.3049 14.9377ZM16.1571 10.2098C16.2521 9.9534 16.3399 9.6994 16.4203 9.44859C16.1629 9.39278 15.899 9.34182 15.6294 9.29591C15.72 9.44543 15.8096 9.59683 15.8981 9.75007C15.9866 9.9033 16.0729 10.0566 16.1571 10.2098ZM6.13143 9.83671C5.79142 9.94714 5.46917 10.0674 5.16723 10.1968C3.70154 10.825 3.00098 11.5348 3.00098 12.0001C3.00098 12.4653 3.70154 13.1752 5.16723 13.8033C5.46917 13.9327 5.79142 14.053 6.13143 14.1634C6.35281 13.4625 6.6281 12.7371 6.95576 12.0001C6.6281 11.263 6.35281 10.5376 6.13143 9.83671ZM7.58169 9.44859C7.66205 9.6994 7.74985 9.9534 7.84488 10.2098C7.92906 10.0566 8.01539 9.9033 8.10386 9.75007C8.19233 9.59683 8.28191 9.44543 8.37252 9.29591C8.10295 9.34182 7.83908 9.39278 7.58169 9.44859ZM17.8705 14.1634C18.2105 14.053 18.5328 13.9327 18.8347 13.8033C20.3004 13.1752 21.001 12.4653 21.001 12.0001C21.001 11.5348 20.3004 10.825 18.8347 10.1968C18.5328 10.0674 18.2105 9.94714 17.8705 9.83671C17.6491 10.5376 17.3739 11.263 17.0462 12.0001C17.3739 12.7371 17.6491 13.4625 17.8705 14.1634ZM16.4203 14.5515C16.3399 14.3007 16.2521 14.0467 16.1571 13.7903C16.0729 13.9435 15.9866 14.0968 15.8981 14.2501C15.8096 14.4033 15.72 14.5547 15.6294 14.7042C15.899 14.6583 16.1629 14.6074 16.4203 14.5515Z"></path>
  </svg>
);

const DefaultTemplate = (args: ButtonProps) => (
  <div className="p-5 flex flex-col gap-6 items-center">
    {(
      Object.keys(button.variants.variant) as [
        keyof typeof button.variants.variant,
      ]
    ).map((variant, idx) => (
      <div key={idx} className="flex flex-col gap-4">
        <span className="text-foreground pl-3 uppercase font-medium place-self-start text-sm border-l-2 border-neutral">
          {variant}
        </span>

        <div className="flex flex-wrap gap-4">
          {(
            Object.keys(button.variants.color) as [
              keyof typeof button.variants.color,
            ]
          ).map((color, i) => (
            <Button key={i} {...args} variant={variant} color={color}>
              {color[0].toUpperCase() + color.slice(1)}
            </Button>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const Default = {
  render: DefaultTemplate,
  args: {
    variant: undefined,
    color: undefined,
  },
};

const WithConentTemplate = (args: ButtonProps) => (
  <div className="p-5 flex flex-col gap-6 items-center data-[theme=dark]:bg-background">
    {(
      Object.keys(button.variants.variant) as [
        keyof typeof button.variants.variant,
      ]
    ).map((variant, idx) => (
      <div key={idx} className="flex flex-col gap-4">
        <span className="text-foreground pl-3 uppercase font-medium place-self-start text-sm border-l-2 border-neutral">
          {variant}
        </span>

        {['start', 'end', 'start / end'].map((position, i) => (
          <div key={i} className="pl-5 flex flex-col gap-3">
            <span className="text-foreground pl-3 uppercase font-medium place-self-start text-sm border-l-2 border-neutral">
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
                  startContent={position !== 'end' && reactIcon}
                  endContent={position !== 'start' && reactIcon}
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

const IconOnlyTemplate = (args: ButtonProps) => (
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
              isIconOnly
            >
              {reactIcon}
            </Button>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const IconOnly = {
  render: IconOnlyTemplate,
  args: {
    'aria-label': 'house button',
    fullWidth: undefined,
    variant: undefined,
    color: undefined,
  },
};

export const Spinner = {
  render: Template,
  args: {
    startContent: <Bars wrapperClass="[&>svg]:fill-current" width={20} />,
    endContent: <Circles wrapperClass="[&>svg]:fill-current" width={20} />,
    children: 'with spinners',
  },
};

const GroupTemplate = () => (
  <ButtonGroup variant="border">
    <Button>Select</Button>
    <Button color="danger">Delete</Button>
    <Button color="info" isIconOnly>
      <Circles wrapperClass="[&>svg]:fill-current" width={20} />
    </Button>
  </ButtonGroup>
);

export const Group = {
  render: GroupTemplate,
  args: {
    startContent: <Bars wrapperClass="[&>svg]:fill-current" width={20} />,
    endContent: <Circles wrapperClass="[&>svg]:fill-current" width={20} />,
    children: 'with spinners',
  },
};
