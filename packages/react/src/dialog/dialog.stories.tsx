import React from 'react';
import { XIcon } from 'lucide-react';
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogRoot,
  DialogRootMethods,
  DialogTrigger,
  DialogPortal,
} from './';
import { Button } from '../button';

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

        <DialogContent
          className={args.className}
          aria-label="title"
          aria-describedby="desc"
        >
          <div id="title">SVG Vector</div>

          <div id="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </div>

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

const ProgrammaticallyTemplate = () => {
  const ref = React.useRef<DialogRootMethods>(null);

  return (
    <>
      <DialogRoot ref={ref} defaultOpen>
        <DialogTrigger>
          <Button>open dialog</Button>
        </DialogTrigger>

        <DialogPortal>
          <DialogOverlay />

          <DialogContent aria-labelledby="title" aria-describedby="desc">
            <div className="flex gap-3 items-center">
              <div id="title">SVG Vector</div>

              <Button
                isIconOnly
                aria-label="close"
                size="sm"
                color="danger"
                className="w-5 h-5 absolute right-2 top-2"
                classNames={{ content: 'text-xs' }}
                onPress={ref.current?.close}
              >
                <XIcon />
              </Button>
            </div>

            <div id="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </div>

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
