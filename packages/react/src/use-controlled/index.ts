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
    default: defaultValueProp,
    name,
    state,
    onChange: onChangeProp,
  } = props;

  const isControlled = React.useRef(controlled !== undefined).current;
  const defaultValueRef = React.useRef(defaultValueProp);

  const [valueState, setValueState] = React.useState(defaultValueProp);

  const value = isControlled ? controlled : valueState;

  const onChange = useCallbackRef(onChangeProp);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
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
    }
  }, [controlled, isControlled, name, state]);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      if (!isControlled && defaultValueRef.current !== defaultValueProp) {
        console.error(
          [
            `Typeweave: A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. ` +
              `To suppress this warning opt to use a controlled ${name}.`,
          ].join('\n'),
        );
      }
    }
  }, [defaultValueProp, isControlled, name, state]);

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
