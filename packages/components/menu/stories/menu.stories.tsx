import React, { useEffect, useRef, useState } from 'react';
import { menu } from '@webbo-ui/theme';
import { Button } from '@webbo-ui/button';

import * as Menu from '../src';

const meta = {
  title: 'Components/Menu',
  args: menu.defaultVariants,
};

export default meta;

const Template = (args) => {
  const ref = useRef<HTMLButtonElement>(null);

  const [favrouite, setFavrouite] = useState(true);
  const [radioValue, setRadioValue] = useState('radio item 1');

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: 'instant',
      block: 'center',
      inline: 'center',
    });
  }, []);

  return (
    <div className="h-[300vh] w-[300vw] flex pt-24 justify-center">
      <Menu.Root defaultOpen {...args}>
        <Menu.Trigger>
          <Button ref={ref}>open menu</Button>
        </Menu.Trigger>

        <Menu.Portal>
          <Menu.Menu roleDescription="control menu" className="w-[170px]">
            <Menu.Arrow />

            <Menu.Label>actions</Menu.Label>
            <Menu.Group accessibleLabel="actions">
              <Menu.Item>add</Menu.Item>
              <Menu.Item>edit</Menu.Item>
              <Menu.Item disabled>delete</Menu.Item>
            </Menu.Group>

            <Menu.Separator />

            <Menu.Label>Status</Menu.Label>
            <Menu.Group accessibleLabel="status">
              <Menu.CheckboxItem checked={favrouite} onChange={setFavrouite}>
                active
              </Menu.CheckboxItem>
              <Menu.CheckboxItem disabled checked>
                notifications
              </Menu.CheckboxItem>
            </Menu.Group>

            <Menu.Separator />

            <Menu.Label>Current Bill</Menu.Label>
            <Menu.RadioGroup
              accessibleLabel="current bill"
              onChange={setRadioValue}
              value={radioValue}
            >
              <Menu.RadioItem value="radio item 1">paid</Menu.RadioItem>
              <Menu.RadioItem value="radio item 2">unpaid</Menu.RadioItem>
              <Menu.RadioItem value="radio item 3" disabled>
                always paid
              </Menu.RadioItem>
            </Menu.RadioGroup>
          </Menu.Menu>
        </Menu.Portal>
      </Menu.Root>
    </div>
  );
};

export const Default = {
  render: Template,
};
