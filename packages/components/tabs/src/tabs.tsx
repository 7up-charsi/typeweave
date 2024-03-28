'use client';

import { createContextScope } from '@webbo-ui/context';
import { useControllableState } from '@webbo-ui/use-controllable-state';
import { forwardRef, useId, useMemo, useRef, useState } from 'react';
import { Slot } from '@webbo-ui/slot';
import { TabsVariantProps, tabs } from '@webbo-ui/theme';
import { createCollection } from '@webbo-ui/use-collection';
import { usePointerEvents } from '@webbo-ui/use-pointer-events';

// *-*-*-*-* Root *-*-*-*-*

export interface RootProps
  extends TabsVariantProps,
    React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
  className?: string;
  activationMode?: 'automatic' | 'manual';
  loop?: boolean;
}

const ROOT_NAME = 'Tabs.Root';

interface TabsContext {
  baseId: string;
  value?: string;
  onValueChange: (value: string) => void;
  orientation?: RootProps['orientation'];
  activationMode?: RootProps['activationMode'];
  activeTabId: string;
  onTabChange: (id: string) => void;
  loop?: boolean;
  isTabbingBackOut: boolean;
  setIsTabbingBackOut: React.Dispatch<React.SetStateAction<boolean>>;
}

const [RootProvider, useRootContext] =
  createContextScope<TabsContext>(ROOT_NAME);

const [StylesProvider, useStylesContext] =
  createContextScope<ReturnType<typeof tabs>>(ROOT_NAME);

interface ItemData {
  active: boolean;
}

const [Collection, useCollection] = createCollection<
  HTMLButtonElement,
  ItemData
>('Tabs');

export const Root = forwardRef<HTMLDivElement, RootProps>((props, ref) => {
  const {
    value: valueProp,
    onValueChange,
    defaultValue,
    className,
    loop,
    orientation = 'horizontal',
    activationMode = 'automatic',
    ...restProps
  } = props;

  const [value, setValue] = useControllableState({
    value: valueProp,
    onChange: onValueChange,
    defaultValue,
  });

  const [activeTabId, setActiveTabId] = useState('');
  const [isTabbingBackOut, setIsTabbingBackOut] = useState(false);

  const baseId = useId();

  const styles = useMemo(() => tabs({ orientation }), [orientation]);

  return (
    <RootProvider
      baseId={baseId}
      value={value}
      onValueChange={setValue}
      orientation={orientation}
      activationMode={activationMode}
      activeTabId={activeTabId}
      onTabChange={(id: string) => setActiveTabId(id)}
      loop={loop}
      isTabbingBackOut={isTabbingBackOut}
      setIsTabbingBackOut={setIsTabbingBackOut}
    >
      <StylesProvider {...styles}>
        <Collection.Provider>
          <div
            {...restProps}
            ref={ref}
            className={styles.wrapper({ className })}
          />
        </Collection.Provider>
      </StylesProvider>
    </RootProvider>
  );
});

Root.displayName = 'webbo-ui.' + ROOT_NAME;

// *-*-*-*-* List *-*-*-*-*

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {}

const List_NAME = 'Tabs.List';

export const List = forwardRef<HTMLDivElement, ListProps>((props, ref) => {
  const { className, ...restProps } = props;

  const context = useRootContext(List_NAME);
  const styles = useStylesContext(List_NAME);

  const getItems = useCollection();
  const isClickFocusRef = useRef(false);

  return (
    <Collection.Parent>
      <div
        {...restProps}
        ref={ref}
        tabIndex={context.isTabbingBackOut ? -1 : 0}
        role="tablist"
        aria-orientation={context.orientation}
        className={styles.list({ className })}
        onPointerDown={() => {
          isClickFocusRef.current = true;
        }}
        onBlur={() => context.setIsTabbingBackOut(false)}
        onFocus={(e) => {
          if (e.target === e.currentTarget && !context.isTabbingBackOut) {
            const activeItems = getItems().filter(
              (item) => !item.ref.current?.disabled,
            );

            const activeItem = activeItems.find((item) => item.active);

            activeItem?.ref.current?.focus();
          }

          isClickFocusRef.current = false;
        }}
      />
    </Collection.Parent>
  );
});

