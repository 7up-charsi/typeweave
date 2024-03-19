'use client';

import { createContextScope } from '@webbo-ui/context';
import { useControllableState } from '@webbo-ui/use-controllable-state';
import { Slot } from '@webbo-ui/slot';
import { useId, useMemo } from 'react';
import { usePointerEvents } from '@webbo-ui/use-pointer-events';
import { createCollection } from '@webbo-ui/use-collection';
import { CustomError } from '@webbo-ui/error';
import { accordion } from '@webbo-ui/theme';

// *-*-*-*-* Root *-*-*-*-*

const ROOT_NAME = 'Accordion.Root';

interface RootContext {
  onExpand: (value: string) => void;
  onCollapse: (value: string) => void;
  disabled?: boolean;
  value: string | string[] | null;
  type: 'multiple' | 'single';
}

const [RootProvider, useRootContext] =
  createContextScope<RootContext>(ROOT_NAME);

const [StylesProvider, useStylesContext] =
  createContextScope<ReturnType<typeof accordion>>(ROOT_NAME);

const [Collection, useCollection] = createCollection<HTMLButtonElement, object>(
  ROOT_NAME,
);

type BaseProps = {
  children?: React.ReactNode;
  disabled?: boolean;
  asChild?: boolean;
  className?: string;
};

export type RootProps<Type, IsSingleCollapsible> = BaseProps &
  (Type extends 'multiple'
    ? {
        type?: Type;
        value?: string[];
        defaultValue?: string[];
        onValueChange?: (value: string[]) => void;
        isSingleCollapsible?: undefined;
      }
    : IsSingleCollapsible extends true
      ? {
          type: Type;
          value?: string | null;
          defaultValue?: string | null;
          onValueChange?: (value: string | null) => void;
          isSingleCollapsible?: IsSingleCollapsible;
        }
      : {
          type: Type;
          value?: string;
          defaultValue?: string;
          onValueChange?: (value: string) => void;
          isSingleCollapsible: IsSingleCollapsible;
        });

export const Root = <
  Type extends 'single' | 'multiple' = 'multiple',
  IsSingleCollapsible extends boolean = true,
>(
  props: RootProps<Type, IsSingleCollapsible>,
) => {
  const {
    children,
    value: valueProp,
    onValueChange,
    defaultValue,
    disabled,
    asChild,
    className,
    isSingleCollapsible = true,
    type = 'multiple',
  } = props;

  const [value, setValue] = useControllableState({
    defaultValue: type === 'multiple' ? defaultValue ?? [] : defaultValue,
    value: valueProp,
    onChange: (val) => {
      onValueChange?.(val as never);
    },
  });

  const onExpand = (value: string) => {
    if (disabled) return;

    if (type === 'single') {
      setValue(value);
      return;
    }

    if (type === 'multiple') {
      setValue((prev) => (Array.isArray(prev) ? [...prev, value] : []));
      return;
    }
  };

  const onCollapse = (value: string) => {
    if (disabled) return;

    if (type === 'single' && isSingleCollapsible) {
      setValue(null);
    }

    if (type === 'multiple') {
      setValue((prev) =>
        Array.isArray(prev) ? prev.filter((ele) => ele !== value) : [],
      );
    }
  };

  const styles = useMemo(() => accordion(), []);

  if (
    valueProp &&
    type === 'single' &&
    !isSingleCollapsible &&
    Array.isArray(value)
  )
    throw new CustomError(
      ROOT_NAME,
      '`value` must be `string` when type is single and isSingleCollapsible is false',
    );

  if (
    valueProp &&
    type === 'single' &&
    isSingleCollapsible &&
    Array.isArray(value)
  )
    throw new CustomError(
      ROOT_NAME,
      '`value` must be `string | null` when type is single and isSingleCollapsible is true',
    );

  if (valueProp && type === 'multiple' && !Array.isArray(value))
    throw new CustomError(
      ROOT_NAME,
      '`value` must be `array` when type is multiple',
    );

  const Component = asChild ? Slot : 'div';

  return (
    <RootProvider
      type={type}
      onCollapse={onCollapse}
      onExpand={onExpand}
      disabled={disabled}
      value={value}
    >
      <StylesProvider {...styles}>
        <Collection.Provider>
          <Collection.Parent>
            <Component className={styles.base({ className })}>
              {children}
            </Component>
          </Collection.Parent>
        </Collection.Provider>
      </StylesProvider>
    </RootProvider>
  );
};

