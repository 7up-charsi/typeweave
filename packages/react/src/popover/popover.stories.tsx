import React from 'react';
import {
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from './';
import { Button } from '../button';
import { FloatingArrow } from '../floating-arrow';

const meta = {
  title: 'Components/Popover',
};

export default meta;

const Template = () => {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: 'instant',
      block: 'center',
      inline: 'center',
    });
  }, []);

  return (
    <div className="w-[300vw] h-[300vh] flex items-center justify-center">
      <PopoverRoot defaultOpen>
        <PopoverTrigger>
          <Button ref={ref}>open popver</Button>
        </PopoverTrigger>

        <PopoverPortal>
          <PopoverContent
            aria-labelledby="title"
            aria-describedby="desc"
            className="max-w-sm p-5 w-full"
          >
            <FloatingArrow />

            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere,
              aut corrupti eum nihil cumque dolorum voluptas accusamus et.
              Libero temporibus animi impedit consequuntur eaque ex consequatur
              aperiam fugit dolores repudiandae.
            </p>

            <div className="mt-4 flex gap-2 justify-end">
              <PopoverClose>
                <Button variant="text" color="danger">
                  Close
                </Button>
              </PopoverClose>

              <Button color="success">Agree</Button>
            </div>
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
    </div>
  );
};

export const Default = {
  render: Template,
};
