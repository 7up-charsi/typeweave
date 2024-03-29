import React from 'react';
import * as Accordion from '../src';

const meta = {
  title: 'Components/Accordion',
};

export default meta;

const Template = (args) => (
  <Accordion.Root {...args}>
    {Array.from({ length: 10 }).map((_, i) => (
      <Accordion.Item
        key={i}
        value={`accordion-item-${i + 1}`}
        disabled={i === 7}
      >
        <Accordion.Trigger className="group">
          {i === 7 ? (
            <span>DISABLED Accordion with dummy content</span>
          ) : (
            <span>Accordion no. {i + 1} with dummy content</span>
          )}

          <Accordion.Arrow className="ml-auto" />
        </Accordion.Trigger>

        <Accordion.Content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          pariatur vitae consectetur ullam repellendus illo suscipit
          perspiciatis at maxime neque exercitationem qui doloribus architecto
          reiciendis modi debitis aliquid, ex id!
        </Accordion.Content>
      </Accordion.Item>
    ))}
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
