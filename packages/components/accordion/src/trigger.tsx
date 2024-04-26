import React from 'react';
import {
  Collection,
  useCollection,
  useRootContext,
  useStylesContext,
} from './root';
import { useItemContext } from './item';
import { usePointerEvents } from '@webbo-ui/use-pointer-events';
import { Slot } from '@webbo-ui/slot';

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Comp_Name = 'AccordionTrigger';

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>((props, ref) => {
  const { asChild, className, children, disabled, ...restProps } = props;

  const rootContext = useRootContext(Comp_Name);
  const itemContext = useItemContext(Comp_Name);
  const styles = useStylesContext(Comp_Name);
  const getItems = useCollection();

  const isExpended = itemContext.isExpended;

  const onPress = () => {
    if (isExpended) rootContext.onCollapse(itemContext.value);
    else rootContext.onExpand(itemContext.value);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (rootContext.disabled) return;

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
    <Collection.Item>
      <Comp
        {...restProps}
        ref={ref}
        onKeyDown={onKeyDown}
        className={styles.trigger({ className })}
        disabled={rootContext.disabled ?? disabled ?? itemContext.disabled}
        id={itemContext.triggerId}
        aria-expanded={isExpended}
        aria-controls={itemContext.contentId}
        data-expanded={isExpended}
        {...pointerEvents}
      >
        {children}
      </Comp>
    </Collection.Item>
  );
});

AccordionTrigger.displayName = 'AccordionTrigger';
