import React from 'react';
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
} from '../dialog';
import { Button } from '../button';

const meta = {
  title: 'Hooks/use-scroll-lock',
};

export default meta;

const Template = () => {
  const [open, setOpen] = React.useState(false);
  const [openNested, setOpenNested] = React.useState(false);

  return (
    <>
      <DialogRoot
        open={open}
        onOpenChange={setOpen}
        onClose={(e, reason) => {
          if (reason === 'outside') {
            e.preventDefault();
          }
        }}
      >
        <DialogTrigger>
          <Button
            onPress={() => {
              setOpen(true);
            }}
          >
            Open Dialog
          </Button>
        </DialogTrigger>

        <DialogPortal>
          <DialogOverlay />
          <DialogContent className="max-w-md w-full p-5">
            <div className="text-2xl text-center my-32">Dialog</div>

            <Button
              className="mx-auto flex mb-5"
              onPress={() => {
                setOpen(false);
              }}
            >
              close
            </Button>

            <Button
              className="mx-auto flex"
              onPress={async () => {
                setOpenNested(true);

                await new Promise((resolve) => {
                  setTimeout(resolve, 2000);
                });

                setOpen(false);
              }}
            >
              close and open nested
            </Button>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>

      <DialogRoot
        open={openNested}
        onOpenChange={setOpenNested}
        onClose={(e, reason) => {
          if (reason === 'outside') {
            e.preventDefault();
          }
        }}
      >
        <DialogPortal>
          <DialogOverlay />
          <DialogContent className="max-w-sm w-full p-5">
            <div className="text-2xl text-center my-10">Nested Dialog</div>

            <Button
              className="mx-auto flex"
              onPress={async () => {
                setOpenNested(false);
              }}
            >
              close
            </Button>
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
