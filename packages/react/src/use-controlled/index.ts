import React from 'react';
import { useCallbackRef } from '../use-callback-ref';

export interface UseControlledProps<T> {
  controlled: T | undefined;
  default: T;
  name: string;
  state: string;
  onChange?: (newValue: T) => void;
}

/*
I migrated from Radix's useControllableState to MUI's useControlled in order to assume manual control over the onChange event handling, which better suits my specific requirements.

Transitioned Date = 22/05/2024

https://github.com/mui/material-ui/blob/next/packages/mui-utils/src/useControlled/useControlled.js
*/

export const useControlled = <T>(props: UseControlledProps<T>) => {
  const {
    controlled,
    default: defaultProp,
    name,
    state,
    onChange: onChangeProp,
  } = props;

  const isControlled = React.useRef(controlled !== undefined).current;
  const defaultValue = React.useRef(defaultProp).current;

  const [valueState, setValueState] = React.useState(defaultProp);

  const value = isControlled ? controlled : valueState;

  const onChange = useCallbackRef(onChangeProp);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (isControlled !== (controlled !== undefined)) {
        console.error(
          [
            `Typeweave: A component is changing the ${
              isControlled ? '' : 'un'
            }controlled ${state} state of ${name} to be ${isControlled ? 'un' : ''}controlled.`,
            'Elements should not switch from uncontrolled to controlled (or vice versa).',
            `Decide between using a controlled or uncontrolled ${name} ` +
              'element for the lifetime of the component.',
            "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.",
            'More info: https://fb.me/react-controlled-components',
          ].join('\n'),
        );
      }
    }, [controlled, isControlled, name, state]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (!isControlled && defaultValue !== defaultProp) {
        console.error(
          [
            `Typeweave: A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. ` +
              `To suppress this warning opt to use a controlled ${name}.`,
          ].join('\n'),
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultProp, isControlled, name, state, JSON.stringify(defaultValue)]);
  }

  const setValue = useCallbackRef((newValue: React.SetStateAction<T>) => {
    const setter = newValue as (prev: T | undefined) => T;

    const val = typeof newValue === 'function' ? setter(value) : newValue;

    if (!isControlled) {
      setValueState(val);
    }

    onChange?.(val);
  });

  return [value, setValue] as [T, typeof setValue];
};
