import { createContextScope } from '@webbo-ui/context';
import { useControllableState } from '@webbo-ui/use-controllable-state';
import { forwardRef, useId, useMemo } from 'react';
import { Slot } from '@webbo-ui/slot';
import { TabsVariantProps, tabs } from '@webbo-ui/theme';

// *-*-*-*-* Root *-*-*-*-*

export interface RootProps extends TabsVariantProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
  className?: string;
  activationMode?: 'automatic' | 'manual';
}

const ROOT_NAME = 'Tabs.Root';

interface TabsContext {
  baseId: string;
  value?: string;
  onValueChange: (value: string) => void;
  orientation?: RootProps['orientation'];
  activationMode?: RootProps['activationMode'];
}

const [RootProvider, useRootContext] =
  createContextScope<TabsContext>(ROOT_NAME);

const [StylesProvider, useStylesContext] =
  createContextScope<ReturnType<typeof tabs>>(ROOT_NAME);

export const Root = (props: RootProps) => {
  const {
    children,
    value: valueProp,
    onValueChange,
    defaultValue,
    className,
    orientation = 'horizontal',
    activationMode = 'automatic',
  } = props;

  const [value, setValue] = useControllableState({
    value: valueProp,
    onChange: onValueChange,
    defaultValue,
  });

  const baseId = useId();

  const styles = useMemo(() => tabs({ orientation }), [orientation]);

  return (
    <RootProvider
      baseId={baseId}
      value={value}
      onValueChange={setValue}
      orientation={orientation}
      activationMode={activationMode}
    >
      <StylesProvider {...styles}>
        <div className={styles.wrapper({ className })}>{children}</div>
      </StylesProvider>
    </RootProvider>
  );
};

Root.displayName = 'webbo-ui.' + ROOT_NAME;

// *-*-*-*-* List *-*-*-*-*

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {}

const List_NAME = 'Tabs.List';

export const List = (props: ListProps) => {
  const { className, ...restProps } = props;

  const context = useRootContext(List_NAME);
  const styles = useStylesContext(List_NAME);

  return (
    <div
      {...restProps}
      role="tablist"
      aria-orientation={context.orientation}
      className={styles.list({ className })}
    />
  );
};

List.displayName = 'webbo-ui.' + List_NAME;

// *-*-*-*-* Trigger *-*-*-*-*

export interface TriggerProps {
  value: string;
  className?: string;
  children?: React.ReactNode;
}

const Trigger_NAME = 'Tabs.Trigger';

export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const { value, className, children } = props;

    const context = useRootContext(Trigger_NAME);
    const styles = useStylesContext(List_NAME);

    const isSelected = value === context.value;
    const triggerId = 'trigger-' + value;
    const contentId = 'content-' + value;

    const handleClick = (event: React.MouseEvent) => {
      if (event.ctrlKey === false) {
        context.onValueChange(value);
      } else {
        event.preventDefault();
      }
    };

    const onKeyDown = (event: React.KeyboardEvent) => {
      if ([' ', 'Enter'].includes(event.key)) context.onValueChange(value);
    };

    const onFocus = () => {
      if (!isSelected && context.activationMode === 'automatic') {
        context.onValueChange(value);
      }
    };

    return (
      <Slot
        ref={ref}
        className={styles.trigger({ className })}
        type="button"
        tabIndex={isSelected ? 0 : -1}
        role="tab"
        aria-selected={isSelected}
        aria-controls={contentId}
        data-selected={isSelected}
        data-orientation={context.orientation}
        id={triggerId}
        onClick={handleClick}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
      >
        {children}
      </Slot>
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
    const { value, children, className, ...contentProps } = props;

    const context = useRootContext(Content_NAME);
    const styles = useStylesContext(List_NAME);

    const isSelected = value === context.value;
    const triggerId = 'trigger-' + value;
    const contentId = 'content-' + value;

    return (
      <div
        ref={ref}
        className={styles.content({ className })}
        data-selected={isSelected}
        data-orientation={context.orientation}
        role="tabpanel"
        aria-labelledby={triggerId}
        hidden={!isSelected}
        id={contentId}
        tabIndex={0}
        {...contentProps}
      >
        {isSelected && children}
      </div>
    );
  },
);

Content.displayName = 'webbo-ui.' + Content_NAME;
