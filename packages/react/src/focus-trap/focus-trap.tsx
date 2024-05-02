import {
  focus,
  focusFirst,
  getTabbableEdges,
  getTabbables,
  removeLinks,
} from './utils';
import { Slot } from '../slot';
import React from 'react';
import { mergeRefs } from '@typeweave/react-utils';
import { useCallbackRef } from '../use-callback-ref';

export type FocusScope = { paused: boolean; pause(): void; resume(): void };

export interface FocusTrapProps extends React.HTMLAttributes<HTMLDivElement> {
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
  children?: React.ReactNode;
  /**
   * This prop is used to pass custom scope and is usefull when more than one FocusTrap components are visible
   * @default undefined
   */
  focusScope?: FocusScope;
  asChild?: boolean;
  onMountAutoFocus?: (event: Event) => void;
  onUnmountAutoFocus?: (event: Event) => void;
}

const displayName = 'FocusTrap';

const AUTOFOCUS_ON_MOUNT = 'focusTrap.autoFocusOnMount';
const AUTOFOCUS_ON_UNMOUNT = 'focusTrap.autoFocusOnUnmount';
const EVENT_OPTIONS = { bubbles: false, cancelable: true };

export const FocusTrap = React.forwardRef<HTMLDivElement, FocusTrapProps>(
  (props, ref) => {
    const {
      asChild,
      focusScope: focusScopeProp,
      loop = true,
      trapped = true,
      onMountAutoFocus: onMountAutoFocusProp,
      onUnmountAutoFocus: onUnmountAutoFocusProp,
      ...restProps
    } = props;

    const [container, setContainer] = React.useState<HTMLElement | null>(null);

    const onMountAutoFocus = useCallbackRef(onMountAutoFocusProp);
    const onUnmountAutoFocus = useCallbackRef(onUnmountAutoFocusProp);

    const lastFocusedElement = React.useRef<HTMLElement | null>(null);

    const _scope = React.useRef<FocusScope>({
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      },
    }).current;

    const focusScope = focusScopeProp || _scope;

    React.useEffect(() => {
      if (trapped) {
        const handleFocusIn = (event: FocusEvent) => {
          if (focusScope.paused || !container) return;

          const target = event.target as HTMLElement | null;

          if (container.contains(target)) {
            lastFocusedElement.current = target;
          } else {
            focus(lastFocusedElement.current, { select: true });
          }
        };

        const handleFocusOut = (event: FocusEvent) => {
          if (focusScope.paused || !container) return;

          const relatedTarget = event.relatedTarget as HTMLElement | null;

          if (relatedTarget === null) return;

          if (!container.contains(relatedTarget)) {
            focus(lastFocusedElement.current, { select: true });
          }
        };

        const handleMutations = (mutations: MutationRecord[]) => {
          const focusedElement = document.activeElement as HTMLElement | null;

          if (focusedElement !== document.body) return;

          for (const mutation of mutations) {
            if (mutation.removedNodes.length > 0) focus(container);
          }
        };

        document.addEventListener('focusin', handleFocusIn);
        document.addEventListener('focusout', handleFocusOut);

        const mutationObserver = new MutationObserver(handleMutations);

        if (container)
          mutationObserver.observe(container, {
            childList: true,
            subtree: true,
          });

        return () => {
          document.removeEventListener('focusin', handleFocusIn);
          document.removeEventListener('focusout', handleFocusOut);
          mutationObserver.disconnect();
        };
      }
    }, [trapped, container, focusScope.paused]);

    React.useEffect(() => {
      if (container) {
        focusScopesStack.add(focusScope);

        const previouslyFocusedElement =
          document.activeElement as HTMLElement | null;

        const hasFocusedCandidate = container.contains(
          previouslyFocusedElement,
        );

        if (!hasFocusedCandidate) {
          const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);

          container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);

          container.dispatchEvent(mountEvent);
          if (!mountEvent.defaultPrevented) {
            focusFirst(removeLinks(getTabbables(container)), {
              select: true,
            });
            if (document.activeElement === previouslyFocusedElement) {
              focus(container);
            }
          }
        }

        return () => {
          container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);

          const unmountEvent = new CustomEvent(
            AUTOFOCUS_ON_UNMOUNT,
            EVENT_OPTIONS,
          );
          container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);

          container.dispatchEvent(unmountEvent);
          if (!unmountEvent.defaultPrevented) {
            focus(previouslyFocusedElement ?? document.body, {
              select: true,
            });
          }

          container.removeEventListener(
            AUTOFOCUS_ON_UNMOUNT,
            onUnmountAutoFocus,
          );

          focusScopesStack.remove(focusScope);
        };
      }
    }, [container, onMountAutoFocus, onUnmountAutoFocus, focusScope]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        if (!loop && !trapped) return;
        if (focusScope.paused) return;

        const isTabKey =
          event.key === 'Tab' &&
          !event.altKey &&
          !event.ctrlKey &&
          !event.metaKey;
        const focusedElement = document.activeElement as HTMLElement | null;

        if (isTabKey && focusedElement) {
          const container = event.currentTarget as HTMLElement;
          const [first, last] = getTabbableEdges(container);
          const hasTabbableElementsInside = first && last;

          // we can only wrap focus if we have tabbable edges
          if (!hasTabbableElementsInside) {
            if (focusedElement === container) event.preventDefault();
          } else {
            if (!event.shiftKey && focusedElement === last) {
              event.preventDefault();
              if (loop) focus(first, { select: true });
            } else if (event.shiftKey && focusedElement === first) {
              event.preventDefault();
              if (loop) focus(last, { select: true });
            }
          }
        }
      },
      [loop, trapped, focusScope.paused],
    );

    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        {...restProps}
        tabIndex={-1}
        ref={mergeRefs(ref, setContainer)}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          restProps.onKeyDown?.(e);
          handleKeyDown(e);
        }}
        style={{ outline: 'none', ...restProps.style }}
      />
    );
  },
);

FocusTrap.displayName = displayName;

const focusScopesStack = createFocusScopesStack();

function createFocusScopesStack() {
  /** A stack of focus scopes, with the active one at the top */
  let stack: FocusScope[] = [];

  return {
    add(focusScope: FocusScope) {
      // pause the currently active focus scope (at the top of the stack)
      const activeFocusScope = stack[0];
      if (focusScope !== activeFocusScope) {
        activeFocusScope?.pause();
      }

      // remove in case it already exists (because we'll re-add it at the top of the stack)
      stack = stack.filter((ele) => ele !== focusScope);
      stack.unshift(focusScope);
    },

    remove(focusScope: FocusScope) {
      stack = stack.filter((ele) => ele !== focusScope);
      stack[0]?.resume();
    },
  };
}
