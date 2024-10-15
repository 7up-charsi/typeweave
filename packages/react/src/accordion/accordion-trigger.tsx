import React from 'react';
import {
  AccordionCollection,
  useAccordionCollection,
  useAccordionCtx,
  useAccordionStyles,
} from './accordion-root';
import { useAccordionItemCtx } from './accordion-item';

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const displayName = 'AccordionTrigger';

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>((props, ref) => {
  const { className, children, disabled, ...restProps } = props;

  const accordionCtx = useAccordionCtx(displayName);
  const itemCtx = useAccordionItemCtx(displayName);
  const styles = useAccordionStyles(displayName);
  const getItems = useAccordionCollection();

  const isExpended = itemCtx.isExpended;

  const onClick = () => {
    if (isExpended) accordionCtx.onCollapse(itemCtx.value);
    else accordionCtx.onExpand(itemCtx.value);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (accordionCtx.disabled) return;

    const key = e.key;

    if (key === 'Tab' || (key === 'Tab' && e.shiftKey)) return;

    if ([' ', 'Enter'].includes(key)) {
      onClick();

      return;
    }

    const ArrowDown = key === 'ArrowDown';
    const ArrowUp = key === 'ArrowUp';
    const Home = key === 'Home';
    const End = key === 'End';

    const activeItems = getItems().filter((item) => {
      const element = item.ref.current!;

      return (
        !element.disabled &&
        !element.hidden &&
        getComputedStyle(element).display !== 'none'
      );
    });

    const elements = activeItems.map((item) => item.ref.current);

    const currentIndex = elements.findIndex((item) => item === e.currentTarget);

    const next = elements[Math.min(currentIndex + 1, elements.length - 1)];

    const prev = elements[Math.max(currentIndex - 1, 0)];

    if (ArrowDown) next?.focus();
    if (ArrowUp) prev?.focus();
    if (Home) elements[0]?.focus();
    if (End) elements[elements.length - 1]?.focus();
  };

  return (
    <AccordionCollection.Item>
      <button
        {...restProps}
        ref={ref}
        onKeyDown={onKeyDown}
        className={styles.trigger({ className })}
        disabled={accordionCtx.disabled ?? disabled ?? itemCtx.disabled}
        id={itemCtx.triggerId}
        aria-expanded={isExpended}
        aria-controls={itemCtx.contentId}
        data-expanded={isExpended}
        role="button"
        onClick={onClick}
      >
        {children}
      </button>
    </AccordionCollection.Item>
  );
});

AccordionTrigger.displayName = displayName;
