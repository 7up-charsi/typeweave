import React from 'react';
import { Button } from '../src';
import {
  AlertDialogActions,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogRoot,
  AlertDialogRootMethods,
  AlertDialogPortal,
  AlertDialogOverlay,
} from '../src';
import { XIcon } from 'lucide-react';

const meta = {
  title: 'Components/AlertDialog',
};

export default meta;

const Template = () => (
  <AlertDialogRoot defaultOpen>
    <AlertDialogTrigger>
      <Button color="danger">delete account</Button>
    </AlertDialogTrigger>

    <AlertDialogPortal>
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogTitle>Are your sure...?</AlertDialogTitle>
        <AlertDialogDescription>
          this action can not be undone. it will delete account and all of your
          saved content.
        </AlertDialogDescription>
        <AlertDialogActions>
          <AlertDialogClose>
            <Button color="danger" size="sm">
              Cancel
            </Button>
          </AlertDialogClose>

          <AlertDialogClose>
            <Button color="success" size="sm">
              Ok
            </Button>
          </AlertDialogClose>
        </AlertDialogActions>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
);

export const Default = {
  render: Template,
};

const VirtualElementTemplate = () => {
  const ref = React.useRef<AlertDialogRootMethods>(null);

  return (
    <>
      <Button
        color="danger"
        onPress={() => {
          ref.current?.open();
        }}
      >
        delete account
      </Button>

      <AlertDialogRoot ref={ref}>
        <AlertDialogTrigger />

        <AlertDialogPortal>
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogTitle>Are your sure...?</AlertDialogTitle>
            <AlertDialogDescription>
              this action can not be undone. it will delete account and all of
              your saved content.
            </AlertDialogDescription>
            <AlertDialogActions>
              <AlertDialogClose>
                <Button color="danger" size="sm">
                  Cancel
                </Button>
              </AlertDialogClose>

              <AlertDialogClose>
                <Button color="success" size="sm">
                  Ok
                </Button>
              </AlertDialogClose>
            </AlertDialogActions>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialogRoot>
    </>
  );
};

export const VirtualElement = {
  render: VirtualElementTemplate,
};

const ProgrammaticallyTemplate = () => {
  const ref = React.useRef<AlertDialogRootMethods>(null);

  return (
    <>
      <AlertDialogRoot defaultOpen ref={ref}>
        <AlertDialogTrigger>
          <Button color="danger">delete account</Button>
        </AlertDialogTrigger>

        <AlertDialogPortal>
          <AlertDialogOverlay />

          <AlertDialogContent>
            <Button
              isIconOnly
              aria-label="close"
              size="sm"
              color="danger"
              variant="text"
              className="absolute right-2 top-2"
              onPress={() => ref.current?.close()}
            >
              <XIcon />
            </Button>

            <AlertDialogTitle>Are your sure...?</AlertDialogTitle>
            <AlertDialogDescription>
              this action can not be undone. it will delete account and all of
              your saved content.
            </AlertDialogDescription>
            <AlertDialogActions>
              <AlertDialogClose>
                <Button color="danger" size="sm">
                  Cancel
                </Button>
              </AlertDialogClose>

              <AlertDialogClose>
                <Button color="success" size="sm">
                  Ok
                </Button>
              </AlertDialogClose>
            </AlertDialogActions>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialogRoot>
    </>
  );
};

export const Programmatically = {
  render: ProgrammaticallyTemplate,
};