Root.displayName = 'webbo-ui.' + ROOT_NAME;

// *-*-*-*-* Item *-*-*-*-*

const ITEM_NAME = 'Accordion.Item';

interface ItemContext {
  value: string;
  triggerId: string;
  contentId: string;
  isExpended: boolean;
  disabled?: boolean;
}

const [ItemProvider, useItemContext] =
  createContextScope<ItemContext>(ITEM_NAME);

export interface ItemProps {
  children?: React.ReactNode;
  value: string;
  asChild?: boolean;
  className?: string;
  disabled?: boolean;
}

export const Item = (props: ItemProps) => {
  const { children, value, asChild, className, disabled } = props;

  const rootContext = useRootContext(TRIGGER_NAME);

  const triggerId = useId();
  const contentId = useId();

  const styles = useStylesContext(ITEM_NAME);

  const isExpended =
    rootContext.type === 'multiple'
      ? Array.isArray(rootContext.value) &&
        !!rootContext.value.find((ele) => ele === value)
      : rootContext.value === value;

  const Component = asChild ? Slot : 'div';

  return (
    <ItemProvider
      value={value}
      triggerId={triggerId}
      contentId={contentId}
      isExpended={isExpended}
      disabled={disabled}
    >
      <Component
        className={styles.item({ className })}
        data-state={isExpended ? 'expanded' : 'collapsed'}
      >
        {children}
      </Component>
    </ItemProvider>
  );
};

Item.displayName = 'webbo-ui.' + ITEM_NAME;

// *-*-*-*-* Header *-*-*-*-*

const HEADER_NAME = 'Accordion.Header';

export interface HeaderProps {
  children?: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

export const Header = (props: HeaderProps) => {
  const { children, asChild, className } = props;

  const styles = useStylesContext(HEADER_NAME);

  const Component = asChild ? Slot : 'h3';

  return (
    <Component className={styles.header({ className })}>{children}</Component>
  );
};

Header.displayName = 'webbo-ui.' + HEADER_NAME;

// *-*-*-*-* Trigger *-*-*-*-*

const TRIGGER_NAME = 'Accordion.Trigger';

export interface TriggerProps {
  children?: React.ReactNode;
  className?: string;
}

export const Trigger = (props: TriggerProps) => {
  const { children, className } = props;

  const rootContext = useRootContext(TRIGGER_NAME);
  const itemContext = useItemContext(TRIGGER_NAME);

  const isExpended = itemContext.isExpended;

  const onPress = () => {
    if (isExpended) rootContext.onCollapse(itemContext.value);
    else rootContext.onExpand(itemContext.value);
  };

  const poitnerEvents = usePointerEvents({ onPress });

  const styles = useStylesContext(TRIGGER_NAME);

  const getItems = useCollection();

  const onKeyDown = (e: React.KeyboardEvent) => {
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

  return (
    <Collection.Item>
      <button
        onKeyDown={onKeyDown}
        className={styles.trigger({ className })}
        disabled={itemContext.disabled ?? rootContext.disabled}
        id={itemContext.triggerId}
        aria-expanded={isExpended}
        aria-controls={itemContext.contentId}
        {...poitnerEvents}
      >
        {children}
      </button>
    </Collection.Item>
  );
};

Trigger.displayName = 'webbo-ui.' + TRIGGER_NAME;

// *-*-*-*-* Content *-*-*-*-*

const CONTENT_NAME = 'Accordion.Content';

export interface ContentProps {
  children?: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

export const Content = (props: ContentProps) => {
  const { children, asChild, className } = props;

  const itemContext = useItemContext(CONTENT_NAME);

  const styles = useStylesContext(CONTENT_NAME);

  const Component = asChild ? Slot : 'div';

  return (
    <Component
      data-state={itemContext.isExpended ? 'expanded' : 'collapsed'}
      id={itemContext.contentId}
      hidden={!itemContext.isExpended}
      className={styles.content({ className })}
    >
      {children}
    </Component>
  );
};

Content.displayName = 'webbo-ui.' + CONTENT_NAME;
