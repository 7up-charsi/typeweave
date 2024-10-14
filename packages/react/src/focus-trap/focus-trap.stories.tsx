import { FocusTrap, FocusTrapProps } from './';
import { Button } from '../button';

const meta = {
  title: 'Components/FocusTrap',
  component: FocusTrap,
};

export default meta;

const DefaultTemplate = (args: FocusTrapProps) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="">
        <Button>button 1</Button>
        <Button className="ml-5">button 2</Button>
      </div>

      <FocusTrap {...args}>
        <div className="w-[500px] h-[300px] border-2 border-muted-7 rounded flex flex-wrap content-center items-center gap-3 justify-center">
          <span className="w-full text-center font-medium mb-4 text-info11">
            Focus can not escape this container with
            <span className="uppercase text-lg mx-1">keyboard</span>
          </span>
          <Button>button 3</Button>
          <Button>button 4</Button>
          <Button>button 5</Button>
          <Button>button 6</Button>
          <Button>button 7</Button>
        </div>
      </FocusTrap>

      <p className="text-info-11 text-center text-balance max-w-lg">
        Once focus gets in above container, you cannot focus bellow button with
        keyboard when <b>`trapped`</b>
        is true.
      </p>

      <Button>button 8</Button>
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
