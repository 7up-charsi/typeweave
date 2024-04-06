import { focus, getTabbableEdges } from './utils';
import { Slot } from '@webbo-ui/slot';
import { CustomError } from '@webbo-ui/error';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { mergeRefs } from '@webbo-ui/react-utils';

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
  disabled?: boolean;
  /**
   * **This prop is for internal use.**
   *
   * This prop is used to pass custom scope and is usefull when more than one FocusTrap components are visible
   * @default undefined
   */
  focusScope?: FocusScope;
  asChild?: boolean;
}

const FocusTrap = forwardRef<HTMLDivElement, FocusTrapProps>((props, ref) => {
  const {
    asChild,
    disabled,
    focusScope: focusScopeProp,
    loop = true,
    trapped = true,
    ...restProps
  } = props;

  const [container, setContainer] = useState<HTMLElement | null>(null);

  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const _scope = useRef<FocusScope>({
    paused: false,
    pause() {
      this.paused = true;
    },
    resume() {
      this.paused = false;
    },
  }).current;

  const focusScope = focusScopeProp || _scope;

  useEffect(() => {
    if (disabled) return;
    if (!trapped) return;

    const handleFocusIn = (e: FocusEvent) => {
      if (focusScope.paused || !container) return;
      const target = e.target as HTMLElement | null;

      if (container.contains(target)) {
        lastFocusedElement.current = target;
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
    // back to the document?.body. In this case, we move focus to the container
    // to keep focus trapped correctly.
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
      mutationObserver.observe(container, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      mutationObserver.disconnect();
    };
  }, [container, disabled, focusScope.paused, trapped]);

  useEffect(() => {
    if (!container) return;
    if (disabled) return;

    const prevFocusedElement = document.activeElement as HTMLElement | null;

    focusScopesStack?.add(focusScope);

    if (container.contains(prevFocusedElement)) {
      lastFocusedElement.current = prevFocusedElement;
    } else {
      if (!('focus' in container))
        throw new CustomError(
          'FocusTrap',
          'container must be focusable, hint = set tabIndex to -1',
        );

      container.focus();
    }

    return () => {
      focusScopesStack?.remove(focusScope);

      if (prevFocusedElement) prevFocusedElement.focus?.();
      else document.body.focus();
    };
  }, [container, focusScope, disabled]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!loop) return;
    if (focusScope.paused) return;
    if (disabled) return;

    const isTab = e.key === 'Tab' && !e.altKey && !e.ctrlKey && !e.metaKey;
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
  };

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
});

FocusTrap.displayName = 'webbo-ui.FocusTrap';

export default FocusTrap;

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
