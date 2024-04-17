import React from 'react';
import { alertDialog } from '@webbo-ui/theme';
import { Button } from '@webbo-ui/button';
import * as AlertDialog from '../src';
import { Icon } from '@webbo-ui/icon';

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
            <Button color="danger" size="sm">
              Cancel
            </Button>
          </AlertDialog.Close>

          <AlertDialog.Close>
            <Button color="success" size="sm">
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

const VirtualElementTemplate = () => {
  const [virtualElement, setVirtualElement] =
    React.useState<HTMLElement | null>(null);

  return (
    <>
      <Button color="danger" ref={setVirtualElement}>
        delete account
      </Button>

      <AlertDialog.Root defaultOpen>
        <AlertDialog.Trigger virtualElement={virtualElement} />

        <AlertDialog.Portal>
          <AlertDialog.Overlay />

          <AlertDialog.Content>
            <AlertDialog.Title>Are your sure...?</AlertDialog.Title>
            <AlertDialog.Description>
              this action can not be undone. it will delete account and all of
              your saved content.
            </AlertDialog.Description>
            <AlertDialog.Actions>
              <AlertDialog.Close>
                <Button color="danger" size="sm">
                  Cancel
                </Button>
              </AlertDialog.Close>

              <AlertDialog.Close>
                <Button color="success" size="sm">
                  Ok
                </Button>
              </AlertDialog.Close>
            </AlertDialog.Actions>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
};

export const VirtualElement = {
  render: VirtualElementTemplate,
};

const ProgrammaticallyTemplate = () => {
  const [virtualElement, setVirtualElement] =
    React.useState<HTMLElement | null>(null);

  const ref = React.useRef<AlertDialog.RootMethods>(null);

  return (
    <>
      <Button color="danger" ref={setVirtualElement}>
        delete account
      </Button>

      <AlertDialog.Root defaultOpen ref={ref}>
        <AlertDialog.Trigger virtual virtualElement={virtualElement} />

        <AlertDialog.Portal>
          <AlertDialog.Overlay />

          <AlertDialog.Content>
            <Button
              isIconOnly
              aria-label="close"
              size="sm"
              color="danger"
              variant="text"
              className="w-5 h-5 absolute right-2 top-2"
              classNames={{ content: 'text-xs' }}
              onPress={ref.current?.onClose}
            >
              <Icon>
                <svg fill="none" viewBox="0 0 24 24">
                  <g>
                    <g>
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-9-9m0 0L3 3m9 9l9-9m-9 9l-9 9"
                      ></path>
                    </g>
                  </g>
                </svg>
              </Icon>
            </Button>

            <AlertDialog.Title>Are your sure...?</AlertDialog.Title>
            <AlertDialog.Description>
              this action can not be undone. it will delete account and all of
              your saved content.
            </AlertDialog.Description>
            <AlertDialog.Actions>
              <AlertDialog.Close>
                <Button color="danger" size="sm">
                  Cancel
                </Button>
              </AlertDialog.Close>

              <AlertDialog.Close>
                <Button color="success" size="sm">
                  Ok
                </Button>
              </AlertDialog.Close>
            </AlertDialog.Actions>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
};

export const Programmatically = {
  render: ProgrammaticallyTemplate,
};
