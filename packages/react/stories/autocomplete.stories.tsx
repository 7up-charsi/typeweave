import React from 'react';
import {
  Autocomplete,
  autocompleteInputAdapter,
  Input,
  Checkbox,
  Button,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTrigger,
} from '../src';
import { select } from '@ux-weaver/theme';
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
      <Input label="top 100 movies" {...autocompleteInputAdapter(props)} />
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
      <Input label="top 100 movies" {...autocompleteInputAdapter(props)} />
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
      <Input label="top 100 movies" {...autocompleteInputAdapter(props)} />
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
      <Input label="top 100 movies" {...autocompleteInputAdapter(props)} />
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
      <Input label="top 100 movies" {...autocompleteInputAdapter(props)} />
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
      <Input label="top 100 movies" {...autocompleteInputAdapter(props)} />
    )}
    groupBy={(option) => option.title[0]}
  />
);

export const Group = {
  render: GroupTemplate,
};

const InDialogTemplate = () => (
  <DialogRoot>
    <DialogTrigger>
      <Button>open dialog</Button>
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay />

      <DialogContent className="max-w-xs overflow-auto">
        <Autocomplete
          options={options}
          defaultValue={options[21]}
          getOptionLabel={(option) => option.title}
          renderInput={(props) => (
            <Input
              label="top 100 movies"
              className="w-full"
              {...autocompleteInputAdapter(props)}
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

      <DialogContent className="w-[calc(100%-16px)] max-w-xs p-4">
        <Autocomplete
          isOpen
          options={options}
          disablePopper
          disablePortal
          getOptionLabel={(option) => option.title}
          shadow="none"
          renderInput={(props) => (
            <Input
              {...autocompleteInputAdapter(props, {
                disableOpenIndicator: true,
              })}
              className="w-full mb-4"
              label="search"
              hideLabel
              placeholder="Search..."
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
