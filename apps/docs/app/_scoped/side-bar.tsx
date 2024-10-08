import { SidebarContent } from './sidebar-content';
import React from 'react';

const displayName = 'SideBar';

export const SideBar = () => {
  return (
    <aside className="sticky left-0 top-[65px] hidden h-[var(--screen-height)] w-full overflow-auto border-r border-r-muted-6 scrollbar-thin md:block">
      <SidebarContent />
    </aside>
  );
};

SideBar.displayName = displayName;
