'use client';

import { useState } from 'react';
import { usePointerEvents } from '@webbo-ui/use-pointer-events';
import { focusVisible } from '@webbo-ui/theme';

// *-*-*-*-* SidebarGroup *-*-*-*-*

export interface SidebarGroupProps
  extends React.HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode;
  heading: string;
}

export const SidebarGroup = (props: SidebarGroupProps) => {
  const { children, heading, ...restProps } = props;

  const [isExpanded, setIsExpanded] = useState(true);

  const pointerEvents = usePointerEvents({
    onPress: () => setIsExpanded((prev) => !prev),
  });

  return (
    <>
      <button
        type="button"
        className={`flex h-8 w-full items-center rounded font-medium capitalize hover:bg-muted-3 ${focusVisible}`}
        {...pointerEvents}
      >
        <span className="flex w-6 items-center justify-center">
          <svg
            data-state={isExpanded ? 'expanded' : 'collapsed'}
            className="transition-transform data-[state=collapsed]:-rotate-90 data-[state=expanded]:rotate-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m8 10 4 4 4-4"
            />
          </svg>
        </span>
        {heading}
      </button>

      <ul
        style={{
          height: isExpanded ? 'auto' : '0px',
          display: isExpanded ? 'block' : 'none',
        }}
        {...restProps}
      >
        {children}
      </ul>
    </>
  );
};

SidebarGroup.displayName = 'SidebarGroup';
