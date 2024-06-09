import React from 'react';

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {}

const displayName = 'Pre';

export const Pre = (props: PreProps) => {
  return (
    /* 
      Why use a div inside another div instead of just a single div?

      I want rounded corners, but when using overflow-auto, the scroll bars show and scrollbar corners disrupt the rounded corners. To solve this, I use an outer div with overflow-hidden and an inner div with overflow-auto.
    */
    <div className="not-prose pre-tag-container relative overflow-hidden rounded">
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
