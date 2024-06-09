'use client';

import React from 'react';
import { Combobox, Input } from '@typeweave/react';
import topMovies from './options.json';

type ComboboxOption = { label: string; year: number };

export default function App() {
  const [value, setValue] = React.useState<ComboboxOption | null>(
    null,
  );
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div>
      <div className="mb-3">
        <div>value: "{value?.label}"</div>
        <div>inputValue: "{inputValue}"</div>
      </div>

      <Combobox
        editable
        value={value}
        onChange={(val) => setValue(val)}
        inputValue={inputValue}
        onInputChange={(val) => setInputValue(val)}
        options={topMovies}
        renderInput={(props) => (
          <Input label="top movies" {...props} />
        )}
      />
    </div>
  );
}
