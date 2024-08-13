import React from 'react';
import { useCallbackRef } from '../use-callback-ref';

export interface ScrollEvent {
  scrollY: number;
  scrollX: number;
  deltaY: number;
  deltaX: number;
  dirY: number;
  dirX: number;
}

export interface UseScrollProps {
  defaultScrollable?: 'root' | 'body';
  onScrollY?: (event: ScrollEvent) => void;
  onScrollX?: (event: ScrollEvent) => void;
  onScrollUp?: (event: ScrollEvent) => void;
  onScrollDown?: (event: ScrollEvent) => void;
  onScrollLeft?: (event: ScrollEvent) => void;
  onScrollRight?: (event: ScrollEvent) => void;
  onYDirectionChange?: (event: ScrollEvent) => void;
  onXDirectionChange?: (event: ScrollEvent) => void;
}

/**
 * 0 = default
 * 1 = down / right
 * -1 = up / left
 */
type ScrollDirection = 0 | 1 | -1;

interface State {
  scrollY: number;
  scrollX: number;
  deltaY: number;
  deltaX: number;
  dirY: number;
  dirX: number;
  totalScrollY: number;
  totalScrollX: number;
  scrollYProgress: number;
  scrollXProgress: number;
  isAtTop: boolean | null;
  isAtBottom: boolean | null;
  isAtLeft: boolean | null;
  isAtRight: boolean | null;
}

