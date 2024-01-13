import { MutableRefObject, useEffect } from "react";
import { useCallbackRef } from "@gist-ui/use-callback-ref";

export interface UseClickOutsideProps<R> {
  callback?: () => void;
  isDisabled?: boolean;
  ref?: MutableRefObject<R | undefined | null>;
}

const useClickOutside = <R extends HTMLElement>(props: UseClickOutsideProps<R>) => {
  const { ref, callback, isDisabled } = props;

  const callbackRef = useCallbackRef(callback);

  useEffect(() => {
    const el = ref?.current;

    if (!el || isDisabled) return;

    const handler = (e: PointerEvent) => {
      if (!el.contains(e.target as Node)) {
        callbackRef();
      }
    };

    document.addEventListener("pointerup", handler, true);

    return () => {
      document.removeEventListener("pointerup", handler, true);
    };
  }, [callbackRef, isDisabled, ref]);
};

export type UseClickOutsideReturn = ReturnType<typeof useClickOutside>;

export { useClickOutside };
