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
      if (!trapped || !container) return;

      const handleFocusIn = (event: FocusEvent) => {
        if (focusScope.paused) return;

        const target = event.target as HTMLElement | null;

        if (container.contains(target)) {
          lastFocusedElement.current = target;
          return;
        }

        if (lastFocusedElement.current) {
          focus(lastFocusedElement.current, { select: true });
          return;
        }

        focus(container);
      };

      const handleFocusOut = (event: FocusEvent) => {
        const relatedTarget = event.relatedTarget as HTMLElement | null;

        // It checks if the related target is null. If it is, it means that focus is moving outside the browser window or to an element that is not part of the DOM (such as a native operating system window or an element in another window or frame). In this case, the function returns early as there's no need to handle focus changes.
        if (relatedTarget === null) return;

        // it will focus back to lastFocusedElement if user wants to place focus on element ousite container and it will ensure that the element on which user wants to place focus will never get focus becauze it will return foucs to lastFocusedElement before blur event happens on lastFocusedElement
        if (!container.contains(relatedTarget) && lastFocusedElement.current) {
          focus(lastFocusedElement.current);
        }

        // otherwise dont do any action. let focusin handle other cases
      };

      const handleMutations = (mutations: MutationRecord[]) => {
        const focusedElement = document.activeElement as HTMLElement | null;

        if (focusedElement !== document.body) return;

        mutations.forEach((mutation) => {
          if (mutation.removedNodes.length > 0 && lastFocusedElement.current) {
            const removedNodesArray = Array.from(mutation.removedNodes);

            // as i only want to focus container if lastFocusedElement gets removed from dom. if any element that did't get focus and removed from DOM i damn care.
            if (removedNodesArray.includes(lastFocusedElement.current)) {
              focus(container);
              return;
            }

            focus(lastFocusedElement.current);
          }
        });
      };

      document.addEventListener('focusin', handleFocusIn);
      document.addEventListener('focusout', handleFocusOut);

      const mutationObserver = new MutationObserver(handleMutations);

      mutationObserver.observe(container, {
        childList: true,
        subtree: true,
      });

      return () => {
        document.removeEventListener('focusin', handleFocusIn);
        document.removeEventListener('focusout', handleFocusOut);
        mutationObserver.disconnect();
      };
    }, [trapped, container, focusScope.paused]);

    React.useEffect(() => {
      if (container) {
        focusScopesStack.add(focusScope);

        const previouslyFocusedElement =
          document.activeElement as HTMLElement | null;

        if (!container.contains(previouslyFocusedElement)) {
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
        if (!loop) return;
        if (focusScope.paused) return;

        const isTabKey =
          event.key === 'Tab' &&
          !event.ctrlKey &&
          !event.altKey &&
          !event.metaKey;

        const focusedElement = document.activeElement as HTMLElement | null;

        if (isTabKey && focusedElement) {
          const container = event.currentTarget as HTMLElement;
          const [first, last] = getTabbableEdges(container);

          const hasFocusableElementsInside = first && last;

          if (!hasFocusableElementsInside) {
            event.preventDefault();
            return;
          }

          if (!event.shiftKey && focusedElement === last) {
            event.preventDefault();
            focus(first, { select: true });
            return;
          }

          if (event.shiftKey && focusedElement === first) {
            event.preventDefault();
            focus(last, { select: true });
          }
        }
      },
      [loop, focusScope.paused],
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
