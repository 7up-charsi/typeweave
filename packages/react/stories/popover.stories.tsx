import React from 'react';
import {
  Button,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverPortal,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from '../src';

const meta = {
  title: 'Components/Popover',
  args: {
    defaultOpen: true,
  },
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'right',
        'bottom',
        'left',
        'top-end',
        'top-start',
        'right-end',
        'right-start',
        'bottom-end',
        'bottom-start',
        'left-end',
        'left-start',
      ],
    },
    sticky: {
      control: 'select',
      options: ['partial', 'always'],
    },
  },
};

export default meta;

const Template = (args) => {
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
      <PopoverRoot defaultOpen={args.defaultOpen}>
        <PopoverTrigger>
          <Button ref={ref}>open popver</Button>
        </PopoverTrigger>

        <PopoverPortal>
          <PopoverContent
            alignOffset={args.alignOffset}
            arrow={args.arrow}
            mainOffset={args.mainOffset}
            sticky={args.sticky}
            placement={args.placement}
            arrowPadding={args.arrowPadding}
            hideWhenDetached={args.hideWhenDetached}
            allowMainAxisFlip={args.allowMainAxisFlip}
            allowCrossAxisFlip={args.allowCrossAxisFlip}
          >
            {args.arrow && <PopoverArrow />}

            <PopoverHeader>
              <PopoverTitle>Lorem ipsum dolor</PopoverTitle>

              <PopoverDescription>
                Lorem ipsum dolor sit amet consectetur.
              </PopoverDescription>
            </PopoverHeader>

            <div className="p-4">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Facere, aut corrupti eum nihil cumque dolorum voluptas accusamus
                et. Libero temporibus animi impedit consequuntur eaque ex
                consequatur aperiam fugit dolores repudiandae.
              </p>

              <div className="mt-4 flex gap-2 justify-end">
                <PopoverClose>
                  <Button variant="text" color="danger">
                    Close
                  </Button>
                </PopoverClose>

                <Button color="success">Agree</Button>
              </div>
            </div>
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
    </div>
  );
};

export const Default = {
  render: Template,
  args: {
    alignOffset: 0,
    mainOffset: 0,
    arrowPadding: 10,
    hideWhenDetached: true,
    boundaryPadding: 0,
    sticky: 'partial',
    placement: 'bottom',
    arrow: true,
    allowMainAxisFlip: true,
    allowCrossAxisFlip: true,
  },
};
