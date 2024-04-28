import React from 'react';
import {
  Button,
  DisclosureContent,
  DisclosureItem,
  DisclosureRoot,
  DisclosureTrigger,
} from '../src';
import { ChevronDownIcon } from 'lucide-react';

const meta = {
  title: 'Components/Disclosure',
};

export default meta;

const Template = (args) => (
  <DisclosureRoot {...args} className="rounded border border-muted-6">
    {Array.from({ length: 10 }).map((_, i, arr) => (
      <React.Fragment key={i}>
        <DisclosureItem value={'' + (i + 1)} className="first:mt-2 last:!mb-2">
          <div className="flex items-center px-4 py-1 has-[button:disabled]:disabled">
            {i === 7 ? (
              <span>DISABLED Disclosure with dummy content</span>
            ) : (
              <span>Disclosure no. {i + 1} with dummy content</span>
            )}

            <DisclosureTrigger className="group ml-auto" disabled={i === 7}>
              <Button isIconOnly aria-label="expand" size="sm">
                <ChevronDownIcon className="transition-transform rotate-0 group-data-[expanded=true]:-rotate-180" />
              </Button>
            </DisclosureTrigger>
          </div>

          <DisclosureContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
            pariatur vitae consectetur ullam repellendus illo suscipit
            perspiciatis at maxime neque exercitationem qui doloribus architecto
            reiciendis modi debitis aliquid, ex id!
          </DisclosureContent>
        </DisclosureItem>

        {i !== arr.length - 1 ? <hr className="border-muted-6" /> : null}
      </React.Fragment>
    ))}
  </DisclosureRoot>
);

const DefaultTemplate = () => <Template />;

export const Default = {
  render: DefaultTemplate,
};
