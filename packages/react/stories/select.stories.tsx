import React from 'react';
import { select } from '@typeweave/theme';
import {
  Input,
  Checkbox,
  Button,
  Select,
  selectInputAdapter,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTrigger,
} from '../src';
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
      <Input label="top 100 movies" {...selectInputAdapter(props)} />
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
      <Input label="top 100 movies" {...selectInputAdapter(props)} />
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
      <Input label="top 100 movies" {...selectInputAdapter(props)} />
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
      <Input label="top 100 movies" {...selectInputAdapter(props)} />
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
      <Input label="top 100 movies" {...selectInputAdapter(props)} />
    )}
  />
);

export const Loading = {
  render: LoadingTemplate,
};

const InDialogTemplate = () => (
  <DialogRoot defaultOpen>
    <DialogTrigger>
      <Button>open dialog</Button>
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay />

      <DialogContent className="max-w-xs">
        <Select
          options={options}
          defaultValue={options[21]}
          getOptionLabel={(option) => option.title}
          renderInput={(props) => (
            <Input
              label="top 100 movies"
              className="w-full"
              {...selectInputAdapter(props)}
            />
          )}
        />

        <div className="flex gap-2 justify-end mt-5">
          <DialogClose>
            <Button color="danger">Close</Button>
          </DialogClose>

          <Button>Agree</Button>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
);

export const InDialog = {
  render: InDialogTemplate,
};

const CustomTemplate = () => (
  <DialogRoot defaultOpen>
    <DialogTrigger>
      <div className="border border-muted-6 rounded bg-white inline-flex items-center px-3 h-10 w-64">
        Select one movie
      </div>
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay />

      <DialogContent className="w-[calc(100%-16px)] max-w-xs p-0">
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
              {...selectInputAdapter(props, { disableOpenIndicator: true })}
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
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
);

export const Custom = {
  render: CustomTemplate,
};
