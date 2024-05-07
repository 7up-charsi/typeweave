import React from 'react';
import { XIcon } from 'lucide-react';
import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogRoot,
  DialogRootMethods,
  DialogTitle,
  DialogTrigger,
  DialogPortal,
  DialogHeader,
} from '../src';

const meta = {
  title: 'Components/Dialog',
};

export default meta;

const Template = (args) => {
  return (
    <DialogRoot defaultOpen={args.defaultOpen} keepMounted={args.keepMounted}>
      <DialogTrigger>
        <Button>open dialog</Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay />

        <DialogContent className={args.className}>
          <DialogHeader>
            <DialogTitle>SVG Vector</DialogTitle>

            <DialogDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </DialogDescription>
          </DialogHeader>

          <div className="p-4">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Exercitationem delectus omnis magnam odit iste, expedita laborum
              enim debitis, officia molestiae labore? Iure nesciunt quos magnam
              quo distinctio ducimus nihil itaque? Exercitationem delectus omnis
              magnam odit iste, expedita laborum enim debitis, officia molestiae
              labore? Iure nesciunt quos magnam quo distinctio ducimus nihil
              itaque?
            </p>

            <div className="mt-5 flex gap-2">
              <div className="grow">{args.children}</div>

              <DialogClose>
                <Button variant="text" color="danger">
                  Close
                </Button>
              </DialogClose>

              <Button color="success">GREAT</Button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};

const DialogTemplate = (args) => {
  return (
    <>
      <Template {...args} />

      {Array.from({ length: 10 }).map((_, i) => (
        <p className="m-3" key={i}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quam
          fuga voluptatem fugiat? Ullam voluptate saepe illo quidem excepturi
          recusandae perspiciatis nemo cumque incidunt deleniti corrupti quam
          similique beatae unde doloremque quod id aut, pariatur blanditiis iste
          repellendus a ea? Repellat quod quo unde ipsam atque molestiae,
          voluptas accusamus ex sit sapiente placeat. Iusto quasi sunt ad autem
          quos laborum facilis illum obcaecati reiciendis tempora quidem vitae
          at voluptatibus, recusandae dicta necessitatibus itaque rerum.
          Possimus et officiis similique enim cumque ex a voluptas ipsam? Minus
          vel quaerat, sequi labore at necessitatibus suscipit eum ducimus error
          eaque explicabo qui iure ipsa magnam facilis illum libero rem non
          pariatur? Perferendis ducimus ipsum dolor inventore
        </p>
      ))}
    </>
  );
};

export const Default = {
  render: DialogTemplate,
  args: {
    defaultOpen: true,
    keepMounted: false,
  },
};

const NestedTemplate = (args) => {
  return (
    <>
      <Template {...args}>
        <Template className="max-w-xs" />
      </Template>

      {Array.from({ length: 10 }).map((_, i) => (
        <p className="m-3" key={i}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quam
          fuga voluptatem fugiat? Ullam voluptate saepe illo quidem excepturi
          recusandae perspiciatis nemo cumque incidunt deleniti corrupti quam
          similique beatae unde doloremque quod id aut, pariatur blanditiis iste
          repellendus a ea? Repellat quod quo unde ipsam atque molestiae,
          voluptas accusamus ex sit sapiente placeat. Iusto quasi sunt ad autem
          quos laborum facilis illum obcaecati reiciendis tempora quidem vitae
          at voluptatibus, recusandae dicta necessitatibus itaque rerum.
          Possimus et officiis similique enim cumque ex a voluptas ipsam? Minus
          vel quaerat, sequi labore at necessitatibus suscipit eum ducimus error
          eaque explicabo qui iure ipsa magnam facilis illum libero rem non
          pariatur? Perferendis ducimus ipsum dolor inventore
        </p>
      ))}
    </>
  );
};

export const Nested = {
  render: NestedTemplate,
  args: {
    defaultOpen: true,
    keepMounted: false,
  },
};

const VirtualElementTemplate = () => {
  const [virtualElement, setVirtualElement] =
    React.useState<HTMLButtonElement | null>(null);

  return (
    <>
      <Button ref={setVirtualElement}>open dialog</Button>

      <DialogRoot defaultOpen>
        <DialogTrigger virtual virtualElement={virtualElement} />

        <DialogPortal>
          <DialogOverlay />

          <DialogContent>
            <DialogHeader>
              <DialogTitle>SVG Vector</DialogTitle>

              <DialogDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing.
              </DialogDescription>
            </DialogHeader>

            <div className="p-4">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Exercitationem delectus omnis magnam odit iste, expedita laborum
                enim debitis, officia molestiae labore? Iure nesciunt quos
                magnam quo distinctio ducimus nihil itaque? Exercitationem
                delectus omnis magnam odit iste, expedita laborum enim debitis,
                officia molestiae labore? Iure nesciunt quos magnam quo
                distinctio ducimus nihil itaque?
              </p>

              <div className="mt-5 flex gap-2 justify-end">
                <DialogClose>
                  <Button variant="text" color="danger">
                    Close
                  </Button>
                </DialogClose>

                <Button color="success">GREAT</Button>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </>
  );
};

export const VirtualElement = {
  render: VirtualElementTemplate,
};

const ProgrammaticallyTemplate = () => {
  const [virtualElement, setVirtualElement] =
    React.useState<HTMLButtonElement | null>(null);

  const ref = React.useRef<DialogRootMethods>(null);

  return (
    <>
      <Button ref={setVirtualElement}>open dialog</Button>

      <DialogRoot ref={ref} defaultOpen>
        <DialogTrigger virtual virtualElement={virtualElement} />

        <DialogPortal>
          <DialogOverlay />

          <DialogContent>
            <DialogHeader>
              <div className="flex gap-3 items-center">
                <DialogTitle>SVG Vector</DialogTitle>
                <Button
                  isIconOnly
                  aria-label="close"
                  size="sm"
                  color="danger"
                  className="w-5 h-5 absolute right-2 top-2"
                  classNames={{ content: 'text-xs' }}
                  onPress={ref.current?.onClose}
                >
                  <XIcon />
                </Button>
              </div>

              <DialogDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing.
              </DialogDescription>
            </DialogHeader>

            <div className="p-4">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Exercitationem delectus omnis magnam odit iste, expedita laborum
                enim debitis, officia molestiae labore? Iure nesciunt quos
                magnam quo distinctio ducimus nihil itaque? Exercitationem
                delectus omnis magnam odit iste, expedita laborum enim debitis,
                officia molestiae labore? Iure nesciunt quos magnam quo
                distinctio ducimus nihil itaque?
              </p>

              <div className="mt-5 flex gap-2 justify-end">
                <DialogClose>
                  <Button variant="text" color="danger">
                    Close
                  </Button>
                </DialogClose>

                <Button color="success">GREAT</Button>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </>
  );
};

export const Programmatically = {
  render: ProgrammaticallyTemplate,
};
