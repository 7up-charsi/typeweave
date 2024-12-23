import React from 'react';
import {
  TabsCollection,
  useTabsCollection,
  useTabsCtx,
  useTabsStyles,
} from './tabs-root';

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

const displayName = 'TabsList';

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    const tabsCtx = useTabsCtx(displayName);
    const styles = useTabsStyles(displayName);
    const getItems = useTabsCollection();

    const isClickFocusRef = React.useRef(false);

    return (
      <TabsCollection.Parent>
        <div
          {...restProps}
          ref={ref}
          tabIndex={tabsCtx.isTabbingBackOut ? -1 : 0}
          role="tablist"
          aria-orientation={tabsCtx.orientation}
          className={styles.list({ className })}
          onMouseDown={() => {
            isClickFocusRef.current = true;
          }}
          onBlur={() => tabsCtx.setIsTabbingBackOut(false)}
          onFocus={(e) => {
            if (e.target === e.currentTarget && !tabsCtx.isTabbingBackOut) {
              const activeItems = getItems().filter((item) => {
                const element = item.ref.current!;

                return (
                  !element.disabled &&
                  !element.hidden &&
                  getComputedStyle(element).display !== 'none'
                );
              });

              const activeItem = activeItems.find((item) => item.active);

              activeItem?.ref.current?.focus();
            }

            isClickFocusRef.current = false;
          }}
        />
      </TabsCollection.Parent>
    );
  },
);

TabsList.displayName = displayName;
