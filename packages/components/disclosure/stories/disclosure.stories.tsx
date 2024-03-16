import React, { Fragment } from 'react';

import * as Disclosure from '../src';

const meta = {
  title: 'Components/Disclosure',
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
  <Disclosure.Root {...args}>
    {Array.from({ length: 10 }).map((_, i, arr) => (
      <Fragment key={i}>
        <Disclosure.Item value={`accordion-item-${i + 1}`} disabled={i === 7}>
          <Disclosure.Trigger>
            {chevron_down_svg}
            {chevron_up_svg}
            <span>Disclosure {i + 1}</span>
          </Disclosure.Trigger>

          <Disclosure.Content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
            pariatur vitae consectetur ullam repellendus illo suscipit
            perspiciatis at maxime neque exercitationem qui doloribus architecto
            reiciendis modi debitis aliquid, ex id!
          </Disclosure.Content>
        </Disclosure.Item>

        {i === arr.length - 1 ? null : <hr className="" />}
      </Fragment>
    ))}
  </Disclosure.Root>
);

const DefaultTemplate = () => <Template />;

export const Default = {
  render: DefaultTemplate,
};
