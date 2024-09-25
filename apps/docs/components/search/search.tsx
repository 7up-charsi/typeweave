'use client';

import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTrigger,
} from '@typeweave/react/dialog';
import { InstantSearch } from 'react-instantsearch';
import { SearchResults } from './search-results';
import algoliasearch from 'algoliasearch/lite';
import { SearchInput } from './search-input';
import { SearchIcon } from 'lucide-react';

const searchClient = algoliasearch(
  'FQ038NK883',
  '190ce1541940bd897b8a1d6eb41d87cb',
);

export const Search = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="search-box">
      <DialogRoot>
        <DialogTrigger>
          <div
            className="group mr-5 flex h-9 w-52 cursor-pointer select-none items-center rounded px-2 ring-1 ring-muted-7 transition-colors hover:ring-muted-8"
            tabIndex={0}
            aria-label="press to open command palette for docs search"
          >
            <span className="text-sm tracking-wide text-muted-11">
              Search docs
            </span>
            <div className="grow"></div>

            <SearchIcon />
          </div>
        </DialogTrigger>

        <DialogPortal>
          <DialogOverlay />

          <DialogContent className="top-20 max-h-[calc(100dvh-160px)] max-w-2xl translate-y-0 overflow-auto p-0">
            <SearchInput />
            <SearchResults />
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </InstantSearch>
  );
};
