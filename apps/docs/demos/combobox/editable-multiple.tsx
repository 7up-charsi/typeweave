'use client';

import { Combobox } from '@typeweave/react/combobox';
import { Input } from '@typeweave/react/input';
import topMovies from './options.json';

export default function App() {
  return (
    <Combobox
      multiple
      editable
      options={topMovies}
      renderInput={(props) => <Input label="top movies" {...props} />}
    />
  );
}
