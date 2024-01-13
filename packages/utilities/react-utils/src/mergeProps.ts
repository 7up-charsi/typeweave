import clsx from "clsx";

interface Props {
  [key: string]: unknown;
}

export const mergeProps = <T extends Props>(...props: T[]) => {
  const result: Props = { ...props[0] };

  props.slice(1).forEach((obj) => {
    Object.entries(obj).forEach(([key, newValue]) => {
      const presentValue = result[key];

      // chain events
      if (
        typeof presentValue === "function" &&
        typeof newValue === "function" &&
        key[0] === "o" &&
        key[1] === "n" &&
        key.charCodeAt(2) >= 65 &&
        key.charCodeAt(2) <= 90
      ) {
        result[key] = (...args: unknown[]) => {
          presentValue(...args);
          newValue(...args);
        };
      }
      //   Merge classnames
      else if (
        (key === "className" || key === "UNSAFE_className") &&
        typeof presentValue === "string" &&
        typeof newValue === "string"
      ) {
        result[key] = clsx(presentValue, newValue);
      }
      //   override others
      else {
        result[key] = newValue !== undefined ? newValue : presentValue;
      }
    });
  });

  return result;
};