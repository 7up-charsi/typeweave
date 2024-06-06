'use client';

import { PointerEvents } from '@typeweave/react/src/pointer-events/pointer-events';
import React, { useState } from 'react';

// *-*-*-*-* SidebarGroup *-*-*-*-*

export interface SidebarGroupProps
  extends React.HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode;
  heading: string;
}

export const SidebarGroup = (props: SidebarGroupProps) => {
  const { children, heading, ...restProps } = props;

  const ulId = React.useId();
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <>
      <PointerEvents onPress={() => setIsExpanded((prev) => !prev)}>
        <button
          type="button"
          aria-controls={ulId}
          aria-expanded={isExpanded}
          className={`flex h-8 w-full items-center rounded font-medium capitalize hover:bg-muted-3 focus-visible:ring-2 focus-visible:ring-focus`}
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
      </PointerEvents>

      <ul
        id={ulId}
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
