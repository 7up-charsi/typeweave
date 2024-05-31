import React from 'react';
import {
  Button,
  DrawerClose,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
} from '@typeweave/react';
import { MenuIcon, XIcon } from 'lucide-react';
import { Branding } from './branding';
import { navbarLinks } from '@/config/navbar-links';
import Link from 'next/link';
import { GithubLink } from './github-link';
import { SidebarContent } from './sidebar-content';

const displayName = 'DocsNavbar';

export const DocsNavbar = () => {
  return (
    <header className="sticky top-0 z-20 m-auto flex h-16 w-full max-w-screen-2xl items-center border-b border-b-muted-6 bg-muted-1/50 px-5 backdrop-blur-sm lg:px-10">
      <Branding />

      <GithubLink className="ml-auto max-lg:hidden" />

      <DrawerRoot>
        <DrawerTrigger>
          <Button
            isIconOnly
            aria-label="navbar"
            className="ml-auto lg:hidden"
          >
            <MenuIcon />
          </Button>
        </DrawerTrigger>

        <DrawerPortal>
          <DrawerOverlay />

          <DrawerContent className="w-full max-w-[300px] lg:hidden">
            <div className="flex h-full flex-col">
              <div className="relative flex h-16 shrink-0 items-center justify-center px-5">
                <Branding />

                <DrawerClose>
                  <Button
                    isIconOnly
                    aria-label="close navbar"
                    size="sm"
                    color="danger"
                    className="absolute right-5"
                  >
                    <XIcon />
                  </Button>
                </DrawerClose>
              </div>

              <div className="grow overflow-auto px-5 pb-4">
                <SidebarContent />
              </div>
            </div>
          </DrawerContent>
        </DrawerPortal>
      </DrawerRoot>
    </header>
  );
};

DocsNavbar.displayName = displayName;
