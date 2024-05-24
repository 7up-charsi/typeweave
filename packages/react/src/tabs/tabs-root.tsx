import { TabsVariantProps, tabs } from '@typeweave/theme';
import { createContextScope } from '../context';
import { createCollection } from '../use-collection';
import { useControlled } from '../use-controlled';
import React from 'react';

export interface TabsRootProps
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

interface TabsCtxProps {
  baseId: string;
  value?: string;
  onValueChange: (value: string) => void;
  orientation?: TabsRootProps['orientation'];
  activationMode?: TabsRootProps['activationMode'];
  activeTabId: string;
  onTabChange: (id: string) => void;
  loop?: boolean;
  isTabbingBackOut: boolean;
  setIsTabbingBackOut: React.Dispatch<React.SetStateAction<boolean>>;
}

const displayName = 'TabsRoot';

const [TabsCtx, useTabsCtx] = createContextScope<TabsCtxProps>(displayName);

const [TabsStyles, useTabsStyles] =
  createContextScope<ReturnType<typeof tabs>>(displayName);

export { useTabsCtx, useTabsStyles };

interface ItemData {
  active: boolean;
}

export const [TabsCollection, useTabsCollection] = createCollection<
  HTMLButtonElement,
  ItemData
>(displayName);

export const TabsRoot = React.forwardRef<HTMLDivElement, TabsRootProps>(
  (props, ref) => {
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

    const [value, setValue] = useControlled({
      controlled: valueProp,
      default: defaultValue ?? '',
      name: displayName,
      state: 'value',
      onChange: onValueChange,
    });

    const [activeTabId, setActiveTabId] = React.useState('');
    const [isTabbingBackOut, setIsTabbingBackOut] = React.useState(false);

    const baseId = React.useId();

    const styles = React.useMemo(() => tabs({ orientation }), [orientation]);

    return (
      <TabsCtx
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
        <TabsStyles {...styles}>
          <TabsCollection.Provider>
            <div
              {...restProps}
              ref={ref}
              className={styles.wrapper({ className })}
            />
          </TabsCollection.Provider>
        </TabsStyles>
      </TabsCtx>
    );
  },
);

TabsRoot.displayName = displayName;
