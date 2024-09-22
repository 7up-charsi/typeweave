'use client';

import { Combobox } from '@typeweave/react/combobox';
import { Input } from '@typeweave/react/input';
import topMovies from './options.json';

export default function App() {
  return (
    <Combobox
      multiple
      options={topMovies.sort((a, b) =>
        a.label[0].localeCompare(b.label[0]),
      )}
      renderInput={(props) => <Input label="top movies" {...props} />}
      groupBy={(option) => {
        const firstLetter = option.label[0];
        const isNumber = /[0-9]/.test(firstLetter);

        if (isNumber) return '0-9';
        return firstLetter;
      }}
    />
  );
}
