import React from 'react';

const useIsDisabled = <E extends HTMLElement>() => {
  const [element, setElement] = React.useState<E | null>(null);
  const [isDisabled, setIsDisabled] = React.useState(false);

  React.useEffect(() => {
    if (!element) return;

    if (element.hasAttribute('disabled')) setIsDisabled(true);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if ((mutation.target as unknown as { disabled?: boolean }).disabled) {
          setIsDisabled(true);
        } else {
          setIsDisabled(false);
        }
      }
    });

    observer.observe(element, { attributeFilter: ['disabled'] });

    return () => {
      observer.disconnect();
    };
  }, [element]);

  return { setElement, isDisabled };
};

export type UseIsDisabledReturn = ReturnType<typeof useIsDisabled>;

export { useIsDisabled };
