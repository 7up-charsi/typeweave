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

  const [isInvisible, setIsInvisible] = React.useState(false);

  return (
    <div className="flex flex-col gap-4 items-center">
      <button>test</button>
      
      <div
        data-invisible={isInvisible}
        className="data-[invisible=true]:invisible"
      >
        <FocusTrap {...args}>
          <div className="w-[500px] h-[300px] border-2 border-muted-7 rounded flex flex-wrap content-center items-center gap-3 justify-center">
            <span className="w-full text-center font-medium mb-4 text-info11">
              Focus can not escape this container with
              <span className="uppercase text-lg mx-1">keyboard</span>
            </span>
            {state && (
              <Button
                onBlur={() => console.log('blur button-1')}
                onFocus={() => console.log('focus button-1')}
                onPress={() => {
                  setIsInvisible((prev) => !prev);
                }}
              >
                button 1
              </Button>
            )}
            <Button
              onBlur={() => console.log('blur button-2')}
              onFocus={() => console.log('focus button-2')}
            >
              button 2
            </Button>
            <Button
              onBlur={() => console.log('blur button-3')}
              onFocus={() => console.log('focus button-3')}
              onPress={() => setState(false)}
            >
              button 3
            </Button>
            <Button
              onBlur={() => console.log('blur button-4')}
              onFocus={() => console.log('focus button-4')}
            >
              button 4
            </Button>
            <Button
              onBlur={() => console.log('blur button-5')}
              onFocus={() => console.log('focus button-5')}
            >
              button 5
            </Button>
          </div>
        </FocusTrap>
      </div>

      <p className="text-info-11 text-center text-balance">
        You cannot focus this button with keyboard <br /> when <b>`trapped`</b>
        is true
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
