'use client';

import {
  componentsLinks,
  gettingStartedLinks,
  utilsLinks,
} from '@/constants/links';
import { useNavDrawerState } from './nav-drawer';
import { usePathname } from 'next/navigation';
import { DrawerLink } from './drawer-link';

export const SidebarContent = () => {
  const pathname = usePathname();

  const handleDrawerClose = useNavDrawerState((s) => s.handleClose);

  return (
    <nav className="flex flex-col gap-1 p-5 pt-0 md:pt-5">
      <h2 className="select-none text-sm font-medium text-foreground/75 first-letter:uppercase">
        Getting Started
      </h2>

      {gettingStartedLinks.map(({ title, href }, i) => (
        <DrawerLink
          key={i}
          data-active={href === pathname}
          href={href}
          handleClose={handleDrawerClose}
          className="relative block h-9 content-center rounded px-3 first-letter:uppercase before:absolute before:right-2 before:top-1/2 before:hidden before:h-1/2 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-muted-9 data-[active=true]:bg-muted-3 data-[active=true]:text-muted-12 data-[active=true]:before:block hover:bg-muted-3 focus-visible:ring-2 focus-visible:ring-focus"
        >
          {title}
        </DrawerLink>
      ))}

      <h2 className="select-none text-sm font-medium text-foreground/75 first-letter:uppercase">
        components
      </h2>

      {Object.entries(componentsLinks).map(([heading, links], i) => {
        return (
          <div
            key={i}
            className="relative mt-2 space-y-1 border-l-2 border-muted-4 pl-1 before:absolute before:-left-[1px] before:top-0 before:size-[6px] before:-translate-x-1/2 before:rounded-full before:bg-muted-4 after:absolute after:-left-[1px] after:bottom-0 after:size-[6px] after:-translate-x-1/2 after:rounded-full after:bg-muted-4"
          >
            <h2 className="select-none pl-1 text-sm font-medium text-foreground/75 first-letter:uppercase">
              {heading}
            </h2>

            {links.sort().map(({ title, href }, i) => (
              <DrawerLink
                key={i}
                data-active={href === pathname}
                href={href}
                handleClose={handleDrawerClose}
                className="relative block h-9 content-center rounded px-3 first-letter:uppercase before:absolute before:right-2 before:top-1/2 before:hidden before:h-1/2 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-muted-9 data-[active=true]:bg-muted-3 data-[active=true]:text-muted-12 data-[active=true]:before:block hover:bg-muted-3 focus-visible:ring-2 focus-visible:ring-focus"
              >
                <span className="first-letter:uppercase">
                  {title}
                </span>
              </DrawerLink>
            ))}
          </div>
        );
      })}

      <h2 className="select-none text-sm font-medium text-foreground/75 first-letter:uppercase">
        Utils
      </h2>

      {utilsLinks.map(({ title, href }, i) => (
        <DrawerLink
          key={i}
          data-active={href === pathname}
          href={href}
          handleClose={handleDrawerClose}
          className="relative block h-9 content-center rounded px-3 first-letter:uppercase before:absolute before:right-2 before:top-1/2 before:hidden before:h-1/2 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-muted-9 data-[active=true]:bg-muted-3 data-[active=true]:text-muted-12 data-[active=true]:before:block hover:bg-muted-3 focus-visible:ring-2 focus-visible:ring-focus"
        >
          {title}
        </DrawerLink>
      ))}
    </nav>
  );
};