List.displayName = 'webbo-ui.' + List_NAME;

// *-*-*-*-* Trigger *-*-*-*-*

export interface TriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const Trigger_NAME = 'Tabs.Trigger';

export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const { value, className, onPointerDown, onPointerUp, ...restProps } =
      props;

    const context = useRootContext(Trigger_NAME);
    const styles = useStylesContext(List_NAME);
    const getItems = useCollection();

    const isSelected = value === context.value;
    const triggerId = 'trigger-' + value;
    const contentId = 'content-' + value;

    const handleClick = (event: React.PointerEvent) => {
      if (event.ctrlKey === false) {
        context.onValueChange(value);
      } else {
        event.preventDefault();
      }
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Tab' && e.shiftKey) {
        context.setIsTabbingBackOut(true);
        return;
      }

      if (e.repeat) return;

      if ([' ', 'Enter'].includes(e.key)) {
        context.onValueChange(value);
        return;
      }

      if (e.target !== e.currentTarget) return;

      const key = e.key;

      if (
        context.orientation === 'horizontal' &&
        (key === 'ArrowLeft' || key === 'ArrowRight')
      ) {
        e.preventDefault();
      }

      if (
        context.orientation === 'vertical' &&
        (key === 'ArrowUp' || key === 'ArrowDown')
      ) {
        e.preventDefault();
      }

      const Next =
        context.orientation === 'horizontal'
          ? key === 'ArrowRight'
          : key === 'ArrowDown';

      const Prev =
        context.orientation === 'horizontal'
          ? key === 'ArrowLeft'
          : key === 'ArrowUp';

      const activeItems = getItems().filter(
        (item) => !item.ref.current?.disabled,
      );

      const elements = activeItems.map((item) => item.ref.current!);

      const currentIndex = elements.indexOf(
        e.currentTarget as HTMLButtonElement,
      );

      // loop from last to first
      if (currentIndex === elements.length - 1 && context.loop && Next) {
        elements[0].focus();
        return;
      }

      // loop from first to end
      if (currentIndex === 0 && context.loop && Prev) {
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
      if (context.activationMode === 'automatic') {
        context.onValueChange(value);
      }

      context.onTabChange(triggerId);
    };

    const pointerEvents = usePointerEvents({
      onPress: handleClick,
      onPointerDown,
      onPointerUp,
    });

    return (
      <Collection.Item active={isSelected}>
        <Slot
          {...restProps}
          ref={ref}
          className={styles.trigger({ className })}
          type="button"
          tabIndex={context.activeTabId === triggerId ? 0 : -1}
          role="tab"
          aria-selected={isSelected}
          aria-controls={contentId}
          data-selected={isSelected}
          data-orientation={context.orientation}
          id={triggerId}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          {...pointerEvents}
        />
      </Collection.Item>
    );
  },
);

Trigger.displayName = 'webbo-ui.' + Trigger_NAME;

// *-*-*-*-* Content *-*-*-*-*

export interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const Content_NAME = 'Tabs.Content';

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  (props, ref) => {
    const { value, className, ...contentProps } = props;

    const context = useRootContext(Content_NAME);
    const styles = useStylesContext(List_NAME);

    const isSelected = value === context.value;
    const triggerId = 'trigger-' + value;
    const contentId = 'content-' + value;

    return !isSelected ? null : (
      <div
        ref={ref}
        className={styles.content({ className })}
        data-orientation={context.orientation}
        role="tabpanel"
        aria-labelledby={triggerId}
        id={contentId}
        tabIndex={0}
        {...contentProps}
      />
    );
  },
);

Content.displayName = 'webbo-ui.' + Content_NAME;
