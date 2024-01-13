import { useCallbackRef } from "@gist-ui/use-callback-ref";
import { FocusTrapScope, FocusTrapScopeContext } from "./scope-provider";
import { focus, focusFirst, getTabbableEdges, getTabbables, removeLinks } from "./utils";
import { Slot } from "@gist-ui/slot";
import { mergeRefs } from "@gist-ui/react-utils";
import {
  ForwardedRef,
  KeyboardEvent,
  ReactNode,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export interface FocusTrapProps {
  /**
   * When this prop is true, focus with **keyboard** will loop,
   *
   * *loop* mean with last element is focused and you press Tab then first tabbable element will be focused and when first element is focused and you press Tab + Shift then last tabbable element will be focused
   * @default true
   */
  loop?: boolean;
  /**
   * When this prop is true, focus cannot go outside with **keyboard**
   * @default true
   */
  trapped?: boolean;
  /**
   * This callback executes on mount and by default on mount first tabbable element focused, if you want to prevent this behaviour then call event.preventDefault()
   * @default undefined
   * @example
   *
   * ```js
   * import { FocusTrap } from '@gist-ui/focus-trap'
   *
   * <FocusTrap
   *   onMountAutoFocus={(event) => {
   *     event.preventDefault();
   *   }}
   * >
   *   // other stuff
   * </FocusTrap>
   * ```
   */
  onMountAutoFocus?: (event: Event) => void;
  /**
   * This callback executes on unmount and by default on unmount focus returns to trigger, if you want to prevent this behaviour then call event.preventDefault()
   * @default undefined
   * @example
   *
   * ```js
   * import { FocusTrap } from '@gist-ui/focus-trap'
   *
   * <FocusTrap
   *   onUnmountAutoFocus={(event) => {
   *     event.preventDefault();
   *   }}
   * >
   *   // other stuff
   * </FocusTrap>
   * ```
   */
  onUnmountAutoFocus?: (event: Event) => void;
  children?: ReactNode;
  asChild?: boolean;
  /**
   * **This prop is for internal use.**
   *
   * This prop is used to pass custom scope and is usefull when more than one FocusTrap components are visible
   * @default undefined
   */
  scope?: FocusTrapScope;
  disabled?: boolean;
}

const AUTOFOCUS_ON_MOUNT = "focusTrapScope.autoFocusOnMount";
const AUTOFOCUS_ON_UNMOUNT = "focusTrapScope.autoFocusOnUnmount";
const EVENT_OPTIONS = { bubbles: false, cancelable: true };

const FocusTrap = forwardRef<HTMLDivElement, FocusTrapProps>((props, ref) => {
  const {
    loop = true,
    trapped = true,
    onMountAutoFocus: onMountAutoFocusProp,
    onUnmountAutoFocus: onUnmountAutoFocusProp,
    asChild,
    children,
    scope,
    disabled,
  } = props;

  const Component = asChild ? Slot : "div";

  const [container, setContainer] = useState<HTMLElement | null>(null);
  const onMountAutoFocus = useCallbackRef(onMountAutoFocusProp);
  const onUnmountAutoFocus = useCallbackRef(onUnmountAutoFocusProp);

  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const focusScopeContext = useContext(FocusTrapScopeContext);

  const _scope = useRef<FocusTrapScope>({
    paused: false,
    pause() {
      this.paused = true;
    },
    resume() {
      this.paused = false;
    },
  }).current;

  const focusScope = scope || _scope;

  useEffect(() => {
    if (disabled) return;
    if (!trapped) return;

    const handleFocusIn = (e: FocusEvent) => {
      if (focusScope.paused || !container) return;
      const target = e.target as HTMLElement | null;
      if (container.contains(target)) {
        lastFocusedElement.current = target;
      } else {
        focus(lastFocusedElement.current, { select: true });
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      if (focusScope.paused || !container) return;
      const relatedTarget = e.relatedTarget as HTMLElement | null;

      // if relatedTarget is null
      // its mean either browser loosed focus or user clicked at non-focusable element
      // in both cases we dont need to do any action
      if (relatedTarget === null) return;

      // if relatedTarget is not null its mean another element got focus and we need to check
      // if container does not contain it then return focus back to lastFocusedELement in container
      if (!container.contains(relatedTarget)) {
        focus(lastFocusedElement.current, { select: true });
      }
    };

    // When the focused element gets removed from the DOM, browsers move focus
    // back to the document.body. In this case, we move focus to the container
    // to keep focus trapped correctly.
    const handleMutations = (mutations: MutationRecord[]) => {
      const focusedElement = document.activeElement as HTMLElement | null;
      if (focusedElement !== document.body) return;

      for (const mutation of mutations) {
        if (mutation.removedNodes.length > 0) focus(container);
      }
    };

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);

    const mutationObserver = new MutationObserver(handleMutations);
    if (container) mutationObserver.observe(container, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
      mutationObserver.disconnect();
    };
  }, [container, disabled, focusScope.paused, trapped]);

  useEffect(() => {
    if (!container) return;

    focusScopeContext?.add(focusScope);

    const prevFocusedElement = document.activeElement as HTMLElement | null;
    const hasFocusedElement = container.contains(prevFocusedElement);

    if (!hasFocusedElement) {
      const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
      container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
      container.dispatchEvent(mountEvent);
      if (!mountEvent.defaultPrevented) {
        focusFirst(removeLinks(getTabbables(container)), { select: true });
      }
      if (prevFocusedElement === document.activeElement) focus(container);
    }

    return () => {
      container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);

      const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
      container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
      container.dispatchEvent(unmountEvent);
      if (!unmountEvent.defaultPrevented) {
        focus(prevFocusedElement ?? document.body, { select: true });
      }

      container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);

      focusScopeContext?.remove(focusScope);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container, focusScope, onMountAutoFocus, onUnmountAutoFocus]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (!loop) return;
      if (focusScope.paused) return;
      if (disabled) return;

      const isTab = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey;
      const focusedElement = document.activeElement as HTMLElement | null;

      if (isTab && focusedElement) {
        const container = e.currentTarget as HTMLElement;
        const [first, last] = getTabbableEdges(container);

        if (!(first && last)) {
          if (focusedElement === container) e.preventDefault();
        } else {
          if (e.shiftKey && focusedElement === first) {
            if (loop) {
              e.preventDefault();

              focus(last, { select: true });
            }
          }
          if (!e.shiftKey && focusedElement === last) {
            if (loop) {
              e.preventDefault();
              focus(first, { select: true });
            }
          }
        }
      }
    },
    [disabled, focusScope.paused, loop],
  );

  return (
    <Component
      tabIndex={-1}
      ref={mergeRefs(ref, setContainer as ForwardedRef<HTMLDivElement>)}
      onKeyDown={handleKeyDown}
      style={{ outline: "none" }}
    >
      {children}
    </Component>
  );
});

FocusTrap.displayName = "gist-ui.FocusTrap";

export default FocusTrap;
