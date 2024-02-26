import Link from 'next/link';
import { UseHitsProps, useHits } from 'react-instantsearch';

export const SearchResults = (props: UseHitsProps) => {
  const { hits } = useHits(props);

  return (
    <div className="overflow-auto">
      {hits.map((hit) => (
        <Link key={hit.objectID} href={hit.url as string}>
          <div>{hit.title as string}</div>
        </Link>
      ))}
    </div>
  );
};
