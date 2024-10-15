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
} from '@floating-ui/react-dom';

export interface MenuContentProps
  extends MenuVariantProps,
    React.HTMLAttributes<HTMLUListElement> {
  disablePoper?: boolean;
  /** distance between combobox and listbox
   * @default 5
   */
  offset?: number;
}

interface MenuContentCtx {
  focused: string;
  setFocused: React.Dispatch<React.SetStateAction<string>>;
}

const displayName = 'MenuContent';

const [MenuContentCtx, useMenuContentCtx] =
  createContextScope<MenuContentCtx>(displayName);

const [MenuStyles, useMenuStyles] =
  createContextScope<ReturnType<typeof menuStyles>>(displayName);

export { useMenuContentCtx, useMenuStyles };

export const MenuContent = React.forwardRef<HTMLUListElement, MenuContentProps>(
  (props, ref) => {
    const {
      children,
      className,
      disablePoper,
      offset = 5,
      shadow = true,
      ...restProps
    } = props;

    const innerRef = React.useRef<HTMLUListElement>(null);

    const menuCtx = useMenuCtx(displayName);

    const floatingReturn = useFloating<HTMLButtonElement>({
      open: menuCtx.open,
      elements: { reference: menuCtx.trigger },
      whileElementsMounted: autoUpdate,
      middleware: [
        offsetMiddleware({ mainAxis: offset }),
        flipMiddleware(),
        hideMiddleware({ strategy: 'referenceHidden' }),
      ],
    });

    const [focused, setFocused] = React.useState('');

    const [mounted, setMounted] = React.useState(false);

    const searchState = React.useRef<{
      timer?: ReturnType<typeof setTimeout>;
      chars: string;
    }>({ chars: '' }).current;

    const setOutsideEle = useClickOutside({
      disabled: !mounted,
      callback: (e) => {
        if (e.target !== menuCtx.trigger) menuCtx.handleClose();
      },
    });

    useScrollLock({ isLocked: menuCtx.open });

    const getItems = useMenuCollection();

    React.useEffect(() => {
      innerRef.current?.focus();
      setMounted(true);
    }, []);

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

    const styles = React.useMemo(() => menuStyles({ shadow }), [shadow]);

    const content = (
      <ul
        {...restProps}
        id={menuCtx.id}
        role="menu"
        data-hide={!!floatingReturn.middlewareData.hide?.referenceHidden}
        style={{ ...restProps.style, ...floatingReturn.floatingStyles }}
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
        <MenuStyles {...styles}>{children}</MenuStyles>
      </ul>
    );

    return (
      <MenuContentCtx setFocused={setFocused} focused={focused}>
        <MenuCollection.Parent>
          {disablePoper ? content : content}
        </MenuCollection.Parent>
      </MenuContentCtx>
    );
  },
);

MenuContent.displayName = displayName;
