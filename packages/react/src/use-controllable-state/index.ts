import { useCallbackRef } from '../use-callback-ref';
import React from 'react';

export interface UseControllableStateProps<T, P> {
  /**
   * If value is defined then this hook will behave as controlled
   */
  value?: T;
  defaultValue?: T | (() => T);
  onChange?: (value: T, payload?: P) => void;
}

const useControllableState = <T, P = unknown>(
  props: UseControllableStateProps<T, P> = {},
) => {
  const { value: valueProp, defaultValue, onChange: onChangeProp } = props;

  const [state, setState] = React.useState(defaultValue);
  const onChange = useCallbackRef(onChangeProp);

  const controlled = valueProp !== undefined;
  const value = controlled ? valueProp : state;

  const previouslyControlled = React.useRef(controlled);

  React.useEffect(() => {
    if (previouslyControlled.current === controlled) return;

    previouslyControlled.current = controlled;
    setState(defaultValue);

    //
  }, [controlled, defaultValue]);

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
