import React from 'react';

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {}

const displayName = 'Pre';

export const Pre = (props: PreProps) => {
  return (
    <div className="code-block not-prose group/code-block relative my-6 overflow-hidden rounded">
      <div className="max-h-[60vh] overflow-auto px-4 py-3 scrollbar-thin">
        <pre {...props} className="min-w-max" />
      </div>
    </div>
  );
};

Pre.displayName = displayName;
