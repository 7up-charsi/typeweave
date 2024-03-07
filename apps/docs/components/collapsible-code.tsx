'use client';

import { Button } from '@webbo-ui/button';
import { useState } from 'react';

interface Props {
  children?: React.ReactNode;
}

export const CollapsibleCode = (props: Props) => {
  const { children } = props;

  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="relative isolate">
      <pre
        style={{
          height: isCollapsed ? 200 : 'auto',
          maxHeight: 450,
          overflow: isCollapsed ? 'hidden' : 'auto',
        }}
      >
        {children}

        {isCollapsed && (
          <div className="absolute inset-0 z-40 bg-gradient-to-t from-black"></div>
        )}
      </pre>

      <Button
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50"
        size="sm"
        color="primary"
        variant="solid"
        onPress={() => {
          setIsCollapsed((prev) => !prev);
        }}
      >
        {isCollapsed ? 'expand code' : 'collapse code'}
      </Button>
    </div>
  );
};
