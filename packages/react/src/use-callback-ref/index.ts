import React from 'react';

type Callback = (...args: never[]) => unknown;

const useCallbackRef = <T extends Callback>(callback: T | undefined) => {
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  });

  return React.useRef(
    (...args: Parameters<T>) =>
      callbackRef.current?.(...(args as never[])) as ReturnType<T>,
  ).current;
};

export type UseCallbackRefReturn = ReturnType<typeof useCallbackRef>;

export { useCallbackRef };
