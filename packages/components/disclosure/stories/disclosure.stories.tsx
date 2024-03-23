import React, { Fragment } from 'react';
import * as Disclosure from '../src';
import { Button } from '@webbo-ui/button';

const meta = {
  title: 'Components/Disclosure',
};

export default meta;

const Template = (args) => (
  <Disclosure.Root {...args}>
    {Array.from({ length: 10 }).map((_, i, arr) => (
      <Fragment key={i}>
        <Disclosure.Item value={'' + (i + 1)}>
          <div className="flex items-center p-2">
            {i === 7 ? (
              <span>DISABLED Disclosure with dummy content</span>
            ) : (
              <span>Disclosure no. {i + 1} with dummy content</span>
            )}

            <div className="grow"></div>

            <Disclosure.Trigger>
              <Button isIconOnly aria-label="expand" size="sm">
                <svg
                  className="transition-transform rotate-0 group-data-[state=expanded]/item:-rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
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
              </Button>
            </Disclosure.Trigger>
          </div>

          <Disclosure.Content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
            pariatur vitae consectetur ullam repellendus illo suscipit
            perspiciatis at maxime neque exercitationem qui doloribus architecto
            reiciendis modi debitis aliquid, ex id!
          </Disclosure.Content>
        </Disclosure.Item>

        {i !== arr.length - 1 ? <hr className="border-muted-6" /> : null}
      </Fragment>
    ))}
  </Disclosure.Root>
);

const DefaultTemplate = () => <Template />;

export const Default = {
  render: DefaultTemplate,
};
