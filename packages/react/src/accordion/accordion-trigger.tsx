import React from 'react';
import {
  AccordionCollection,
  useAccordionCollection,
  useAccordionCtx,
  useAccordionStyles,
} from './accordion-root';
import { usePointerEvents } from '../use-pointer-events';
import { Slot } from '../slot';
import { useAccordionItemCtx } from './accordion-item';

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const displayName = 'AccordionTrigger';

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>((props, ref) => {
  const { asChild, className, children, disabled, ...restProps } = props;

  const accordionCtx = useAccordionCtx(displayName);
  const itemCtx = useAccordionItemCtx(displayName);
  const styles = useAccordionStyles(displayName);
  const getItems = useAccordionCollection();

  const isExpended = itemCtx.isExpended;

  const onPress = () => {
    if (isExpended) accordionCtx.onCollapse(itemCtx.value);
    else accordionCtx.onExpand(itemCtx.value);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (accordionCtx.disabled) return;

    const key = e.key;

    if (key === 'Tab' || (key === 'Tab' && e.shiftKey)) return;

    if ([' ', 'Enter'].includes(key)) {
      onPress();

      return;
    }

    const ArrowDown = key === 'ArrowDown';
    const ArrowUp = key === 'ArrowUp';
    const Home = key === 'Home';
    const End = key === 'End';

    const activeItems = getItems().filter((ele) => !ele.ref.current?.disabled);
    const elements = activeItems.map((ele) => ele.ref.current);

    const currentIndex = elements.findIndex((ele) => ele === e.currentTarget);

    const next = elements[Math.min(currentIndex + 1, elements.length - 1)];

    const prev = elements[Math.max(currentIndex - 1, 0)];

    if (ArrowDown) next?.focus();
    if (ArrowUp) prev?.focus();
    if (Home) elements[0]?.focus();
    if (End) elements[elements.length - 1]?.focus();
  };

  const pointerEvents = usePointerEvents({ onPress });

  const Comp = asChild ? Slot : 'button';

  return (
    <AccordionCollection.Item>
      <Comp
        {...restProps}
        ref={ref}
        onKeyDown={onKeyDown}
        className={styles.trigger({ className })}
        disabled={accordionCtx.disabled ?? disabled ?? itemCtx.disabled}
        id={itemCtx.triggerId}
        aria-expanded={isExpended}
        aria-controls={itemCtx.contentId}
        data-expanded={isExpended}
        {...pointerEvents}
      >
        {children}
      </Comp>
    </AccordionCollection.Item>
  );
});

AccordionTrigger.displayName = displayName;
