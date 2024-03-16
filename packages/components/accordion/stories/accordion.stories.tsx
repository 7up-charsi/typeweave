import React from 'react';

import * as Accordion from '../src';

const meta = {
  title: 'Components/Accordion',
};

export default meta;

const chevron_down_svg = (
  <svg
    className="mr-3 group-data-[state=expanded]/trigger:hidden block"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m8 10 4 4 4-4"
    />
  </svg>
);

const chevron_up_svg = (
  <svg
    className="mr-3 group-data-[state=expanded]/trigger:block hidden"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m16 14-4-4-4 4"
    />
  </svg>
);

const Template = (args) => (
  <Accordion.Root {...args}>
    <Accordion.Item value="accordion-item-1">
      <Accordion.Header>
        <Accordion.Trigger>
          {chevron_down_svg}
          {chevron_up_svg}
          <span>Accordion 1</span>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
        pariatur vitae consectetur ullam repellendus illo suscipit perspiciatis
        at maxime neque exercitationem qui doloribus architecto reiciendis modi
        debitis aliquid, ex id!
      </Accordion.Content>
    </Accordion.Item>

    <hr className="" />

    <Accordion.Item value="accordion-item-2">
      <Accordion.Header>
        <Accordion.Trigger>
          {chevron_down_svg}
          {chevron_up_svg}
          <span>Accordion 1</span>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
        pariatur vitae consectetur ullam repellendus illo suscipit perspiciatis
        at maxime neque exercitationem qui doloribus architecto reiciendis modi
        debitis aliquid, ex id!
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
);

const MultipleTemplate = () => <Template defaultValue={['accordion-item-1']} />;

export const Multiple = {
  render: MultipleTemplate,
};

const SingleTemplate = () => (
  <Template
    type="single"
    isSingleCollapsible={false}
    defaultValue="accordion-item-1"
  />
);

export const Single = {
  render: SingleTemplate,
};

const SingleCollapsibleTemplate = () => (
  <Template type="single" defaultValue="accordion-item-1" />
);

export const SingleCollapsible = {
  render: SingleCollapsibleTemplate,
};
