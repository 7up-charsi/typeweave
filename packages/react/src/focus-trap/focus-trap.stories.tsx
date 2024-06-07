import React from 'react';
import { FocusTrap, FocusTrapProps } from './';
import { Button } from '../button';

const meta = {
  title: 'Components/FocusTrap',
  component: FocusTrap,
};

export default meta;

const DefaultTemplate = (args: FocusTrapProps) => {
  const [state, setState] = React.useState(true);

  return (
    <div className="flex flex-col gap-4 items-center">
      <FocusTrap {...args}>
        <div className="w-[500px] h-[300px] border-2 border-primary-6 rounded flex flex-wrap content-center items-center gap-3 justify-center">
          <span className="w-full text-center font-medium mb-4 text-info11">
            Focus can not escape this container with
            <span className="uppercase text-lg mx-1">keyboard</span>
          </span>

          {state && <Button>button 1</Button>}
          <Button>button 2</Button>
          <Button onPress={() => setState(false)}>button 3</Button>
          <Button>button 4</Button>
          <Button>button 5</Button>
        </div>
      </FocusTrap>

      <p className="text-info-11">
        You cannot focus this button with keyboard <br /> when <b>`trapped`</b>{' '}
        and <b>`loop`</b>
        both are true
      </p>

      <Button>button 6</Button>
    </div>
  );
};

export const Default = {
  render: DefaultTemplate,
  args: {
    loop: true,
    trapped: true,
    disabled: false,
  },
};
