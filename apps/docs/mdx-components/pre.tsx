import React from 'react';

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {}

const displayName = 'Pre';

export const Pre = (props: PreProps) => {
  return (
    <div className="relative my-6 overflow-hidden rounded">
      <div className="max-h-[60vh] min-w-full max-w-full overflow-auto bg-[#282a36]">
        <pre
          className="overflow-auto px-4 py-3 font-code text-sm font-normal scrollbar-thin selection:bg-[#4e5168]"
          {...props}
        />
      </div>
    </div>
  );
};

Pre.displayName = displayName;
