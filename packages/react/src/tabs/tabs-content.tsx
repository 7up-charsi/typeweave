import React from 'react';
import { useTabsCtx, useTabsStyles } from './tabs-root';

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const displayName = 'TabsContent';

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  (props, ref) => {
    const { value, className, ...contentProps } = props;

    const tabsCtx = useTabsCtx(displayName);
    const styles = useTabsStyles(displayName);

    const isSelected = value === tabsCtx.value;
    const triggerId = 'trigger-' + value;
    const contentId = 'content-' + value;

    return !isSelected ? null : (
      <div
        ref={ref}
        className={styles.content({ className })}
        data-orientation={tabsCtx.orientation}
        role="tabpanel"
        aria-labelledby={triggerId}
        id={contentId}
        tabIndex={0}
        {...contentProps}
      />
    );
  },
);

TabsContent.displayName = displayName;
