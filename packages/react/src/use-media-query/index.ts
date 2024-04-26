import React from 'react';

const useMediaQuery = (query: string) => {
  const [match, setMatch] = React.useState(
    globalThis?.matchMedia?.(query).matches,
  );

  React.useLayoutEffect(() => {
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
