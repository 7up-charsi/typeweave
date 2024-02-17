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
      <Button>Open alert dialog</Button>
    </AlertDialog.Trigger>

    <AlertDialog.Portal>
      <AlertDialog.Overlay />

      <AlertDialog.Content>
        <AlertDialog.Title>Lorem ipsum dolor, sit amet?</AlertDialog.Title>
        <AlertDialog.Description>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo
          quasi
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
