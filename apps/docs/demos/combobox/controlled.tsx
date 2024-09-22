'use client';

import { Combobox } from '@typeweave/react/combobox';
import { Input } from '@typeweave/react/input';
import topMovies from './options.json';
import React from 'react';

type ComboboxOption = { label: string; year: number };

export default function App() {
  const [value, setValue] = React.useState<ComboboxOption | null>(
    null,
  );
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div>
      <div className="mb-3">
        <div>value: &quot;{value?.label}&quot;</div>
        <div>inputValue: &quot;{inputValue}</div>
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
