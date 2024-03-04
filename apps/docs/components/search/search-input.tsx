'use client';

import { Button } from '@webbo-ui/button';
import { useState, useRef } from 'react';
import SearchIcon from '../../assets/icons/search-icon';
import CloseIcon from '../../assets/icons/close-icon';
import * as Dialog from '@webbo-ui/dialog';
import {
  UseSearchBoxProps,
  useInstantSearch,
  useSearchBox,
} from 'react-instantsearch';

export const SearchInput = (props: UseSearchBoxProps) => {
  const { query, refine } = useSearchBox(props);
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  const isSearchStalled = status === 'stalled';

  function setQuery(newQuery: string) {
    setInputValue(newQuery);

    refine(newQuery);
  }

  return (
    <div>
      <form
        className="w-full h-14 relative border-b border-muted-6 flex gap-1 items-center px-5 cursor-text"
        action=""
        role="search"
        noValidate
        onClick={() => inputRef.current?.focus()}
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();

          if (inputRef.current) {
            inputRef.current.blur();
          }
        }}
        onReset={(event) => {
          event.preventDefault();
          event.stopPropagation();

          setQuery('');

          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        <SearchIcon />

        <input
          ref={inputRef}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="Search for products"
          spellCheck={false}
          maxLength={512}
          type="text"
          value={inputValue}
          autoFocus
          onChange={(event) => {
            setQuery(event.currentTarget.value);
          }}
          className="h-full bg-transparent outline-none grow mx-3 text-muted-11"
        />

        {inputValue.length === 0 ||
          (!isSearchStalled && (
            <Button type="reset" isIconOnly size="sm" aria-label="clear input">
              <CloseIcon />
            </Button>
          ))}

        <Dialog.Close>
          <Button type="button" size="sm" color="danger" variant="text">
            Close
          </Button>
        </Dialog.Close>
      </form>
    </div>
  );
};
