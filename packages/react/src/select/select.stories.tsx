import React from 'react';
import { select } from '@webbo-ui/theme';
import { Input } from '../input';
import { Checkbox } from '../checkbox';
import * as Dialog from '../dialog';
import { Select, mapInputProps } from './';
import { Button } from '../button';
import options from './options.json';

const meta = {
  title: 'Components/Select',
  args: {
    ...select.defaultVariants,
  },
  argTypes: {
    shadow: {
      control: { type: 'select' },
      options: Object.keys(select.variants.shadow),
    },
  },
};

export default meta;

const SingleTemplate = () => (
  <Select
    options={options}
    defaultValue={options[21]}
    getOptionLabel={(option) => option.title}
    renderInput={(props) => (
      <Input label="top 100 movies" {...mapInputProps(props)} />
    )}
  />
);

export const Single = {
  render: SingleTemplate,
};

const MultipleTemplate = () => (
  <Select
    multiple
    options={options}
    defaultValue={[options[21]]}
    getOptionLabel={(option) => option.title}
    renderInput={(props) => (
      <Input label="top 100 movies" {...mapInputProps(props)} />
    )}
  />
);

export const Multiple = {
  render: MultipleTemplate,
};

const CustomOptionTemplate = () => (
  <Select
    multiple
    options={options}
    defaultValue={[options[21]]}
    getOptionLabel={(option) => option.title}
    renderInput={(props) => (
      <Input label="top 100 movies" {...mapInputProps(props)} />
    )}
    renderOption={({ label, option, state }) => (
      <>
        <Checkbox
          checked={state.selected}
          readOnly
          classNames={{ base: 'mr-2' }}
          size="sm"
        />

        <span className="truncate">
          <span className="text-sm mr-1 font-semibold">{option.year}</span>
          {label}
        </span>
      </>
    )}
  />
);

export const CustomOption = {
  render: CustomOptionTemplate,
};

const GroupTemplate = () => (
  <Select
    options={options}
    defaultValue={options[21]}
    getOptionLabel={(option) => option.title}
    renderInput={(props) => (
      <Input label="top 100 movies" {...mapInputProps(props)} />
    )}
    groupBy={(option) => option.title[0]}
  />
);

export const Group = {
  render: GroupTemplate,
};

const LoadingTemplate = () => (
  <Select
    options={options}
    loading
    renderInput={(props) => (
      <Input label="top 100 movies" {...mapInputProps(props)} />
    )}
  />
);

export const Loading = {
  render: LoadingTemplate,
};

const InDialogTemplate = () => (
  <Dialog.Root defaultOpen>
    <Dialog.Trigger>
      <Button>open dialog</Button>
    </Dialog.Trigger>

    <Dialog.Portal>
      <Dialog.Overlay />

      <Dialog.Content className="max-w-xs">
        <Select
          options={options}
          defaultValue={options[21]}
          getOptionLabel={(option) => option.title}
          renderInput={(props) => (
            <Input
              label="top 100 movies"
              className="w-full"
              {...mapInputProps(props)}
            />
          )}
        />

        <div className="flex gap-2 justify-end mt-5">
          <Dialog.Close>
            <Button color="danger">Close</Button>
          </Dialog.Close>

          <Button>Agree</Button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export const InDialog = {
  render: InDialogTemplate,
};

const CustomTemplate = () => (
  <Dialog.Root defaultOpen>
    <Dialog.Trigger>
      <div className="border border-muted-6 rounded bg-white inline-flex items-center px-3 h-10 w-64">
        Select one movie
      </div>
    </Dialog.Trigger>

    <Dialog.Portal>
      <Dialog.Overlay />

      <Dialog.Content className="w-[calc(100%-16px)] max-w-xs p-0">
        <Select
          isOpen
          options={options}
          disablePopper
          disablePortal
          getOptionLabel={(option) => option.title}
          shadow="none"
          classNames={{ listbox: 'border-0' }}
          renderInput={(props) => (
            <Input
              {...mapInputProps(props, { disableOpenIndicator: true })}
              label="select one movie"
              hideLabel
              placeholder="select one movie"
              classNames={{
                base: 'w-full border-b border-b-muted-6',
                inputWrapper: 'focus-within:ring-0 border-0 hover:border-0',
                input: 'h-12',
              }}
            />
          )}
        />
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export const Custom = {
  render: CustomTemplate,
};
