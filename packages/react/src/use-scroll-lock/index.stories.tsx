import React from 'react';
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
} from '../dialog';

const meta = {
  title: 'Hooks/use-scroll-lock',
};

export default meta;

const Template = () => {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  return (
    <>
      <DialogRoot
        open={open1}
        onOpenChange={setOpen1}
        onClose={(e, reason) => {
          if (reason === 'outside') {
            e.preventDefault();
          }
        }}
      >
        <DialogTrigger>
          <button
            onClick={() => {
              setOpen1(true);
            }}
          >
            open 1
          </button>
        </DialogTrigger>

        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            dialog 1
            <button
              onClick={async () => {
                setOpen2(true);

                await new Promise((resolve) => {
                  setTimeout(resolve, 2000);
                });

                setOpen1(false);
              }}
            >
              close 1
            </button>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>

      <DialogRoot
        open={open2}
        onOpenChange={setOpen2}
        onClose={(e, reason) => {
          if (reason === 'outside') {
            e.preventDefault();
          }
        }}
      >
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            dialog 2
            <button
              onClick={() => {
                setOpen2(false);
              }}
            >
              close 2
            </button>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>

      <div className="h-[300vh]"></div>
    </>
  );
};

export const Default = {
  render: Template,
};
