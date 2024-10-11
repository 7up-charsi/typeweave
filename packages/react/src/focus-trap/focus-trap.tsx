import { focus, focusFirst, getTabbables, isHidden } from './utils';
import { Slot } from '../slot';
import React from 'react';
import { mergeRefs } from '@typeweave/react-utils/merge-refs';
import { useCallbackRef } from '../use-callback-ref';
import { StackItem, createStackManager } from '../stack-manager';

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
      onMountAutoFocus: onMountAutoFocusProp,
      onUnmountAutoFocus: onUnmountAutoFocusProp,
      ...restProps
    } = props;

    const [container, setContainer] = React.useState<HTMLElement | null>(null);

    const onMountAutoFocus = useCallbackRef(onMountAutoFocusProp);
    const onUnmountAutoFocus = useCallbackRef(onUnmountAutoFocusProp);

    const lastFocusedElement = React.useRef<HTMLElement | null>(null);

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
      if (container) {
        focusStack.add(stackItem);

        const previouslyFocusedElement =
          document.activeElement as HTMLElement | null;

        if (!container.contains(previouslyFocusedElement)) {
          container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);

          const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
          container.dispatchEvent(mountEvent);

          if (!mountEvent.defaultPrevented) {
            // no need isHidden because focusFirst move focus to first element and if first element is not focusable (not visible, disply none) it will try next tabbable
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

      const handleFocusIn = (event: FocusEvent) => {
        if (stackItem.paused) return;

        const target = event.target as HTMLElement | null;

        if (container.contains(target)) {
          lastFocusedElement.current = target;
          return;
        }

        focus(lastFocusedElement.current, { select: true });
      };

      const handleFocusOut = (event: FocusEvent) => {
        if (stackItem.paused) return;

        const relatedTarget = event.relatedTarget as HTMLElement | null;

        // No handling needed when focus moves outside the browser window; browser remembers which element was focused before moving outside and browser does default behavior on refocus.
        if (relatedTarget === null) return;

        // it will focus back to lastFocusedElement if user wants to place focus on element ousitde container and it will ensure that the element on which user wants to place focus will never get focus becauze it will return foucs to lastFocusedElement before blur event happens on lastFocusedElement
        if (!container.contains(relatedTarget)) {
          focus(lastFocusedElement.current);
        }

        // otherwise dont do any action. let focusin handle other cases
      };

      const handleMutations = (mutations: MutationRecord[]) => {
        if (stackItem.paused) return;

        const focusedElement = document.activeElement as HTMLElement | null;

        if (focusedElement !== document.body) return;

        mutations.forEach((mutation) => {
          if (mutation.removedNodes.length > 0 && lastFocusedElement.current) {
            const removedNodesArray = Array.from(mutation.removedNodes);

            // as i only want to focus container if lastFocusedElement gets removed from dom. if any else element gets removed from DOM i damn care.
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
    }, [trapped, container, stackItem.paused]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        const container = event.currentTarget as HTMLElement;

        if (!loop || stackItem.paused) return;

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
      [loop, stackItem.paused],
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
