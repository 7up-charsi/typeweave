'use client';

import algoliasearch from 'algoliasearch/lite';
import * as Dialog from '@webbo-ui/dialog';
import { InstantSearch } from 'react-instantsearch';
import SearchInput from './SearchInput';
import SearchIcon from '../../assets/icons/search-icon';
import SearchResults from './SearchResults';

const searchClient = algoliasearch(
  'FQ038NK883',
  '190ce1541940bd897b8a1d6eb41d87cb',
);

const Search = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="search-box">
      <Dialog.Root>
        <Dialog.Trigger>
          <div
            className="mr-5 w-52 h-9 ring-1 ring-muted-7 dark:ring-mutedDark-7 hover:ring-muted-8 dark:hover:ring-mutedDark-8 px-2 rounded flex items-center cursor-pointer transition-colors group select-none"
            tabIndex={0}
            aria-label="press to open command palette for docs search"
          >
            <span className="text-sm text-muted-11 dark:text-mutedDark-11 tracking-wide">
              Search docs
            </span>
            <div className="grow"></div>

            <SearchIcon />
          </div>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content className="max-w-2xl max-h-[calc(100dvh-160px)] top-20 translate-y-0 p-0 overflow-auto">
            <SearchInput />
            <SearchResults />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </InstantSearch>
  );
};

export default Search;
