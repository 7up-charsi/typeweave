import React from 'react';
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
} from '../src';
import { XIcon } from 'lucide-react';

const meta = {
  title: 'Components/Dialog',
};

export default meta;

const Template = (args) => {
  return (
    <DialogRoot defaultOpen={args.defaultOpen} keepMounted={args.keepMounted}>
      <DialogTrigger>
        <Button>{args.trigger}</Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay />

        <DialogContent className={args.className}>
          <DialogTitle>SVG Vector</DialogTitle>

          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
            ducimus atque aut amet odio ex at rem alias nemo recusandae Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Quidem ducimus
            atque aut amet odio ex at rem alias nemo recusandae Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quidem ducimus atque
            aut amet odio ex at rem alias nemo recusandae
          </DialogDescription>

          <div className="my-4 flex justify-center">{args.svg}</div>

          <div className="pt-1 flex gap-2">
            <div className="grow">{args.children}</div>

            <DialogClose>
              <Button variant="text" color="danger">
                Close
              </Button>
            </DialogClose>

            <Button color="success">GREAT</Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};

const DialogTemplate = (args) => {
  return (
    <>
      <Template {...args} trigger="Check plane" />

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
      <Template {...args} trigger="open dialog">
        <Template trigger="open nested dialog" className="max-w-sm" />
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
            <DialogTitle>SVG Vector</DialogTitle>

            <DialogDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
              aperiam tenetur numquam sunt, tempore, enim assumenda rem facere
              nesciunt sit, voluptate optio voluptatum vero impedit. Doloremque,
              velit? Enim error voluptas ullam voluptates esse excepturi
              molestias dicta beatae, sed delectus nemo sequi in, minus
              laboriosam expedita, magni asperiores vel. Culpa quia earum iste
              cum ducimus. Minima deserunt debitis dolore ab quo tempore omnis?
              Sapiente quos eos maiores veritatis mollitia officia nobis
              eligendi harum, ipsum vitae. Odit soluta vel delectus magnam ea
              sit quidem vero libero necessitatibus dolores, consequuntur
              voluptate. Quibusdam, magni voluptatibus necessitatibus debitis
              quo natus delectus ut explicabo. Quis, illum.
            </DialogDescription>

            <div className="pt-1 flex gap-2">
              <div className="grow" />

              <DialogClose>
                <Button variant="text" color="danger">
                  Close
                </Button>
              </DialogClose>

              <Button color="success">GREAT</Button>
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
              <XIcon />
            </Button>

            <DialogTitle>SVG Vector</DialogTitle>

            <DialogDescription>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Repudiandae quam voluptas, aliquam repellat sed vel odio,
              similique eos nemo nobis deserunt totam facere placeat eligendi
              inventore, nesciunt impedit vero suscipit doloribus debitis beatae
              molestias. Ad voluptate vel pariatur error quia. Reiciendis,
              nesciunt at? Vel corporis neque asperiores quos impedit expedita,
              minima explicabo vero facilis numquam reprehenderit sit laudantium
              quis qui excepturi autem laborum, facere non, aspernatur in
              voluptatem quam nesciunt eos. Quo nisi officiis consectetur saepe
              harum nam voluptatibus et tenetur, deserunt illo cumque placeat
              quas quis fugit? Magnam ea praesentium a assumenda dicta earum
              eius tempora laborum. Illum, in.
            </DialogDescription>

            <div className="pt-1 flex gap-2">
              <div className="grow" />

              <DialogClose>
                <Button variant="text" color="danger">
                  Close
                </Button>
              </DialogClose>

              <Button color="success">GREAT</Button>
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
