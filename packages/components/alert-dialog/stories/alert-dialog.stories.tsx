import React from 'react';
import { alertDialog } from '@webbo-ui/theme';
import { Button } from '@webbo-ui/button';
import * as AlertDialog from '../src';

const meta = {
  title: 'Components/AlertDialog',
  args: alertDialog.defaultVariants,
};

export default meta;

const Template = () => (
  <AlertDialog.Root defaultOpen>
    <AlertDialog.Trigger>
      <Button color="danger">delete account</Button>
    </AlertDialog.Trigger>

    <AlertDialog.Portal>
      <AlertDialog.Overlay />

      <AlertDialog.Content>
        <AlertDialog.Title>Are your sure...?</AlertDialog.Title>
        <AlertDialog.Description>
          this action can not be undone. it will delete account and all of your
          saved content.
        </AlertDialog.Description>
        <AlertDialog.Actions>
          <AlertDialog.Close>
            <Button variant="text" color="danger">
              Cancel
            </Button>
          </AlertDialog.Close>

          <AlertDialog.Close>
            <Button variant="text" color="success">
              Ok
            </Button>
          </AlertDialog.Close>
        </AlertDialog.Actions>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export const Default = {
  render: Template,
};
