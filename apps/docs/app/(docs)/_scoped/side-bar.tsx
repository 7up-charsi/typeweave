import { SidebarContent } from './sidebar-content';
import React from 'react';

interface SideBarProps {}

const displayName = 'SideBar';

export const SideBar = (props: SideBarProps) => {
  const {} = props;

  return (
    <aside className="sticky left-0 top-16 h-[calc(100vh-65px)] w-full overflow-auto border-r border-r-muted-6 max-xl:hidden">
      <SidebarContent />
    </aside>
  );
};

SideBar.displayName = displayName;
