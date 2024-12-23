import { createContextScope } from '../context';
import React from 'react';
import { MenuCollection, useMenuCollection, useMenuCtx } from './menu-root';
import { mergeRefs } from '@typeweave/react-utils/merge-refs';
import { useClickOutside } from '../use-click-outside';
import { useScrollLock } from '../use-scroll-lock';
import { MenuVariantProps, menuStyles } from './menu.styles';
import {
  autoUpdate,
  useFloating,
  offset as offsetMiddleware,
  flip as flipMiddleware,
  hide as hideMiddleware,
  arrow as arrowMiddleware,
  shift as shiftMiddleware,
  Placement,
  limitShift,
  Strategy,
} from '@floating-ui/react-dom';
import { FloatingArrowCtx } from '../floating-arrow';

export interface MenuContentProps
  extends MenuVariantProps,
    React.HTMLAttributes<HTMLUListElement> {
  /** distance between combobox and listbox
   * @default 5
   */
  offset?: number;
  /** padding used to prevent arrow to touch content edges. its usefull when content has rounded corners.
   * @default 10
   */
  arrowPadding?: number;
  /** @default bottom */
  placement?: Placement;
  /** @default absolute */
  strategy?: Strategy;
}

interface MenuContentCtx {
  focused: string;
  setFocused: React.Dispatch<React.SetStateAction<string>>;
}

const displayName = 'MenuContent';

const [MenuContentCtx, useMenuContentCtx] =
  createContextScope<MenuContentCtx>(displayName);

const [MenuStylesCtx, useMenuStyles] =
  createContextScope<ReturnType<typeof menuStyles>>(displayName);

export { useMenuContentCtx, useMenuStyles };

