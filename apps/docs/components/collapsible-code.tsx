'use client';

import { Button } from '@webbo-ui/button';
import { useEffect, useState } from 'react';
import { Pre } from './pre';
import { CopyCode } from './copy-code';

interface Props {
  code?: string;
  children?: React.ReactNode;
}

export const CollapsibleCode = (props: Props) => {
  const { children, code } = props;

  const isCollapsible = (code?.split('\n').length || 0) > 7;
  const [isCollapsed, setIsCollapsed] = useState(isCollapsible);

  useEffect(() => {
    setIsCollapsed(isCollapsible);
  }, [isCollapsible]);

  return (
    <div className="relative isolate">
      <Pre
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
      </Pre>

      <CopyCode code={code} />

      {isCollapsible && (
        <Button
          className="absolute bottom-5 left-1/2 z-50 -translate-x-1/2"
          size="sm"
          color="primary"
          variant="solid"
          onPress={() => {
            setIsCollapsed((prev) => !prev);
          }}
        >
          {isCollapsed ? 'expand' : 'collapse'}
        </Button>
      )}
    </div>
  );
};
