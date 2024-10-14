import { focus, focusFirst, getTabbables, isHidden } from './utils';
import { Slot } from '../slot';
import React from 'react';
import { mergeRefs } from '@typeweave/react-utils/merge-refs';
import { useCallbackRef } from '../use-callback-ref';
import { StackItem, createStackManager } from '../stack-manager';

export interface FocusTrapProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * This prop is used when `trapped` is true. When this prop is true, focus with keyboard will loop.
   *
   * @default true
   */
  loop?: boolean;
  /**
   * When this prop is true, focus cannot go outside with **keyboard**
   * @default true
   */
  trapped?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  asChild?: boolean;
  onMountAutoFocus?: (event: Event) => void;
  onUnmountAutoFocus?: (event: Event) => void;
}

const displayName = 'FocusTrap';

const focusStack = createStackManager();

const AUTOFOCUS_ON_MOUNT = 'focusTrap.autoFocusOnMount';
const AUTOFOCUS_ON_UNMOUNT = 'focusTrap.autoFocusOnUnmount';
const EVENT_OPTIONS = { bubbles: false, cancelable: true };

export const FocusTrap = React.forwardRef<HTMLDivElement, FocusTrapProps>(
  (props, ref) => {
    const {
      asChild,
      loop = true,
      trapped = true,
      disabled,
      onMountAutoFocus: onMountAutoFocusProp,
      onUnmountAutoFocus: onUnmountAutoFocusProp,
      ...restProps
    } = props;

    const [container, setContainer] = React.useState<HTMLElement | null>(null);

    const isDisabledRef = React.useRef(disabled);

    const onMountAutoFocus = useCallbackRef(onMountAutoFocusProp);
    const onUnmountAutoFocus = useCallbackRef(onUnmountAutoFocusProp);

    const lastFocusedElementRef = React.useRef<HTMLElement | null>(null);

    const stackItem = React.useRef<StackItem>({
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      },
    }).current;

    React.useEffect(() => {
      isDisabledRef.current = disabled;
    }, [disabled]);

    React.useEffect(() => {
      if (container) {
        focusStack.add(stackItem);

        const previouslyFocusedElement =
          document.activeElement as HTMLElement | null;

        if (!container.contains(previouslyFocusedElement)) {
          container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);

          const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
          container.dispatchEvent(mountEvent);

          if (!mountEvent.defaultPrevented) {
            // no need isHidden because focusFirst move focus to first element and if first element is not focusable (invisible or disply none) it will try next tabbable
            focusFirst(getTabbables(container), {
              select: true,
            });

            if (document.activeElement === previouslyFocusedElement) {
              focus(container);
            }
          }
        }

        return () => {
          container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);

          container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);

          const unmountEvent = new CustomEvent(
            AUTOFOCUS_ON_UNMOUNT,
            EVENT_OPTIONS,
          );

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

          focusStack.remove(stackItem);
        };
      }
    }, [container, onMountAutoFocus, onUnmountAutoFocus, stackItem]);

    React.useEffect(() => {
      if (!trapped || !container) return;

      /*
        Focus Event Sequence Explanation
        ================================

        Scenario 1: No Element Focused

        When no element has focus and an element gains focus:
        1. Focus Handler: Triggered on the focused element.
        2. Focus-In: Triggered on the document.

        Scenario 2: Element Already Focused

        When an element is already focused and another element gains focus:
        1. Blur Handler: Triggered on the currently focused element.
        2. Focus-Out: Triggered on the document.
        3. Focus Handler: Triggered on the newly focused element.
        4. Focus-In: Triggered on the document.
      */

      const handleFocusIn = (event: FocusEvent) => {
        if (isDisabledRef.current) return;

        if (stackItem.paused) return;

        const target = event.target as HTMLElement | null;

        if (container.contains(target)) {
          lastFocusedElementRef.current = target;
          return;
        }

        // at this place, i dont force container to get focus, because my goal is to trap focus once focus gets in container
      };

      const handleFocusOut = (event: FocusEvent) => {
        if (isDisabledRef.current) return;

        if (stackItem.paused) return;

        const relatedTarget = event.relatedTarget as HTMLElement | null;

        // No handling needed when focus moves outside the browser window; browser remembers which element was focused before moving focus outside and browser does default behavior on refocus.
        if (relatedTarget === null) return;

        // it will focus back to lastFocusedElementRef if user wants to place focus on element ousitde container, this happens before next element gains focus (see above info note)
        if (!container.contains(relatedTarget)) {
          if (lastFocusedElementRef.current) {
            focus(lastFocusedElementRef.current);
          } else {
            focus(container);
          }
          return;
        }

        // at this place, container contains new focused element, let handleFocusIn to save the new focused element in lastFocusedElementRef ref
      };

      const handleMutations = (mutations: MutationRecord[]) => {
        if (stackItem.paused) return;

        const focusedElement = document.activeElement as HTMLElement | null;

        if (focusedElement !== document.body) return;

        mutations.forEach((mutation) => {
          if (
            mutation.removedNodes.length > 0 &&
            lastFocusedElementRef.current
          ) {
            const removedNodesArray = Array.from(mutation.removedNodes);

            // as i only want to focus container if lastFocusedElementRef gets removed from dom. if any else element gets removed from DOM i damn care.
            if (removedNodesArray.includes(lastFocusedElementRef.current)) {
              focus(container);
              return;
            }
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
    }, [trapped, container, stackItem.paused]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        if (disabled) return;

        if (stackItem.paused) return;
        if (!(loop && trapped)) return;

        const container = event.currentTarget as HTMLElement;

        const isTabKey =
          event.key === 'Tab' &&
          !event.ctrlKey &&
          !event.altKey &&
          !event.metaKey;

        const focusedElement = document.activeElement as HTMLElement | null;

        if (!isTabKey || !focusedElement || !container.contains(focusedElement))
          return;

        const tabbables = getTabbables(container);

        const first = tabbables.at(0);
        const last = tabbables.at(-1);

        // if container does not have more than one focusable elements, prevent default and exit
        if (tabbables.length <= 1 || !first || !last) {
          event.preventDefault();
          return;
        }

        if (!event.shiftKey && focusedElement === last && !isHidden(first)) {
          event.preventDefault();
          focus(first, { select: true });
          return;
        }

        if (event.shiftKey && focusedElement === first && !isHidden(last)) {
          event.preventDefault();
          focus(last, { select: true });
        }
      },
      [loop, trapped, disabled, stackItem.paused],
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
        style={{ ...restProps.style }}
      />
    );
  },
);

FocusTrap.displayName = displayName;
