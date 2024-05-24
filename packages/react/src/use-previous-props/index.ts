import React from 'react';

const usePreviousProps = <T extends object>(value: T) => {
  const ref = React.useRef<T | object>({});

  React.useEffect(() => {
    ref.current = value;
  });

  return ref.current as Partial<T>;
};

export default usePreviousProps;