export const useScroll = <E extends HTMLElement>(
  props: UseScrollProps = {},
) => {
  const {
    defaultScrollable = 'root',
    onScrollY: onScrollYProp,
    onScrollX: onScrollXProp,
    onScrollUp: onScrollUpProp,
    onScrollDown: onScrollDownProp,
    onScrollLeft: onScrollLeftProp,
    onScrollRight: onScrollRightProp,
    onYDirectionChange: onYDirectionChangeProp,
    onXDirectionChange: onXDirectionChangeProp,
  } = props;

  const onScrollY = useCallbackRef(onScrollYProp);
  const onScrollX = useCallbackRef(onScrollXProp);
  const onScrollUp = useCallbackRef(onScrollUpProp);
  const onScrollDown = useCallbackRef(onScrollDownProp);
  const onScrollLeft = useCallbackRef(onScrollLeftProp);
  const onScrollRight = useCallbackRef(onScrollRightProp);
  const onYDirectionChange = useCallbackRef(onYDirectionChangeProp);
  const onXDirectionChange = useCallbackRef(onXDirectionChangeProp);

  const [state, setState] = React.useState<State>({
    scrollY: 0,
    scrollX: 0,
    deltaY: 0,
    deltaX: 0,
    dirY: 0,
    dirX: 0,
    totalScrollY: 0,
    totalScrollX: 0,
    scrollYProgress: 0,
    scrollXProgress: 0,
    isAtTop: null,
    isAtBottom: null,
    isAtLeft: null,
    isAtRight: null,
  });

  const elementRef = React.useRef<E>(null);

  const flags = React.useRef<{
    lastScrollY: number;
    lastScrollX: number;
    lastScrollDirY: ScrollDirection;
    lastScrollDirX: ScrollDirection;
    deltaY: number;
    deltaX: number;
  }>({
    lastScrollY: 0,
    lastScrollX: 0,
    lastScrollDirY: 0,
    lastScrollDirX: 0,
    deltaY: 0,
    deltaX: 0,
  }).current;

  React.useEffect(() => {
    const handleScroll = () => {
      const element =
        elementRef.current ??
        (defaultScrollable === 'root'
          ? document.documentElement
          : document.body);

      const currentScrollY = element.scrollTop;
      const currentScrollX = element.scrollLeft;

      const newScrollDirY =
        currentScrollY === flags.lastScrollY
          ? flags.lastScrollDirY
          : currentScrollY > flags.lastScrollY
            ? 1
            : -1;

      const newScrollDirX =
        currentScrollX === flags.lastScrollX
          ? flags.lastScrollDirX
          : currentScrollX > flags.lastScrollX
            ? 1
            : -1;

      const scrollEvent: ScrollEvent = {
        deltaX: flags.deltaX,
        deltaY: flags.deltaY,
        dirX: newScrollDirX,
        dirY: newScrollDirY,
        scrollX: currentScrollX,
        scrollY: currentScrollY,
      };

      if (flags.lastScrollDirY === 1 && newScrollDirY === -1) {
        flags.deltaY = 0;
      } else if (flags.lastScrollDirY === -1 && newScrollDirY === 1) {
        flags.deltaY = 0;
      }

      flags.deltaY += Math.abs(currentScrollY - flags.lastScrollY);

      if (newScrollDirY === -1 && currentScrollY !== flags.lastScrollY) {
        onScrollUp({ ...scrollEvent, deltaY: flags.deltaY });
      } else if (newScrollDirY === 1 && currentScrollY !== flags.lastScrollY) {
        onScrollDown({ ...scrollEvent, deltaY: flags.deltaY });
      }

      if (flags.lastScrollDirX === 1 && newScrollDirX === -1) {
        flags.deltaX = 0;
      } else if (flags.lastScrollDirX === -1 && newScrollDirX === 1) {
        flags.deltaX = 0;
      }

      flags.deltaX += Math.abs(currentScrollX - flags.lastScrollX);

      if (newScrollDirX === -1 && currentScrollX !== flags.lastScrollX) {
        onScrollLeft({ ...scrollEvent, deltaX: flags.deltaX });
      } else if (newScrollDirX === 1 && currentScrollX !== flags.lastScrollX) {
        onScrollRight({ ...scrollEvent, deltaX: flags.deltaX });
      }

      if (newScrollDirY !== flags.lastScrollDirY)
        onYDirectionChange?.(scrollEvent);

      if (newScrollDirX !== flags.lastScrollDirX)
        onXDirectionChange?.(scrollEvent);

      if (
        currentScrollY !== flags.lastScrollY &&
        currentScrollX === flags.lastScrollX
      )
        onScrollY?.(scrollEvent);

      if (
        currentScrollX !== flags.lastScrollX &&
        currentScrollY === flags.lastScrollY
      )
        onScrollX?.(scrollEvent);

      const scrollableAreaY = element.scrollHeight - element.clientHeight;
      const scrollableAreaX = element.scrollWidth - element.clientWidth;

      const isScrollableY = element.scrollHeight > element.clientHeight;
      const isScrollableX = element.scrollWidth > element.clientWidth;

      const isScrolledY = currentScrollY !== 0;
      const isScrolledX = currentScrollX !== 0;

      setState({
        scrollY: currentScrollY,
        scrollX: currentScrollX,
        deltaY: flags.deltaY,
        deltaX: flags.deltaX,
        dirY: isScrollableY ? (isScrolledY ? newScrollDirY : 1) : 0,
        dirX: isScrollableX ? (isScrolledX ? newScrollDirX : 1) : 0,
        totalScrollY: isScrollableY ? scrollableAreaY : 0,
        totalScrollX: isScrollableX ? scrollableAreaX : 0,
        scrollYProgress: isScrollableY
          ? +(currentScrollY / scrollableAreaY).toFixed(3)
          : 0,
        scrollXProgress: isScrollableX
          ? +(currentScrollX / scrollableAreaX).toFixed(3)
          : 0,
        isAtTop: isScrollableY ? currentScrollY === 0 : null,
        isAtBottom: isScrollableY ? currentScrollY === scrollableAreaY : null,
        isAtLeft: isScrollableX ? currentScrollX === 0 : null,
        isAtRight: isScrollableX ? currentScrollX === scrollableAreaX : null,
      });

      flags.lastScrollY = currentScrollY;
      flags.lastScrollX = currentScrollX;
      flags.lastScrollDirY = newScrollDirY;
      flags.lastScrollDirX = newScrollDirX;
    };

    const ele = elementRef.current ?? window;

    handleScroll();

    ele.addEventListener('scroll', handleScroll);

    return () => {
      ele.removeEventListener('scroll', handleScroll);
    };
  }, [
    flags,
    defaultScrollable,
    onScrollY,
    onScrollX,
    onScrollUp,
    onScrollDown,
    onScrollLeft,
    onScrollRight,
    onYDirectionChange,
    onXDirectionChange,
  ]);

  return [state, elementRef] as const;
};
