import React from 'react';
import optionsJson from './options.json';
import { Combobox } from './';
import { Input } from '../input';

const options = optionsJson.sort((a, b) => {
  if (a.title[0].toLowerCase() > b.title[0].toLowerCase()) return 1;
  if (a.title[0].toLowerCase() < b.title[0].toLowerCase()) return -1;
  return 0;
});

const meta = {
  title: 'Components/Combobox',
};

export default meta;

const SingleTemplate = () => {
  return (
    <Combobox
      options={options}
      defaultValue={options[21]}
      getOptionLabel={(option) => option.title}
      renderInput={(props) => <Input label="top 100 movies" {...props} />}
    />
  );
};

export const Single = {
  render: SingleTemplate,
};

const MultipleTemplate = () => (
  <Combobox
    multiple
    options={options}
    defaultValue={[options[21]]}
    getOptionLabel={(option) => option.title}
    renderInput={(props) => <Input label="top 100 movies" {...props} />}
  />
);

export const Multiple = {
  render: MultipleTemplate,
};

const SingleEditableTemplate = () => (
  <Combobox
    editable
    options={options}
    defaultValue={options[21]}
    getOptionLabel={(option) => option.title}
    renderInput={(props) => <Input label="top 100 movies" {...props} />}
  />
);

export const SingleEditable = {
  render: SingleEditableTemplate,
};

const MultipleEditableTemplate = () => (
  <Combobox
    editable
    multiple
    options={options}
    defaultValue={[options[21]]}
    getOptionLabel={(option) => option.title}
    renderInput={(props) => <Input label="top 100 movies" {...props} />}
  />
);

export const MultipleEditable = {
  render: MultipleEditableTemplate,
};
