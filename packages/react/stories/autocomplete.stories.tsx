import React from 'react';
import {
  Autocomplete,
  Input,
  Checkbox,
  Button,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from '../src';
import { select } from '@typeweave/theme';
import optionsJson from './options.json';
import { PointerEvents } from '../src/pointer-events/pointer-events';

const options = optionsJson.sort((a, b) => {
  if (a.title[0].toLowerCase() > b.title[0].toLowerCase()) return 1;
  if (a.title[0].toLowerCase() < b.title[0].toLowerCase()) return -1;
  return 0;
});

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
    renderInput={(props) => <Input label="top 100 movies" {...props} />}
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
    renderInput={(props) => <Input label="top 100 movies" {...props} />}
    openOnFocus
  />
);

export const Multiple = {
  render: MultipleTemplate,
};

const NoOptionTemplate = () => (
  <Autocomplete
    options={[]}
    renderInput={(props) => <Input label="top 100 movies" {...props} />}
  />
);

export const NoOptions = {
  render: NoOptionTemplate,
};

const LoadingTemplate = () => (
  <Autocomplete
    options={[]}
    loading
    renderInput={(props) => <Input label="top 100 movies" {...props} />}
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
    renderInput={(props) => <Input label="top 100 movies" {...props} />}
    classNames={{ option: 'flex' }}
    renderOption={({ key, onPress, ...props }, option, state) => (
      <PointerEvents key={key} onPress={onPress}>
        <li {...props}>
          <Checkbox
            checked={state.selected}
            readOnly
            classNames={{ base: 'mr-2' }}
            size="sm"
          />

          <span className="grow truncate">
            <span className="text-sm mr-1 font-semibold">{option.year}</span>
            {option.title}
          </span>
        </li>
      </PointerEvents>
    )}
  />
);

export const CustomOption = {
  render: CustomOptionTemplate,
};

const CustomOptionGroupedTemplate = () => (
  <Autocomplete
    multiple
    options={options}
    defaultValue={[options[21]]}
    getOptionLabel={(option) => option.title}
    renderInput={(props) => <Input label="top 100 movies" {...props} />}
    classNames={{ option: 'flex' }}
    groupBy={(option) => {
      const firstLetter = option.title[0];
      const isNumber = /[0-9]/.test(firstLetter);

      if (isNumber) return '0-9';
      return firstLetter;
    }}
    renderOption={({ key, onPress, ...props }, option, state) => (
      <PointerEvents key={key} onPress={onPress}>
        <li {...props}>
          <Checkbox
            checked={state.selected}
            readOnly
            classNames={{ base: 'mr-2' }}
            size="sm"
          />

          <span className="grow truncate">
            <span className="text-sm mr-1 font-semibold">{option.year}</span>
            {option.title}
          </span>
        </li>
      </PointerEvents>
    )}
  />
);

export const CustomOptionGrouped = {
  render: CustomOptionGroupedTemplate,
};

const GroupedTemplate = () => (
  <Autocomplete
    options={options}
    defaultValue={options[21]}
    getOptionLabel={(option) => option.title}
    renderInput={(props) => <Input label="top 100 movies" {...props} />}
    groupBy={(option) => {
      const firstLetter = option.title[0];
      const isNumber = /[0-9]/.test(firstLetter);

      if (isNumber) return '0-9';
      return firstLetter;
    }}
  />
);

export const Grouped = {
  render: GroupedTemplate,
};

const InDialogTemplate = () => (
  <DialogRoot defaultOpen>
    <DialogTrigger>
      <Button>open dialog</Button>
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay />

      <DialogContent className="max-w-xs">
        <DialogHeader>
          <DialogTitle>Movies</DialogTitle>
        </DialogHeader>

        <div className="p-4">
          <Autocomplete
            options={options}
            defaultValue={options[21]}
            getOptionLabel={(option) => option.title}
            renderInput={(props) => (
              <Input label="top 100 movies" className="w-full" {...props} />
            )}
          />

          <div className="flex gap-2 justify-end mt-5">
            <DialogClose>
              <Button color="danger">Close</Button>
            </DialogClose>

            <Button>Agree</Button>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
);

export const InDialog = {
  render: InDialogTemplate,
};