export const MenuContent = React.forwardRef<HTMLUListElement, MenuContentProps>(
  (props, ref) => {
    const {
      children,
      className,
      offset = 5,
      arrowPadding = 10,
      placement = 'bottom',
      strategy = 'absolute',
      ...restProps
    } = props;

    const [floatingArrow, setFloatingArrow] = React.useState<
      HTMLElement | SVGSVGElement | null
    >(null);

    const innerRef = React.useRef<HTMLUListElement>(null);

    const menuCtx = useMenuCtx(displayName);

    const floatingReturn = useFloating<HTMLButtonElement>({
      open: menuCtx.open,
      placement,
      elements: { reference: menuCtx.trigger },
      whileElementsMounted: autoUpdate,
      strategy,
      middleware: [
        offsetMiddleware({ mainAxis: offset }),
        flipMiddleware(),
        shiftMiddleware({ limiter: limitShift() }),
        arrowMiddleware({
          element: floatingArrow,
          padding: arrowPadding,
        }),
        hideMiddleware({ strategy: 'referenceHidden' }),
      ],
    });

    const [focused, setFocused] = React.useState('');

    const searchState = React.useRef<{
      timer?: ReturnType<typeof setTimeout>;
      chars: string;
    }>({ chars: '' }).current;

    const setOutsideEle = useClickOutside({
      callback: (e) => {
        if (e.target !== menuCtx.trigger) menuCtx.handleClose();
      },
    });

    useScrollLock({ isLocked: menuCtx.open });

    const getItems = useMenuCollection();

    React.useEffect(() => {
      if (!floatingReturn.isPositioned) return;

      innerRef.current?.focus();
    }, [floatingReturn.isPositioned]);

    const onkeydown = (e: React.KeyboardEvent) => {
      const key = e.key;

      const ArrowDown = key === 'ArrowDown';
      const ArrowUp = key === 'ArrowUp';

      const activeItems = getItems().filter((item) => {
        const element = item.ref.current!;

        return (
          !item.disabled &&
          !element.hidden &&
          getComputedStyle(element).display !== 'none'
        );
      });

      const elements = activeItems.map((item) => item.ref.current!);

      const currentIndex = activeItems.findIndex((ele) => ele.isFocused);

      // either no menuitem is focused or loop from end to first
      if (
        (currentIndex === -1 && ArrowDown) ||
        (currentIndex === elements.length - 1 && menuCtx.loop && ArrowDown)
      ) {
        const index = 0;
        elements[index]?.focus();

        if (activeItems[index]) setFocused(activeItems[index].id);

        return;
      }

      // loop from first to end when either no menuitem is focused or first is focused
      if (
        (currentIndex === 0 || currentIndex === -1) &&
        menuCtx.loop &&
        ArrowUp
      ) {
        const index = elements.length - 1;
        elements[index]?.focus();

        if (!activeItems[index]) return;

        setFocused(activeItems[index].id);

        return;
      }

      if (
        ArrowDown &&
        currentIndex >= 0 &&
        currentIndex < elements.length - 1
      ) {
        const index = currentIndex + 1;
        elements[index]?.focus();

        if (!activeItems[index]) return;

        setFocused(activeItems[index].id);

        return;
      }

      if (ArrowUp && currentIndex > 0 && currentIndex <= elements.length - 1) {
        const index = currentIndex - 1;
        elements[index]?.focus();

        if (!activeItems[index]) return;

        setFocused(activeItems[index].id);

        return;
      }
    };

    const handleCharSearch = (e: React.KeyboardEvent) => {
      const char = e.key;

      if (char.length !== 1 || e.repeat) return;

      const activeItems = getItems().filter((item) => {
        const element = item.ref.current!;

        return (
          !item.disabled &&
          !element.hidden &&
          getComputedStyle(element).display !== 'none'
        );
      });

      const elements = activeItems.map((item) => item.ref.current!);

      const currentIndex = activeItems.findIndex((ele) => ele.isFocused);

      if (!elements.length) return;

      clearTimeout(searchState.timer);

      searchState.timer = setTimeout(() => {
        searchState.chars = '';
      }, 500);

      searchState.chars += char;

      const startIndex =
        currentIndex || currentIndex === 0 ? currentIndex + 1 : 0;

      const orderedOptions = [
        ...activeItems.slice(startIndex),
        ...activeItems.slice(0, startIndex),
      ];

      const filter = searchState.chars.toLowerCase();

      const excatMatch = orderedOptions.find((ele) => {
        const span = ele.ref.current?.querySelectorAll('span')[1];

        if (span && span.firstChild?.nodeType === Node.TEXT_NODE)
          return span.firstChild.nodeValue?.toLowerCase().startsWith(filter);
        else return false;
      });

      if (excatMatch) {
        setFocused(excatMatch.id);
        return;
      }

      const sameLetters = filter
        .split('')
        .every((letter) => letter.toLowerCase() === filter[0]);

      if (sameLetters) {
        const matched = orderedOptions.find((ele) => {
          const span = ele.ref.current?.querySelectorAll('span')[1];

          if (span && span.firstChild?.nodeType === Node.TEXT_NODE)
            return span.firstChild.nodeValue?.toLowerCase().startsWith(filter);
          else return false;
        });

        if (matched) setFocused(matched.id);
      }
    };

    const styles = React.useMemo(() => menuStyles(), []);

    const arrowData = floatingReturn.middlewareData.arrow;

    const floatingArrowProps = {
      x: arrowData?.x,
      y: arrowData?.y,
      centerOffset: arrowData?.centerOffset,
      alignmentOffset: arrowData?.alignmentOffset,
      placement,
      setFloatingArrow,
    };

    return (
      <MenuContentCtx setFocused={setFocused} focused={focused}>
        <MenuCollection.Parent>
          <ul
            {...restProps}
            id={menuCtx.id}
            role="menu"
            data-hide={!!floatingReturn.middlewareData.hide?.referenceHidden}
            style={{
              ...restProps.style,
              ...floatingReturn.floatingStyles,
            }}
            ref={mergeRefs(
              setOutsideEle,
              ref,
              innerRef,
              floatingReturn.refs.setFloating,
            )}
            className={styles.content({ className })}
            tabIndex={-1}
            onKeyDown={(e) => {
              onkeydown(e);
              handleCharSearch(e);
            }}
          >
            <MenuStylesCtx {...styles}>
              <FloatingArrowCtx {...floatingArrowProps}>
                {children}
              </FloatingArrowCtx>
            </MenuStylesCtx>
          </ul>
        </MenuCollection.Parent>
      </MenuContentCtx>
    );
  },
);

MenuContent.displayName = displayName;
