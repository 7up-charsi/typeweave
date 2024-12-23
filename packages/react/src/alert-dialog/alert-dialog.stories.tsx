import React from 'react';
import {
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogRoot,
  AlertDialogRootMethods,
} from '.';
import { Button } from '../button';
import { Input } from '../input';

const meta = {
  title: 'Components/AlertDialog',
};

export default meta;

const Template = () => {
  const alertDialogRef = React.useRef<AlertDialogRootMethods>(null);

  return (
    <>
      <AlertDialogRoot ref={alertDialogRef}>
        <AlertDialogOverlay />

        <AlertDialogContent
          title="Delete item?"
          description="Are you sure you want to delete this item from this project?"
        >
          <Button
            variant="text"
            onClick={() => {
              alertDialogRef.current?.close();
            }}
          >
            close
          </Button>

          <Button
            color="danger"
            onClick={() => {
              alertDialogRef.current?.close();
            }}
          >
            ok
          </Button>
        </AlertDialogContent>
      </AlertDialogRoot>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.persist();

          alertDialogRef.current?.open();
        }}
      >
        <Input label="identifier" />

        <Button type="submit" color="danger" className="mt-3">
          Delete
        </Button>
      </form>
    </>
  );
};

export const Default = {
  render: Template,
};
