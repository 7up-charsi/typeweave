'use client';

import { Button } from '@webbo-ui/button';
import { useRef, useState } from 'react';
import { CopyCode } from './copy-code';

interface Props {
  children?: React.ReactNode;
  code?: string;
}

export const CollapsibleCodeSource = (props: Props) => {
  const { children, code } = props;

  const [isCollapsed, setIsCollapsed] = useState(true);

  const preRef = useRef<HTMLPreElement>(null);

  return (
    <div className="relative isolate">
      <pre
        ref={preRef}
        className="language-tsx w-full h-full relative"
        style={{
          height: isCollapsed ? 200 : 450,
          overflow: isCollapsed ? 'hidden' : 'auto',
        }}
      >
        <code className="language-tsx">{children}</code>

        {isCollapsed && (
          <div className="absolute inset-0 z-40 bg-gradient-to-t from-black"></div>
        )}
      </pre>

      <CopyCode code={code} />

      <Button
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50"
        size="sm"
        color="primary"
        variant="solid"
        onPress={() => {
          setIsCollapsed((prev) => !prev);
          preRef.current?.scrollTo({ top: 0, left: 0 });
        }}
      >
        {isCollapsed ? 'expand code' : 'collapse code'}
      </Button>
    </div>
  );
};
