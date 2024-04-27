import React from 'react';
import {
  TabsCollection,
  useTabsCollection,
  useTabsCtx,
  useTabsStyles,
} from './tabs-root';
import { usePointerEvents } from '../use-pointer-events';
import { Slot } from '../slot';

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const displayName = 'TabsTrigger';

export const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  TabsTriggerProps
>((props, ref) => {
  const { value, className, ...restProps } = props;

  const tabsCtx = useTabsCtx(displayName);
  const styles = useTabsStyles(displayName);
  const getItems = useTabsCollection();

  const isSelected = value === tabsCtx.value;
  const triggerId = 'trigger-' + value;
  const contentId = 'content-' + value;

  const handleClick = (event: React.PointerEvent) => {
    if (event.ctrlKey === false) {
      tabsCtx.onValueChange(value);
    } else {
      event.preventDefault();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && e.shiftKey) {
      tabsCtx.setIsTabbingBackOut(true);
      return;
    }

    if (e.repeat) return;

    if ([' ', 'Enter'].includes(e.key)) {
      tabsCtx.onValueChange(value);
      return;
    }

    if (e.target !== e.currentTarget) return;

    const key = e.key;

    if (
      tabsCtx.orientation === 'horizontal' &&
      (key === 'ArrowLeft' || key === 'ArrowRight')
    ) {
      e.preventDefault();
    }

    if (
      tabsCtx.orientation === 'vertical' &&
      (key === 'ArrowUp' || key === 'ArrowDown')
    ) {
      e.preventDefault();
    }

    const Next =
      tabsCtx.orientation === 'horizontal'
        ? key === 'ArrowRight'
        : key === 'ArrowDown';

    const Prev =
      tabsCtx.orientation === 'horizontal'
        ? key === 'ArrowLeft'
        : key === 'ArrowUp';

    const activeItems = getItems().filter(
      (item) => !item.ref.current?.disabled,
    );

    const elements = activeItems.map((item) => item.ref.current!);

    const currentIndex = elements.indexOf(e.currentTarget as HTMLButtonElement);

    // loop from last to first
    if (currentIndex === elements.length - 1 && tabsCtx.loop && Next) {
      elements[0].focus();
      return;
    }

    // loop from first to end
    if (currentIndex === 0 && tabsCtx.loop && Prev) {
      elements[elements.length - 1].focus();
      return;
    }

    if (Next && currentIndex >= 0 && currentIndex < elements.length - 1) {
      elements[currentIndex + 1].focus();
      return;
    }

    if (Prev && currentIndex > 0 && currentIndex <= elements.length - 1) {
      elements[currentIndex - 1].focus();
      return;
    }
  };

  const onFocus = () => {
    if (tabsCtx.activationMode === 'automatic') {
      tabsCtx.onValueChange(value);
    }

    tabsCtx.onTabChange(triggerId);
  };

  const pointerEvents = usePointerEvents({ onPress: handleClick });

  return (
    <TabsCollection.Item active={isSelected}>
      <Slot
        {...restProps}
        ref={ref}
        className={styles.trigger({ className })}
        type="button"
        tabIndex={tabsCtx.activeTabId === triggerId ? 0 : -1}
        role="tab"
        aria-selected={isSelected}
        aria-controls={contentId}
        data-selected={isSelected}
        data-orientation={tabsCtx.orientation}
        id={triggerId}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        {...pointerEvents}
      />
    </TabsCollection.Item>
  );
});

TabsTrigger.displayName = displayName;
