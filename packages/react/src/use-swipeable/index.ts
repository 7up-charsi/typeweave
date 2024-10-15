import React from 'react';

type Directions = 'up' | 'left' | 'down' | 'right';

export type CustomEvent = {
  event: PointerEvent;
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
  onSwiping?: (event: PointerEvent) => void;
  onSwipeStart?: (event: PointerEvent) => void;
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
    onSwipe,
    onSwipeDown,
    onSwipeLeft,
    onSwipeRight,
    onSwipeStart,
    onSwipeUp,
    onSwiping,
    swipeDuration = Infinity,
    minDistance = DEFAULT_MIN_DISTANCE,
  } = props;

  const distanceTraveled: Required<typeof minDistance> = {
    down: DEFAULT_MIN_DISTANCE,
    left: DEFAULT_MIN_DISTANCE,
    right: DEFAULT_MIN_DISTANCE,
    up: DEFAULT_MIN_DISTANCE,
  };

  if (typeof minDistance === 'number') {
    distanceTraveled.down = minDistance;
    distanceTraveled.left = minDistance;
    distanceTraveled.right = minDistance;
    distanceTraveled.up = minDistance;
  } else {
    distanceTraveled.down = minDistance.down ?? DEFAULT_MIN_DISTANCE;
    distanceTraveled.left = minDistance.left ?? DEFAULT_MIN_DISTANCE;
    distanceTraveled.right = minDistance.right ?? DEFAULT_MIN_DISTANCE;
    distanceTraveled.up = minDistance.up ?? DEFAULT_MIN_DISTANCE;
  }

  const startXRef = React.useRef<number | null>(null);
  const endXRef = React.useRef<number | null>(null);
  const startYRef = React.useRef<number | null>(null);
  const endYRef = React.useRef<number | null>(null);
  const startTimeRef = React.useRef<number | null>(null);
  const isPointerDownRef = React.useRef(false);
  const isSwipeStartedRef = React.useRef(false);

  const onMouseDown = React.useCallback((event: PointerEvent) => {
    startXRef.current = event.clientX;
    startYRef.current = event.clientY;
    startTimeRef.current = event.timeStamp;
    isPointerDownRef.current = true;
  }, []);

  const onMouseMove = React.useCallback((event: PointerEvent) => {
    if (!isPointerDownRef.current) return;

    if (!isSwipeStartedRef.current) onSwipeStart?.(event);

    isSwipeStartedRef.current = true;

    endXRef.current = event.clientX;
    endYRef.current = event.clientY;
    onSwiping?.(event);
  }, []);

  const onMouseCancel = React.useCallback(() => {
    startXRef.current = null;
    endXRef.current = null;
    startYRef.current = null;
    endYRef.current = null;
    startTimeRef.current = null;
    isPointerDownRef.current = false;
    isSwipeStartedRef.current = false;
  }, []);

  const onMouseUp = React.useCallback((event: PointerEvent) => {
    if (!isPointerDownRef.current) return;

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

      onMouseCancel();

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
        if (absX >= distanceTraveled.right && endX > startX) {
          onSwipeRight?.(customEvent);
        }

        if (absX >= distanceTraveled.left && endX < startX) {
          onSwipeLeft?.(customEvent);
        }
      } else {
        // vertical swipe
        if (absY >= distanceTraveled.down && endY > startY) {
          onSwipeDown?.(customEvent);
        }

        if (absY >= distanceTraveled.up && endY < startY) {
          onSwipeUp?.(customEvent);
        }
      }

      onSwipe?.(customEvent);
    }
  }, []);

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseCancel,
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
