import React from 'react';
import { useCallbackRef } from '../use-callback-ref';

export interface ScrollEvent {
  y: number;
  x: number;
  deltaY: number;
  deltaX: number;
  dirY: ScrollDirection;
  dirX: ScrollDirection;
  lastDirY: ScrollDirection;
  lastDirX: ScrollDirection;
}

export interface UseScrollProps {
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

export const useScroll = <E extends HTMLElement>(
  props: UseScrollProps = {},
) => {
  const {
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

  const [y, setY] = React.useState(0);
  const [x, setX] = React.useState(0);
  const [deltaY, setDeltaY] = React.useState(0);
  const [deltaX, setDeltaX] = React.useState(0);
  const [dirY, setDirY] = React.useState<ScrollDirection>(0);
  const [dirX, setDirX] = React.useState<ScrollDirection>(0);
  const [totalScrollY, setTotalScrollY] = React.useState(0);
  const [totalScrollX, setTotalScrollX] = React.useState(0);

  const elementRef = React.useRef<E>(null);

  const localState = React.useRef<{
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
        (document.documentElement.scrollTop
          ? document.documentElement
          : document.body);

      const currentScrollY = element.scrollTop;
      const currentScrollX = element.scrollLeft;

      const newScrollDirY = currentScrollY > localState.lastScrollY ? 1 : -1;
      const newScrollDirX = currentScrollX > localState.lastScrollX ? 1 : -1;

      const scrollEvent: ScrollEvent = {
        deltaX: localState.deltaX,
        deltaY: localState.deltaY,
        lastDirX: localState.lastScrollDirX,
        lastDirY: localState.lastScrollDirY,
        dirX: newScrollDirX,
        dirY: newScrollDirY,
        x: currentScrollX,
        y: currentScrollY,
      };

      if (localState.lastScrollDirY === 1 && newScrollDirY === -1) {
        localState.deltaY = 0;
      } else if (localState.lastScrollDirY === -1 && newScrollDirY === 1) {
        localState.deltaY = 0;
      }

      localState.deltaY += Math.abs(currentScrollY - localState.lastScrollY);

      if (newScrollDirY === -1) {
        onScrollUp({ ...scrollEvent, deltaY: localState.deltaY });
      } else if (newScrollDirY === 1) {
        onScrollDown({ ...scrollEvent, deltaY: localState.deltaY });
      }

      if (localState.lastScrollDirX === 1 && newScrollDirX === -1) {
        localState.deltaX = 0;
      } else if (localState.lastScrollDirX === -1 && newScrollDirX === 1) {
        localState.deltaX = 0;
      }

      localState.deltaX += Math.abs(currentScrollX - localState.lastScrollX);

      if (newScrollDirX === -1) {
        onScrollLeft({ ...scrollEvent, deltaX: localState.deltaX });
      } else if (newScrollDirX === 1) {
        onScrollRight({ ...scrollEvent, deltaX: localState.deltaX });
      }

      if (newScrollDirY !== localState.lastScrollDirY)
        onYDirectionChange?.(scrollEvent);

      if (newScrollDirX !== localState.lastScrollDirX)
        onXDirectionChange?.(scrollEvent);

      if (
        currentScrollY !== localState.lastScrollY &&
        currentScrollX === localState.lastScrollX
      )
        onScrollY?.(scrollEvent);

      if (
        currentScrollX !== localState.lastScrollX &&
        currentScrollY === localState.lastScrollY
      )
        onScrollX?.(scrollEvent);

      setY(currentScrollY);
      setX(currentScrollX);
      setDeltaY(localState.deltaY);
      setDeltaX(localState.deltaX);
      setDirY(newScrollDirY);
      setDirX(newScrollDirX);

      setTotalScrollY(element.scrollHeight + element.clientHeight);
      setTotalScrollX(element.scrollWidth + element.clientWidth);

      localState.lastScrollY = currentScrollY;
      localState.lastScrollX = currentScrollX;
      localState.lastScrollDirY = newScrollDirY;
      localState.lastScrollDirX = newScrollDirX;
    };

    const ele = elementRef.current ?? window;

    handleScroll();

    ele.addEventListener('scroll', handleScroll);

    return () => {
      ele.removeEventListener('scroll', handleScroll);
    };
  }, [localState]);

  return {
    ref: elementRef,
    y,
    x,
    deltaY,
    deltaX,
    dirY,
    dirX,
    totalScrollY,
    totalScrollX,
  };
};
