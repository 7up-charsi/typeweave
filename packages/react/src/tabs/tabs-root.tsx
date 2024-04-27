import { TabsVariantProps, tabs } from '@webbo-ui/theme';
import { createContextScope } from '../context';
import { createCollection } from '../use-collection';
import { useControllableState } from '../use-controllable-state';
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

const Comp_Name = 'TabsRoot';

const [TabsCtx, useTabsCtx] = createContextScope<TabsCtxProps>(Comp_Name);

const [TabsStyles, useTabsStyles] =
  createContextScope<ReturnType<typeof tabs>>(Comp_Name);

export { useTabsCtx, useTabsStyles };

interface ItemData {
  active: boolean;
}

export const [TabsCollection, useTabsCollection] = createCollection<
  HTMLButtonElement,
  ItemData
>(Comp_Name);

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

    const [value, setValue] = useControllableState({
      value: valueProp,
      onChange: onValueChange,
      defaultValue,
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

TabsRoot.displayName = 'TabsRoot';
