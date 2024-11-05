import React from 'react';
import { useCallbackRef } from '../use-callback-ref';

type Directions = 'up' | 'left' | 'down' | 'right';

export type CustomEvent = {
  event: MouseEvent;
  velocity: number;
  deltaX: number;
  deltaY: number;
  absX: number;
  absY: number;
  direction: Directions;
};

export interface UseSwipeableProps {
  onSwipeRight?: (event: CustomEvent) => void;
  onSwipeLeft?: (event: CustomEvent) => void;
  onSwipeUp?: (event: CustomEvent) => void;
  onSwipeDown?: (event: CustomEvent) => void;
  onSwipe?: (event: CustomEvent) => void;
  onSwiping?: (event: MouseEvent) => void;
  onSwipeStart?: (event: MouseEvent) => void;
  swipeDuration?: number;
  minDistance?:
    | number
    | Partial<{
        [key in Directions]: number;
      }>;
}

const DEFAULT_MIN_DISTANCE = 10;

export const useSwipeable = (props: UseSwipeableProps = {}) => {
  const {
    onSwipe: onSwipeProp,
    onSwipeDown: onSwipeDownProp,
    onSwipeLeft: onSwipeLeftProp,
    onSwipeRight: onSwipeRightProp,
    onSwipeStart: onSwipeStartProp,
    onSwipeUp: onSwipeUpProp,
    onSwiping: onSwipingProp,
    swipeDuration = Infinity,
    minDistance = DEFAULT_MIN_DISTANCE,
  } = props;

  const onSwipe = useCallbackRef(onSwipeProp);
  const onSwipeDown = useCallbackRef(onSwipeDownProp);
  const onSwipeLeft = useCallbackRef(onSwipeLeftProp);
  const onSwipeRight = useCallbackRef(onSwipeRightProp);
  const onSwipeStart = useCallbackRef(onSwipeStartProp);
  const onSwipeUp = useCallbackRef(onSwipeUpProp);
  const onSwiping = useCallbackRef(onSwipingProp);

  const minDistanceRef = React.useRef({
    down: DEFAULT_MIN_DISTANCE,
    left: DEFAULT_MIN_DISTANCE,
    right: DEFAULT_MIN_DISTANCE,
    up: DEFAULT_MIN_DISTANCE,
  });

  React.useEffect(() => {
    if (typeof minDistance === 'number') {
      minDistanceRef.current.down = minDistance;
      minDistanceRef.current.left = minDistance;
      minDistanceRef.current.right = minDistance;
      minDistanceRef.current.up = minDistance;
    } else {
      minDistanceRef.current.down = minDistance.down ?? DEFAULT_MIN_DISTANCE;
      minDistanceRef.current.left = minDistance.left ?? DEFAULT_MIN_DISTANCE;
      minDistanceRef.current.right = minDistance.right ?? DEFAULT_MIN_DISTANCE;
      minDistanceRef.current.up = minDistance.up ?? DEFAULT_MIN_DISTANCE;
    }
  }, [minDistance]);

  const startXRef = React.useRef<number | null>(null);
  const endXRef = React.useRef<number | null>(null);
  const startYRef = React.useRef<number | null>(null);
  const endYRef = React.useRef<number | null>(null);
  const startTimeRef = React.useRef<number | null>(null);
  const isMouseDownRef = React.useRef(false);
  const isSwipeStartedRef = React.useRef(false);

  const onMouseDown = useCallbackRef((event: MouseEvent) => {
    startXRef.current = event.clientX;
    startYRef.current = event.clientY;
    startTimeRef.current = event.timeStamp;
    isMouseDownRef.current = true;
  });

  const onMouseMove = useCallbackRef((event: MouseEvent) => {
    if (!isMouseDownRef.current) return;

    if (!isSwipeStartedRef.current) onSwipeStart?.(event);

    isSwipeStartedRef.current = true;

    endXRef.current = event.clientX;
    endYRef.current = event.clientY;
    onSwiping?.(event);
  });

  const onMouseUp = React.useCallback(
    (event: MouseEvent) => {
      if (!isMouseDownRef.current) return;

      const startX = startXRef.current;
      const endX = endXRef.current;
      const startY = startYRef.current;
      const endY = endYRef.current;
      const startTime = startTimeRef.current;

      if (
        startX !== null &&
        startY !== null &&
        endX !== null &&
        endY !== null &&
        startTime !== null
      ) {
        const deltaX = Math.abs(endX - startX);
        const deltaY = Math.abs(endY - startY);
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);
        const time = event.timeStamp - startTime || 1;
        const speedX = absX / time;
        const speedY = absY / time;

        startXRef.current = null;
        endXRef.current = null;
        startYRef.current = null;
        endYRef.current = null;
        startTimeRef.current = null;
        isMouseDownRef.current = false;
        isSwipeStartedRef.current = false;

        if (time > swipeDuration) return;

        const velocity = Math.sqrt(speedX ** 2 + speedY ** 2);

        const customEvent: CustomEvent = {
          event,
          velocity,
          deltaX,
          deltaY,
          absX,
          absY,
          direction: getDirection(absX, absY, deltaX, deltaY),
        };

        if (deltaX > deltaY) {
          // horizontal swipe
          if (absX >= minDistanceRef.current.right && endX > startX) {
            onSwipeRight?.(customEvent);
          }

          if (absX >= minDistanceRef.current.left && endX < startX) {
            onSwipeLeft?.(customEvent);
          }
        } else {
          // vertical swipe
          if (absY >= minDistanceRef.current.down && endY > startY) {
            onSwipeDown?.(customEvent);
          }

          if (absY >= minDistanceRef.current.up && endY < startY) {
            onSwipeUp?.(customEvent);
          }
        }

        onSwipe?.(customEvent);
      }
    },
    [onSwipe, onSwipeDown, onSwipeLeft, onSwipeRight, onSwipeUp, swipeDuration],
  );

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};

const getDirection = (
  absX: number,
  absY: number,
  deltaX: number,
  deltaY: number,
): Directions => {
  if (absX > absY) return deltaX > 0 ? 'right' : 'left';

  return deltaY > 0 ? 'down' : 'up';
};
