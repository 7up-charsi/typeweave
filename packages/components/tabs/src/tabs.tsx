import { createContextScope } from '@webbo-ui/context';
import { useControllableState } from '@webbo-ui/use-controllable-state';
import { forwardRef, useId, useMemo } from 'react';
import { Slot } from '@webbo-ui/slot';
import { tabs } from '@webbo-ui/theme';

// *-*-*-*-* Root *-*-*-*-*

export interface RootProps {
  /** The value for the selected tab, if controlled */
  value?: string;
  /** The value of the tab to select by default, if uncontrolled */
  defaultValue?: string;
  /** A function called when a new tab is selected */
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
  className?: string;
}

const ROOT_NAME = 'Tabs.Root';

interface TabsContext {
  baseId: string;
  value?: string;
  onValueChange: (value: string) => void;
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
  } = props;

  const [value, setValue] = useControllableState({
    value: valueProp,
    onChange: onValueChange,
    defaultValue,
  });

  const baseId = useId();

  const styles = useMemo(() => tabs(), []);

  return (
    <RootProvider baseId={baseId} value={value} onValueChange={setValue}>
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

  const styles = useStylesContext(List_NAME);

  return (
    <div {...restProps} role="tablist" className={styles.list({ className })} />
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

    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;

    const handleClick = (event: React.MouseEvent) => {
      if (event.ctrlKey === false) {
        context.onValueChange(value);
      } else {
        event.preventDefault();
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if ([' ', 'Enter'].includes(event.key)) context.onValueChange(value);
    };

    // const handleFocus = () => {
    //   // handle "automatic" activation if necessary
    //   // ie. activate tab following focus
    //   const isAutomaticActivation = context.activationMode !== 'manual';
    //   if (!isSelected && !disabled && isAutomaticActivation) {
    //     context.onValueChange(value);
    //   }
    // };

    return (
      <Slot
        ref={ref}
        className={styles.trigger({ className })}
        type="button"
        role="tab"
        aria-selected={isSelected}
        aria-controls={contentId}
        data-selected={isSelected}
        id={triggerId}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        // onFocus: handleFocus,
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

    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;

    return (
      <div
        ref={ref}
        className={styles.content({ className })}
        data-state={isSelected ? 'active' : 'inactive'}
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

// *-*-*-*-* Utils *-*-*-*-*

function makeTriggerId(baseId: string, value: string) {
  return `${baseId}-trigger-${value}`;
}

function makeContentId(baseId: string, value: string) {
  return `${baseId}-content-${value}`;
}
