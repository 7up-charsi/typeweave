import { useCallbackRef } from '@gist-ui/use-callback-ref';
import { useEffect, useRef, useState } from 'react';

export interface UseControllableStateProps<T, P> {
  /**
   * If value is defined then this hook will behave as controlled
   */
  value?: T;
  defaultValue?: T;
  onChange?: (value: T, payload?: P) => void;
  resetStateValue?: T;
}

const useControllableState = <T, P = unknown>(
  props: UseControllableStateProps<T, P> = {},
) => {
  const {
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
    resetStateValue,
  } = props;

  const [state, setState] = useState(defaultValue);
  const onChange = useCallbackRef(onChangeProp);

  const controlled = valueProp !== undefined;
  const value = controlled ? valueProp : state;

  const previouslyControlled = useRef(controlled);

  useEffect(() => {
    if (previouslyControlled.current === controlled) return;

    previouslyControlled.current = controlled;
    setState(resetStateValue ?? defaultValue);

    //
  }, [controlled, defaultValue, resetStateValue]);

  const setValue = useCallbackRef(
    (next: React.SetStateAction<T>, payload?: P) => {
      const setter = next as (prevState?: T) => T;
      const nextValue = typeof next === 'function' ? setter(value) : next;

      if (!controlled) setState(nextValue);

      onChange(nextValue, payload);
    },
  );

  return [value, setValue] as [T, typeof setValue];
};

export type UseControllableStateReturn<T, P = unknown> = ReturnType<
  typeof useControllableState<T, P>
>;

export { useControllableState };
