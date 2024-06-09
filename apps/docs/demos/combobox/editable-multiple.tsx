'use client';

import { Combobox, Input } from '@typeweave/react';
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
