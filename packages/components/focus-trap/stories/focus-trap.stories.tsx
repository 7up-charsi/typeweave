import React from 'react';
import { Button } from '@webbo-ui/button';

import { FocusTrap, FocusTrapProps } from '../src';

const meta = {
  title: 'Components/FocusTrap',
  component: FocusTrap,
};

export default meta;

const DefaultTemplate = (args: FocusTrapProps) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <FocusTrap {...args}>
        <div className="w-[500px] h-[300px] border bg-muted-2 border-muted-6 dark:bg-mutedDark-2 dark:border-mutedDark-6 rounded flex flex-wrap content-center items-center gap-3 justify-center">
          <span className="w-full text-center font-medium mb-4 text-info11">
            Focus can not escape this container with
            <span className="uppercase text-lg mx-1">keyboard</span>
          </span>
          <Button>button 1</Button>
          <Button>button 2</Button>
          <Button>button 3</Button>
          <Button>button 4</Button>
          <Button>button 5</Button>
        </div>
      </FocusTrap>

      <Button color="primary">you cannot focus me when trapped is true</Button>
    </div>
  );
};

export const Default = {
  render: DefaultTemplate,
  args: {
    loop: true,
    trapped: true,
    isDisabled: false,
  },
};
