import React from 'react';
import { Button } from '../button';
import { Icon } from '../icon';
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
} from './';
import { Overlay } from '../overlay';

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
      <Overlay />

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
  const [virtualElement, setVirtualElement] =
    React.useState<HTMLElement | null>(null);

  return (
    <>
      <Button color="danger" ref={setVirtualElement}>
        delete account
      </Button>

      <AlertDialogRoot defaultOpen>
        <AlertDialogTrigger virtualElement={virtualElement} />

        <AlertDialogPortal>
          <Overlay />

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
  const [virtualElement, setVirtualElement] =
    React.useState<HTMLElement | null>(null);

  const ref = React.useRef<AlertDialogRootMethods>(null);

  return (
    <>
      <Button color="danger" ref={setVirtualElement}>
        delete account
      </Button>

      <AlertDialogRoot defaultOpen ref={ref}>
        <AlertDialogTrigger virtual virtualElement={virtualElement} />

        <AlertDialogPortal>
          <Overlay />

          <AlertDialogContent>
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
