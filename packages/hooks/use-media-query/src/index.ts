import { useLayoutEffect, useState } from 'react';

const useMediaQuery = (query: string) => {
  const [match, setMatch] = useState(globalThis?.matchMedia?.(query).matches);

  useLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);

    const handleChange = () => {
      setMatch(matchMedia.matches);
    };

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [query]);

  return match;
};

export type UseMediaQueryReturn = ReturnType<typeof useMediaQuery>;

export { useMediaQuery };
