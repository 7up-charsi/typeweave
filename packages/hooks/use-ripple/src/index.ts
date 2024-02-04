'use client';

import { useCallback } from 'react';

export interface MinimalEvent {
  clientX: number;
  clientY: number;
}

export interface UseRippleProps {
  /**
   * this is used as css transition duration for ripple popup animation and popup duration depends on `completedFactor` prop
   *
   * @default 500
   */
  duration?: number;
  /**
   * this is used as css transition timning function for ripple popup animation
   *
   * @default cubic-bezier(.42,.36,.28,.88)
   */
  timingFunction?: string;
  isDisabled?: boolean;

  /**
   * This prop means how much part of `duration` is used to appear the ripple and rest ot it used to disappear it
   * @default 0.5
   */
  completedFactor?: number;
  containerRef?:
    | React.RefObject<HTMLElement>
    | React.MutableRefObject<HTMLElement>;
}

const useRipple = ({
  containerRef,
  duration = 500,
  timingFunction = 'cubic-bezier(.42,.36,.28,.88)',
  isDisabled = false,
  completedFactor = 0.5,
}: UseRippleProps = {}) => {
  //

  const onPointerDown = useCallback(
    (e?: MinimalEvent) => {
      if (isDisabled || !containerRef || !containerRef.current) return;

      const target = containerRef.current;
      const begun = Date.now();

      const { height, width, top, left } = target.getBoundingClientRect();

      const clientX = e?.clientX || left + width / 2;
      const clientY = e?.clientY || top + height / 2;

      const maxHeight = Math.max(clientY - top, height - clientY + top);
      const maxWidth = Math.max(clientX - left, width - clientX + left);
      const size = Math.hypot(maxHeight, maxWidth) * 2;

      const element = document.createElement('span');

      element.style.cssText = `
        position: absolute;
        top: ${e ? `${clientY - top}px` : '50%'};
        left: ${e ? `${clientX - left}px` : '50%'};
        height: ${size}px;
        width: ${size}px;
        translate: -50% -50%;
        pointer-events: none;
        border-radius: 50%;
        background-color: var(--rippleBg);
    `;

      element.animate([{ scale: 0 }, { scale: 1 }], {
        duration,
        easing: timingFunction,
      });

      target.appendChild(element);

      const removeRipple = () => {
        const now = Date.now();
        const diff = now - begun;

        const timeoutDuration =
          diff > completedFactor * duration
            ? 0
            : completedFactor * duration - diff;

        setTimeout(() => {
          const animation = element.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: duration * 0.7,
            easing: 'ease-in-out',
          });

          animation.addEventListener('finish', () => {
            element.remove();
          });
        }, timeoutDuration);
      };

      document.addEventListener('pointerup', removeRipple, {
        once: true,
        capture: true,
      });
    },
    [completedFactor, containerRef, duration, isDisabled, timingFunction],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent, keys = ['Enter', ' ']) => {
      if (isDisabled || !containerRef || !containerRef.current) return;
      if (!keys.includes(e.key)) return;
      if (e.repeat) return;

      const target = containerRef.current;
      const begun = Date.now();

      const { height, width, top, left } = target.getBoundingClientRect();

      const clientX = left + width / 2;
      const clientY = top + height / 2;

      const maxHeight = Math.max(clientY - top, height - clientY + top);
      const maxWidth = Math.max(clientX - left, width - clientX + left);
      const size = Math.hypot(maxHeight, maxWidth) * 2;

      const element = document.createElement('span');

      element.style.cssText = `
        position: absolute;
        top: ${e ? `${clientY - top}px` : '50%'};
        left: ${e ? `${clientX - left}px` : '50%'};
        height: ${size}px;
        width: ${size}px;
        translate: -50% -50%;
        pointer-events: none;
        border-radius: 50%;
        background-color: var(--rippleBg);
    `;

      element.animate([{ scale: 0 }, { scale: 1 }], {
        duration,
        easing: timingFunction,
      });

      target.appendChild(element);

      const removeRipple = () => {
        const now = Date.now();
        const diff = now - begun;

        const timeoutDuration =
          diff > completedFactor * duration
            ? 0
            : completedFactor * duration - diff;

        setTimeout(() => {
          const animation = element.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: duration * 0.7,
            easing: 'ease-in-out',
          });

          animation.addEventListener('finish', () => {
            element.remove();
          });
        }, timeoutDuration);
      };

      document.addEventListener('keyup', removeRipple, {
        once: true,
        capture: true,
      });
    },
    [completedFactor, containerRef, duration, isDisabled, timingFunction],
  );

  return {
    ripplePointerProps: { onPointerDown },
    rippleKeyboardProps: { onKeyDown },
  };
};

export type UseRippleReturn = ReturnType<typeof useRipple>;

export { useRipple };
