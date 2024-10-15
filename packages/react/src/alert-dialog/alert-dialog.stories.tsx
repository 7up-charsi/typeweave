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

const FormTemplate = () => {
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
        <Input label="Full name" />

        <Button type="submit" className="mt-3">
          submit
        </Button>
      </form>
    </>
  );
};

export const Form = {
  render: FormTemplate,
};

const ProgrammaticallyTemplate = () => {
  const ref = React.useRef<AlertDialogRootMethods>(null);

  return (
    <>
      <Button
        onClick={() => {
          ref.current?.open();
        }}
      >
        submit
      </Button>

      <AlertDialogRoot ref={ref}>
        <AlertDialogOverlay />

        <AlertDialogContent
          title="Delete item?"
          description="Are you sure you want to delete this item from this project?"
        >
          <Button variant="text">close</Button>

          <Button color="danger">ok</Button>
        </AlertDialogContent>
      </AlertDialogRoot>
    </>
  );
};

export const Programmatically = {
  render: ProgrammaticallyTemplate,
};
