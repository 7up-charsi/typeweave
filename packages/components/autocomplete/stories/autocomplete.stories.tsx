import React from 'react';
import { Autocomplete, mapInputProps } from '../src';
import { select } from '@webbo-ui/theme';
import { Input } from '@webbo-ui/input';
import { Checkbox } from '@webbo-ui/checkbox';
import * as Dialog from '@webbo-ui/dialog';
import { Button } from '@webbo-ui/button';
import options from './options.json';

const meta = {
  title: 'Components/Autocomplete',
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
  <Autocomplete
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
  <Autocomplete
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

const NoOptionTemplate = () => (
  <Autocomplete
    options={[]}
    renderInput={(props) => (
      <Input label="top 100 movies" {...mapInputProps(props)} />
    )}
  />
);

export const NoOptions = {
  render: NoOptionTemplate,
};

const LoadingTemplate = () => (
  <Autocomplete
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

const CustomOptionTemplate = () => (
  <Autocomplete
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
  <Autocomplete
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

const InDialogTemplate = () => (
  <Dialog.Root>
    <Dialog.Trigger>
      <Button>open dialog</Button>
    </Dialog.Trigger>

    <Dialog.Portal>
      <Dialog.Overlay />

      <Dialog.Content className="max-w-xs overflow-auto">
        <Autocomplete
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

      <Dialog.Content className="w-[calc(100%-16px)] max-w-xs p-4">
        <Autocomplete
          isOpen
          options={options}
          disablePopper
          disablePortal
          getOptionLabel={(option) => option.title}
          shadow="none"
          renderInput={(props) => (
            <Input
              {...mapInputProps(props, {
                disableOpenIndicator: true,
              })}
              className="w-full mb-4"
              label="search"
              hideLabel
              placeholder="Search..."
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
